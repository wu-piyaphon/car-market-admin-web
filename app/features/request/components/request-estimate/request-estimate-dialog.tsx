import type { DialogProps } from "@radix-ui/react-dialog";
import React, { useEffect } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "~/components/ui/dialog";
import type { RequestEstimateItem } from "../../types/request-estimate.types";
import Form from "~/components/form/form";
import { useForm } from "react-hook-form";
import RHFTextarea from "~/components/form/rhf-textarea";
import { useUpdateRequestEstimateMutation } from "../../api/request.mutation";
import { toast } from "sonner";

type Props = DialogProps & {
  detail: RequestEstimateItem;
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
      console.error("Failed to update estimate request:", error);
      toast.error("เกิดข้อผิดพลาด", {
        description:
          error instanceof Error ? error.message : "ไม่สามารถเปลี่ยนสถานะได้",
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
            {detail.brand} {detail.model} {detail.modelYear}
          </p>
        </div>

        <Form methods={methods}>
          <div className="flex flex-col gap-2">
            <p>บันทึกการติดต่อลูกค้า</p>
            <RHFTextarea
              name="note"
              placeholder="โปรดใส่ข้อความที่ต้องการบันทึกของท่าน..."
              rows={6}
              disabled={isContacted}
            />
          </div>
        </Form>

        <DialogFooter>
          <div className="flex w-[50%] flex-row gap-2">
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
