import CarListView from "~/features/car/views/car-list-view";

export function meta() {
  return [
    { title: "Consignment Car List" },
    { name: "description", content: "Consignment Car List page" },
  ];
}

export default function CarList() {
  return <CarListView />;
}
