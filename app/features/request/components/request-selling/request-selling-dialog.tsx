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
  DialogFooter,
  DialogTitle,
} from "~/components/ui/dialog";
import { useUpdateRequestSellingMutation } from "../../api/request.mutation";
import type { RequestSellingItem } from "../../types/request-selling.types";

type Props = DialogProps & {
  detail: RequestSellingItem;
  onOpenChange: (open: boolean) => void;
};

export default function RequestSellingDialog({
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
    useUpdateRequestSellingMutation();

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
      console.error("Failed to update car status:", error);
      toast.error("เกิดข้อผิดพลาด", {
        description:
          error instanceof Error ? error.message : "ไม่สามารถเปลี่ยนสถานะรถได้",
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
            <p>
              {detail.firstName} {detail.lastName} ({detail.nickname})
            </p>
          </div>

          <div className="flex-1/4">
            <p>เบอร์</p>
            <p>{detail.phoneNumber}</p>
          </div>
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
          <div className="flex flex-row justify-end gap-2">
            <Button
              variant="outline"
              disabled={isUpdatingRequest}
              onClick={() => onOpenChange(false)}
              className={isContacted ? "hidden" : "block"}
            >
              ยกเลิก
            </Button>
            <Button
              variant="default"
              loading={isUpdatingRequest}
              onClick={handleConfirm}
            >
              {isContacted ? "ปิด" : "ติดต่อแล้ว"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
