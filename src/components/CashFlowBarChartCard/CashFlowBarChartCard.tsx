import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { BarChart } from '@mui/x-charts';

import useWindowSize from '../../hooks/useWindowSize';
import { formatNumberWithCommas } from '../../utils/numberHelpers';

import { CashFlowBarChartCardProps } from './CashFlowBarChartCard.types';

export default function CashFlowBarChartCard({ inflowTotal, outflowTotal, monthlyCashFlow }: CashFlowBarChartCardProps) {
  const { t } = useTranslation();
  const { width } = useWindowSize(); // Using window size hook to get screen width

  const totalFlow = +inflowTotal + Math.abs(+outflowTotal || 0);

  const monthNames = useMemo(() => {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }, []);

  const [chartHeight, setChartHeight] = useState(400); // Default chart height

  // Dynamically calculate chart height based on screen width
  useEffect(() => {
    if (width) {
      if (width < 768) {
        setChartHeight(250); // Set smaller height for small screens
      } else if (width < 992) {
        setChartHeight(350); // Medium height for medium screens
      } else {
        setChartHeight(400); // Larger height for larger screens
      }
    }
  }, [width]);

  const transformedMonthlyCashFlow = useMemo(() => {
    const allMonths = monthlyCashFlow.map(entry => ({
      ...entry,
      CashOut: -Math.abs(entry.CashOut), // Ensure CashOut is always negative
      Month: monthNames[parseInt(entry.Month, 10) - 1], // Convert month number to month name
    }));

    // Sort the data by Year and Month in ascending order
    const sortedData = allMonths.sort((a, b) => {
      const aDate = new Date(`${a.Year}-${monthNames.indexOf(a.Month) + 1}-01`);
      const bDate = new Date(`${b.Year}-${monthNames.indexOf(b.Month) + 1}-01`);
      return aDate.getTime() - bDate.getTime(); // Sort ascending (oldest to newest)
    });

    // If there are less than 12 records, inject missing months
    const missingRecordsCount = 12 - sortedData.length;
    const firstRecord = sortedData[0];
    const firstMonthIndex = monthNames.indexOf(firstRecord?.Month);
    const firstYear = firstRecord?.Year;

    let injectedData = [...sortedData];

    for (let i = 0; i < missingRecordsCount; i++) {
      const previousMonthIndex = (firstMonthIndex - 1 - i + 12) % 12; // Calculate previous month index (wrap around if needed)
      const previousYear = previousMonthIndex === 11 ? (parseInt(firstYear, 10) - 1).toString() : firstYear;

      injectedData = [
        {
          Month: monthNames[previousMonthIndex],
          Year: previousYear,
          CashIn: 0,
          CashOut: 0,
          Profit: 0,
        },
        ...injectedData,
      ];
    }

    return injectedData;
  }, [monthNames, monthlyCashFlow]);

  const formatValue = (value: number) => {
    const absValue = Math.abs(value);
    let formatted = value.toString();

    if (absValue >= 1e9) {
      formatted = `${(value / 1e9).toFixed(1)}B`;
    } else if (absValue >= 1e6) {
      formatted = `${(value / 1e6).toFixed(1)}M`;
    } else if (absValue >= 1e3) {
      formatted = `${(value / 1e3).toFixed(1)}k`;
    }

    return formatted;
  };

  return (
    <Card
      sx={{
        flex: 1,
        '@media (max-width: 900px)': {
          flex: '1 1 100%',
        },
      }}
    >
      <CardHeader title={t('CASHFLOW_PERFORMANCE_THIS_PERIOD')} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', paddingTop: 0 }}>
        <Typography variant="h3" sx={{ color: 'text.primary', display: 'block', marginBottom: 2 }}>
          {formatNumberWithCommas(totalFlow)} <span style={{ fontStyle: 'italic' }}>{t('SAR')}</span>
        </Typography>
        <div style={{ width: '100%', height: chartHeight }}>
          <BarChart
            xAxis={[{ dataKey: 'Month', scaleType: 'band' }]}
            yAxis={[{ valueFormatter: formatValue }]}
            dataset={transformedMonthlyCashFlow}
            series={[
              { dataKey: 'CashIn', label: t('INFLOW'), color: '#27AE65' },
              { dataKey: 'CashOut', label: t('OUTFLOW'), color: '#FC5555' },
            ]}
            height={chartHeight} // Use responsive height
          />
        </div>
      </CardContent>
    </Card>
  );
}
