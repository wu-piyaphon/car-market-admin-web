import CarCreateView from "~/features/car/views/car-create-view";

export function meta() {
  return [
    { title: "Car Create" },
    { name: "description", content: "Car Create page" },
  ];
}

export default function CarCreate() {
  return <CarCreateView />;
}
