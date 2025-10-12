import { fThousandSeparator } from "~/utils/format-string";

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

export const CAR_CAPACITY_OPTIONS = [
  988, 998, 999, 1193, 1196, 1197, 1198, 1242, 1299, 1339, 1462, 1490, 1495,
  1496, 1497, 1498, 1499, 1584, 1595, 1596, 1598, 1798, 1799, 1898, 1987, 1993,
  1995, 1996, 1997, 1998, 1999, 2143, 2191, 2198, 2298, 2351, 2356, 2393, 2442,
  2477, 2486, 2487, 2488, 2491, 2493, 2494, 2496, 2497, 2499, 2694, 2755, 2795,
  2953, 2982, 2999, 3198, 3200,
].map(cc => ({ id: cc.toString(), name: fThousandSeparator(cc) }));

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
