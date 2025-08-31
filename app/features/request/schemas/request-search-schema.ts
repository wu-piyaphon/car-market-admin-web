import { z } from "zod";
import type { RequestStatus } from "../types/request.types";

export const requestSellingSearchSchema = z.object({
  keyword: z.string().optional(),
  status: z.custom<RequestStatus>(),
});

export type RequestSellingSearch = z.infer<typeof requestSellingSearchSchema>;

export const requestEstimateSearchSchema = z.object({
  keyword: z.string().optional(),
  status: z.custom<RequestStatus>(),
});

export type RequestEstimateSearch = z.infer<typeof requestEstimateSearchSchema>;
