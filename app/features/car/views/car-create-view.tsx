import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import RHFFileUpload from "~/components/form/rhf-file-upload";
import RHFTextField from "~/components/form/rhf-textfield";
import { Button } from "~/components/ui/button";

import { CAR_BRANDS, CAR_TYPES } from "~/_mocks/mock-car-options";
import Form from "~/components/form/form";
import RHFAutocomplete from "~/components/form/rhf-autocomplete";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";
import { CarFormRow } from "../components/car-form";
import CarHeader from "../components/car-header";
import {
  CAR_COLOR_OPTIONS,
  CAR_ENGINE_TYPE_OPTIONS,
  CAR_TRANSMISSION_OPTIONS,
} from "../constants/car-options";
import { carCreateSchema, type CarCreateSchema } from "../schemas/car-create";

export default function CarCreateView() {
  const router = useRouter();

  const methods = useForm<CarCreateSchema>({
    resolver: zodResolver(carCreateSchema),
    defaultValues: {
      typeId: "",
      brandId: "",
      categoryId: "",
      model: "",
      subModel: "",
      modelYear: new Date().getFullYear(),
      transmission: "",
      color: "",
      engineType: "",
      engineCapacity: 0,
      mileage: "",
      price: "",
      previousLicensePlate: "",
      currentLicensePlate: "",
      files: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: CarCreateSchema) => {
    try {
      console.log("Form Data:", data);
      // TODO: Implement API call to create car
      alert("ข้อมูลถูกบันทึกแล้ว (ดูใน Console)");
    } catch (error) {
      console.error("Error creating car:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  return (
    <>
      <CarHeader
        title="เพิ่มรถใหม่"
        description="กรอกข้อมูลของรถที่คุณต้องการเพิ่ม"
        onClick={() => {
          router.push(paths.cars.list.owner);
        }}
      />

      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* -- Left Column -- */}
          <div className="flex flex-col gap-3 md:col-span-3">
            {/* -- Car Information -- */}
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลรถ</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <CarFormRow>
                  <RHFAutocomplete
                    name="typeId"
                    label="ประเภทรถ"
                    options={CAR_TYPES}
                  />
                  <RHFAutocomplete
                    name="brandId"
                    label="ยี่ห้อ"
                    options={CAR_BRANDS}
                  />
                </CarFormRow>

                <CarFormRow>
                  <RHFTextField
                    name="model"
                    label="รุ่นรถ"
                    placeholder="เช่น Vios, City, Almera"
                  />
                  <RHFTextField
                    name="subModel"
                    label="รุ่นย่อย"
                    placeholder="เช่น 1.5 G, RS"
                  />
                </CarFormRow>

                <CarFormRow>
                  <RHFTextField
                    name="modelYear"
                    label="ปี"
                    type="number"
                    min={1900}
                    max={new Date().getFullYear() + 1}
                  />
                  <RHFAutocomplete
                    name="color"
                    label="สีรถ"
                    options={CAR_COLOR_OPTIONS}
                  />
                </CarFormRow>

                <CarFormRow>
                  <RHFAutocomplete
                    name="transmission"
                    label="ระบบเกียร์"
                    options={CAR_TRANSMISSION_OPTIONS}
                  />
                  <RHFAutocomplete
                    name="engineType"
                    label="ประเภทเครื่องยนต์"
                    options={CAR_ENGINE_TYPE_OPTIONS}
                  />
                </CarFormRow>

                <CarFormRow>
                  <RHFTextField
                    name="engineCapacity"
                    label="ขนาดเครื่องยนต์ (CC)"
                    placeholder="เช่น 500"
                    type="number"
                  />
                  <RHFTextField
                    name="mileage"
                    label="เลขไมล์ (ไม่จำเป็น)"
                    placeholder="เช่น 10,000"
                    thousandSeparator
                  />
                </CarFormRow>

                <CarFormRow>
                  <RHFTextField
                    name="price"
                    label="ราคา (บาท)"
                    placeholder="เช่น 100,000"
                    thousandSeparator
                  />
                </CarFormRow>
              </CardContent>
            </Card>

            {/* -- License Plate Information -- */}
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลทะเบียนรถ</CardTitle>
              </CardHeader>
              <CardContent>
                <CarFormRow>
                  <RHFTextField
                    name="previousLicensePlate"
                    label="ทะเบียนรถเก่า"
                    placeholder="เช่น กก 1234"
                  />
                  <RHFTextField
                    name="currentLicensePlate"
                    label="ทะเบียนรถใหม่"
                    placeholder="เช่น ขค 1234"
                  />
                </CarFormRow>
              </CardContent>
            </Card>
          </div>

          {/* -- Right Column -- */}
          <div className="flex flex-col gap-3 md:col-span-2">
            {/* -- Image Upload -- */}
            <Card>
              <CardHeader>
                <CardTitle>รูปภาพ</CardTitle>
              </CardHeader>
              <CardContent>
                <RHFFileUpload
                  name="images"
                  maxFiles={10}
                  maxSize={5 * 1024 * 1024}
                />
              </CardContent>
            </Card>

            {/* -- Status -- */}
            <Card>
              <CardHeader>
                <CardTitle>สถานะเข้าใหม่</CardTitle>
              </CardHeader>
              <CardContent>
                <RHFAutocomplete name="status" options={[]} />
              </CardContent>
            </Card>

            {/* -- Action -- */}
            <Card>
              <CardHeader>
                <CardTitle>ยืนยัน</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Button size="lg" type="submit" loading={isSubmitting}>
                  เพิ่มรถ
                </Button>
                <Button
                  size="lg"
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                >
                  ยกเลิก
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Form>
    </>
  );
}
