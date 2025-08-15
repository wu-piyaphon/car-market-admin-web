import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

type EmptyContentProps = {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export default function EmptyContent({
  icon,
  title = "ไม่พบข้อมูล",
  description = "ไม่มีข้อมูลที่จะแสดงในขณะนี้",
  action,
  className = "",
}: EmptyContentProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center px-4 py-12 text-center",
        className
      )}
    >
      {icon && (
        <div className="text-muted-foreground mb-4 text-5xl">{icon}</div>
      )}
      <h2 className="text-foreground mb-2 text-xl font-semibold">{title}</h2>
      <p className="text-muted-foreground mb-4">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
