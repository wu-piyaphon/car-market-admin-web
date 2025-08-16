import CarListView from "~/features/car/views/car-list-view";

export function meta() {
  return [
    { title: "Owner Car List" },
    { name: "description", content: "Owner Car List page" },
  ];
}

export default function CarList() {
  return <CarListView />;
}
