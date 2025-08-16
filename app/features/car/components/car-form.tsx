import { cn } from "~/lib/utils";

export function CarFormRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row", className)}>
      {children}
    </div>
  );
}
