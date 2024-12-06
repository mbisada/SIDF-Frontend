import { useTranslation } from 'react-i18next';

import { Box, CardContent } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CashFlowPieChart from './CashFlowPieChart/CashFlowPieChart';
import { CashFlowPieChartCardProps } from './CashFlowPieChartCard.types';

export default function CashFlowPieChartCard({ inflowTotal, outflowTotal, cashInTypes, cashOutTypes }: CashFlowPieChartCardProps) {
  const { t } = useTranslation();

  const pieCharts = [
    { title: 'TOTAL_INFLOW', total: inflowTotal, cashTypes: cashInTypes, color: '#26AE64' },
    { title: 'TOTAL_OUTFLOW', total: outflowTotal, cashTypes: cashOutTypes, color: '#F85454' },
  ];

  return (
    <Card sx={{ flex: 1, margin: 1 }}>
      <CardHeader title={t('CASHFLOW_PERFORMANCE_THIS_PERIOD')} />
      <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingTop: 0 }}>
        <Box
          sx={{
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-start',
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
