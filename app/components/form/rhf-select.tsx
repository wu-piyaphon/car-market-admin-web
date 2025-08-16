import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import HelperText from "./helper-text";

// ----------------------------------------------------------------------

export type SelectOption = {
  id: string;
  name: string;
  disabled?: boolean;
};

type RHFSelectProps = Omit<React.ComponentProps<"select">, "placeholder"> & {
  name: string;
  label?: string;
  helperText?: string;
  options: SelectOption[];
  allowEmpty?: boolean;
  emptyText?: string;
  placeholder?: string;
};

// ----------------------------------------------------------------------

export default function RHFSelect({
  name,
  label,
  placeholder,
  helperText,
  className,
  disabled,
  options,
  allowEmpty = true,
  ...props
}: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className="grid w-full gap-2">
            {label && <Label htmlFor={name}>{label}</Label>}

            <div className="relative">
              <select
                {...field}
                {...props}
                id={name}
                disabled={disabled}
                aria-invalid={!!error}
                aria-describedby={
                  error
                    ? `${name}-error`
                    : helperText
                      ? `${name}-helper`
                      : undefined
                }
                className={cn(
                  // Base styles
                  "border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
                  // Dark mode support
                  "dark:bg-input/30",
                  // Focus styles
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  // Error styles
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  // Disabled styles
                  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                  // Text styles
                  "text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
                  // Mobile responsive
                  "md:text-sm",
                  // Custom appearance
                  "cursor-pointer appearance-none",
                  // Error state
                  error &&
                    "border-destructive focus-visible:border-destructive",
                  className
                )}
              >
                {allowEmpty && (
                  <option value="" disabled={!allowEmpty}>
                    {placeholder}
                  </option>
                )}
                {options.map(option => (
                  <option
                    key={option.id}
                    value={option.id}
                    disabled={option.disabled}
                  >
                    {option.name}
                  </option>
                ))}
              </select>

              {/* Custom chevron icon */}
              <ChevronDownIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
            </div>

            {helperText && !error && (
              <HelperText state="default">{helperText}</HelperText>
            )}

            {error && <HelperText state="error">{error.message}</HelperText>}
          </div>
        );
      }}
    />
  );
}
