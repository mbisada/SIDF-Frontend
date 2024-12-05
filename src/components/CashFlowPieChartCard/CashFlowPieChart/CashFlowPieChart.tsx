import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';

import { CashFlowPieChartProps } from './CashFlowPieChart.types';

export default function CashFlowPieChart({ title, total, cashTypes }: CashFlowPieChartProps) {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
      <Box position="relative" width={300} height={300}>
        <PieChart
          series={[
            {
              data: cashTypes.map(type => ({
                id: type.Category,
                value: type.Percentage,
                label: type.Category,
              })),
              innerRadius: 80,
            },
          ]}
          width={300}
          height={300}
        />
        {/* Custom center label */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" color="text.primary" fontWeight="bold">
            {total}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(title)}
          </Typography>
        </div>
      </Box>
    </div>
  );
}
