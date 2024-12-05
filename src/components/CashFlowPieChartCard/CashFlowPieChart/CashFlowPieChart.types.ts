export interface CashFlowPieChartProps {
  title: string;
  total: number;
  cashTypes: {
    Category: string; // Type of income (e.g., "Salary")
    Percentage: number; // Percentage of total CashIn
  }[];
  color?: string;
}
