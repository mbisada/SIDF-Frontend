import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import { formatNumberWithCommas } from '../../utils/numberHelpers';

import { LoansCardProps } from './LoansCard.types';
import Riyal from '../../assets/Riyal.svg';

export default function LoansCard({ liability, averageBalance }: LoansCardProps) {
  const { t } = useTranslation();

  return (
    <>
      <Card
        sx={{
          flex: 1.97,
          '@media (max-width: 900px)': {
            flex: '1 1 100%',
          },
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            height: '100%',
            padding: '16px',
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ color: 'text.primary', marginBottom: 2 }}>
              <CardHeader title={t('Balance')} style={{ padding: 0 }} />
              {formatNumberWithCommas(liability)}
              <Box
                style={{ alignSelf: 'center' }}
                component="img"
                loading="lazy"
                sx={{
                  height: '30px',
                  width: '30px',
                }}
                alt="neotek logo"
                src={Riyal}
                paddingTop={1}
              />
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#72788E' }}>
            Average Balance
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              {formatNumberWithCommas(Number(averageBalance))}
              <Box
                style={{ alignSelf: 'center' }}
                component="img"
                loading="lazy"
                sx={{
                  height: '20px',
                  width: '20px',
                }}
                alt="neotek logo"
                src={Riyal}
                paddingTop={1}
              />
            </Typography>
          </Typography>
        </div>
      </Card>
      <Card
        sx={{
          flex: 1.99,
          '@media (max-width: 900px)': {
            flex: '1 1 100%',
          },
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            height: '100%',
            padding: '16px',
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ color: 'text.primary', marginBottom: 2 }}>
              <CardHeader title={t('Balance')} style={{ padding: 0 }} />
              {formatNumberWithCommas(liability)}
              <Box
                style={{ alignSelf: 'center' }}
                component="img"
                loading="lazy"
                sx={{
                  height: '30px',
                  width: '30px',
                }}
                alt="neotek logo"
                src={Riyal}
                paddingTop={1}
              />
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#72788E' }}>
            Obligations covers loans and credits as received from the bank.
          </Typography>
        </div>
      </Card>
    </>
  );
}
