import { Eye, EyeOff } from "lucide-react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import EmptyContent from "~/components/ui/empty-content";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";
import { fDate } from "~/utils/format-string";
import CarDetailCarousel from "../../car/components/car-detail-carousel";
import CarHeader from "../../car/components/car-header";
import { useUpdateRequestEstimateMutation } from "../api/request.mutation";
import { useGetRequestEstimateDetail } from "../api/request.queries";

export default function RequestEstimateDetailView() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading } = useGetRequestEstimateDetail(id!);
  const { mutateAsync: updateRequest, isPending: isUpdating } =
    useUpdateRequestEstimateMutation();

  const handleBack = () => {
    router.push(paths.requests.estimate.list);
  };

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl p-4.5 py-6">
        <div className="animate-pulse space-y-6">
          <div className="h-16 rounded bg-gray-200"></div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="h-96 rounded-lg bg-gray-200"></div>
            </div>
            <div className="space-y-6">
              <div className="h-64 rounded-lg bg-gray-200"></div>
              <div className="h-48 rounded-lg bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <EmptyContent
        title="ไม่พบข้อมูลคำขอประเมิน"
        description="ไม่พบข้อมูลคำขอประเมินที่คุณต้องการ กรุณาตรวจสอบและลองใหม่อีกครั้ง"
        action={
          <Button onClick={handleBack} variant="outline">
            กลับไปหน้ารายการ
          </Button>
        }
      />
    );
  }

  const {
    id: requestId,
    brand,
    model,
    modelYear,
    firstName,
    phoneNumber,
    lineId,
    images,
    installmentsInMonth,
    status,
    note,
    createdAt,
  } = data;

  const isContacted = status === "CONTACTED";

  const carDetail = [
    { label: "ยี่ห้อ", value: brand.name },
    { label: "รุ่นรถ", value: model },
    { label: "ปีรถ", value: modelYear },
  ];

  const customerDetail = [
    { label: "ชื่อ", value: firstName },
    { label: "เบอร์โทรศัพท์", value: phoneNumber },
    { label: "LINE ID", value: lineId },
  ];

  const requestDetail = [
    { label: "สถานะรถ", value: installmentsInMonth + " เดือน" },
    { label: "วันที่ขอประเมิน", value: fDate(createdAt) },
  ];

  const handleUpdateStatus = async () => {
    try {
      await updateRequest({
        id: requestId,
        payload: {
          note: note || "",
          status: isContacted ? "NOT_CONTACTED" : "CONTACTED",
        },
      });
      toast.success("สำเร็จ", {
        description: isContacted
          ? "เปลี่ยนสถานะเป็นยังไม่ได้ติดต่อเรียบร้อยแล้ว"
          : "บันทึกการติดต่อลูกค้าเรียบร้อยแล้ว",
      });
    } catch (error) {
      console.error("Failed to update request status:", error);
      toast.error("เกิดข้อผิดพลาด", {
        description:
          error instanceof Error ? error.message : "ไม่สามารถเปลี่ยนสถานะได้",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-4.5 py-6">
      <CarHeader
        title="คำขอประเมินราคารถ"
        description="ข้อมูลประเมินราคารถ"
        onClick={handleBack}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CarDetailCarousel images={images} />
        </div>

        <div className="space-y-6">
          <Card>
            {/* -- Car Information -- */}
            <CardHeader className="gap-0 pb-3 text-center">
              <CardTitle className="text-lg font-semibold text-blue-600">
                ข้อมูลประเมินการประเมิน
              </CardTitle>
            </CardHeader>
            <CardHeader>
              <CardTitle>ข้อมูลรถ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {carDetail.map((row, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm text-gray-500">{row.label}</span>
                    <span className="text-sm font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* -- Customer Information -- */}
            <CardHeader className="mt-3">
              <CardTitle>ข้อมูลผู้ติดต่อ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {customerDetail.map((row, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm text-gray-500">{row.label}</span>
                    <span className="text-sm font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* -- Request Information -- */}
            <CardHeader className="mt-3">
              <CardTitle>ข้อมูลคำขอ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {requestDetail.map((row, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm text-gray-500">{row.label}</span>
                    <span className="text-sm font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>จัดการข้อมูล</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  color={isContacted ? "inherit" : "success"}
                  variant="default"
                  onClick={handleUpdateStatus}
                  loading={isUpdating}
                  disabled={isUpdating}
                >
                  {isContacted ? <EyeOff size={16} /> : <Eye size={16} />}
                  {isContacted ? "ยังไม่ได้ติดต่อ" : "ติดต่อ"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
