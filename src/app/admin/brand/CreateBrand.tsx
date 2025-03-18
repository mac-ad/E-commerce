"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateBrandMutation, useUpdateBrandMutation, useLazyGetBrandQuery } from "@/features/api/brandApiSlice"
import { toast } from "sonner"
import { useEffect } from "react"
import CreateFormSkeleton from "@/app/components/skeleton/CreateFornSkeleton"
import BrandForm from "./BrandForm"

const brandSchema = z.object({
    name: z.string().min(1, "Brand name is required"),
    logo: z.union([z.string(), z.instanceof(File)]).optional(),
})

export type BrandFormValues = z.infer<typeof brandSchema>

const defaultValues: BrandFormValues = {
    name: "",
    logo: undefined
}

const CreateBrand = ({
    brandId,
    closeModal
}: {
    brandId: string | null,
    closeModal: () => void
}) => {
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<BrandFormValues>({
        resolver: zodResolver(brandSchema),
        defaultValues
    })

    const [createBrand, { isLoading: isCreatingBrand }] = useCreateBrandMutation()
    const [updateBrand, { isLoading: isUpdatingBrand }] = useUpdateBrandMutation()
    const [getBrandDetail, { isLoading: isLoadingBrandDetail, error }] = useLazyGetBrandQuery()

    const formValues = watch()

    useEffect(() => {
        const fetchBrand = async () => {
            if (brandId) {
                try {
                    const response = await getBrandDetail(brandId).unwrap()
                    const data = response.data
                    reset({
                        name: data.name,
                        logo: data.logo
                    })
                } catch (error) {
                    console.error('Error fetching brand:', error)
                }
            }
        }

        fetchBrand()
    }, [brandId])

    const onSubmit = async (data: BrandFormValues) => {
        const formData = new FormData()
        formData.append('name', data?.name as string)
       
        if (data.logo instanceof File) {
            formData.append('logo', data.logo)
        } else if (typeof data.logo === 'string') {
            formData.append('existingImage', data.logo)
        }

        try {
            if (brandId) {
                await updateBrand({ data: formData, id: brandId }).unwrap()
            } else {
                await createBrand({ data: formData }).unwrap()
            }
            reset()
            toast.success("Brand saved successfully")
            closeModal()
        } catch (error) {
            console.error('Error saving brand:', error)
            toast.error("Error saving brand")
        }
    }

    if(error) {
        return (
            <div className="flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-xl font-semibold text-red-600 mb-2">Brand Details Not Found</h3>
                <p className="text-gray-600">Unable to fetch the brand information. Please try again later.</p>
            </div>
        )
    }

    return (
        <div>
            {isLoadingBrandDetail ? <CreateFormSkeleton /> :
                <BrandForm
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    brandId={brandId}
                    onSubmit={onSubmit}
                    defaultValues={defaultValues}
                    formValues={formValues}
                    setValue={setValue}
                    loading={isCreatingBrand || isUpdatingBrand}
                />
            }
        </div>
    )
}

export default CreateBrand 