import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomPagination from "~/components/custom/custom-pagination";
import Form from "~/components/form/form";
import RHFTextField from "~/components/form/rhf-textfield";
import { useDebounce } from "~/hooks/use-debounce";
import { usePagination } from "~/hooks/use-pagination";
import { useGetRequestsSelling } from "../api/request.queries";
import RequestSellingCard from "../components/request-selling/request-selling-card";
import RequestHeader from "../components/request-header";
import RequestListEmpty from "../components/request-list-empty";
import RequestListSkeleton from "../components/request-list-skeleton";
import RequestStatusTabs from "../components/request-status-tabs";
import {
  requestSellingSearchSchema,
  type RequestSellingSearch,
} from "../schemas/request-search-schema";
import type { RequestStatus } from "../types/request.types";
import type { CarSalesType } from "~/features/car/types/car.types";

type Props = {
  salesType: CarSalesType;
  tabCounts: Record<RequestStatus, number>;
};

export default function RequestSellingListView({
  salesType,
  tabCounts,
}: Props) {
  const methods = useForm<RequestSellingSearch>({
    resolver: zodResolver(requestSellingSearchSchema),
    defaultValues: {
      keyword: "",
      status: "NOT_CONTACTED",
    },
  });

  const { watch, setValue } = methods;
  const { keyword, status } = watch();

  const debounceKeyword = useDebounce(keyword, 300);
  const pagination = usePagination({
    rowsPerPage: 16,
  });

  const { data, isLoading } = useGetRequestsSelling({
    status,
    keyword: debounceKeyword,
    type: salesType,
    page: pagination.page,
    pageSize: pagination.rowsPerPage,
  });

  const isEmpty = !isLoading && (!data || data.items.length === 0);
  const hasData = !isLoading && data && data.items.length > 0;

  const requests = data?.items || [];

  const handleChangeStatus = (newStatus: RequestStatus) => {
    setValue("status", newStatus);
  };

  // ----------------------------------------------------------------------

  useEffect(() => {
    if (data) {
      console.log("set count");
      pagination.setCount(data.total);
    }
  }, [data]);

  // ----------------------------------------------------------------------

  return (
    <Form methods={methods}>
      <RequestHeader
        title={salesType === "CONSIGNMENT" ? "คำขอฝากขายรถ" : "คำขอขายรถ"}
        description={
          salesType === "CONSIGNMENT"
            ? "ข้อมูลรลูกค้าที่ต้องการฝากขายรถ"
            : "ข้อมูลลูกค้าที่ต้องการขายรถ"
        }
      />

      <RHFTextField
        name="keyword"
        placeholder="ค้นหาด้วยชื่อ, นามสกุล, ชื่อเล่นหรือเบอร์โทรศัพท์"
        className="mb-2"
      />

      <RequestStatusTabs
        count={tabCounts}
        onChangeStatus={handleChangeStatus}
      />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-[750px] flex-1">
          {isLoading && <RequestListSkeleton />}

          {isEmpty && <RequestListEmpty />}

          {hasData && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {requests.map(request => (
                <RequestSellingCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </div>

        <CustomPagination
          pagination={pagination}
          className="mt-8 flex justify-center"
        />
      </div>
    </Form>
  );
}
