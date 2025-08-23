import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

export default function RequestListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <div className="space-y-2" key={index}>
          <Skeleton className="h-44 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}
