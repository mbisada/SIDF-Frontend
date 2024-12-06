import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';

import useWindowSize from '../../../hooks/useWindowSize';
import { formatNumberWithCommas } from '../../../utils/numberHelpers';

import { CashFlowPieChartProps } from './CashFlowPieChart.types';

export default function CashFlowPieChart({ title, total, cashTypes, color = 'text.primary' }: CashFlowPieChartProps) {
  const { t } = useTranslation();
  const { width } = useWindowSize();

  const [chartDimensions, setChartDimensions] = useState({ innerRadius: 70, outerRadius: 100, height: 250 });

  useEffect(() => {
    if (width) {
      let calculatedOuterRadius = 100;
      let calculatedInnerRadius = 70;
      let calculatedHeight = Math.min(width / 2.5, 250);

      if (width < 768) {
        calculatedOuterRadius = Math.min(width / 6, 50);
        calculatedInnerRadius = calculatedOuterRadius * 0.7;
        calculatedHeight = Math.min(width / 3, 200);
      } else if (width < 992) {
        calculatedOuterRadius = Math.min(width / 5, 80);
        calculatedInnerRadius = calculatedOuterRadius * 0.7;
        calculatedHeight = Math.min(width / 2.5, 250);
      } else {
        calculatedOuterRadius = Math.min(width / 4, 100);
        calculatedInnerRadius = calculatedOuterRadius * 0.7;
        calculatedHeight = Math.min(width / 2.5, 250);
      }

      setChartDimensions({
        innerRadius: calculatedInnerRadius,
        outerRadius: calculatedOuterRadius,
        height: calculatedHeight,
      });
    }
  }, [width]);

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
              innerRadius: chartDimensions.innerRadius,
              outerRadius: chartDimensions.outerRadius,
            },
          ]}
          height={chartDimensions.height}
        />
      </Box>
    </div>
  );
}
