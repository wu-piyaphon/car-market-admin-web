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
  { id: CarEngineType.ELECTRIC, name: "ไฟฟ้า" },
  { id: CarEngineType.HYBRID, name: "ไฮบริด" },
  { id: CarEngineType.GASOLINE, name: "แก๊สโซลีน" },
  { id: CarEngineType.LPG, name: "แก๊ส LPG" },
  { id: CarEngineType.CNG, name: "แก๊ส CNG" },
];

export const CAR_TRANSMISSION_OPTIONS = [
  { id: CarTransmission.MANUAL, name: "เกียร์ธรรมดา" },
  { id: CarTransmission.AUTOMATIC, name: "เกียร์อัตโนมัติ" },
];

export const CAR_COLOR_OPTIONS = [
  { id: "WHITE", name: "ขาว" },
  { id: "BLACK", name: "ดำ" },
  { id: "GRAY", name: "เทา" },
  { id: "SILVER", name: "เงิน" },
  { id: "BROWN", name: "น้ำตาล" },
  { id: "RED", name: "แดง" },
  { id: "DARK_BLUE", name: "น้ำเงิน" },
  { id: "GOLD", name: "ทอง" },
  { id: "BLUE", name: "ฟ้า" },
  { id: "GREEN", name: "เขียว" },
  { id: "ORANGE", name: "ส้ม" },
  { id: "YELLOW", name: "เหลือง" },
  { id: "PURPLE", name: "ม่วง" },
  { id: "CREAM", name: "ครีม" },
  { id: "PINK", name: "ชมพู" },
  { id: "OTHER", name: "อื่นๆ" },
];
