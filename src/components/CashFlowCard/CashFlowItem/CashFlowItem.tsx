import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import { formatNumberWithCommas } from '../../../utils/numberHelpers';

import { CashFlowItemProps } from './CashFlowItem.types';
import Riyal from '../../../assets/Riyal.svg';
import RiyalGreen from '../../../assets/RiyalGreen.svg';
import RiyalRed from '../../../assets/RiyalRed.svg';

export default function CashFlowItem({ icon, label, title, value, isLast }: CashFlowItemProps) {
  const { t } = useTranslation();
  return (
    <>
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
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', marginTop: '5px', color: label == 'CASHFLOW' ? 'black' : label == 'INFLOW' ? '#26AE64' : '#F85454' }}
          >
            {formatNumberWithCommas(value)}{' '}
            <Box
              style={{ alignSelf: 'center' }}
              component="img"
              loading="lazy"
              sx={{
                height: '20px',
                width: '20px',
              }}
              alt="neotek logo"
              src={label == 'CASHFLOW' ? Riyal : label == 'INFLOW' ? RiyalGreen : RiyalRed}
            />
          </Typography>
        </div>
      </div>
      {!isLast && <div style={{ display: 'flex', width: '1px', backgroundColor: '#E6E6E6' }} />}
    </>
  );
}
