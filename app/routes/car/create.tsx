import { useParams, Navigate } from "react-router";
import { getCarSalesType } from "~/features/car/utils";
import CarCreateEditView from "~/features/car/views/car-create-edit-view";

export function meta({ params }: { params: { type: string } }) {
  const carType = params.type === "owner" ? "Owner" : "Consignment";
  return [
    { title: `${carType} Car Create` },
    { name: "description", content: `${carType} Car Create page` },
  ];
}

export default function CarCreate() {
  const params = useParams();
  const { type } = params;

  if (type !== "owner" && type !== "consignment") {
    return <Navigate to="/dashboard/cars/owner" replace />;
  }

  const salesType = getCarSalesType(type);

  return <CarCreateEditView salesType={salesType} />;
}
