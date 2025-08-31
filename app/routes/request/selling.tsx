import { Navigate, useParams } from "react-router";
import { getCarSalesType } from "~/features/car/utils";
import { useGetRequestsSelling } from "~/features/request/api/request.queries";
import RequestSellingListView from "~/features/request/views/request-selling-list-view";
import { paths } from "~/lib/paths";

export function meta({
  params,
}: {
  params: { type: "owner" | "consignment" };
}) {
  const salesType = params.type === "owner" ? "Owner" : "Consignment";
  return [
    { title: `${salesType} Selling List` },
    { name: "description", content: `${salesType} Selling List page` },
  ];
}

export default function RequestSellingList() {
  const params = useParams();
  const { type } = params;

  // Validate the type parameter
  if (type !== "owner" && type !== "consignment") {
    return <Navigate to={paths.requests.selling.consignment} replace />;
  }

  const salesType = getCarSalesType(type);

  const { data: contactedData } = useGetRequestsSelling({
    type: salesType,
    status: "CONTACTED",
    page: 1,
    pageSize: 16,
  });

  const { data: notContactedData } = useGetRequestsSelling({
    type: salesType,
    status: "NOT_CONTACTED",
    page: 1,
    pageSize: 16,
  });

  const tabCounts = {
    CONTACTED: contactedData?.total ?? 0,
    NOT_CONTACTED: notContactedData?.total ?? 0,
  };

  return (
    <RequestSellingListView
      key={salesType}
      salesType={salesType}
      tabCounts={tabCounts}
    />
  );
}
