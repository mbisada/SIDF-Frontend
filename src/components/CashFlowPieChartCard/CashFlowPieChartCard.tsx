import { useTranslation } from 'react-i18next';

import { Box, CardContent } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CashFlowPieChart from './CashFlowPieChart/CashFlowPieChart';
import { CashFlowPieChartCardProps } from './CashFlowPieChartCard.types';

export default function CashFlowPieChartCard({ inflowTotal, outflowTotal, cashInTypes, cashOutTypes }: CashFlowPieChartCardProps) {
  const { t } = useTranslation();

  const pieCharts = [
    { title: 'TOTAL_INFLOW', total: inflowTotal, cashTypes: cashInTypes },
    { title: 'TOTAL_OUTFLOW', total: outflowTotal, cashTypes: cashOutTypes },
  ];

  return (
    <Card sx={{ minWidth: 400, width: 580, margin: 1 }}>
      <CardHeader title={t('CASHFLOW_PERFORMANCE_THIS_PERIOD')} />
      <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {pieCharts.map(chart => (
            <CashFlowPieChart key={chart.title} {...chart} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
