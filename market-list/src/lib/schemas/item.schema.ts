import { z } from "zod";

export const itemSchema = z.object({
  id: z.string().startsWith("item_"),
  name: z.string().trim().min(1).max(80),
  quantity: z.number().positive(),
  unitPrice: z.number().min(0),
  category: z.string().trim().optional(),
});

export type ItemSchema = z.infer<typeof itemSchema>;
