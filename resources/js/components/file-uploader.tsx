"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploaderProps {
    onFileUpload: (file: File) => void
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0])
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "application/msword": [".doc"],
            "text/plain": [".txt"],
        },
        maxFiles: 1,
    })

    const handleUpload = () => {
        if (selectedFile) {
            onFileUpload(selectedFile)
        }
    }

    const removeFile = () => {
        setSelectedFile(null)
    }

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary/50"
                }`}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-600">
                        {isDragActive ? "Drop the file here" : "Drag and drop a resume file, or click to select"}
                    </p>
                    <p className="text-xs text-gray-500">Supported formats: PDF, DOCX, DOC, TXT</p>
                </div>
            </div>

            {selectedFile && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                        <File className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium truncate max-w-[200px]">{selectedFile.name}</span>
                        <span className="text-xs text-gray-500">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation()
                                removeFile()
                            }}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        <Button onClick={handleUpload}>Process</Button>
                    </div>
                </div>
            )}
        </div>
    )
}
