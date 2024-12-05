import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { BarChart } from '@mui/x-charts';

import { CashFlowBarChartCardProps } from './CashFlowBarChartCard.types';

export default function CashFlowBarChartCard({ inflowTotal, outflowTotal, monthlyCashFlow }: CashFlowBarChartCardProps) {
  const { t } = useTranslation();

  const totalFlow = +inflowTotal + Math.abs(+outflowTotal || 0);

  const transformedMonthlyCashFlow = useMemo(() => {
    return monthlyCashFlow.map(entry => ({
      ...entry,
      CashOut: -Math.abs(entry.CashOut), // Ensure CashOut is always negative
    }));
  }, [monthlyCashFlow]);

  return (
    <Card sx={{ minWidth: 400, width: 580, margin: 1 }}>
      <CardHeader title={t('CASHFLOW_PERFORMANCE_THIS_PERIOD')} />
      <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', margin: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {totalFlow ?? ''}
          </Typography>
        </div>
        <div style={{ width: '100%', height: 400 }}>
          <BarChart
            xAxis={[{ dataKey: 'Month', scaleType: 'band' }]}
            dataset={transformedMonthlyCashFlow} // Add the dataset prop here
            series={[
              { dataKey: 'CashIn', label: t('INFLOW'), color: '#27AE65' },
              { dataKey: 'CashOut', label: t('OUTFLOW'), color: '#FC5555' },
            ]}
            height={400}
            width={500}
            margin={{ top: 20, right: 30, bottom: 30, left: 20 }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
