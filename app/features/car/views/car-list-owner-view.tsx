import { CAR_LIST } from "~/_mocks/mock-car-list";
import CarListCard from "../components/car-list-card";
import CarListSearch from "../components/car-list-search";
import type { CarListSearchSchema } from "../schemas/car-list-search";

export default function CarListOwnerView() {
  const handleSearch = (data: CarListSearchSchema) => {
    console.log("Search data:", data);
    // Implement search logic here
  };

  return (
    <div>
      <h1>รายการรถแชมป์</h1>
      <CarListSearch onSearch={handleSearch} />
      {CAR_LIST.map(car => (
        <CarListCard key={car.id} {...car} />
      ))}
    </div>
  );
}
