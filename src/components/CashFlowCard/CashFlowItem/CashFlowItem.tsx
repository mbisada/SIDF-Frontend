import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import { formatNumberWithCommas } from '../../../utils/numberHelpers';

import { CashFlowItemProps } from './CashFlowItem.types';

export default function CashFlowItem({ icon, label, title, value, color = 'text.primary' }: CashFlowItemProps) {
  const { t } = useTranslation();

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', margin: 3, paddingBottom: 10 }}>
        <Box
          component="img"
          alt="export-image"
          src={icon}
          loading="lazy"
          sx={{
            height: 24,
            width: 24,
            display: 'flex',
            alignItems: 'center',
          }}
        />
        <Typography variant="h5" sx={{ color: 'text.primary' }}>
          {t(label) ?? ''}
        </Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', margin: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t(title) ?? ''}
        </Typography>
        <Typography variant="h6" sx={{ color: color, fontWeight: 'bold' }}>
          {formatNumberWithCommas(value)} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', fontStyle: 'italic' }}>{t('SAR')}</span>
        </Typography>
      </div>
    </div>
  );
}
