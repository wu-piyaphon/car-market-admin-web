import type { CarSalesType } from "./types/car.types";

export function getCarSalesType(type: string): CarSalesType {
  return type === "owner" ? "OWNER" : "CONSIGNMENT";
}
