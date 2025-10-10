import type { DialogProps } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Form from "~/components/form/form";
import RHFTextarea from "~/components/form/rhf-textarea";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "~/components/ui/dialog";
import { useUpdateRequestEstimateMutation } from "../../api/request.mutation";
import type { RequestEstimateDetail } from "../../types/request-estimate.types";
import { log } from "~/utils/log";
import { ApiError } from "~/lib/api/types/axios.types";

type Props = DialogProps & {
  detail: RequestEstimateDetail;
  onOpenChange: (open: boolean) => void;
};

export default function RequestEstimateDialog({
  detail,
  open,
  onOpenChange,
}: Props) {
  const methods = useForm({
    defaultValues: {
      note: "",
    },
  });
  const { getValues, reset } = methods;

  const { mutateAsync: updateRequest, isPending: isUpdatingRequest } =
    useUpdateRequestEstimateMutation();

  const isContacted = detail.status === "CONTACTED";

  // ----------------------------------------------------------------------

  const handleConfirm = async () => {
    try {
      if (isContacted) {
        onOpenChange(false);
        return;
      }

      const { note } = getValues();
      await updateRequest({
        id: detail.id,
        payload: {
          note,
          status: "CONTACTED",
        },
      });

      toast.success("สำเร็จ", {
        description: "บันทึกการติดต่อลูกค้าเรียบร้อย",
      });

      onOpenChange(false);
      reset();
    } catch (error) {
      log.error(error);
      toast.error("เกิดข้อผิดพลาด", {
        description:
          error instanceof ApiError
            ? error.message
            : "ไม่สามารถเปลี่ยนสถานะได้",
      });
    }
  };

  // ----------------------------------------------------------------------

  useEffect(() => {
    reset({
      note: detail.note || "",
    });
  }, [detail.note]);

  // ----------------------------------------------------------------------

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>ติดต่อกลับ</DialogTitle>
        <DialogDescription className="sr-only" />

        <div className="flex flex-row">
          <div className="flex-2/4">
            <p>ชื่อ:</p>
            <p>{detail.firstName}</p>
          </div>

          <div className="flex-1/4">
            <p>เบอร์:</p>
            <p>{detail.phoneNumber}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <p>รถยนต์:</p>
          <p>
            {detail.brand.name} {detail.model} {detail.modelYear}
          </p>
        </div>

        <Form methods={methods}>
          <div className="flex flex-col gap-2">
            <p>บันทึกการติดต่อลูกค้า</p>
            <RHFTextarea
              name="note"
              placeholder={
                isContacted ? "" : "โปรดใส่ข้อความที่ต้องการบันทึกของท่าน..."
              }
              rows={6}
              disabled={isContacted}
            />
          </div>
        </Form>

        <DialogFooter>
          <div className="flex flex-row gap-2">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              disabled={isUpdatingRequest}
              className={isContacted ? "hidden" : "block"}
            >
              ยกเลิก
            </Button>
            <Button
              onClick={handleConfirm}
              variant="default"
              loading={isUpdatingRequest}
            >
              {isContacted ? "ปิด" : "ติดต่อแล้ว"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
