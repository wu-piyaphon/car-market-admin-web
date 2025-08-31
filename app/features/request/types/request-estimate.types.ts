import type { Pagination } from "~/types/common";
import type { RequestStatus } from "./request.types";

export type RequestEstimateItem = {
  id: string;
  firstName: string;
  phoneNumber: string;
  brand: string;
  model: string;
  modelYear: number;
  thumbnail: string;
  note: string | null;
  status: RequestStatus;
  createdAt: string;
};

export type RequestEstimateList = Pagination<RequestEstimateItem>;
export type RequestEstimateListQuery = {
  keyword?: string;
  status: RequestStatus;
  page: number;
  pageSize: number;
};

export type RequestEstimateDetail = {
  id: string;
  model: string;
  modelYear: number;
  firstName: string;
  phoneNumber: string;
  lineId: string | null;
  images: string[];
  note: string | null;
  installmentsInMonth: number;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  brand: {
    id: string;
    image: string;
    name: string;
  };
};

// ----------------------------------------------------------------------

export type RequestEstimateUpdate = {
  note: string | null;
  status: RequestStatus;
};
