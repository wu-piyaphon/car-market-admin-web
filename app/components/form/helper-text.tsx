import { cn } from "~/lib/utils";

export default function HelperText({
  state,
  children,
  className,
}: {
  state: "default" | "error";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-sm",
        state === "error" ? "text-red-500" : "text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}
