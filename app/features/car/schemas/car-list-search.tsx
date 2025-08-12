import z from "zod";

export const carListSearchSchema = z.object({
  keyword: z.string().optional(),
});

export type CarListSearchSchema = z.infer<typeof carListSearchSchema>;
