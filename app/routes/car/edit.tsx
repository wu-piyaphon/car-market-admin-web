import { useParams, Navigate } from "react-router";
import { getCarSalesType } from "~/features/car/utils";
import CarCreateEditView from "~/features/car/views/car-create-edit-view";

export function meta({ params }: { params: { type: string; id: string } }) {
  const carType = params.type === "owner" ? "Owner" : "Consignment";
  return [
    { title: `${carType} Car Edit` },
    { name: "description", content: `${carType} Car Edit page` },
  ];
}

export default function CarEdit() {
  const params = useParams();
  const { type } = params;

  if (type !== "owner" && type !== "consignment") {
    return <Navigate to="/dashboard/cars/owner" replace />;
  }

  const salesType = getCarSalesType(type);

  return <CarCreateEditView salesType={salesType} />;
}
