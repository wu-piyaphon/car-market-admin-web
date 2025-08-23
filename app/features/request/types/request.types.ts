export enum RequestStatusEnum {
  CONTACTED = "CONTACTED",
  NOT_CONTACTED = "NOT_CONTACTED",
}

export type RequestStatus = keyof typeof RequestStatusEnum;
