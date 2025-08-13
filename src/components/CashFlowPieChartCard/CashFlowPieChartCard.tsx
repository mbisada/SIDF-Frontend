import Card from '@mui/material/Card';

import { CashFlowPieChartCardProps } from './CashFlowPieChartCard.types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './styles.css';
import styled from 'styled-components';

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
  overflow: visible;
  flex-wrap: wrap;
  @media (max-width: 400px) {
    flex-direction: row;
    align-items: center;
  }
`;

const LegendItemContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Dot = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #4a5461;
  margin-bottom: 4px;
`;

const Value = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #1a1d21;
  align-self: center;
`;
const CashFlowPieChartCard = ({ cashInTypes, cashOutTypes }: CashFlowPieChartCardProps) => {
  let cashInChart = cashInTypes.map((type: any) => ({
    name: type.Category,
    value: type.Amount,
  }));
  let cashOutChart = cashOutTypes.map((type: any) => ({
    name: type.Category,
    value: type.Amount,
  }));

  function generateShades(baseColor: string, count: number): string[] {
    const shades: string[] = [];
    for (let i = 0; i < count; i++) {
      // Create a lighter color for each step
      const ratio = i / (count - 1 || 1);
      shades.push(lightenColor(baseColor, ratio * 100)); // up to 50% lighter
    }
    return shades;
  }

  // Lighten function
  function lightenColor(hex: string, percent: number) {
    hex = hex.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, (num >> 16) + (255 - (num >> 16)) * (percent / 100));
    const g = Math.min(255, ((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * (percent / 100));
    const b = Math.min(255, (num & 0x0000ff) + (255 - (num & 0x0000ff)) * (percent / 100));
    return `#${((Math.round(r) << 16) | (Math.round(g) << 8) | Math.round(b)).toString(16).padStart(6, '0')}`;
  }

  // Generate shades dynamically
  const COLORS = generateShades('#27AE60', 5); // 5 shades of green
  const COLORS2 = generateShades('#C0392B', 5); // 5 shades of red
  const formatCompact = (n: any) => Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n);

  interface LegendItemProps {
    color: string;
    name: string;
    value: number;
  }

  const LegendItem: React.FC<LegendItemProps> = ({ color, name, value }) => {
    return (
      <LegendItemContainer>
        <Dot style={{ backgroundColor: color }} />
        <TextBlock>
          <Label>{name}</Label>
          <Value>{formatCompact(value)}</Value>
        </TextBlock>
      </LegendItemContainer>
    );
  };

  interface CustomLegendProps {
    payload?: {
      value: string;
      color: string;
      payload?: { value: number; name: string };
    }[];
  }

  const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
    if (!payload) return null;

    return (
      <LegendContainer>
        {payload
          .slice()
          .reverse()
          .map(entry => (
            <LegendItem key={entry.value} color={entry.color} name={entry.value} value={entry?.payload?.value ?? 0} />
          ))}
      </LegendContainer>
    );
  };

  return (
    <Card
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: '300px',
        border: '1px solid #DADADA',
        borderRadius: '12px',
        '@media (max-width: 400px)': {
          flexDirection: 'column',
          alignItems: 'flex-start',

          minHeight: '600px',
        },
      }}
    >
      {cashInChart?.some(item => item?.value !== 0) && (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={cashInChart}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={110}
              startAngle={90}
              endAngle={-270}
              cornerRadius={20}
              paddingAngle={-20}
            >
              {cashInChart.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" align="center" layout="horizontal" content={<CustomLegend />} />

            <Tooltip formatter={(val, _name, entry) => [formatCompact(val), entry?.payload?.name || '']} />
          </PieChart>
        </ResponsiveContainer>
      )}
      {cashOutChart?.some(item => item?.value !== 0) && (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={cashOutChart}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={110}
              startAngle={90}
              endAngle={-270}
              cornerRadius={20}
              paddingAngle={-20}
            >
              {cashOutChart.map((_, index) => (
                <Cell key={index} fill={COLORS2[index % COLORS2.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" align="center" layout="horizontal" content={<CustomLegend />} />

            <Tooltip formatter={(val, _name, entry) => [formatCompact(val), entry?.payload?.name || '']} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};
// Inline styles (you can move to CSS module / styled-components)

export default CashFlowPieChartCard;
