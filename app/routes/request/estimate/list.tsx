import { useGetRequestsEstimate } from "~/features/request/api/request.queries";
import RequestEstimateListView from "~/features/request/views/request-estimate-list-view";

export function meta() {
  return [
    { title: "Request Estimate Car List" },
    { name: "description", content: "Request Estimate Car List page" },
  ];
}

export default function RequestEstimateList() {
  const { data: contactedData } = useGetRequestsEstimate({
    status: "CONTACTED",
    page: 1,
    pageSize: 16,
  });

  const { data: notContactedData } = useGetRequestsEstimate({
    status: "NOT_CONTACTED",
    page: 1,
    pageSize: 16,
  });

  const tabCounts = {
    CONTACTED: contactedData?.total ?? 0,
    NOT_CONTACTED: notContactedData?.total ?? 0,
  };

  return <RequestEstimateListView tabCounts={tabCounts} />;
}
