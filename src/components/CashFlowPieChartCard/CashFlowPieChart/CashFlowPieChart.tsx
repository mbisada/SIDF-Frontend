import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';

import { formatNumberWithCommas } from '../../../utils/numberHelpers';

import { CashFlowPieChartProps } from './CashFlowPieChart.types';

export default function CashFlowPieChart({ title, total, cashTypes, color = 'text.primary' }: CashFlowPieChartProps) {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        padding: '0 5px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flex: 1,
        }}
      >
        <Typography variant="caption" color="text.primary" style={{ fontWeight: 'bold' }}>
          {t(title)}
        </Typography>
        <Typography variant="h6" color={color} fontWeight="bold">
          {formatNumberWithCommas(total)} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', fontStyle: 'italic' }}>{t('SAR')}</span>
        </Typography>
      </div>
      <Box flex={3}>
        <PieChart
          series={[
            {
              data: cashTypes.map(type => ({
                id: type.Category,
                value: type.Percentage,
                label: type.Category,
              })),
              innerRadius: 70,
              outerRadius: 100,
            },
          ]}
          height={250}
        />
        {/* Custom center label */}
      </Box>
    </div>
  );
}
