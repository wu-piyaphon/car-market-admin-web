import { Calendar, Car, SquarePen, User } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { fDate } from "~/utils/format-string";
import type { RequestEstimateItem } from "../../types/request-estimate.types";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";

type Props = {
  request: RequestEstimateItem;
};

export default function RequestEstimateCard({ request }: Props) {
  const router = useRouter();
  const { status, firstName, brand, thumbnail, model, modelYear, createdAt } =
    request;

  const isContacted = status === "CONTACTED";

  const onClick = () => {
    router.push(paths.requests.estimate.detail(request.id));
  };

  return (
    <Card>
      <CardHeader className="grid-rows-none pb-0">
        <img
          src={thumbnail}
          alt={model}
          className="h-[120px] w-full rounded-lg rounded-t-md object-contain md:h-[150px]"
        />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-center gap-1.5">
        <div className="flex flex-row items-center gap-2">
          <User className="size-4.5" />
          <h6 className="text-base">{firstName}</h6>
        </div>
        <div className="flex items-center gap-2">
          <Car className="size-4.5" />
          <p className="text-sm">
            {brand} {model} {modelYear}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="size-4.5" />
          <p className="text-sm">วันที่ {fDate(createdAt)}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onClick}>
          {isContacted && <SquarePen className="size-5" />}
          {isContacted ? "ดูรายละเอียด" : "ดูรายละเอียด"}
        </Button>
      </CardFooter>
    </Card>
  );
}
