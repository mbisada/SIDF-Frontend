import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { BarChart } from '@mui/x-charts';

import { formatNumberWithCommas } from '../../utils/numberHelpers';

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

  // Formatter for large numbers (handles negatives and billion+ values)
  const formatValue = (value: number) => {
    const absValue = Math.abs(value);
    let formatted = value.toString(); // Default to the raw number

    if (absValue >= 1e9) {
      formatted = `${(value / 1e9).toFixed(1)}B`; // Format as billions
    } else if (absValue >= 1e6) {
      formatted = `${(value / 1e6).toFixed(1)}M`; // Format as millions
    } else if (absValue >= 1e3) {
      formatted = `${(value / 1e3).toFixed(1)}k`; // Format as thousands
    }

    return formatted; // Preserve sign (negative if applicable)
  };

  return (
    <Card
      sx={{
        flex: 1, // Default ratio for desktop
        '@media (max-width: 900px)': {
          flex: '1 1 100%', // Full width for medium screens
        },
      }}
    >
      <CardHeader title={t('CASHFLOW_PERFORMANCE_THIS_PERIOD')} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', paddingTop: 0 }}>
        <Typography variant="h3" sx={{ color: 'text.primary', display: 'block', marginBottom: 2 }}>
          {formatNumberWithCommas(totalFlow)} <span style={{ fontStyle: 'italic' }}>{t('SAR')}</span>
        </Typography>
        <div style={{ width: '100%', height: 400 }}>
          <BarChart
            xAxis={[{ dataKey: 'Month', scaleType: 'band' }]}
            yAxis={[
              {
                valueFormatter: formatValue, // Apply custom formatting for y-axis
              },
            ]}
            dataset={transformedMonthlyCashFlow}
            series={[
              { dataKey: 'CashIn', label: t('INFLOW'), color: '#27AE65' },
              { dataKey: 'CashOut', label: t('OUTFLOW'), color: '#FC5555' },
            ]}
            height={400}
          />
        </div>
      </CardContent>
    </Card>
  );
}
