import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { Label } from "../ui/label";
import HelperText from "./helper-text";
import { fThousandSeparator } from "~/utils/format-string";

// ----------------------------------------------------------------------

type RHFTextFieldProps = React.ComponentProps<"input"> & {
  name: string;
  label?: string;
  helperText?: string;
  thousandSeparator?: boolean;
};

// ----------------------------------------------------------------------

export default function RHFTextField({
  name,
  label,
  type,
  thousandSeparator = false,
  ...props
}: RHFTextFieldProps) {
  const { control } = useFormContext();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number" && ["e", "E", "-", "+"].includes(e.key)) {
      e.preventDefault();
    }
  };

  // Helper function to remove commas for form value
  const removeCommas = (value: string): string => {
    return value.replace(/,/g, "");
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let value = e.target.value;

          if (thousandSeparator) {
            // When thousandSeparator is true, only allow numbers and decimal point
            value = value.replace(/[^\d.]/g, "");

            // Ensure only one decimal point
            const parts = value.split(".");
            if (parts.length > 2) {
              value = parts[0] + "." + parts.slice(1).join("");
            }

            // Format display value with commas
            const formattedValue = fThousandSeparator(value);
            e.target.value = formattedValue;

            // Send clean value (without commas) to form state
            field.onChange(removeCommas(value));
          } else {
            field.onChange(type === "number" ? Number(value) : value);
          }
        };

        const displayValue =
          thousandSeparator && field.value
            ? fThousandSeparator(String(field.value))
            : field.value;

        return (
          <div className={cn("grid w-full gap-2")}>
            {label && <Label htmlFor={name}>{label}</Label>}
            <Input
              {...field}
              {...props}
              value={displayValue || ""}
              onChange={handleChange}
              type={type}
              className={cn(
                type === "number" &&
                  "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                error && "border-destructive focus-visible:border-destructive",
                props.className
              )}
              onKeyDown={handleKeyDown}
            />
            {error && <HelperText state="error">{error.message}</HelperText>}
          </div>
        );
      }}
    />
  );
}
