import React from "react";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { RequestStatusEnum, type RequestStatus } from "../types/request.types";

type Props = {
  count: Record<RequestStatus, number>;
  onChangeStatus: (status: RequestStatus) => void;
};

export default function RequestStatusTabs({ count, onChangeStatus }: Props) {
  return (
    <Tabs defaultValue={RequestStatusEnum.NOT_CONTACTED} className="mb-4">
      <TabsList className="rounded-full">
        <TabsTrigger
          value={RequestStatusEnum.NOT_CONTACTED}
          className="w-[6rem] rounded-full"
          onClick={() => onChangeStatus(RequestStatusEnum.NOT_CONTACTED)}
        >
          ใหม่ ({count[RequestStatusEnum.NOT_CONTACTED]})
        </TabsTrigger>
        <TabsTrigger
          value={RequestStatusEnum.CONTACTED}
          className="w-[10rem] rounded-full"
          onClick={() => onChangeStatus(RequestStatusEnum.CONTACTED)}
        >
          ติดต่อแล้ว ({count[RequestStatusEnum.CONTACTED]})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
