import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import noDataFound from '../../assets/noDataFound.svg';

export default function NoDataFound() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box
          component="img"
          sx={{
            display: { xs: 'flex' },
            mr: 10,
          }}
          alt="logo"
          src={noDataFound}
        />
        <Typography variant="h4">{t('NO_DATA_FOUND')}</Typography>
      </Box>
    </Container>
  );
}
