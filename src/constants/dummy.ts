import { Company } from '../services/admin/admin.types';
import { DashboardDataResponse } from '../services/dashboard/dashboard.types';

export const DASHBOARD_DATA_RESPONSE: DashboardDataResponse = {
  userInfo: {
    email: 'test@account.com',
    companyName: 'test Account',
    mobileNumber: '9665454221',
    calculationStatus: 'COMPLETED',
    approvalStatus: null,
    psuid: '3939393',
  },
  financialData: {
    PSUId: '3939393',
    TotalCashFlow: 21065.57,
    TotalCashIn: 21065.57,
    TotalCashOut: 0,
    Liabilities: 0,
    AverageBalance: 9000,
    MonthlyCashFlow: [
      {
        Month: '1',
        Year: '2015',
        CashIn: 1045.65,
        CashOut: -1290,
        Profit: 145.65,
      },
      {
        Month: '2',
        Year: '2015',
        CashIn: 1049.41,
        CashOut: -1290,
        Profit: 949.41,
      },
      {
        Month: '3',
        Year: '2015',
        CashIn: 1162.03,
        CashOut: -1290,
        Profit: 800.03,
      },
      {
        Month: '4',
        Year: '2015',
        CashIn: 971.41,
        CashOut: -1290,
        Profit: 971.41,
      },
      {
        Month: '5',
        Year: '2015',
        CashIn: 871.01,
        CashOut: -1290,
        Profit: 200.01,
      },
      {
        Month: '6',
        Year: '2015',
        CashIn: 1024.66,
        CashOut: -290,
        Profit: -2120.66,
      },
      {
        Month: '7',
        Year: '2015',
        CashIn: 1363.89,
        CashOut: -290,
        Profit: 1363.89,
      },
      {
        Month: '8',
        Year: '2015',
        CashIn: 1092.71,
        CashOut: -290,
        Profit: 1092.71,
      },
      {
        Month: '9',
        Year: '2015',
        CashIn: 1136.68,
        CashOut: -120,
        Profit: 1136.68,
      },
      {
        Month: '10',
        Year: '2015',
        CashIn: 1056.74,
        CashOut: -120,
        Profit: 1056.74,
      },
      {
        Month: '11',
        Year: '2015',
        CashIn: 1284.12,
        CashOut: -120,
        Profit: 1284.12,
      },
      {
        Month: '1',
        Year: '2016',
        CashIn: 1309.92,
        CashOut: -1290,
        Profit: 1309.92,
      },
    ],
    CashInTypes: [
      {
        Category: 'Transactions',
        Amount: 13161.53,
      },
      {
        Category: 'Bank Transfer',
        Amount: 7904.04,
      },
    ],
    CashOutTypes: [
      {
        Category: 'Cash Withdraw',
        Amount: 12949,
      },
      {
        Category: 'Bank Transfer',
        Amount: 12949,
      },
      {
        Category: 'Payroll',
        Amount: 12949,
      },
    ],
  },
};

export const COMPANIES_DATA: Company[] = [
  {
    id: 1,
    email: 'test@test.com',
    companyName: 'Tech Solutions Ltd.',
    mobileNumber: '1234567890',
    status: 'INITIATED',
    psuid: null,
    role: 'ADMIN',
  },
  {
    id: 3,
    email: 'test1@test.com',
    companyName: 'Tech Solutions Ltd.',
    mobileNumber: '1234567890',
    status: 'INITIATED',
    psuid: '9999999999',
    role: 'USER',
  },
  {
    id: 8,
    email: 'test3@test.com',
    companyName: 'Tech Solutions Ltd.',
    mobileNumber: '1234567890',
    status: 'INITIATED',
    psuid: 'PSU1233456',
    role: 'USER',
  },
];
