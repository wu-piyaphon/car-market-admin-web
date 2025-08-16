import { Controller, useFormContext } from "react-hook-form";
import { Label } from "~/components/ui/label";
import FileUpload from "./file-upload";
import HelperText from "./helper-text";

interface RHFFileUploadProps {
  name: string;
  label?: string;
  helperText?: string;
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
}

export default function RHFFileUpload({
  name,
  label,
  helperText,
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".webp"],
  },
}: RHFFileUploadProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <div className="space-y-2">
            {label && <Label htmlFor={name}>{label}</Label>}
            <FileUpload
              files={value || []}
              onChange={onChange}
              error={error}
              maxFiles={maxFiles}
              maxSize={maxSize}
              accept={accept}
            />
            {helperText && !error && (
              <HelperText state="default">{helperText}</HelperText>
            )}
          </div>
        );
      }}
    />
  );
}
