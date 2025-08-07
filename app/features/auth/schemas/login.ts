import { z } from "zod";
import { emailSchema } from "~/lib/schemas/common";

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
