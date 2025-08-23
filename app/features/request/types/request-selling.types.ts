import type { Pagination } from "~/types/common";
import type { RequestStatus } from "./request.types";

export enum RequestSalesTypeEnum {
  CONSIGNMENT = "CONSIGNMENT",
  OWNER = "OWNER",
}

export type RequestSalesType = keyof typeof RequestSalesTypeEnum;

export type RequestSellingItem = {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  phoneNumber: string;
  note: string | null;
  type: RequestSalesType;
  status: RequestStatus;
  createdAt: string;
};

export type RequestSellingList = Pagination<RequestSellingItem>;
export type RequestSellingListQuery = {
  keyword?: string;
  type: RequestSalesType;
  status: RequestStatus;
  page: number;
  pageSize: number;
};
