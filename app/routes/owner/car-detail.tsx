import CarDetailView from "~/features/car/views/car-detail-view";

export function meta() {
  return [
    { title: "Car Detail" },
    { name: "description", content: "Car Detail page" },
  ];
}

export default function CarDetail() {
  return <CarDetailView />;
}
