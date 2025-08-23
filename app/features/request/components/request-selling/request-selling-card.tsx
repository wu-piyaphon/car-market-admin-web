import { Calendar, Phone, SquarePen } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import type { RequestSellingItem } from "../../types/request-selling.types";
import { fDate } from "~/utils/format-string";

type Props = {
  request: RequestSellingItem;
  onClick: (request: RequestSellingItem) => void;
};

export default function RequestSellingCard({ request, onClick }: Props) {
  const { status, firstName, lastName, nickname, phoneNumber, createdAt } =
    request;

  const isContacted = status === "CONTACTED";

  return (
    <Card>
      <CardHeader className="grid-rows-none pb-0">
        <h6 className="text-base">
          {firstName} {lastName} ({nickname})
        </h6>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-center">
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
        <Button onClick={() => onClick(request)}>
          {isContacted && <SquarePen className="size-5" />}
          {isContacted ? "ดูบันทึก" : "ติดต่อ"}
        </Button>
      </CardFooter>
    </Card>
  );
}
