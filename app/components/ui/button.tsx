import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Loader2Icon } from "lucide-react";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md py-2 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 text-md rounded-md py-2 px-6 has-[>svg]:px-4",
        icon: "size-8",
      },
      color: {
        default: "",
        success: cn(
          "bg-green-600 !border-green-600 text-white hover:bg-green-500"
        ),
        inherit: cn("bg-slate-600 text-white hover:bg-slate-600/70"),
        error: cn("bg-red-600 !border-red-600 text-white hover:bg-red-500"),
        secondary: cn(
          "bg-primary-foreground text-foreground hover:opacity-70 hover:bg-primary-foreground border-slate-300 text-slate-500 dark:text-slate-200 border-solid border"
        ),
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  color,
  size,
  loading,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    color?: "default" | "success" | "inherit" | "error" | "secondary";
    loading?: boolean;
    asChild?: boolean;
    fullWidth?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type="button"
      data-slot="button"
      className={cn(buttonVariants({ variant, size, color, className }))}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Loader2Icon className="animate-spin" /> : children}
    </Comp>
  );
}

export { Button, buttonVariants };
