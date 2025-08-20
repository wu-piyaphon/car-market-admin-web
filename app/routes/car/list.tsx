import { useParams, Navigate } from "react-router";
import { getCarSalesType } from "~/features/car/utils";
import CarListView from "~/features/car/views/car-list-view";

export function meta({ params }: { params: { type: string } }) {
  const carType = params.type === "owner" ? "Owner" : "Consignment";
  return [
    { title: `${carType} Car List` },
    { name: "description", content: `${carType} Car List page` },
  ];
}

export default function CarList() {
  const params = useParams();
  const { type } = params;

  // Validate the type parameter
  if (type !== "owner" && type !== "consignment") {
    return <Navigate to="/dashboard/cars/owner" replace />;
  }

  const salesType = getCarSalesType(type);

  return <CarListView salesType={salesType} />;
}
