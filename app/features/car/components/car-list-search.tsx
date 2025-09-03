import { useForm } from "react-hook-form";
import Form from "~/components/form/form";
import RHFTextField from "~/components/form/rhf-textfield";
import { Button } from "~/components/ui/button";
import { type CarListSearchSchema } from "../schemas/car-list-search";
import { Plus } from "lucide-react";

// ----------------------------------------------------------------------

type CarListSearchProps = {
  methods: ReturnType<typeof useForm<CarListSearchSchema>>;
  onClickAdd: () => void;
};

export default function CarListSearch({
  methods,
  onClickAdd,
}: CarListSearchProps) {
  return (
    <Form methods={methods}>
      <div className="mb-4 flex items-center gap-2">
        <RHFTextField
          name="keyword"
          placeholder="ค้นหารถด้วยชื่อรถยนต์และเลขทะเบียน"
        />

        <Button
          size="lg"
          type="button"
          onClick={onClickAdd}
          className="hidden w-36 md:flex"
        >
          <Plus />
          เพิ่มรถ
        </Button>
      </div>
    </Form>
  );
}
