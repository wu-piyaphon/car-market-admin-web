import { Edit, MessageCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router";
import { CAR_LIST } from "~/_mocks/mock-car-list";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";
import { fCurrency } from "~/utils/format-string";
import CarDetailCarousel from "../components/car-detail-carousel";
import CarHeader from "../components/car-header";
import { getCarSalesType } from "../utils";

const MOCK_CAR = CAR_LIST[0];

export default function CarDetailView() {
  const router = useRouter();
  const location = useLocation();

  const [isActive] = useState(MOCK_CAR.isActive);

  const salesType = getCarSalesType(location);

  const handleBack = () => {
    if (salesType === "OWNER") {
      router.push(paths.cars.owner.list);
    } else {
      router.push(paths.cars.consignment.list);
    }
  };

  const handleEdit = () => {
    if (salesType === "OWNER") {
      router.push(paths.cars.owner.edit(MOCK_CAR.id));
    } else {
      router.push(paths.cars.consignment.edit(MOCK_CAR.id));
    }
  };

  const handleToggleStatus = () => {
    // Handle contact functionality
    console.log("Contact owner/dealer");
  };

  const handleDelete = () => {
    // Handle delete functionality
    console.log("Delete car");
  };

  const carDetailRows = [
    { label: "ประเภทรถ", value: MOCK_CAR.type.name },
    { label: "ยี่ห้อ", value: MOCK_CAR.brand.name },
    { label: "รุ่นรถ", value: MOCK_CAR.model },
    { label: "รุ่นย่อย", value: MOCK_CAR.subModel },
    { label: "ปีรถ", value: MOCK_CAR.modelYear },
    { label: "สีรถ", value: MOCK_CAR.color },
    { label: "ระบบเกียร์", value: MOCK_CAR.transmission },
    { label: "ประเภทเครื่องยนต์", value: MOCK_CAR.engineType },
    { label: "ขนาดเครื่องยนต์ CC", value: MOCK_CAR.engineCapacity },
    { label: "เลขไมล์", value: MOCK_CAR.mileage },
  ];

  const ownerDetailRows = [
    { label: "ทะเบียนรถเก่า", value: MOCK_CAR.previousLicensePlate },
    { label: "ทะเบียนรถใหม่", value: MOCK_CAR.newLicensePlate },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl p-4.5 py-6">
      <CarHeader
        title={`${MOCK_CAR.modelYear} ${MOCK_CAR.brand.name} ${MOCK_CAR.model}`}
        description={MOCK_CAR.newLicensePlate}
        action={
          <Button size="lg" variant="outline" className="rounded-full">
            {isActive ? "แสดง" : "ซ่อน"}
          </Button>
        }
        onClick={handleBack}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CarDetailCarousel images={MOCK_CAR.images} />
        </div>

        <div className="space-y-6">
          <Card>
            {/* -- Price -- */}
            <CardHeader className="gap-0 text-center">
              <p className="text-2xl font-semibold text-blue-600">
                {fCurrency(MOCK_CAR.price)} บาท
              </p>
              <p className="text-sm text-gray-500">ราคาขาย</p>
            </CardHeader>
            {/* -- Car Information -- */}
            <CardHeader>
              <CardTitle>ข้อมูลรถ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {carDetailRows.map((row, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm text-gray-600">{row.label}</span>
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
                {ownerDetailRows.map((row, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm text-gray-600">{row.label}</span>
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
                  onClick={handleToggleStatus}
                  variant="default"
                >
                  <MessageCircle size={16} />
                  {isActive ? "ขายรถคันนี้แล้ว" : "แสดงรถคันนี้"}
                </Button>
                <Button size="lg" onClick={handleDelete} variant="destructive">
                  <Trash2 size={16} />
                  ลบรถคันนี้
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
