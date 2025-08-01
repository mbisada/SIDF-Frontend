import { Company } from '../services/admin/admin.types';
import { DashboardDataResponse } from '../services/dashboard/dashboard.types';

export const DASHBOARD_DATA_RESPONSE: DashboardDataResponse = {
  code: 200,
  status: 'success',
  data: {
    returnedObj: [
      {
        userInfo: {
          id: 1,
          email: 'user@example.com',
          companyName: 'Sample Corp',
          mobileNumber: '1234567890',
          status: 'active',
          psuid: '20112',
          role: 'Manager',
        },
        financialData: {
          PSUId: '20112',
          TotalCashFlow: 48000,
          TotalCashIn: 540000,
          TotalCashOut: 396000,
          Liabilities: 15000,
          MonthlyCashFlow: [
            {
              Month: 'Jan',
              Year: '2024',
              CashIn: 15000,
              CashOut: 11000,
              Profit: 4000,
            },
            {
              Month: 'Feb',
              Year: '2024',
              CashIn: 16000,
              CashOut: 12000,
              Profit: 4000,
            },
            {
              Month: 'Mar',
              Year: '2024',
              CashIn: 14000,
              CashOut: 10000,
              Profit: 4000,
            },
            {
              Month: 'Apr',
              Year: '2024',
              CashIn: 15500,
              CashOut: 11500,
              Profit: 4000,
            },
            {
              Month: 'May',
              Year: '2024',
              CashIn: 16200,
              CashOut: 12200,
              Profit: 4000,
            },
            {
              Month: 'Jun',
              Year: '2024',
              CashIn: 14900,
              CashOut: 10900,
              Profit: 4000,
            },
            {
              Month: 'Jul',
              Year: '2024',
              CashIn: 15500,
              CashOut: 11500,
              Profit: 4000,
            },
            {
              Month: 'Aug',
              Year: '2024',
              CashIn: 16000,
              CashOut: 12000,
              Profit: 4000,
            },
            {
              Month: 'Sep',
              Year: '2024',
              CashIn: 14200,
              CashOut: 10200,
              Profit: 4000,
            },
            {
              Month: 'Oct',
              Year: '2024',
              CashIn: 15000,
              CashOut: 11000,
              Profit: 4000,
            },
            {
              Month: 'Nov',
              Year: '2024',
              CashIn: 15700,
              CashOut: 11700,
              Profit: 4000,
            },
            {
              Month: 'Dec',
              Year: '2024',
              CashIn: 14500,
              CashOut: 10500,
              Profit: 4000,
            },
          ],
          CashInTypes: [
            {
              Category: 'Salary',
              Percentage: 70,
            },
            {
              Category: 'Investments',
              Percentage: 20,
            },
            {
              Category: 'Freelance',
              Percentage: 10,
            },
          ],
          CashOutTypes: [
            {
              Category: 'Rent',
              Percentage: 40,
            },
            {
              Category: 'Groceries',
              Percentage: 25,
            },
            {
              Category: 'Transportation',
              Percentage: 15,
            },
            {
              Category: 'Entertainment',
              Percentage: 10,
            },
            {
              Category: 'Utilities',
              Percentage: 10,
            },
          ],
        },
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
