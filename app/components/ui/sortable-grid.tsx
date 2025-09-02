import { useCallback } from "react";
import type { ReactNode } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "~/lib/utils";

export type SortableGridProps<T> = {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number) => ReactNode;
  getItemId: (item: T, index: number) => string;
  className?: string;
  gridCols?: string;
  gap?: string;
  disabled?: boolean;
};

export function SortableGrid<T>({
  items,
  onReorder,
  renderItem,
  getItemId,
  className,
  gridCols = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  gap = "gap-4",
  disabled = false,
}: SortableGridProps<T>) {
  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum distance to start dragging
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end event
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        const oldIndex = items.findIndex(
          (item, index) => getItemId(item, index) === active.id
        );
        const newIndex = items.findIndex(
          (item, index) => getItemId(item, index) === over?.id
        );

        if (oldIndex !== -1 && newIndex !== -1) {
          const newItems = arrayMove(items, oldIndex, newIndex);
          onReorder(newItems);
        }
      }
    },
    [items, onReorder, getItemId]
  );

  if (disabled || items.length <= 1) {
    return (
      <div className={cn("grid", gridCols, gap, className)}>
        {items.map((item, index) => renderItem(item, index))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item, index) => getItemId(item, index))}
        strategy={rectSortingStrategy}
      >
        <div className={cn("grid", gridCols, gap, className)}>
          {items.map((item, index) => renderItem(item, index))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
