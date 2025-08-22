import RequestEstimateListView from "~/features/request/views/request-estimate-list-view";

export function meta() {
  return [
    { title: "Request Estimate Car List" },
    { name: "description", content: "Request Estimate Car List page" },
  ];
}

export default function RequestEstimateList() {
  return <RequestEstimateListView />;
}
