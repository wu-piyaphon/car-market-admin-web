import RequestConsignmentListView from "~/features/request/views/request-consignment-list-view";

export function meta() {
  return [
    { title: "Request Consignment Car List" },
    { name: "description", content: "Request Consignment Car List page" },
  ];
}

export default function RequestConsignmentList() {
  return <RequestConsignmentListView />;
}
