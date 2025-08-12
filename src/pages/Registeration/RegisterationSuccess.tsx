import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import GradientBackground from '../../components/GradientBackground';

import Success from '../../assets/success.svg';
import logo from '../../assets/logoWhite.svg';

const RegisterationSuccess = () => {
  const navigate = useNavigate();

  return (
    <GradientBackground justifyContent="space-between">
      <Box></Box>
      <Box>
        <Box
          component="img"
          loading="lazy"
          sx={{
            height: 'auto',
            width: 180,
          }}
          alt="neotek logo"
          src={Success}
          marginBottom={6}
          paddingTop={1}
        />
        <Typography style={{ fontWeight: '600', fontSize: '26px' }}>Thank You</Typography>
        <Typography style={{ fontWeight: '400', fontSize: '25px' }}>Your account has been created successfully </Typography>
        <Button
          onClick={() => navigate('/login')}
          style={{ border: '1px solid white', padding: '8px 90px', marginTop: '45px', color: 'white', backgroundColor: '#FFFFFF4D' }}
        >
          Login
        </Button>
      </Box>
      <Box
        component="img"
        loading="lazy"
        sx={{
          height: 'auto',
          width: 180,
        }}
        alt="neotek logo"
        src={logo}
        marginBottom={6}
        paddingTop={1}
      />
    </GradientBackground>
  );
};

export default RegisterationSuccess;
