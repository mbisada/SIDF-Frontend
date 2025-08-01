import { CashType } from '../../../services/dashboard/dashboard.types';

export interface CashFlowPieChartProps {
  title: string;
  total: number;
  cashTypes: CashType[];
  color?: string;
}
