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
import type { CarSalesType } from "../types/car.types";
import CustomPagination from "~/components/custom/custom-pagination";
import { usePagination } from "~/hooks/use-pagination";
import { useEffect } from "react";

type Props = {
  salesType: CarSalesType;
};

export default function CarListView({ salesType }: Props) {
  const router = useRouter();

  const pagination = usePagination({
    rowsPerPage: 9,
  });

  const searchMethods = useForm<CarListSearchSchema>({
    resolver: zodResolver(carListSearchSchema),
    defaultValues: {
      keyword: "",
    },
  });
  const { watch } = searchMethods;
  const keyword = watch("keyword");
  const debounce = useDebounce(keyword, 500);

  const { data, isLoading } = useGetCars({ keyword: debounce, salesType });

  const isEmpty = !isLoading && (!data || data.items.length === 0);
  const hasData = !isLoading && data && data.items.length > 0;

  // ----------------------------------------------------------------------

  const onClickAdd = () => {
    if (salesType === "OWNER") {
      router.push(paths.cars.owner.create);
    } else {
      router.push(paths.cars.consignment.create);
    }
  };

  // ----------------------------------------------------------------------

  useEffect(() => {
    if (data) {
      pagination.setCount(data.total);
    }
  }, [data]);

  // ----------------------------------------------------------------------

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row items-center justify-between">
        <h1>รายการรถแชมป์</h1>
        <Button onClick={onClickAdd} className="block w-24 md:hidden">
          เพิ่มรถ
        </Button>
      </div>
      <CarListSearch methods={searchMethods} onClickAdd={onClickAdd} />

      {isLoading && (
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
            <CarListCard key={car.id} data={car} salesType={salesType} />
          ))}
        </div>
      )}

      <CustomPagination
        pagination={pagination}
        className="mt-8 flex justify-center"
      />
    </div>
  );
}
