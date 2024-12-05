import { useTranslation } from 'react-i18next';

import { CardContent } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import arrowDownIcon from '../../assets/arrowDown.svg';
import arrowUpIcon from '../../assets/arrowUp.svg';
import cashflowIcon from '../../assets/cashflow.svg';

import CashFlowItem from './CashFlowItem/CashFlowItem';
import { CashFlowCardProps } from './CashFlowCard.types';

export default function CashFlowCard({ totalCashFlow, totalCashIn, totalCashOut }: CashFlowCardProps) {
  const { t } = useTranslation();

  const cardItems = [
    { icon: cashflowIcon, label: 'CASHFLOW', title: 'ACTUAL_CASHFLOW', value: totalCashFlow },
    { icon: arrowUpIcon, label: 'INFLOW', title: 'ACTUAL_INFLOW', value: totalCashIn },
    { icon: arrowDownIcon, label: 'OUTFLOW', title: 'ACTUAL_OUTFLOW', value: totalCashOut },
  ];

  return (
    <Card sx={{ minWidth: 400, width: 580, margin: 1 }}>
      <CardHeader title={t('CASHFLOW')} />
      <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        {cardItems.map(cardItem => (
          <CashFlowItem key={cardItem.label} {...cardItem} />
        ))}
      </CardContent>
    </Card>
  );
}
