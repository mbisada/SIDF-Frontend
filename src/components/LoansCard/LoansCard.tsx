import { useTranslation } from 'react-i18next';

import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import { formatNumberWithCommas } from '../../utils/numberHelpers';

import { LoansCardProps } from './LoansCard.types';

export default function LoansCard({ liability }: LoansCardProps) {
  const { t } = useTranslation();

  return (
    <Card sx={{ minWidth: 400, width: 580, margin: 1 }}>
      <CardHeader title={t('LOANS')} />
      <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', margin: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {formatNumberWithCommas(liability)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {t('LIABILITY')}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
