import { Calendar, Phone } from "lucide-react";
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
};

export default function RequestSellingCard({ request }: Props) {
  return (
    <Card>
      <CardHeader className="grid-rows-none pb-0">
        <h6 className="text-base">
          {request.firstName} {request.lastName} ({request.nickname})
        </h6>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Phone className="size-4.5" />
          <p className="text-sm">{request.phoneNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="size-4.5" />
          <p className="text-sm">วันที่ {fDate(request.createdAt)}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button>ติดต่อ</Button>
      </CardFooter>
    </Card>
  );
}
