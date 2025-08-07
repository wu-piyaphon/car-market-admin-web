import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "~/components/ui/input";
import { Label } from "../ui/label";

// ----------------------------------------------------------------------

type RHFTextFieldProps = React.ComponentProps<"input"> & {
  name: string;
  label?: string;
  helperText?: string;
};

// ----------------------------------------------------------------------

export default function RHFTextField({
  name,
  label,
  ...props
}: RHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <Label htmlFor={name}>{label || name}</Label>
            <Input {...field} {...props} />
            {error && (
              <span className="text-sm text-red-500">{error.message}</span>
            )}
          </>
        );
      }}
    />
  );
}
