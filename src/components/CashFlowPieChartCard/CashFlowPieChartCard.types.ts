import { CashType } from '../../services/dashboard/dashboard.types';

export interface CashFlowPieChartCardProps {
  inflowTotal: number;
  outflowTotal: number;
  cashInTypes: CashType[];
  cashOutTypes: CashType[];
}
