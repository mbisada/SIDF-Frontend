import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import failForm from '../../assets/failForm.svg';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

function FailSubmission() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box alignItems="center" justifyContent="center" display="flex" flexDirection="column" padding={9}>
      <Box component="img" alt="export-image" src={failForm} width="unset" loading="lazy" display="flex" alignItems="center" />
      <Typography variant="h3">{t('Sorry')}</Typography>
      <Typography variant="h5">{t('Something went wrong')}</Typography>
      <Button onClick={() => navigate('/')} >{t('BACK')}</Button>
    </Box>
  );
}

export default FailSubmission;
