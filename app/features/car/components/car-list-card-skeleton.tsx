import { Skeleton } from "~/components/ui/skeleton";

export default function CarListCardSkeleton() {
  return (
    <div className="bg-background relative flex h-full w-full flex-col rounded-md shadow-lg">
      <div className="relative">
        <Skeleton className="h-[120px] w-full rounded-t-md md:h-[220px]" />
      </div>
      <div className="flex h-full flex-col gap-3 px-5 py-4">
        <div className="flex flex-row items-center justify-between">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
        <Skeleton className="h-6 w-1/2" />
        <div className="flex gap-2 text-sm text-wrap">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="my-3 h-[1px] w-full" />
        <div className="flex flex-col gap-2 md:flex-row">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  );
}
