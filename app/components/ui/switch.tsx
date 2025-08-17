import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "~/lib/utils";

type Props = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  label?: string;
};

function Switch({ className, label, ...props }: Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 relative inline-flex h-[2rem] w-22 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-600",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "peer bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-foreground pointer-events-none absolute top-1/2 left-1 size-7 -translate-y-1/2 rounded-full ring-0 transition-all data-[state=checked]:left-[calc(100%-1.8rem)] data-[state=unchecked]:left-0.5"
        )}
      />
      <p className="peer absolute left-1/2 -translate-x-[calc(75%)] text-base text-white peer-data-[state=unchecked]:hidden">
        {label}
      </p>
      <p
        data-slot="switch-label"
        className="text-foreground absolute right-1/2 -translate-x-[calc(-85%)] text-base peer-data-[state=checked]:hidden"
      >
        {label}
      </p>
    </SwitchPrimitive.Root>
  );
}

export { Switch };
