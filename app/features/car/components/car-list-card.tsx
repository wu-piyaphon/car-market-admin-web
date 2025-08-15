import { Button } from "~/components/ui/button";
import type { Car } from "../types/car.types";
import Divider from "~/components/ui/divider";
import { fCurrency } from "~/utils/format-string";
import { Switch } from "~/components/ui/switch";
import { useState } from "react";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";

// ----------------------------------------------------------------------

type Props = {
  data: Car;
};

// ----------------------------------------------------------------------

export default function CarListCard({ data }: Props) {
  const {
    subModel,
    modelYear,
    price,
    thumbnail,
    model,
    currentLicensePlate,
    type,
    isActive,
  } = data;

  const router = useRouter();

  const [checked, setChecked] = useState(isActive);

  const onToggleActive = (checked: boolean) => {
    setChecked(checked);
  };

  const onClickDetail = () => {
    router.push(paths.cars.detail(data.id));
  };

  const onClickEdit = () => {
    router.push(paths.cars.edit(data.id));
  };

  return (
    <div className="bg-background relative flex h-full w-full flex-col rounded-md shadow-lg">
      <div className="relative">
        <img
          src={thumbnail}
          alt={model}
          className="h-[120px] w-full rounded-t-md object-cover md:h-[220px]"
        />
      </div>

      {/* -- Info -- */}
      <div className="flex h-full flex-col px-5 py-4">
        <div className="flex flex-row justify-between">
          <p className="text-md">
            {modelYear} {model} {subModel}
          </p>
          <Switch
            label={checked ? "แสดง" : "ซ่อน"}
            checked={checked}
            onCheckedChange={onToggleActive}
          />
        </div>
        <p className="text-lg font-semibold">{fCurrency(price)} บาท</p>
        <div className="flex gap-2 text-sm text-wrap text-gray-500">
          <p className="flex-1">ทะเบียน : {currentLicensePlate}</p>
          <p className="flex-1">ประเภท: {type}</p>
        </div>

        <Divider className="my-3" />

        {/* -- Action -- */}
        <div className="flex flex-col gap-2 md:flex-row">
          <Button size="lg" className="flex-1" onClick={onClickDetail}>
            ดูรายละเอียด
          </Button>
          <Button size="lg" className="flex-1" onClick={onClickEdit}>
            แก้ไข
          </Button>
        </div>
      </div>
    </div>
  );
}
