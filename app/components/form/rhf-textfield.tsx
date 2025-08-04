import * as React from "react";
import { Controller } from "react-hook-form";

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
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <>
          <Label htmlFor={label}>{name}</Label>
          <Input {...field} {...props} />
        </>
      )}
    />
  );
}
