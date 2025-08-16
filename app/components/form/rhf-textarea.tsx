import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import HelperText from "./helper-text";

type RHFTextareaProps = React.ComponentProps<"textarea"> & {
  name: string;
  label?: string;
  helperText?: string;
};

export default function RHFTextarea({
  name,
  label,
  helperText,
  ...props
}: RHFTextareaProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className="space-y-2">
            {label && <Label htmlFor={name}>{label}</Label>}
            <Textarea {...field} {...props} />
            {error && <HelperText state="error">{error.message}</HelperText>}
            {helperText && !error && (
              <HelperText state="default">{helperText}</HelperText>
            )}
          </div>
        );
      }}
    />
  );
}
