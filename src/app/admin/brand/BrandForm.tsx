import { Button } from "@/components/ui/button"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { BrandFormValues } from "./CreateBrand"
import InputField from "@/app/components/InputField"
import { InputImageUpload } from "@/app/components/InputImageUpload"
import { Loader2 } from "lucide-react"

const BrandForm = ({
    register,
    handleSubmit,
    errors,
    brandId,
    onSubmit,
    defaultValues,
    formValues,
    setValue,
    loading
}: {
    register: UseFormRegister<BrandFormValues>
    handleSubmit: UseFormHandleSubmit<BrandFormValues>
    errors: FieldErrors<BrandFormValues>
    brandId: string | null
    onSubmit: (data: BrandFormValues) => void
    defaultValues: BrandFormValues
    formValues: BrandFormValues,
    setValue: UseFormSetValue<BrandFormValues>
    loading: boolean
}) => {
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                <div>
                    <InputField
                        label="Brand Name"
                        name="name"
                        register={register}
                        errors={errors}
                        defaultValue={formValues.name ?? defaultValues.name}
                        placeholder="Brand Name"
                    />
                </div>

                <div>
                    <InputImageUpload
                        onImageSelect={(files: File[]) => {
                            setValue("logo", files[0]);
                        }}
                        value={formValues.logo ? [formValues.logo] : []}
                        register={register}
                        name="logo"
                        errors={errors}
                        multiple={false}
                        label="Brand banner Image"
                        setValue={setValue}
                    />
                </div>

                <Button type="submit" className="ml-auto mt-4 min-w-[150px]" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : brandId ? "Update Brand" : "Create Brand"}
                </Button>
            </form>
        </div>
    )
}

export default BrandForm 