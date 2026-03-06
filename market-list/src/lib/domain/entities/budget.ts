export type BudgetPeriod = "monthly" | "yearly";

export type Budget = {
  amount: number;
  period: BudgetPeriod;
};
