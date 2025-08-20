import { useParams, Navigate } from "react-router";
import { getCarSalesType } from "~/features/car/utils";
import CarDetailView from "~/features/car/views/car-detail-view";

export function meta({ params }: { params: { type: string; id: string } }) {
  const carType = params.type === "owner" ? "Owner" : "Consignment";
  return [
    { title: `${carType} Car Detail` },
    { name: "description", content: `${carType} Car Detail page` },
  ];
}

export default function CarDetail() {
  const params = useParams();
  const { type } = params;

  // Validate the type parameter
  if (type !== "owner" && type !== "consignment") {
    return <Navigate to="/dashboard/cars/owner" replace />;
  }

  const salesType = getCarSalesType(type);

  return <CarDetailView salesType={salesType} />;
}
