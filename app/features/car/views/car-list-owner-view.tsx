import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import EmptyContent from "~/components/ui/empty-content";
import { useDebounce } from "~/hooks/use-debounce";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";
import { useGetCars } from "../api/car.queries";
import CarListCard from "../components/car-list-card";
import CarListCardSkeleton from "../components/car-list-card-skeleton";
import CarListSearch from "../components/car-list-search";
import {
  carListSearchSchema,
  type CarListSearchSchema,
} from "../schemas/car-list-search";

export default function CarListOwnerView() {
  const router = useRouter();

  const searchMethods = useForm<CarListSearchSchema>({
    resolver: zodResolver(carListSearchSchema),
    defaultValues: {
      keyword: "",
    },
  });
  const { watch } = searchMethods;
  const keyword = watch("keyword");
  const debounce = useDebounce(keyword, 500);

  const { data, isFetching } = useGetCars({ keyword: debounce });

  const isEmpty = !isFetching && (!data || data.items.length === 0);
  const hasData = !isFetching && data && data.items.length > 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row items-center justify-between">
        <h1>รายการรถแชมป์</h1>
        <Button
          onClick={() => router.push(paths.cars.create)}
          className="block w-24 md:hidden"
        >
          เพิ่มรถ
        </Button>
      </div>
      <CarListSearch methods={searchMethods} />

      {isFetching && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, idx) => (
            <CarListCardSkeleton key={idx} />
          ))}
        </div>
      )}

      {isEmpty && (
        <EmptyContent title="ไม่พบรถ" description="ไม่มีรถที่ตรงกับการค้นหา" />
      )}

      {hasData && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map(car => (
            <CarListCard key={car.id} data={car} />
          ))}
        </div>
      )}
    </div>
  );
}
