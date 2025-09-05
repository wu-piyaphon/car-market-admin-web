import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import RHFFileUpload from "~/components/form/rhf-file-upload";
import RHFTextField from "~/components/form/rhf-textfield";
import { Button } from "~/components/ui/button";

import { useEffect } from "react";
import { toast } from "sonner";
import Form from "~/components/form/form";
import RHFAutocomplete from "~/components/form/rhf-autocomplete";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";
import { formatImageUrlsToFiles } from "~/utils/format-file";
import {
  useCreateCarMutation,
  useUpdateCarMutation,
} from "../api/car.mutations";
import {
  useGetBrands,
  useGetCategories,
  useGetTypes,
} from "../api/car.queries";
import { CarFormRow } from "../components/car-form";
import CarHeader from "../components/car-header";
import {
  CAR_COLOR_OPTIONS,
  CAR_ENGINE_TYPE_OPTIONS,
  CAR_TRANSMISSION_OPTIONS,
} from "../constants/car-options";
import { carCreateSchema, type CarCreateSchema } from "../schemas/car-create";
import type { Car, CarSalesType } from "../types/car.types";
import { fCapitalize } from "~/utils/format-string";
import { ApiError } from "~/lib/api/types/axios.types";
import { log } from "~/utils/log";

type Props = {
  carData?: Car;
  salesType: CarSalesType;
};

export default function CarCreateEditView({ carData, salesType }: Props) {
  const router = useRouter();
  const isEditMode = carData !== undefined;

  const { mutateAsync: createCar } = useCreateCarMutation();
  const { mutateAsync: updateCar } = useUpdateCarMutation();

  const { data: brands = [] } = useGetBrands();
  const { data: categories = [] } = useGetCategories();
  const { data: types = [] } = useGetTypes();

  const categoryOptions = [
    { id: "", name: "ทั่วไป" },
    ...categories.map(item => ({ id: item.id, name: fCapitalize(item.name) })),
  ];

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
      newLicensePlate: "",
      files: [],
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onClickBack = () => {
    if (salesType === "OWNER") {
      router.push(paths.cars.owner.list);
    } else {
      router.push(paths.cars.consignment.list);
    }
  };

  const onSubmit = async (data: CarCreateSchema) => {
    try {
      const formData = new FormData();
      formData.append("typeId", data.typeId);
      formData.append("brandId", data.brandId);
      if (data.categoryId) {
        formData.append("categoryId", data.categoryId);
      }
      formData.append("model", data.model);
      formData.append("subModel", data.subModel);
      formData.append("modelYear", data.modelYear.toString());
      formData.append("transmission", data.transmission);
      formData.append("color", data.color);
      formData.append("engineType", data.engineType);
      formData.append("engineCapacity", data.engineCapacity.toString());
      if (data.mileage) {
        formData.append("mileage", data.mileage);
      }
      formData.append("price", data.price);
      if (data.previousLicensePlate) {
        formData.append("previousLicensePlate", data.previousLicensePlate);
      }
      formData.append("newLicensePlate", data.newLicensePlate);
      data.files.forEach(file => {
        formData.append("files", file);
      });
      formData.append("salesType", salesType);

      if (isEditMode) {
        await updateCar({ id: carData.id, payload: formData });
      } else {
        await createCar(formData);
        reset();
      }

      toast.success("สำเร็จ", {
        description: isEditMode
          ? "แก้ไขข้อมูลรถเรียบร้อยแล้ว"
          : "เพิ่มรถใหม่เรียบร้อยแล้ว",
      });
    } catch (error) {
      log.error(error);
      toast.error("เกิดข้อผิดพลาด", {
        description:
          error instanceof ApiError ? error.message : "ไม่สามารถเพิ่มรถใหม่ได้",
      });
    }
  };

  useEffect(() => {
    if (isEditMode) {
      // Convert image URLs to File objects for edit mode
      const loadFormImages = async () => {
        const files = await formatImageUrlsToFiles(carData.images);

        reset({
          typeId: carData.type.id,
          brandId: carData.brand.id,
          categoryId: carData.category?.id,
          model: carData.model,
          subModel: carData.subModel,
          modelYear: carData.modelYear,
          transmission: carData.transmission,
          color: carData.color,
          engineType: carData.engineType,
          engineCapacity: carData.engineCapacity,
          mileage: carData.mileage?.toString() || "",
          price: carData.price.toString(),
          previousLicensePlate: carData.previousLicensePlate || "",
          newLicensePlate: carData.newLicensePlate || "",
          files: files,
        });
      };

      loadFormImages();
    }
  }, [isEditMode, carData, reset]);

  return (
    <>
      <CarHeader
        title={isEditMode ? "แก้ไขข้อมูลรถ" : "เพิ่มรถใหม่"}
        description={
          isEditMode
            ? "กรอกข้อมูลของรถที่คุณต้องการแก้ไข"
            : "กรอกข้อมูลของรถที่คุณต้องการเพิ่ม"
        }
        onClick={onClickBack}
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
                    options={types}
                  />
                  <RHFAutocomplete
                    name="brandId"
                    label="ยี่ห้อ"
                    options={brands}
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
                    label="เลขไมล์ (ถ้ามี)"
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
                    label="ทะเบียนรถเก่า (ถ้ามี)"
                    placeholder="เช่น กก 1234"
                  />
                  <RHFTextField
                    name="newLicensePlate"
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
                  name="files"
                  maxFiles={16}
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
                <RHFAutocomplete name="categoryId" options={categoryOptions} />
              </CardContent>
            </Card>

            {/* -- Action -- */}
            <Card>
              <CardHeader>
                <CardTitle>ยืนยัน</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Button size="lg" type="submit" loading={isSubmitting}>
                  {isEditMode ? "บันทึก" : "เพิ่มรถ"}
                </Button>
                <Button
                  size="lg"
                  type="button"
                  variant="outline"
                  onClick={onClickBack}
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
