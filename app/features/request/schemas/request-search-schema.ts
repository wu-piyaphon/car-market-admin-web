import { z } from "zod";
import type { RequestStatus } from "../types/request.types";

export const requestSellingSearchSchema = z.object({
  keyword: z.string(),
  status: z.custom<RequestStatus>(),
});

export type RequestSellingSearch = z.infer<typeof requestSellingSearchSchema>;
