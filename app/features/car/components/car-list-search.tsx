import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "~/components/form/form";
import {
  carListSearchSchema,
  type CarListSearchSchema,
} from "../schemas/car-list-search";
import RHFTextField from "~/components/form/rhf-textfield";
import { Button } from "~/components/ui/button";

// ----------------------------------------------------------------------

type Props = {
  onSearch: (data: CarListSearchSchema) => void;
};

// ----------------------------------------------------------------------

export default function CarListSearch({ onSearch }: Props) {
  const methods = useForm<CarListSearchSchema>({
    resolver: zodResolver(carListSearchSchema),
    defaultValues: {
      keyword: "",
    },
  });

  const { handleSubmit } = methods;

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSearch)}>
      <div className="mb-4 flex items-center gap-2">
        <RHFTextField
          name="keyword"
          placeholder="ค้นหารถด้วยชื่อรถยนต์และเลขทะเบียน"
        />
        <Button type="submit">ค้นหา</Button>
      </div>
    </Form>
  );
}
