import type { Pagination } from "~/types/common";
import type { RequestStatus } from "./request.types";
import type { CarSalesType } from "~/features/car/types/car.types";

export type RequestSellingItem = {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  phoneNumber: string;
  note: string | null;
  type: CarSalesType;
  status: RequestStatus;
  createdAt: string;
};

export type RequestSellingList = Pagination<RequestSellingItem>;
export type RequestSellingListQuery = {
  keyword?: string;
  type: CarSalesType;
  status: RequestStatus;
  page: number;
  pageSize: number;
};

// ----------------------------------------------------------------------

export type RequestSellingUpdate = {
  note: string | null;
  status: RequestStatus;
};
