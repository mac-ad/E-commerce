import { ChangeEvent, useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UseFormRegister, FieldValues, Path, UseFormSetValue, PathValue } from "react-hook-form";
import FormError from './FormError';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { getFullUrl } from '@/utils/utilityFunctions';

interface InputImageUploadProps<T extends FieldValues> {
  onImageSelect: (files: Array<string | File>) => void;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors?: any;
  label?: string;
  value?: Array<string | File>;
  disabled?: boolean;
  multiple?: boolean;
  setValue: UseFormSetValue<T>;
}

export function InputImageUpload<T extends FieldValues>({ 
  onImageSelect,
  register,
  name,
  errors,
  label,
  value = [],
  disabled = false,
  multiple = false,
  setValue
}: InputImageUploadProps<T>) {
  const [previews, setPreviews] = useState<Array<string | File>>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (value && value.length > 0) {
      setPreviews(value);
    }
  }, [value]);

  const handleImageChange = (files: File[]) => {
    if (!files.length) return;

    const newFiles = multiple ? [...previews, ...files] : [files[0]];
    setPreviews(newFiles);
    onImageSelect(newFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length) {
      handleImageChange(multiple ? files : [files[0]]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      handleImageChange(multiple ? files : [files[0]]);
    }
  };

  const removeImage = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onImageSelect(newPreviews);
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div 
        className={`
          border-2 border-dashed rounded-lg p-6 
          ${isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'} 
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary transition'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileSelect}
            className="hidden"
            id="image-upload"
            disabled={disabled}
          />
          <label htmlFor="image-upload" className="text-center">
            <div className="flex flex-col items-center gap-2">
              <Button variant="outline" asChild disabled={disabled} type="button">
                <span>Choose File{multiple && 's'}</span>
              </Button>
              <p className="text-sm text-gray-500">or drag and drop your image{multiple && 's'} here</p>
            </div>
          </label>
          
          <div className="w-full flex flex-wrap gap-4">
            {previews?.map((preview, index) => (
              preview ? <div key={index} className="relative w-[150px] h-[150px] group overflow-hidden border shadow-md hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={typeof preview === 'string' ? getFullUrl(preview) : URL.createObjectURL(preview)}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-contain "
                  />
                  {!disabled && (
                    <button
                      type="button" 
                      tabIndex={-1}
                      onClick={(e) => {
                        e.preventDefault()
                        removeImage(index)
                      }}
                      className="absolute -top-8 right-2 p-1.5 bg-red-500/90 backdrop-blur-sm rounded-full text-white 
                              hover:bg-red-600 transition-all duration-300 group-hover:top-2"
                    >
                      <X size={14} strokeWidth={2.5} />
                    </button>
                  )}
              </div> : null
            ))}
          </div>
          {errors?.[name] && (
            <FormError error={errors[name]?.message} />
          )}
        </div>
      </div>
    </div>
  );
}
