import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { Label } from "../ui/label";
import HelperText from "./helper-text";

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
  thousandSeparator = false,
  ...props
}: RHFTextFieldProps) {
  const { control } = useFormContext();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (props.type === "number" && ["e", "E", "-", "+"].includes(e.key)) {
      e.preventDefault();
    }
  };

  // Helper function to format number with thousand separators
  const formatNumberWithCommas = (value: string): string => {
    if (!value) return value;
    // Remove existing commas and non-digit characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, "");
    // Split by decimal point
    const parts = cleanValue.split(".");
    // Add commas to integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Join back with decimal point if it exists
    return parts.join(".");
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
          const value = e.target.value;

          if (thousandSeparator) {
            // Format display value with commas
            const formattedValue = formatNumberWithCommas(value);
            e.target.value = formattedValue;

            // Send clean value (without commas) to form state
            field.onChange(removeCommas(value));
          } else {
            field.onChange(value);
          }
        };

        const displayValue =
          thousandSeparator && field.value
            ? formatNumberWithCommas(String(field.value))
            : field.value;

        return (
          <div className={cn("grid w-full gap-2")}>
            {label && <Label htmlFor={name}>{label}</Label>}
            <Input
              {...field}
              {...props}
              value={displayValue || ""}
              onChange={handleChange}
              className={cn(
                props.type === "number" &&
                  "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
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
