import { z } from "zod";

export const budgetSchema = z.object({
  amount: z.number().positive(),
  period: z.enum(["monthly", "yearly"]),
});

export type BudgetSchema = z.infer<typeof budgetSchema>;
