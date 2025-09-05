import { Calendar, Phone, SquarePen } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { fDate } from "~/utils/format-string";
import type { RequestSellingItem } from "../../types/request-selling.types";
import { useMemo } from "react";

type Props = {
  request: RequestSellingItem;
  onClick: (request: RequestSellingItem) => void;
};

export default function RequestSellingCard({ request, onClick }: Props) {
  const {
    status,
    firstName,
    lastName,
    nickname,
    phoneNumber,
    createdAt,
    type,
  } = request;

  const isContacted = status === "CONTACTED";

  const buttonColor = useMemo(() => {
    if (isContacted) return "inherit";
    return type === "OWNER" ? "success" : "default";
  }, [isContacted, type]);

  return (
    <Card>
      <CardHeader className="grid-rows-none pb-0">
        <h6 className="text-base">
          {firstName} {lastName} ({nickname})
        </h6>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-center gap-2">
        <div className="flex items-center gap-2">
          <Phone className="size-4.5" />
          <p className="text-sm">{phoneNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="size-4.5" />
          <p className="text-sm">วันที่ {fDate(createdAt)}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          color={buttonColor}
          className="flex-1"
          onClick={() => onClick(request)}
        >
          {isContacted && <SquarePen className="size-5" />}
          {isContacted ? "ดูบันทึก" : "ติดต่อ"}
        </Button>
      </CardFooter>
    </Card>
  );
}
