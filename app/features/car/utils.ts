import type { Location } from "react-router";
import type { CarSalesType } from "./types/car.types";

export function getCarSalesType(location: Location): CarSalesType {
  return location.pathname.includes("owner") ? "OWNER" : "CONSIGNMENT";
}
