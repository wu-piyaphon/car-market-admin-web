import {
  type FieldValues,
  FormProvider,
  type UseFormReturn,
} from "react-hook-form";

// ----------------------------------------------------------------------

type FormProps<T> = {
  onSubmit?: () => void;
  children: React.ReactNode;
  methods: UseFormReturn<T & FieldValues>;
};

// ----------------------------------------------------------------------

export default function Form<T>({ methods, onSubmit, children }: FormProps<T>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
}
