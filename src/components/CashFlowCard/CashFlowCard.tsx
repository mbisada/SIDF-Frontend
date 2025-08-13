
import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';

import arrowDownIcon from '../../assets/arrowDown.svg';
import arrowUpIcon from '../../assets/arrowUp.svg';
import cashflowIcon from '../../assets/cashflow.svg';

import CashFlowItem from './CashFlowItem/CashFlowItem';
import { CashFlowCardProps } from './CashFlowCard.types';

export default function CashFlowCard({ totalCashFlow, totalCashIn, totalCashOut }: CashFlowCardProps) {

  const cardItems = [
    { icon: cashflowIcon, label: 'CASHFLOW', title: 'ACTUAL_CASHFLOW', value: totalCashFlow },
    { icon: arrowUpIcon, label: 'INFLOW', title: 'ACTUAL_INFLOW', value: totalCashIn, color: '#26AE64' },
    { icon: arrowDownIcon, label: 'OUTFLOW', title: 'ACTUAL_OUTFLOW', value: totalCashOut, color: '#F85454' },
  ];

  return (
    <Card
      sx={{
        border: '1px solid #DADADA',
        flex: 4, // Default ratio for desktop
        borderRadius: '12px',
        '@media (max-width: 900px)': {
          flex: '1 1 100%', // Full width for medium screens
        },
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: '900', color: '#3F4254', paddingLeft: '16px', paddingTop: '16px' }}>
        Cashflow
      </Typography>
      <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        {cardItems.map((cardItem, index) => (
          <CashFlowItem key={cardItem.label} {...cardItem} isLast={index === cardItems.length - 1} />
        ))}
      </CardContent>
    </Card>
  );
}
