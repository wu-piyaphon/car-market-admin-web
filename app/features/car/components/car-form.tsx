import { cn } from "~/lib/utils";

export function CarFormRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-start gap-4 md:grid-cols-2",
        className
      )}
    >
      {children}
    </div>
  );
}
