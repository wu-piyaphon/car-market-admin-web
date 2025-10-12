export enum CarTransmission {
  MANUAL = "MANUAL",
  AUTOMATIC = "AUTOMATIC",
}

export const CAR_TRANSMISSION_OPTIONS = [
  { id: CarTransmission.MANUAL, name: "เกียร์ธรรมดา" },
  { id: CarTransmission.AUTOMATIC, name: "เกียร์อัตโนมัติ" },
];

export const CAR_ENGINE_TYPE_OPTIONS = [
  "ดีเซล",
  "เบนซิน",
  "ไฟฟ้า",
  "เบนซิน-ไฟฟ้า",
  "แก๊ส LPG + เบนซิน",
  "CNG สลับเบนซิน",
].map(type => ({ id: type, name: type }));

export const CAR_COLOR_OPTIONS = [
  "ขาว",
  "ขาว เขียว",
  "ขาว ดำ",
  "ขาว แดง",
  "เขียว",
  "เขียว ดำ",
  "ดำ",
  "แดง",
  "แดง ดำ",
  "เทา",
  "เทา ดำ",
  "น้ำเงิน",
  "น้ำเงิน ดำ",
  "น้ำตาล",
  "บรอนซ์",
  "ฟ้า",
  "ม่วง",
  "ส้ม",
  "ส้ม ดำ",
  "เหลือง",
  "เหลือง ดำ",
].map(color => ({ id: color, name: color }));
