import { Edit, Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocation, useParams } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "~/components/ui/dialog";
import EmptyContent from "~/components/ui/empty-content";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";
import { cn } from "~/lib/utils";
import { fCurrency } from "~/utils/format-string";
import {
  useActivateCarMutation,
  useDeleteCarMutation,
  useDisableCarMutation,
} from "../api/car.mutations";
import { useGetCarDetail } from "../api/car.queries";
import CarDetailCarousel from "../components/car-detail-carousel";
import CarDetailSkeleton from "../components/car-detail-skeleton";
import CarHeader from "../components/car-header";
import { getCarSalesType } from "../utils";

export default function CarDetailView() {
  const { id } = useParams();
  const router = useRouter();
  const location = useLocation();

  const [dialogOpen, setDialogOpen] = useState(false);

  const salesType = getCarSalesType(location);

  const { data, isLoading } = useGetCarDetail(id);
  const { mutateAsync: activate, isPending: isActivating } =
    useActivateCarMutation();
  const { mutateAsync: disable, isPending: isDisabling } =
    useDisableCarMutation();
  const { mutateAsync: deleteCar, isPending: isDeleting } =
    useDeleteCarMutation();

  const handleBack = () => {
    if (salesType === "OWNER") {
      router.push(paths.cars.owner.list);
    } else {
      router.push(paths.cars.consignment.list);
    }
  };

  if (isLoading) {
    return <CarDetailSkeleton />;
  }

  if (!data) {
    return (
      <EmptyContent
        title="ไม่พบข้อมูลรถ"
        description="ไม่พบข้อมูลรถที่คุณต้องการ กรุณาตรวจสอบและลองใหม่อีกครั้ง"
        action={
          <Button onClick={handleBack} variant="outline">
            กลับไปหน้ารายการ
          </Button>
        }
      />
    );
  }

  const {
    id: carId,
    type,
    brand,
    model,
    subModel,
    modelYear,
    color,
    transmission,
    engineType,
    engineCapacity,
    mileage,
    previousLicensePlate,
    newLicensePlate,
    isActive,
    images,
    price,
  } = data;

  const carDetail = [
    { label: "ประเภทรถ", value: type.name },
    { label: "ยี่ห้อ", value: brand.name },
    { label: "รุ่นรถ", value: model },
    { label: "รุ่นย่อย", value: subModel },
    { label: "ปีรถ", value: modelYear },
    { label: "สีรถ", value: color },
    { label: "ระบบเกียร์", value: transmission },
    { label: "ประเภทเครื่องยนต์", value: engineType },
    { label: "ขนาดเครื่องยนต์ CC", value: engineCapacity },
    { label: "เลขไมล์", value: mileage || "-" },
  ];

  const plateDetail = [
    { label: "ทะเบียนรถเก่า", value: previousLicensePlate || "-" },
    { label: "ทะเบียนรถใหม่", value: newLicensePlate },
  ];

  const handleUpdateStatus = async () => {
    try {
      if (isActive) {
        await disable(carId);
      } else {
        await activate(carId);
      }
      toast.success("สำเร็จ", { description: "เปลี่ยนสถานะรถเรียบร้อยแล้ว" });
    } catch (error) {
      console.error("Failed to update car status:", error);
      toast.error("เกิดข้อผิดพลาด", {
        description:
          error instanceof Error ? error.message : "ไม่สามารถเปลี่ยนสถานะรถได้",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCar(carId);
      toast.success("สำเร็จ", { description: "ลบรถคันนี้เรียบร้อยแล้ว" });
      handleBack();
    } catch (error) {
      console.error("Failed to delete car:", error);
      toast.error("เกิดข้อผิดพลาด", {
        description:
          error instanceof Error ? error.message : "ไม่สามารถลบรถคันนี้ได้",
      });
    }
  };

  const handleEdit = () => {
    if (salesType === "OWNER") {
      router.push(paths.cars.owner.edit(carId));
    } else {
      router.push(paths.cars.consignment.edit(carId));
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-4.5 py-6">
      <CarHeader
        title={`${modelYear} ${brand.name} ${model}`}
        description={newLicensePlate}
        action={
          <Button
            size="lg"
            variant="outline"
            color={isActive ? "success" : "inherit"}
            className={cn(
              "ml-2 cursor-auto rounded-full text-base font-medium",
              isActive
                ? "!bg-green-200 text-green-600 hover:text-green-600"
                : "!border-gray-600 !bg-gray-200 text-gray-600 hover:text-gray-600"
            )}
          >
            <div className="shrink-0">
              <div className={cn("h-2 w-2 rounded-full bg-current")} />
            </div>
            {isActive ? "แสดง" : "ซ่อน"}
          </Button>
        }
        onClick={handleBack}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CarDetailCarousel images={images} />
        </div>

        <div className="space-y-6">
          <Card>
            {/* -- Price -- */}
            <CardHeader className="gap-0 text-center">
              <p className="text-2xl font-semibold text-blue-600">
                {fCurrency(price)} บาท
              </p>
              <p className="text-sm text-gray-500">ราคาขาย</p>
            </CardHeader>
            {/* -- Car Information -- */}
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
            {/* -- License Plate -- */}
            <CardHeader className="mt-3">
              <CardTitle>ข้อมูลทะเบียนรถ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {plateDetail.map((row, index) => (
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
                <Button size="lg" onClick={handleEdit} variant="outline">
                  <Edit size={16} />
                  แก้ไขข้อมูล
                </Button>
                <Button
                  size="lg"
                  color={isActive ? "inherit" : "success"}
                  variant="default"
                  onClick={handleUpdateStatus}
                  loading={isActivating || isDisabling}
                  disabled={isActivating || isDisabling}
                >
                  {isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                  {isActive ? "ขายรถคันนี้แล้ว" : "แสดงรถคันนี้"}
                </Button>
                <Button
                  size="lg"
                  variant="default"
                  color="error"
                  onClick={() => setDialogOpen(true)}
                >
                  <Trash2 size={16} />
                  ลบรถคันนี้
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogTitle>
            ลบรถ {modelYear} {brand.name} {model}
          </DialogTitle>
          <DialogDescription>
            ต้องการลบข้อมูลรถคันนี้? ข้อมูลรถที่ถูกลบจะไม่สามารถกู้คืนได้
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)} variant="outline">
              ยกเลิก
            </Button>
            <Button
              onClick={handleDelete}
              variant="default"
              color="error"
              loading={isDeleting}
            >
              ยืนยัน
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
