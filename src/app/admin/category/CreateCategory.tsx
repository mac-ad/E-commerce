import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateCategoryMutation, useUpdateCategoryMutation, useLazyGetCategoryQuery } from "@/features/api/categoryApiSlice"
import { toast } from "sonner"
import { useEffect } from "react"
import CreateFormSkeleton from "@/app/components/skeleton/CreateFornSkeleton"
import CategoryForm from "./CategoryForm"

const categorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
    bannerImage: z.union([z.string(), z.instanceof(File)]).optional(),
})

export type CategoryFormValues = z.infer<typeof categorySchema>

const defaultValues: CategoryFormValues = {
    name: "",
    bannerImage: undefined
}

const CreateCategory = ({
    categoryId,
    closeModal
}: {
    categoryId: string | null,
    closeModal: () => void
}) => {
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues
    })

    const [createCategory,{isLoading:isCreatingCategory}] = useCreateCategoryMutation()
    const [updateCategory,{isLoading:isUpdatingCategory}] = useUpdateCategoryMutation()
    const [getCategoryDetail, { isLoading: isLoadingCategoryDetail, error }] = useLazyGetCategoryQuery()

    const formValues = watch()

    useEffect(() => {
        const fetchCategory = async () => {
            if (categoryId) {
                try {
                    const response = await getCategoryDetail(categoryId).unwrap()
                    const data = response.data
                    reset({
                        name: data.name,
                        bannerImage: data.bannerImage
                    })
                } catch (error) {
                    console.error('Error fetching category:', error)
                }
            }
        }

        fetchCategory()
    }, [categoryId])


    const onSubmit = async (data: CategoryFormValues) => {
        const formData = new FormData()
        
        formData.append('name', data.name)

        if (data.bannerImage instanceof File) {
            formData.append('bannerImage', data.bannerImage)
        } else if (typeof data.bannerImage === 'string') {
            formData.append('existingImage', data.bannerImage)
        }

        try {
            if (categoryId) {
                await updateCategory({ data: formData, id: categoryId }).unwrap()
            } else {
                await createCategory({ data: formData }).unwrap()
            }
            reset()
            toast.success("Category saved successfully")
            closeModal()
        } catch (error) {
            console.error('Error saving category:', error)
            toast.error("Error saving category")
        }
    }

    if(error) {
        return (
            <div className="flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-xl font-semibold text-red-600 mb-2">Category Details Not Found</h3>
                <p className="text-gray-600">Unable to fetch the category information. Please try again later.</p>
            </div>
        )
    }

    return (
        <div>
            {isLoadingCategoryDetail ? <CreateFormSkeleton /> :
                <CategoryForm
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    categoryId={categoryId}
                    onSubmit={onSubmit}
                    defaultValues={defaultValues}
                    formValues={formValues}
                    setValue={setValue}
                    loading={isCreatingCategory || isUpdatingCategory}
                />
            }
        </div>
    )
}

export default CreateCategory
