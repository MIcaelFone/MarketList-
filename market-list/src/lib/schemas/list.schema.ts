import { z } from "zod";
import { itemSchema } from "./item.schema";

export const listSchema = z.object({
  id: z.string().startsWith("list_"),
  name: z.string().trim().min(1).max(60),
  createdAt: z.string(),
  items: z.array(itemSchema),
});

export type ListSchema = z.infer<typeof listSchema>;
