import ImageUpload from "@/app/components/ImageUpload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { FieldErrors, FieldValues, useFormContext, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { ProductFormValues } from "./CreateProduct"
import FormError from "@/app/components/FormError"
import InputField from "@/app/components/InputField"
import InputSwitch from "@/app/components/InputSwitch"
import { InputImageUpload } from "@/app/components/InputImageUpload"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import SelectInput from "@/app/components/SelectInput"
import InputRichTextEditor from "@/app/components/InputRichTextEditor"
import { Loader2 } from "lucide-react"

const CreateProductForm = ({
    register,
    handleSubmit,
    errors,
    productId,
    onSubmit,
    defaultValues,
    formValues,
    setValue,
    loading
}: {
    register: UseFormRegister<ProductFormValues>
    handleSubmit: UseFormHandleSubmit<ProductFormValues>
    errors: FieldErrors<ProductFormValues>
    productId: string | null
    onSubmit: (data: ProductFormValues) => void
    defaultValues: ProductFormValues
    formValues: ProductFormValues,
    setValue: UseFormSetValue<ProductFormValues>
    loading: boolean
}) => {

    

    const categories = useSelector((state: RootState) => state.category.data);
    const categoriesLoading = useSelector((state: RootState) => state.category.isLoading);

    const brands = useSelector((state: RootState) => state.brand.data);
    // const brandsLoading = useSelector((state: RootState) => state.brand.isLoading);


    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <InputField
                                label="Product Name"
                                name="name"
                                register={register}
                                errors={errors}
                                defaultValue={formValues.name ?? defaultValues.name}
                                placeholder="Product Name"
                            />
                        </div>

                        <div>
                            <InputField
                                label="Product Price"
                                name="price"
                                register={register}
                                errors={errors}
                                type="number"
                                placeholder="Product Price"
                                defaultValue={formValues.price ?? defaultValues.price}
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Product Description</Label>
                        {/* <Textarea 
                            {...register("description")}
                            placeholder="Product Description"
                            defaultValue={formValues.description ?? defaultValues.description}
                        /> */}
                        <InputRichTextEditor 
                            // {...register("description")}
                            placeholder="Product Description"
                            onChange={(value) => {
                                setValue("description", value)
                            }}
                            defaultValue = {formValues.description ?? defaultValues.description}
                            // defaultValue={formValues.description ?? defaultValues.description}
                        />
                        {errors.description && <FormError error={errors.description.message} />}
                    </div>

                    <div>
                        {/* <Label className = "mb-2">Product Images</Label> */}
                        {/* <ImageUpload
                            onChange={(images) => {
                                console.log(images)
                            }}
                            value={[]}
                            disabled={productId !== null}
                            defaultValue={defaultValues.images}
                        /> */}
                        {/* {errors.images && <FormError error={errors.images.message} />} */}
                        <InputImageUpload
                            onImageSelect={(files: (string | File)[]) => {
                                setValue("images", files);
                            }}
                            value={formValues.images}
                            register={register}
                            name="images"
                            errors={errors}
                            multiple={true}
                            label="Product Images"
                            setValue={setValue}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <SelectInput
                                label="Product Category"
                                name="category"
                                register={register}
                                errors={errors}
                                options={categories.map((category) => ({
                                    label: category.name,
                                    value: category._id
                                }))}
                                defaultValue={formValues.category ?? defaultValues.category}
                            />
                        </div>

                        <div>
                            <SelectInput
                                label="Product Brand"
                                name="brand"
                                register={register}
                                errors={errors}
                                options={brands.map((brand) => ({
                                    label: brand.name,
                                    value: brand._id
                                }))}
                                defaultValue={formValues.brand ?? defaultValues.brand}
                            />
                        </div>


                        <div>
                            <InputField
                                label="Product Stock"
                                name="quantity"
                                register={register}
                                errors={errors}
                                type="number"
                                placeholder="Product Stock"
                                defaultValue={formValues.quantity ?? defaultValues.quantity}  
                            />
                        </div>

                        <div>
                            <InputField
                                label="Product Discount"
                                name="discount"
                                register={register}
                                errors={errors}
                                type="number"
                                placeholder="Product Discount"
                                defaultValue={formValues.discount ?? defaultValues.discount}    
                            />
                        </div>

                        <div className = "flex items-center gap-2">
                            <InputSwitch
                                label="Active"
                                name="isActive"
                                register={register}
                                errors={errors}
                                defaultChecked={formValues.isActive ?? defaultValues.isActive}
                            />
                        </div>
                    </div>

                    {(
                        <Button type="submit" className="ml-auto mt-10" disabled={loading}>
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : productId ? "Update Product" : "Create Product"}
                        </Button>
                    )}
                </form>
        </div>
    )
}

export default CreateProductForm
