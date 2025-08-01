import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import failForm from '../../assets/failForm.svg';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import Layout from '../../templates/Layout';

function FailSubmission() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Connect Bank Account' , href:'/'},
      ]}
    //  heading="Companies List Details"
    //  subheading="Select One Of The Supported Banks To Request Your Financial Data" */
    >
    <Box alignItems="center" justifyContent="center" display="flex" flexDirection="column" padding={9}>
      <Box component="img" alt="export-image" src={failForm} width="unset" loading="lazy" display="flex" alignItems="center" />
      <Typography variant="h3" marginY={2}>{t('Sorry')}</Typography>
      <Typography variant="h5" marginY={2}>{t('Something went wrong')}</Typography>
      <Button onClick={() => navigate('/ob-connect')} >{t('BACK')}</Button>
    </Box>
    </Layout>
  );
}

export default FailSubmission;
