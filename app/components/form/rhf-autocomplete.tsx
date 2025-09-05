import { Check, ChevronDown } from "lucide-react";
import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import type { Option } from "~/types/common";
import HelperText from "./helper-text";

// ----------------------------------------------------------------------

export type AutocompleteOption = Option & {
  id: string;
  name: string;
  disabled?: boolean;
  image?: string;
};

type RHFAutocompleteProps = {
  name: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  options: AutocompleteOption[];
  disabled?: boolean;
  className?: string;
};

// ----------------------------------------------------------------------

export default function RHFAutocomplete({
  name,
  label,
  placeholder,
  searchPlaceholder = "ค้นหาตัวเลือก...",
  emptyText = "ไม่พบตัวเลือก",
  helperText,
  options,
  disabled,
  className,
}: RHFAutocompleteProps) {
  const { control } = useFormContext();
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const selectedOption = options.find(
          option => option.id === field.value
        );

        return (
          <div className="grid w-full gap-2">
            {label && <Label>{label}</Label>}

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id={name}
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-invalid={!!error}
                  aria-describedby={
                    error
                      ? `${name}-error`
                      : helperText
                        ? `${name}-helper`
                        : undefined
                  }
                  disabled={disabled}
                  className={cn(
                    "h-9 w-full justify-between font-normal",
                    !selectedOption && "text-muted-foreground",
                    error &&
                      "border-destructive focus-visible:border-destructive",
                    className
                  )}
                >
                  <div className="flex flex-row items-center gap-3">
                    {selectedOption?.image && (
                      <img
                        src={selectedOption.image}
                        alt={selectedOption.name}
                        className="h-5 w-5 object-contain object-center"
                      />
                    )}
                    <span className="truncate">
                      {selectedOption ? selectedOption.name : placeholder}
                    </span>
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent align="start" sideOffset={2}>
                <Command>
                  <CommandInput placeholder={searchPlaceholder} />
                  <CommandList>
                    <CommandEmpty>{emptyText}</CommandEmpty>
                    <CommandGroup
                      className={cn(options.length === 0 && "hidden")}
                    >
                      {options.map(option => {
                        return (
                          <CommandItem
                            key={option.id}
                            value={option.name}
                            disabled={option.disabled}
                            onSelect={() => {
                              field.onChange(
                                option.id === field.value ? "" : option.id
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === option.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {option?.image && (
                              <img
                                src={option.image}
                                alt={option.name}
                                className="mr-2 h-5 w-5 object-contain object-center"
                              />
                            )}
                            {option.name}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

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
