import { Button } from "@/components/ui/button"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { CategoryFormValues } from "./CreateCategory"
import InputField from "@/app/components/InputField"
import { InputImageUpload } from "@/app/components/InputImageUpload"
import { Loader2 } from "lucide-react"

const CategoryForm = ({
    register,
    handleSubmit,
    errors,
    categoryId,
    onSubmit,
    defaultValues,
    formValues,
    setValue,
    loading
}: {
    register: UseFormRegister<CategoryFormValues>
    handleSubmit: UseFormHandleSubmit<CategoryFormValues>
    errors: FieldErrors<CategoryFormValues>
    categoryId: string | null
    onSubmit: (data: CategoryFormValues) => void
    defaultValues: CategoryFormValues
    formValues: CategoryFormValues,
    setValue: UseFormSetValue<CategoryFormValues>
    loading: boolean
}) => {

    // useEffect(() => {
    //     return() => {
    //         setValue("bannerImage", undefined)
    //     }
    // }, [])


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                <div>
                    <InputField
                        label="Category Name"
                        name="name"
                        register={register}
                        errors={errors}
                        defaultValue={formValues.name ?? defaultValues.name}
                        placeholder="Category Name"
                    />
                </div>

                <div>
                    <InputImageUpload
                        onImageSelect={(files:( File| string)[]) => {
                            setValue("bannerImage", files[0]);
                        }}
                        value={formValues.bannerImage ? [formValues.bannerImage] : []}
                        register={register}
                        name="bannerImage"
                        errors={errors}
                        multiple={false}
                        label="Category banner Image"
                        setValue={setValue}
                    />
                </div>

                <Button type="submit" className="ml-auto mt-4 min-w-[150px]" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : categoryId ? "Update Category" : "Create Category"}
                </Button>
            </form>
        </div>
    )
}

export default CategoryForm
