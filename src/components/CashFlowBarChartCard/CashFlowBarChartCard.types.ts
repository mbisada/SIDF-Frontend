export interface CashFlowBarChartCardProps {
  inflowTotal: number;
  outflowTotal: number;
  monthlyCashFlow: {
    Month: string; // Month name (e.g., "Jan")
    Year: string; // Year (e.g., "2024")
    CashIn: number; // Income for the month
    CashOut: number; // Expenses for the month
    Profit: number; // Profit for the month
  }[];
}
