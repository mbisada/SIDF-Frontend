export interface CashFlowPieChartCardProps {
  inflowTotal: number;
  outflowTotal: number;
  cashInTypes: {
    Category: string; // Type of income (e.g., "Salary")
    Percentage: number; // Percentage of total CashIn
  }[];
  cashOutTypes: {
    Category: string; // Type of income (e.g., "Salary")
    Percentage: number; // Percentage of total CashIn
  }[];
}
