import { useForm } from "react-hook-form";
import Form from "~/components/form/form";
import RHFTextField from "~/components/form/rhf-textfield";
import { Button } from "~/components/ui/button";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";
import { type CarListSearchSchema } from "../schemas/car-list-search";

// ----------------------------------------------------------------------

type CarListSearchProps = {
  methods: ReturnType<typeof useForm<CarListSearchSchema>>;
};

export default function CarListSearch({ methods }: CarListSearchProps) {
  const router = useRouter();

  return (
    <Form methods={methods}>
      <div className="mb-4 flex items-center gap-2">
        <RHFTextField
          name="keyword"
          placeholder="ค้นหารถด้วยชื่อรถยนต์และเลขทะเบียน"
        />

        <Button
          type="button"
          onClick={() => router.push(paths.cars.create)}
          className="hidden w-36 md:block"
        >
          เพิ่มรถ
        </Button>
      </div>
    </Form>
  );
}
