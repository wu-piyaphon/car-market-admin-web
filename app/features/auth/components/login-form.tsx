import { GalleryVerticalEnd } from "lucide-react";

import { useForm } from "react-hook-form";
import Form from "~/components/form/form";
import RHFTextField from "~/components/form/rhf-textfield";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type TLoginSchema } from "../schemas/login";
import { useLoginMutation } from "../api/auth.mutations";

// ----------------------------------------------------------------------

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutateAsync } = useLoginMutation();

  const methods = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async data => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-6" />
            </div>
          </a>
          <h1 className="text-center text-xl font-bold whitespace-pre-line">
            {`Welcome to\nGood Car Market Admin`}
          </h1>
        </div>
        <div className="flex flex-col gap-6">
          <Form methods={methods} onSubmit={onSubmit}>
            <div className="mb-4 grid gap-3">
              <RHFTextField
                name="email"
                placeholder="m@example.com"
                label="Email"
                type="email"
                required
              />

              <RHFTextField
                name="password"
                placeholder="••••••••"
                label="Password"
                type="password"
                required
              />
            </div>

            <Button type="submit" className="w-full" loading={isSubmitting}>
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
