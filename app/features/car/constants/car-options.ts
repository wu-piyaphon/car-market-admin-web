export enum CarEngineType {
  DIESEL = "DIESEL",
  ELECTRIC = "ELECTRIC",
  HYBRID = "HYBRID",
  GASOLINE = "GASOLINE",
  LPG = "LPG",
  CNG = "CNG",
}

export enum CarTransmission {
  MANUAL = "MANUAL",
  AUTOMATIC = "AUTOMATIC",
}

export const CAR_ENGINE_TYPE_OPTIONS = [
  { id: CarEngineType.DIESEL, name: "ดีเซล" },
  { id: CarEngineType.GASOLINE, name: "เบนซิน" },
  { id: CarEngineType.ELECTRIC, name: "ไฟฟ้า" },
  { id: CarEngineType.HYBRID, name: "ไฮบริด" },
  { id: CarEngineType.LPG, name: "LPG" },
  { id: CarEngineType.CNG, name: "CNG" },
];

export const CAR_TRANSMISSION_OPTIONS = [
  { id: CarTransmission.MANUAL, name: "เกียร์ธรรมดา" },
  { id: CarTransmission.AUTOMATIC, name: "เกียร์อัตโนมัติ" },
];

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
