import { Image as ImageIcon, Upload, X } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import type { FieldError } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type FileUploadProps = {
  files: File[];
  onChange: (files: File[]) => void;
  error?: FieldError;
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: Record<string, string[]>;
};

export default function FileUpload({
  files,
  onChange,
  error,
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".webp"],
  },
}: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
      onChange(newFiles);
    },
    [files, onChange, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: maxFiles - files.length,
  });

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      onChange(newFiles);
    },
    [files, onChange]
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={cn(
          "cursor-pointer rounded-lg border-2 border-dashed p-6 transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "hover:border-primary border-gray-300",
          error && "border-red-500",
          files.length >= maxFiles && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="mb-4 h-12 w-12 text-gray-400" />
          <div className="mb-1 text-lg">
            {isDragActive ? "วางไฟล์ที่นี่..." : "คลิกหรือลากไฟล์มาที่นี่"}
          </div>
          <div className="text-sm text-gray-500">
            รองรับไฟล์ JPG, PNG, WEBP (สูงสุด {formatFileSize(maxSize)})
          </div>
          {files.length < maxFiles && (
            <div className="mt-1 text-xs text-gray-400">
              เหลืออีก {maxFiles - files.length} ไฟล์
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-600">
          {error.message}
        </div>
      )}

      {/* File Preview */}
      {files.length > 0 && (
        <div className="grid grid-cols-4 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {files.map((file, index) => (
            <div key={index} className="group relative">
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-full w-full object-cover"
                    onLoad={() =>
                      URL.revokeObjectURL(URL.createObjectURL(file))
                    }
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                )}
              </div>

              {/* Remove Button */}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={() => removeFile(index)}
              >
                <X className="size-5" />
              </Button>

              {/* File Info */}
              <div className="mt-1 truncate text-xs text-gray-500">
                {file.name}
              </div>
              <div className="text-xs text-gray-400">
                {formatFileSize(file.size)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
