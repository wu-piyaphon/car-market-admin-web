import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomPagination from "~/components/custom/custom-pagination";
import Form from "~/components/form/form";
import RHFTextField from "~/components/form/rhf-textfield";
import { useDebounce } from "~/hooks/use-debounce";
import { usePagination } from "~/hooks/use-pagination";
import { useGetRequestsEstimate } from "../api/request.queries";
import RequestEstimateCard from "../components/request-estimate/request-estimate-card";
import RequestHeader from "../components/request-header";
import RequestListEmpty from "../components/request-list-empty";
import RequestListSkeleton from "../components/request-list-skeleton";
import RequestStatusTabs from "../components/request-status-tabs";
import {
  requestEstimateSearchSchema,
  type RequestEstimateSearch,
} from "../schemas/request-search-schema";
import type { RequestStatus } from "../types/request.types";

// ----------------------------------------------------------------------

type Props = {
  tabCounts: Record<RequestStatus, number>;
};

// ----------------------------------------------------------------------

export default function RequestEstimateListView({ tabCounts }: Props) {
  const methods = useForm<RequestEstimateSearch>({
    resolver: zodResolver(requestEstimateSearchSchema),
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

  const { data, isLoading } = useGetRequestsEstimate({
    status,
    keyword: debounceKeyword,
    page: pagination.page,
    pageSize: pagination.rowsPerPage,
  });

  const isEmpty = !isLoading && (!data || data.items.length === 0);
  const hasData = !isLoading && data && data.items.length > 0;

  // ----------------------------------------------------------------------

  const handleChangeStatus = (newStatus: RequestStatus) => {
    setValue("status", newStatus);
  };

  // ----------------------------------------------------------------------

  useEffect(() => {
    if (data) {
      pagination.setCount(data.total);
    }
  }, [data]);

  // ----------------------------------------------------------------------

  return (
    <Form methods={methods}>
      <RequestHeader
        title="คำขอประเมินราคารถ"
        description="ข้อมูลลูกค้าที่ต้องการประเมินราคารถ"
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
              {data.items.map(request => (
                <RequestEstimateCard key={request.id} request={request} />
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
