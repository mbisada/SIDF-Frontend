import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import { formatNumberWithCommas } from '../../../utils/numberHelpers';

import { CashFlowItemProps } from './CashFlowItem.types';

export default function CashFlowItem({ icon, label, title, value }: CashFlowItemProps) {
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
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {t(label) ?? ''}
        </Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', margin: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t(title) ?? ''}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {formatNumberWithCommas(value)}
        </Typography>
      </div>
    </div>
  );
}
