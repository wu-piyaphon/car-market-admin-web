import { SquarePen } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import EmptyContent from "~/components/ui/empty-content";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";
import { fDate } from "~/utils/format-string";
import CarDetailCarousel from "../../car/components/car-detail-carousel";
import CarHeader from "../../car/components/car-header";
import { useGetRequestEstimateDetail } from "../api/request.queries";
import RequestEstimateDialog from "../components/request-estimate/request-estimate-dialog";

export default function RequestEstimateDetailView() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading } = useGetRequestEstimateDetail(id!);

  const [dialogOpen, setDialogOpen] = useState<boolean>();

  const handleBack = () => {
    router.push(paths.requests.estimate.list);
  };

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl p-4.5 py-6">
        <div className="animate-pulse space-y-6">
          <div className="h-16 rounded-sm bg-gray-200"></div>
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
    brand,
    model,
    modelYear,
    firstName,
    phoneNumber,
    lineId,
    images,
    installmentsInMonth,
    status,
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
    { label: "LINE ID", value: lineId || "-" },
  ];

  const requestDetail = [
    { label: "สถานะรถ", value: installmentsInMonth + " เดือน" },
    { label: "วันที่ขอประเมิน", value: fDate(createdAt) },
  ];

  const onClickAction = () => {
    setDialogOpen(true);
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
                  variant="default"
                  onClick={onClickAction}
                  color={isContacted ? "inherit" : "default"}
                >
                  {isContacted && <SquarePen className="size-4.5" />}
                  {isContacted ? "ดูบันทึก" : "ติดต่อแล้ว"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <RequestEstimateDialog
        detail={data}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
