import * as React from "react";
import { useController } from "react-hook-form";
import type { FieldPath, FieldValues, Control } from "react-hook-form";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Label } from "~/components/ui/label";

// ----------------------------------------------------------------------

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type RHFSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<React.ComponentProps<"select">, "name" | "defaultValue"> & {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  helperText?: string;
  showErrorMessage?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  options: SelectOption[];
  allowEmpty?: boolean;
  emptyText?: string;
};

// ----------------------------------------------------------------------

export default function RHFSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  placeholder,
  helperText,
  showErrorMessage = true,
  containerClassName,
  labelClassName,
  errorClassName,
  className,
  disabled,
  options,
  allowEmpty = true,
  emptyText = "Select an option...",
  ...props
}: RHFSelectProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const hasError = !!error;

  return (
    <div className={cn("grid gap-2", containerClassName)}>
      {label && (
        <Label
          htmlFor={name}
          className={cn(hasError && "text-destructive", labelClassName)}
        >
          {label}
        </Label>
      )}

      <div className="relative">
        <select
          {...field}
          {...props}
          id={name}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            hasError
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
            hasError && "border-destructive focus-visible:border-destructive",
            className
          )}
        >
          {allowEmpty && (
            <option value="" disabled={!allowEmpty}>
              {placeholder || emptyText}
            </option>
          )}
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom chevron icon */}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
      </div>

      {helperText && !hasError && (
        <p id={`${name}-helper`} className="text-muted-foreground text-sm">
          {helperText}
        </p>
      )}

      {showErrorMessage && hasError && (
        <p
          id={`${name}-error`}
          className={cn("text-destructive text-sm", errorClassName)}
        >
          {error.message}
        </p>
      )}
    </div>
  );
}
