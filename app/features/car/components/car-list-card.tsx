import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import Divider from "~/components/ui/divider";
import { Switch } from "~/components/ui/switch";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";
import { fCurrency } from "~/utils/format-string";
import {
  useActivateCarMutation,
  useDisableCarMutation,
} from "../api/car.mutations";
import type { CarListItem, CarSalesType } from "../types/car.types";
import { FileText, Tag } from "lucide-react";

// ----------------------------------------------------------------------

type Props = {
  data: CarListItem;
  salesType: CarSalesType;
};

// ----------------------------------------------------------------------

export default function CarListCard({ data, salesType }: Props) {
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

  const { mutate: activateCar, isPending: isActivating } =
    useActivateCarMutation();
  const { mutate: disableCar, isPending: isDisabling } =
    useDisableCarMutation();

  const [checked, setChecked] = useState(isActive);
  const isToggling = isActivating || isDisabling;

  const onToggleActive = (checked: boolean) => {
    setChecked(checked);

    const mutation = checked ? activateCar : disableCar;
    const action = checked
      ? "ไม่สามารถแสดงรถได้"
      : "ไม่สามารถตั้งค่าเป็นขายรถแล้วได้";

    mutation(data.id, {
      onError: error => {
        setChecked(!checked);
        toast.error(action, {
          description:
            error instanceof Error ? error.message : "กรุณาลองใหม่อีกครั้ง",
        });
      },
    });
  };

  const onClickDetail = () => {
    if (salesType === "OWNER") {
      router.push(paths.cars.owner.detail(data.id));
    } else {
      router.push(paths.cars.consignment.detail(data.id));
    }
  };

  const onClickEdit = () => {
    if (salesType === "OWNER") {
      router.push(paths.cars.owner.edit(data.id));
    } else {
      router.push(paths.cars.consignment.edit(data.id));
    }
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
        <div className="flex flex-row items-center justify-between">
          <p className="text-md">
            {model} {subModel} {modelYear}
          </p>
          <Switch
            label={checked ? "แสดง" : "ขายแล้ว"}
            checked={checked}
            disabled={isToggling}
            onCheckedChange={onToggleActive}
            className="hidden md:flex"
          />
        </div>
        <p className="text-lg font-semibold">{fCurrency(price)} บาท</p>
        <div className="flex flex-row text-sm text-wrap text-gray-500 md:gap-2">
          <div className="flex flex-1 flex-row items-center gap-1">
            <FileText className="size-4" />
            <p className="text-secondary flex-1">
              ทะเบียน : {currentLicensePlate}
            </p>
          </div>
          <div className="hidden flex-1 flex-row items-center gap-1 md:flex">
            <Tag className="size-4" />
            <p className="text-secondary flex-1">ประเภท: {type}</p>
          </div>
        </div>

        <Divider className="my-3" />

        {/* -- Action -- */}
        <div className="flex flex-col gap-2 md:flex-row">
          <Button color="secondary" className="flex-1" onClick={onClickDetail}>
            ดูรายละเอียด
          </Button>
          <Button className="flex-1" onClick={onClickEdit}>
            แก้ไข
          </Button>
        </div>
      </div>
    </div>
  );
}
