import { Navigate, useParams } from "react-router";
import { useGetCarDetail } from "~/features/car/api/car.queries";
import CarEditSkeleton from "~/features/car/components/car-edit-skeleton";
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
  const { type, id } = params;

  if (type !== "owner" && type !== "consignment") {
    return <Navigate to="/dashboard/cars/owner" replace />;
  }

  const salesType = getCarSalesType(type);

  const { data, isLoading } = useGetCarDetail(id);

  if (isLoading) {
    return <CarEditSkeleton />;
  }

  return <CarCreateEditView carData={data} salesType={salesType} />;
}
