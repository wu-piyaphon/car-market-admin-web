import RequestSellListView from "~/features/request/views/request-sell-list-view";

export function meta() {
  return [
    { title: "Request Sell Car List" },
    { name: "description", content: "Request Sell Car List page" },
  ];
}

export default function RequestSellList() {
  return <RequestSellListView />;
}
