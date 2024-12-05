import { useId, useState } from 'react';
import { NeotekLayout, NeotekOB } from 'neotek-ob-sdk';
import Layout from '../../templates/Layout';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useCustomer } from '../../contexts/CustomerContext/useContext';
import { useNavigate } from 'react-router-dom';
import { useUserServices } from '../../services/user/user';

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

function NeotekSDK() {
  const key = useId();
  const env = 'prod';
  const { customer } = useCustomer();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { initiateCalculateRequest } = useUserServices();

  const handleClose = async () => {
    setOpen(false);
    // TODO: CALL API TO TRIGGER CALCULATION
    // BASED ON RESPONSE EITHER NAVIGATE TPO FAIL OR SUCCESS
    try {
      await initiateCalculateRequest();
      navigate('./success');
    } catch (error) {
      navigate('./fail');
    }
  };

  const handleCalulate = () => {
    setOpen(true);
  };

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Connect Bank Account', href: '/' },
      ]}
      /*   heading="Connect Bank Account"
      subheading="Select One Of The Supported Banks To Request Your Financial Data" */
    >
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
            Calulate Risk Assessment
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
              clientId="fb10a17881e58a4527a13b4a0466050c"
              clientSecret="ac9df777471afb7c760d2ffede093451"
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
