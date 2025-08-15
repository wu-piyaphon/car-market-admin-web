import { Button } from "~/components/ui/button";
import { useGetCars } from "../api/car.queries";
import CarListCard from "../components/car-list-card";
import CarListCardSkeleton from "../components/car-list-card-skeleton";
import CarListSearch from "../components/car-list-search";
import type { CarListSearchSchema } from "../schemas/car-list-search";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";
import EmptyContent from "~/components/ui/empty-content";

export default function CarListOwnerView() {
  const router = useRouter();
  const { data, isLoading } = useGetCars();

  const isEmpty = !data || data.items.length === 0;

  const handleSearch = (data: CarListSearchSchema) => {
    console.log("Search data:", data);
    // Implement search logic here
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row justify-between">
        <h1>รายการรถแชมป์</h1>
        <Button onClick={() => router.push(paths.cars.create)}>เพิ่มรถ</Button>
      </div>
      <CarListSearch onSearch={handleSearch} />

      {isLoading && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, idx) => (
            <CarListCardSkeleton key={idx} />
          ))}
        </div>
      )}

      {isEmpty ? (
        <EmptyContent title="ไม่พบรถ" description="ไม่มีรถที่ตรงกับการค้นหา" />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map(car => (
            <CarListCard key={car.id} data={car} />
          ))}
        </div>
      )}
    </div>
  );
}
