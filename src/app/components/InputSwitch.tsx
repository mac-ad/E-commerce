import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { UseFormRegister, FieldValues, Path } from "react-hook-form"
import FormError from "./FormError"

interface InputSwitchProps<T extends FieldValues> {
  label: string
  name: keyof T
  register: UseFormRegister<T>
  errors?: any
  disabled?: boolean
  defaultChecked?: boolean
}

const InputSwitch = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  disabled = false,
  defaultChecked = false
}: InputSwitchProps<T>) => {
    console.log(defaultChecked)

    const { onChange, ...rest } = register(name as Path<T>)

    return (
        <div className="flex items-center gap-2">
        <Label>{label}</Label>
        <Switch
            {...register(name as Path<T>)}
            disabled={disabled}
            defaultChecked={defaultChecked}
            onCheckedChange={(checked) => {
                onChange({ target: { name, value: checked } } as any);
            }}
            checked={defaultChecked}
        />
        {errors?.[name] && (
            <FormError error={errors[name]?.message} />
        )}
        </div>
    )
}

export default InputSwitch
