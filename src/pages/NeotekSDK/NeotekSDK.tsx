import { useState } from 'react';
import { NeotekLayout, NeotekOB } from 'neotek-ob-sdk';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Button, Modal, Stack, Typography } from '@mui/material';

import { useCustomer } from '../../contexts/CustomerContext/useContext';
import { useUserServices } from '../../services/user/user';
import Layout from '../../templates/Layout';

const theme = {
  colors: {
    ///text: '#fff',
    background: '#e6f7ef',
    primary: '#F36D21',
    ternary: '#667085',
    primaryBtnBackgroundHover: '#d8f2e5',
    primaryBtnColorHover: '#667085',
    secondaryBtnBackgroundHover: '#FFFFFF',
    secondaryBtnColorHover: '#667085',
    fill: '#FFE4D4',
    // dark:'#101828',
    danger: '#FA5858',
    secondary: '#FFFFFF',
  },
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 2,
};

type EnvType = 'prod' | 'uat';

function NeotekSDK() {
  const { key } = useLocation();
  const env = `${import.meta.env.VITE_ENV}` as EnvType;
  const { customer } = useCustomer();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { initiateCalculateRequest } = useUserServices();
  const { t } = useTranslation();

  const handleClose = async () => {
    setOpen(false);
    // BASED ON RESPONSE EITHER NAVIGATE TPO FAIL OR SUCCESS
    try {
      const response = await initiateCalculateRequest();
      if (response?.data.code === 400 && response?.data.fault.statusDescription.includes('[Calculation Request Already done],')) {
        navigate('./fail');
      } else navigate('./success');
    } catch {
      navigate('./fail');
      return null;
    }
  };

  const handleCalulate = () => {
    setOpen(true);
  };

  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          height: 'fit-content',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          borderColor: 'grey',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
          <Button variant={'contained'} onClick={handleCalulate}>
            {t('CALCULATE_RISK_ASSESMENT')}
          </Button>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 'fit-content',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            // border: '1px solid grey',
            // borderRadius: '1rem',
            marginBottom: 1,
          }}
        >
          <NeotekLayout>
            <NeotekOB
              clientId={import.meta.env.VITE_OB_CLIENT_ID}
              clientSecret={import.meta.env.VITE_OB_CLIENT_SECRET}
              psuId={customer?.crNumber ?? 'guestUser'}
              product="single_api"
              singleApiClientManagement={false}
              theme={theme}
              baseRoute="/ob-connect"
              key={key} // Replace with an actual key if needed
              env={env}
              lang={'en'}
              role="endUser"
            />
          </NeotekLayout>
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
            Be Aware!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="body2">
            Kindly note that the calculated assessment will be based on the last shared data and you will be able to calculate it only one
            time
          </Typography>
          <Stack direction={'row'} justifyContent={'space-between'} mt={3}>
            <Button onClick={handleClose}>Agree and continue</Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </Layout>
  );
}

export default NeotekSDK;
