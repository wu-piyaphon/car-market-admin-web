import { z } from "zod";

export const carCreateSchema = z.object({
  // Basic Information
  typeId: z.string().min(1, "กรุณาเลือกประเภทรถ"),
  brandId: z.string().min(1, "กรุณาเลือกยี่ห้อรถ"),
  categoryId: z.string().optional(),

  model: z.string().min(1, "กรุณาระบุรุ่นรถ"),
  subModel: z.string().min(1, "กรุณาระบุรุ่นย่อยรถ"),
  modelYear: z
    .number()
    .min(1900, "ปีไม่ถูกต้อง")
    .max(new Date().getFullYear() + 1, "ปีไม่ถูกต้อง"),

  // Vehicle Details
  transmission: z.string().min(1, "กรุณาเลือกระบบเกียร์"),
  color: z.string().min(1, "กรุณาระบุสีรถ"),
  engineType: z.string().min(1, "กรุณาระบุประเภทเครื่องยนต์"),
  engineCapacity: z.string().min(1, "กรุณาระบุขนาดเครื่องยนต์"),
  mileage: z.string().optional(),
  price: z.string().min(1, "กรุณาระบุราคา"),

  // License Information
  originalLicensePlate: z.string().optional(),
  currentLicensePlate: z.string().min(1, "กรุณาระบุป้ายทะเบียนปัจจุบัน"),

  // Images
  files: z
    .array(z.instanceof(File))
    .min(1, "กรุณาอัพโหลดรูปภาพอย่างน้อย 1 รูป"),
});

export type CarCreateSchema = z.infer<typeof carCreateSchema>;
