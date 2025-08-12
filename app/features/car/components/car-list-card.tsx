import { Button } from "~/components/ui/button";
import type { Car } from "../types/car.types";
import Divider from "~/components/ui/divider";

// ----------------------------------------------------------------------

type Props = Car & {
  onEdit?: () => void;
  onDetail?: () => void;
};

const STATUS_MAP = {
  active: { label: "แสดง", color: "#4CAF50" },
  inactive: { label: "ซ่อน", color: "#BDBDBD" },
};

// ----------------------------------------------------------------------

export default function CarListCard({ onEdit, onDetail, ...car }: Props) {
  const {
    subModel,
    modelYear,
    price,
    thumbnail,
    model,
    currentLicensePlate,
    type,
    isActive,
  } = car;

  const statusInfo = STATUS_MAP[isActive ? "active" : "inactive"];
  return (
    <div className="bg-background relative flex max-w-[320px] flex-col rounded-md shadow-lg">
      <div className="relative">
        <img
          src={thumbnail}
          alt={model}
          className="h-[180px] w-full rounded-t-md object-cover"
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background:
              status === "active"
                ? "#E8F5E9"
                : status === "sold"
                  ? "#F5F5F5"
                  : "#F5F5F5",
            color: statusInfo.color,
            borderRadius: 16,
            padding: "2px 16px",
            fontWeight: 600,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
          }}
        >
          {statusInfo.label}
        </div>
      </div>

      {/* -- Info -- */}
      <div className="flex flex-col px-5 py-4">
        <p className="text-lg">
          {modelYear} {model} {subModel}
        </p>
        <p className="text-lg font-semibold">{price} บาท</p>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>ทะเบียน : {currentLicensePlate}</span>
          <span>ประเภท: {type}</span>
        </div>

        <Divider className="my-3" />

        {/* -- Action -- */}
        <div className="flex flex-row gap-2">
          <Button size="lg" className="flex-1" onClick={onDetail}>
            ดูรายละเอียด
          </Button>
          <Button size="lg" className="flex-1" onClick={onEdit}>
            แก้ไข
          </Button>
        </div>
      </div>
    </div>
  );
}
