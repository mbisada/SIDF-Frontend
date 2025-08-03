export type RiskAssessmentData = {
  PSUId: string; // ID of the PSU
  TotalCashFlow?: number; // Total profit over the period
  TotalCashIn?: number; // Total income
  TotalCashOut?: number; // Total expenses
  Liabilities: number; // Outstanding financial obligations
  MonthlyCashFlow: {
    Month: string; // Month name (e.g., "Jan")
    Year: string; // Year (e.g., "2024")
    CashIn: number; // Income for the month
    CashOut: number; // Expenses for the month
    Profit: number; // Profit for the month
  }[];
  CashInTypes: {
    Category: string; // Type of income (e.g., "Salary")
    Percentage: number; // Percentage of total CashIn
  }[];
  CashOutTypes: {
    Category: string; // Type of expense (e.g., "Rent")
    Percentage: number; // Percentage of total CashOut
  }[];
};
