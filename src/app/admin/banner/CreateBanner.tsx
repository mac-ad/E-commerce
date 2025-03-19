"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateBannerMutation, useUpdateBannerMutation, useLazyGetBannerByIdQuery } from "@/features/api/bannerApiSlice"
import { toast } from "sonner"
import { useEffect } from "react"
import CreateFormSkeleton from "@/app/components/skeleton/CreateFornSkeleton"
import CreateBannerForm from "./CreateBannerForm"

const bannerSchema = z.object({
    link: z.string().min(1, "Banner link is required"),
    image: z.union([z.string(), z.instanceof(File)]).optional(),
})

export type BannerFormValues = z.infer<typeof bannerSchema>

const defaultValues: BannerFormValues = {
    link: "",
    image: undefined
}

const CreateBanner = ({
    bannerId,
    closeModal
}: {
    bannerId: string | null,
    closeModal: () => void
}) => {
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<BannerFormValues>({
        resolver: zodResolver(bannerSchema),
        defaultValues
    })

    const [createBanner, { isLoading: isCreatingBanner }] = useCreateBannerMutation()
    const [updateBanner, { isLoading: isUpdatingBanner }] = useUpdateBannerMutation()
    const [getBannerDetail, { isLoading: isLoadingBannerDetail, error }] = useLazyGetBannerByIdQuery()

    const formValues = watch()

    useEffect(() => {
        const fetchBanner = async () => {
            if (bannerId) {
                try {
                    const response = await getBannerDetail(bannerId).unwrap()
                    reset({
                        link: response.data.link,
                        image: response.data.image
                    })
                } catch (error) {
                    console.error('Error fetching banner:', error)
                }
            }
        }

        fetchBanner()
    }, [bannerId])

    const onSubmit = async (data: BannerFormValues) => {
        const formData = new FormData()
        formData.append('link', data?.link as string)
       
        if (data.image instanceof File) {
            formData.append('image', data.image)
        }

        try {
            if (bannerId) {
                await updateBanner({ data: formData, id: bannerId }).unwrap()
            } else {
                await createBanner({ data: formData }).unwrap()
            }
            reset()
            toast.success("Banner saved successfully")
            closeModal()
        } catch (error) {
            console.error('Error saving banner:', error)
            toast.error("Error saving banner")
        }
    }

    if(error) {
        return (
            <div className="flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-xl font-semibold text-red-600 mb-2">Banner Details Not Found</h3>
                <p className="text-gray-600">Unable to fetch the banner information. Please try again later.</p>
            </div>
        )
    }

    return (
        <div>
            {isLoadingBannerDetail ? <CreateFormSkeleton /> :
                <CreateBannerForm
                   register={register}
                   handleSubmit={handleSubmit}
                   errors={errors}
                   bannerId={bannerId}
                   onSubmit={onSubmit}
                   defaultValues={defaultValues}
                   formValues={formValues}
                   setValue={setValue}
                   loading={isCreatingBanner || isUpdatingBanner}
                />
            }
        </div>
    )
}

export default CreateBanner
