interface CashFlowData {
  Month: string;
  Year: string;
  CashIn: number;
  CashOut: number;
  Profit: number;
}

export interface CashType {
  Category: string;
  Percentage: number;
}

interface FinancialData {
  PSUId: string;
  TotalCashFlow: number;
  TotalCashIn: number;
  TotalCashOut: number;
  Liabilities: number;
  MonthlyCashFlow: CashFlowData[];
  CashInTypes: CashType[];
  CashOutTypes: CashType[];
}

interface UserInfo {
  id: number;
  email: string;
  companyName: string;
  mobileNumber: string;
  status: string;
  psuid: string;
  role: string;
}

export interface DashboardDataReturnedObj {
  userInfo?: UserInfo;
  financialData?: FinancialData;
}

export interface DashboardDataResponse {
  code: number;
  status: string;
  data: {
    returnedObj: DashboardDataReturnedObj[];
  };
}
