import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import successForm from '../../assets/successForm.svg';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

function SuccessSubmission(/* { title, message }: SuccessSubmissionProps */) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box alignItems="center" justifyContent="center" display="flex" flexDirection="column" padding={9}>
      <Box component="img" alt="export-image" src={successForm} loading="lazy" display="flex" alignItems="center" width="unset" />
       <Typography variant="h3" marginY={2}>{t('Thank You')}</Typography>
      <Typography variant="h5" marginY={2}>{t('Your Risk Assessment is being calculated')}</Typography>
      <Button onClick={() => navigate('/ob-connect')} >{t('BACK')}</Button>
    </Box>
  );
}

export default SuccessSubmission;
