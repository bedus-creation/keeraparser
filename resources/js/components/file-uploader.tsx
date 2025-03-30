'use client';

import { Button } from '@/components/ui/button';
import { BaseFile } from '@/types/types';
import { File as FileIcon, Upload, X } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
    files: BaseFile[];
    onFileUpload: (file: BaseFile) => void;
    onFileRemove: (file: BaseFile) => void;
}

export function FileUploader({ onFileUpload, files, onFileRemove }: FileUploaderProps) {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                onFileUpload(acceptedFiles[0] as BaseFile);
            }
        },
        [onFileUpload],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/msword': ['.doc'],
            'text/plain': ['.txt'],
        },
        maxFiles: 3,
    });

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`mb-2 cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                    isDragActive ? 'border-primary bg-primary/10' : 'hover:border-primary/50 border-gray-300'
                }`}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-600">{isDragActive ? 'Drop the file here' : 'Drag and drop a resume file, or click to select'}</p>
                    <p className="text-xs text-gray-500">Supported formats: PDF, DOCX, DOC, TXT</p>
                </div>
            </div>

            <div className="space-y-2">
                {files.map((file: BaseFile) => (
                    <div key={file.name} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                            <FileIcon className="text-primary h-5 w-5" />
                            <span className="max-w-[200px] truncate text-sm font-medium">{file.name}</span>
                            <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileRemove(file);
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
