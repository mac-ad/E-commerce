"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

interface ImageUploadProps {
    onChange?: (files: File[]) => void
    value?: string[]
    disabled?: boolean
    defaultValue?: string[]
}

const ImageUpload = ({
    onChange,
    value = [],
    disabled = false,
    defaultValue = []
}: ImageUploadProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])

    useEffect(() => {
        // Handle initial images passed as value prop
        if (value.length > 0) {
            setPreviews(value)
        }
    }, [value])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return

        const files = Array.from(e.target.files)
        setSelectedFiles(prev => [...prev, ...files])

        // Create preview URLs for new files
        const newPreviews = files.map(file => URL.createObjectURL(file))
        setPreviews(prev => [...prev, ...newPreviews])

        // Notify parent component if onChange is provided
        onChange?.(files)
    }

    const removeImage = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index))
        setPreviews(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="space-y-4">
            <div>
                <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (disabled) return;
                        
                        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
                        if (files.length > 0) {
                            handleFileSelect({ target: { files } } as any);
                        }
                    }}
                    onClick={() => {
                        if (!disabled) {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.multiple = true;
                            input.accept = 'image/*';
                            input.onchange = (e) => handleFileSelect(e as any);
                            input.click();
                        }
                    }}
                >
                    <div className="space-y-2">
                        <div className="text-gray-600">
                            Drag and drop your images here, or click to select files
                        </div>
                        <div className="text-sm text-gray-500">
                            Supported formats: JPG, PNG, GIF
                        </div>
                    </div>
                </div>
            </div>

            {previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative group aspect-square">
                            <Image
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                fill
                                className="rounded-lg object-cover"
                            />
                            {!disabled && (
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ImageUpload
