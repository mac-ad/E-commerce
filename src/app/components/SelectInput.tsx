"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FieldErrors, Path, UseFormRegister } from "react-hook-form"
import FormError from "./FormError"

interface SelectInputProps<T extends Record<string, any>> {
  label?: string
  name: Path<T>
  register: UseFormRegister<T>
  errors?: FieldErrors<T>
  options: { label: string; value: string }[]
  placeholder?: string
  disabled?: boolean
  defaultValue?: string
}

const SelectInput = <T extends Record<string, any>>({
  label,
  name,
  register,
  errors,
  options,
  placeholder = "Select an option",
  disabled,
  defaultValue
}: SelectInputProps<T>) => {
  const { onChange, ...rest } = register(name)

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Select 
        onValueChange={(value) => {
            // The previous approaches weren't properly triggering form updates
            // We need to create a synthetic event that matches what react-hook-form expects
            const syntheticEvent = {
                target: {
                    name: name,
                    value: value
                }
            };
            onChange(syntheticEvent);
        }}
        defaultValue={defaultValue}
        disabled={disabled}
        value={defaultValue}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors?.[name] && (
        <FormError error={errors[name]?.message as string} />
      )}
    </div>
  )
}

export default SelectInput
