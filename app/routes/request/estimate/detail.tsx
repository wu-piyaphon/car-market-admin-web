import RequestEstimateDetailView from "~/features/request/views/request-estimate-detail-view";

export function meta() {
  return [
    { title: "Request Estimate Car Detail" },
    { name: "description", content: "Request Estimate Car Detail page" },
  ];
}

export default function RequestEstimateDetail() {
  return <RequestEstimateDetailView />;
}
