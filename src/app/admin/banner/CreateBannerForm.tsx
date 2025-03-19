import { Button } from "@/components/ui/button"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form"
import InputField from "@/app/components/InputField"
import { InputImageUpload } from "@/app/components/InputImageUpload"
import { Loader2 } from "lucide-react"
import { BannerFormValues } from "./CreateBanner"


const CreateBannerForm = ({
    register,
    handleSubmit,
    errors,
    bannerId,
    onSubmit,
    defaultValues,
    formValues,
    setValue,
    loading
}: {
    register: UseFormRegister<BannerFormValues>
    handleSubmit: UseFormHandleSubmit<BannerFormValues>
    errors: FieldErrors<BannerFormValues>
    bannerId: string | null
    onSubmit: (data: BannerFormValues) => void
    defaultValues: BannerFormValues
    formValues: BannerFormValues,
    setValue: UseFormSetValue<BannerFormValues>
    loading: boolean
}) => {
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                <div>
                    <InputField
                        label="Link"
                        name="link"
                        register={register}
                        errors={errors}
                        defaultValue={formValues.link ?? defaultValues.link}
                        placeholder="Banner Link"
                    />
                </div>

                <div>
                    <InputImageUpload
                        onImageSelect={(files: (string | File)[]) => {
                            setValue("image", files[0]);
                        }}
                        value={formValues.image ? [formValues.image] : []}
                        register={register}
                        name="image"
                        errors={errors}
                        multiple={false}
                        label="Banner Image"
                        setValue={setValue}
                    />
                </div>

                <Button type="submit" className="ml-auto mt-4 min-w-[150px]" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : bannerId ? "Update Banner" : "Create Banner"}
                </Button>
            </form>
        </div>
    )
}

export default CreateBannerForm
