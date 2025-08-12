import CarListOwnerView from "~/features/car/views/car-list-owner-view";

export function meta() {
  return [
    { title: "Owner Car List" },
    { name: "description", content: "Owner Car List page" },
  ];
}

export default function OwnerCarList() {
  return <CarListOwnerView />;
}
