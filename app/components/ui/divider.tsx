import React from "react";
import { cn } from "~/lib/utils";

type Props = React.HTMLProps<HTMLDivElement>;

export default function Divider({ className, ...props }: Props) {
  return (
    <div className={cn("border-border my-2 border-b", className)} {...props} />
  );
}
