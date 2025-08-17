import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';

import { formatNumberWithCommas } from '../../utils/numberHelpers';

import { LoansCardProps } from './LoansCard.types';
import Riyal from '../../assets/Riyal.svg';

export default function LoansCard({ liability, averageBalance, balance }: LoansCardProps) {
  return (
    <>
      <Card
        sx={{
          border: '1px solid #DADADA',
          flex: 1.965,
          borderRadius: '12px',
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
            <Typography variant="h5" sx={{ color: '#272424', marginBottom: 2, fontWeight: '700' }}>
              <Typography variant="h6" sx={{ fontWeight: '900', color: '#3F4254' }}>
                Balance
              </Typography>
              {formatNumberWithCommas(balance)}
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
          border: '1px solid #DADADA',
          flex: 1.96,
          borderRadius: '12px',
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
            <Typography variant="h5" sx={{ color: '#272424', marginBottom: 2, fontWeight: '700' }}>
              <Typography variant="h6" sx={{ fontWeight: '900', color: '#3F4254' }}>
                Obligations
              </Typography>
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
          <Typography variant="body2" sx={{ color: '#72788E', maxWidth: '70%' }}>
            Obligations covers loans and credits as received from the bank.
          </Typography>
        </div>
      </Card>
    </>
  );
}
