import { z } from "zod";
import { budgetSchema } from "./budget.schema";
import { listSchema } from "./list.schema";

export const appStateSchema = z.object({
  version: z.number().int().positive(),
  budget: budgetSchema.nullable(),
  lists: z.array(listSchema),
});

export type AppStateSchema = z.infer<typeof appStateSchema>;
