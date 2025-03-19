import { useForm } from "react-hook-form"
import { useEffect } from "react"
import CreateProductForm from "./CreateProductForm"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateProductMutation, useLazyGetProductQuery, useUpdateProductMutation } from "@/features/api/productApiSlice"
import { toast } from "sonner"
import CreateFormSkeleton from "@/app/components/skeleton/CreateFornSkeleton"

const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.number().min(0, "Price must be greater than or equal to 0"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"), 
    isActive: z.boolean().default(true),
    quantity: z.number().int().min(0, "quantity must be greater than or equal to 0"),
    images: z.array(z.union([z.string(), z.instanceof(File)])).min(1, "At least one image is required"),
    brand: z.string().min(1, "Brand is required"),
    discount: z.number().min(0, "Discount must be greater than or equal to 0")
})

export type ProductFormValues = z.infer<typeof productSchema>

const defaultValues: ProductFormValues = {
    name: "",
    price: 0,
    description: "",
    category: "",
    isActive: true,
    quantity: 0,
    images: [],
    brand: "",
    discount: 0
}

const CreateProduct = (
    {productId, closeModal}:{
        productId:string | null,
        closeModal: () => void
    }) => {
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues
    })

    // Replace useProducts with RTK Query hooks
    const [createProduct,{isLoading: isCreatingProduct}] = useCreateProductMutation()
    const [updateProduct,{isLoading: isUpdatingProduct}] = useUpdateProductMutation()
    const [getProductDetail, {isLoading: isLoadingProductDetail}] = useLazyGetProductQuery()

    const formValues = watch(); // Get current form values


    useEffect(() => {
        const fetchProduct = async () => {
            if(productId) {
                try {
                    const response = await getProductDetail(productId).unwrap()
                    const data = response.data
                    // Pre-fill the form with existing product data
                    reset({
                        name: data.name,
                        price: data.price,
                        description: data.description,
                        category: data?.category ? (typeof data.category === 'string' ? data.category : data.category._id) : undefined,
                        brand: data?.brand ? (typeof data.brand === 'string' ? data.brand : data.brand._id) : undefined,
                        isActive: data.isActive,
                        quantity: data.quantity,
                        images: data.images,
                        discount: data.discount
                    })
                } catch (error) {
                    console.error('Error fetching product:', error)
                }
            }
        }

        fetchProduct()
    }, [productId, reset])


    const onSubmit = async (data: any) => {
        const formData = new FormData()
        
        // Add form fields to FormData
        formData.append('name', data.name)
        formData.append('price', String(data.price))
        formData.append('description', data.description)
        formData.append('category', data.category)
        formData.append('isActive', String(data.isActive))
        formData.append('quantity', String(data.quantity))
        formData.append('brand', data.brand)
        formData.append('discount', String(data.discount))
        // Separate string and file images
        const images = data.images || [];

        
        if(images?.length){
            images.forEach((image: string | File) => {
                if (image instanceof File) {
                    formData.append('images', image);
                } else {
                    formData.append('existingImages', image);
                }
            })
        }

        try {
            if(productId) {
                await updateProduct({data:formData, id: productId}).unwrap()
            } else {
                await createProduct({data:formData}).unwrap()
            }
            reset()
            toast.success("Product saved successfully")
            closeModal()
        } catch (error) {
            console.error('Error saving product:', error)
            toast.error("Error saving product")
        }
    }

    return (
        <div>
            {isLoadingProductDetail ? <CreateFormSkeleton />:
                <CreateProductForm  
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    productId={productId}
                    onSubmit={onSubmit} 
                    defaultValues={defaultValues}
                    formValues={formValues}
                    setValue={setValue}
                    loading={isLoadingProductDetail || isUpdatingProduct || isCreatingProduct}
                />
            }
        </div>
    )
}

export default CreateProduct
