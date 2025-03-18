import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FormError from "./FormError"
import { UseFormRegister, FieldValues, FieldErrors, Path } from "react-hook-form"

interface InputFieldProps<T extends FieldValues> {
  label: string
  name: keyof T
  register: UseFormRegister<T>
  errors?: FieldErrors<T>
  type?: string
  placeholder?: string
  disabled?: boolean
  defaultValue?: string | number
}

const InputField = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  type = "text",
  placeholder,
  disabled = false,
  defaultValue
}: InputFieldProps<T>) => {

    const { onChange, ...rest } = register(name as Path<T>, {
        // Add value type transformation
        setValueAs: (value: string) => {
            if (type === "number") {
                return value === "" ? undefined : Number(value);
            }
            return value;
        }
    });

    return (
        <div className="space-y-2">
        <Label>{label}</Label>
        <Input
            {...register(name as Path<T>)}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={(e) => {
                onChange(e);
            }}
        />
        {errors?.[name] && (
            <FormError error={errors[name]?.message as string} />
        )}
        </div>
    )
}

export default InputField
