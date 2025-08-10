import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import raghiSuccessForm from '../../assets/raghiSuccessForm.svg';
import ReactLoading from 'react-loading';
import BottomBar from '../RaghiLogin/BottomBar';
import { useState } from 'react';
const RaghiBankSuccessfullyLogin: React.FC = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);

  setTimeout(() => {
    setShowLoading(true);
  }, 2000);

  setTimeout(() => {
    navigate('/raghi-home');
  }, 5000);
  return (
    <>
      <Box
        style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', height: '100vh' }}
        display={'flex'}
        sx={{
          width: { xs: '100%', md: '100%' },

          padding: 3,
          borderRadius: 2,
        }}
        height={'100vh'}
      >
        <Box style={{ width: '400px', height: '80px', marginTop: 10, borderRadius: '26px' }} />
        <Box style={{ flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }} display={'flex'}>
          <Box
            component="img"
            loading="lazy"
            sx={{
              height: '300px',
              width: '300px',
            }}
            alt="neotek logo"
            src={raghiSuccessForm}
          />
          <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'18px'} style={{ marginTop: 23 }}>
            Thank You
          </Typography>
          <Typography variant="body2" color="#9F9F9F" fontWeight={'bold'} fontSize={'14px'} style={{ marginTop: 23, textAlign: 'center' }}>
            {'PASP Authenticated, We are securely transferring you'}
            <br />
            {'to SIDF.'}
          </Typography>
        </Box>

        <div style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'center' }}>
          <BottomBar />
        </div>
      </Box>

      {showLoading && (
        <Box
          style={{
            width: '100%',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          display={'flex'}
        >
          <ReactLoading type="spin" color="white" height={50} width={50} />;
        </Box>
      )}
    </>
  );
};

export default RaghiBankSuccessfullyLogin;
