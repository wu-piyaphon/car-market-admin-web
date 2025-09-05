import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomPagination from "~/components/custom/custom-pagination";
import Form from "~/components/form/form";
import RHFTextField from "~/components/form/rhf-textfield";
import type { CarSalesType } from "~/features/car/types/car.types";
import { useDebounce } from "~/hooks/use-debounce";
import { usePagination } from "~/hooks/use-pagination";
import { useGetRequestsSelling } from "../api/request.queries";
import RequestHeader from "../components/request-header";
import RequestListEmpty from "../components/request-list-empty";
import RequestListSkeleton from "../components/request-list-skeleton";
import RequestSellingCard from "../components/request-selling/request-selling-card";
import RequestSellingDialog from "../components/request-selling/request-selling-dialog";
import RequestStatusTabs from "../components/request-status-tabs";
import {
  requestSellingSearchSchema,
  type RequestSellingSearch,
} from "../schemas/request-search-schema";
import type { RequestSellingItem } from "../types/request-selling.types";
import type { RequestStatus } from "../types/request.types";

// ----------------------------------------------------------------------

type Props = {
  salesType: CarSalesType;
  tabCounts: Record<RequestStatus, number>;
};

// ----------------------------------------------------------------------

export default function RequestSellingListView({
  salesType,
  tabCounts,
}: Props) {
  const [selected, setSelected] = useState<RequestSellingItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>();

  const methods = useForm<RequestSellingSearch>({
    resolver: zodResolver(requestSellingSearchSchema),
    defaultValues: {
      keyword: undefined,
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

  // ----------------------------------------------------------------------

  const handleChangeStatus = (newStatus: RequestStatus) => {
    setValue("status", newStatus);
  };

  const onClickContact = (request: RequestSellingItem) => {
    setSelected(request);
    setDialogOpen(true);
  };

  // ----------------------------------------------------------------------

  useEffect(() => {
    if (data) {
      pagination.setCount(data.total);
    }
  }, [data]);

  // ----------------------------------------------------------------------

  return (
    <div className="flex h-full flex-col">
      <RequestHeader
        title={salesType === "CONSIGNMENT" ? "คำขอฝากขายรถ" : "คำขอขายรถ"}
        description={
          salesType === "CONSIGNMENT"
            ? "ข้อมูลรลูกค้าที่ต้องการฝากขายรถ"
            : "ข้อมูลลูกค้าที่ต้องการขายรถ"
        }
      />

      <Form methods={methods}>
        <RHFTextField
          name="keyword"
          placeholder="ค้นหาด้วยชื่อ, นามสกุล, ชื่อเล่นหรือเบอร์โทรศัพท์"
          className="mb-2"
        />
      </Form>

      <RequestStatusTabs
        count={tabCounts}
        onChangeStatus={handleChangeStatus}
      />

      <div className="flex grow flex-col pb-10">
        {isLoading && <RequestListSkeleton />}

        {isEmpty && <RequestListEmpty />}

        {hasData && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.items.map(request => (
              <RequestSellingCard
                key={request.id}
                request={request}
                onClick={onClickContact}
              />
            ))}

            {selected && (
              <RequestSellingDialog
                detail={selected}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
              />
            )}
          </div>
        )}
      </div>

      <CustomPagination pagination={pagination} />
    </div>
  );
}
