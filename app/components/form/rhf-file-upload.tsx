import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "~/components/ui/label";
import FileUpload from "./file-upload";
import HelperText from "./helper-text";
import { useCallback } from "react";

type RHFFileUploadProps = {
  name: string;
  label?: string;
  helperText?: string;
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
};

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

  const { move, fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const onAddFiles = useCallback(
    (newFiles: File[]) => {
      const filesToAdd = newFiles.slice(0, maxFiles - fields.length);
      filesToAdd.forEach(file => append(file));
    },
    [fields.length, maxFiles, append]
  );

  const onRemoveFile = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const onMoveFile = useCallback(
    (from: number, to: number) => {
      move(from, to);
    },
    [move]
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value }, fieldState: { error } }) => {
        console.log("🚀 ~ RHFFileUpload ~ value:", value);
        console.log("🚀 ~ RHFFileUpload ~ fields:", fields);
        return (
          <div className="space-y-2">
            {label && <Label htmlFor={name}>{label}</Label>}
            <FileUpload
              files={value || []}
              onAddFiles={onAddFiles}
              onRemoveFile={onRemoveFile}
              onMoveFile={onMoveFile}
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
