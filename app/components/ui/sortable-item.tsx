import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

export type SortableItemProps = {
  id: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  dragOverlay?: ReactNode;
};

export function SortableItem({
  id,
  children,
  className,
  disabled = false,
  dragOverlay,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-lg",
        isDragging
          ? "z-50 opacity-60 shadow-2xl"
          : "transition-all duration-200",
        className
      )}
    >
      {children}

      {/* Drag Handle - covers entire area when not disabled */}
      {!disabled && (
        <div
          {...attributes}
          {...listeners}
          className="absolute inset-0 cursor-grab bg-transparent transition-colors hover:bg-black/5 active:cursor-grabbing"
        />
      )}

      {/* Custom drag overlay when dragging */}
      {isDragging && dragOverlay && (
        <div className="pointer-events-none absolute inset-0">
          {dragOverlay}
        </div>
      )}
    </div>
  );
}
