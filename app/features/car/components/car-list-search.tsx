import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Form from "~/components/form/form";
import RHFTextField from "~/components/form/rhf-textfield";
import { Button } from "~/components/ui/button";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";
import {
  carListSearchSchema,
  type CarListSearchSchema,
} from "../schemas/car-list-search";

// ----------------------------------------------------------------------

type Props = {
  onSearch: (data: CarListSearchSchema) => void;
};

// ----------------------------------------------------------------------

export default function CarListSearch({ onSearch }: Props) {
  const router = useRouter();

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

        <Button
          onClick={() => router.push(paths.cars.create)}
          className="hidden w-36 md:block"
        >
          เพิ่มรถ
        </Button>
      </div>
    </Form>
  );
}
