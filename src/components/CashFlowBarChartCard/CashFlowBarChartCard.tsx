import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import useWindowSize from '../../hooks/useWindowSize';
import { formatNumberWithCommas } from '../../utils/numberHelpers';
import { CashFlowBarChartCardProps } from './CashFlowBarChartCard.types';

export default function CashFlowBarChartCard({ inflowTotal, outflowTotal, monthlyCashFlow }: CashFlowBarChartCardProps) {
  const { t } = useTranslation();
  const { width } = useWindowSize();

  const totalFlow = +inflowTotal + Math.abs(+outflowTotal || 0);

  const monthNames = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], []);

  const [chartHeight, setChartHeight] = useState(400);

  useEffect(() => {
    if (width) {
      if (width < 768) setChartHeight(250);
      else if (width < 992) setChartHeight(350);
      else setChartHeight(400);
    }
  }, [width]);

  const transformedMonthlyCashFlow = useMemo(() => {
    const allMonths = monthlyCashFlow.map(entry => ({
      ...entry,
      CashIn: Math.abs(entry.CashIn),
      CashOut: -Math.abs(entry.CashOut),
      Month: monthNames[parseInt(entry.Month, 10) - 1],
      Profit: entry.Profit,
    }));

    const sortedData = allMonths.sort((a, b) => {
      const aDate = new Date(`${a.Year}-${monthNames.indexOf(a.Month) + 1}-01`);
      const bDate = new Date(`${b.Year}-${monthNames.indexOf(b.Month) + 1}-01`);
      return aDate.getTime() - bDate.getTime();
    });

    const missingRecordsCount = 12 - sortedData.length;
    const firstRecord = sortedData[0];
    const firstMonthIndex = monthNames.indexOf(firstRecord?.Month);
    const firstYear = firstRecord?.Year;

    let injectedData = [...sortedData];
    for (let i = 0; i < missingRecordsCount; i++) {
      const previousMonthIndex = (firstMonthIndex - 1 - i + 12) % 12;
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
    if (absValue >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
    if (absValue >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    if (absValue >= 1e3) return `${(value / 1e3).toFixed(1)}k`;
    return value.toString();
  };

  return (
    <Card
      sx={{
        flex: 1,
        border: '1px solid #DADADA',
        borderRadius: '12px',
      }}
    >
      <CardHeader title={t('CASHFLOW_PERFORMANCE_THIS_PERIOD')} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', width: '100%', paddingTop: 0 }}>
        <Typography variant="h3" sx={{ color: 'text.primary', mb: 2 }}>
          {formatNumberWithCommas(totalFlow)} <span style={{ fontStyle: 'italic' }}>{t('SAR')}</span>
        </Typography>

        <ResponsiveContainer width="100%" style={{ marginLeft: '-50px' }} height={chartHeight}>
          <ComposedChart data={transformedMonthlyCashFlow} margin={{ top: 20, bottom: 30, left: 40, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="Month"
              padding={{ left: 0, right: 0 }} // remove extra space
              axisLine={false}
              tickLine={false}
            />
            <YAxis tickFormatter={formatValue} />
            <Tooltip />
            <Legend verticalAlign="top" align="center" layout="horizontal" />
            <Bar dataKey="CashIn" name={t('INFLOW')} fill="#27AE65" radius={[7, 7, 0, 0]} />
            <Bar dataKey="CashOut" name={t('OUTFLOW')} fill="#FC5555" radius={[7, 7, 0, 0]} />
            <Line
              type="monotone"
              dataKey="Profit"
              name={t('PROFIT')}
              stroke="#9FA9BC"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
