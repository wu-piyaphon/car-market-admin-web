import { useCallback, useMemo, useRef } from "react";
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
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "~/lib/utils";
import type { UseFieldArrayMove } from "react-hook-form";

export type SortableGridProps<T> = {
  items: T[];
  onReorder: UseFieldArrayMove;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  gridCols?: string;
  gap?: string;
  disabled?: boolean;
};

export function SortableGrid<T>({
  items,
  onReorder,
  renderItem,
  className,
  gridCols = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  gap = "gap-4",
  disabled = false,
}: SortableGridProps<T>) {
  // Use ref to store current items to avoid stale closures
  const itemsRef = useRef(items);
  itemsRef.current = items;

  // Memoize item IDs and create index map for fast lookups
  const { itemIds, idToIndexMap } = useMemo(() => {
    const ids = items.map((_, index) => `file-${index}`);
    const indexMap = new Map<string, number>();
    ids.forEach((id, index) => indexMap.set(id, index));

    return {
      itemIds: ids,
      idToIndexMap: indexMap,
    };
  }, [items]);

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

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) {
        return;
      }

      const oldIndex = idToIndexMap.get(active.id as string);
      const newIndex = idToIndexMap.get(over.id as string);

      if (oldIndex === undefined || newIndex === undefined) {
        return;
      }

      onReorder(oldIndex, newIndex);
    },
    [idToIndexMap, onReorder]
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
      <SortableContext items={itemIds} strategy={rectSortingStrategy}>
        <div className={cn("grid", gridCols, gap, className)}>
          {items.map((item, index) => renderItem(item, index))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
