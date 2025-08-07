// src/pages/Registration.tsx
//import Spinner from '../../components/Spinner';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

//import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, /*  Button, */ Link, Stack, TextField, Typography } from '@mui/material';

import chart from '../../assets/favorite-chart.svg';
import logo from '../../assets/logoWhite.svg';
import GradientBackground from '../../components/GradientBackground';
import { useCustomer } from '../../contexts/CustomerContext/useContext';
import { useRegisterationServices } from '../../services/registeration/registeration';
import { RegisterationDTOMapper } from '../../services/registeration/registerationMappers';

// Validation schema using Yup
const validationSchema = Yup.object({
  companyName: Yup.string().required('Company Name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  crNumber: Yup.string().required('CR Number is required'),
  mobileNumber: Yup.string()
    /*     .matches(/^\d+$/, 'Mobile Number must contain only digits')
    .min(10, 'Mobile Number must be at least 10 digits') */
    .required('Mobile Number is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
});

const Registration = () => {
  const navigate = useNavigate();
  const { setCustomer } = useCustomer();
  const { createRegisterationRequest } = useRegisterationServices();
  const [isLoading, setIsLoading] = useState(false);
  //const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      companyName: '',
      email: '',
      crNumber: '',
      mobileNumber: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      // Navigate to the login page upon successful submission
      const registeredCustomer = {
        companyName: formik.values.companyName,
        email: formik.values.email,
        psuid: formik.values.crNumber,
        mobileNumber: formik.values.mobileNumber,
        password: formik.values.password,
        referalCode: 'AK2M12dDvUtoJWMSnkhp5w=='
        //role:'user'
      };

      // Api call to register
      setIsLoading(true);
      void (await createRegisterationRequest(registeredCustomer)
        .then(response => RegisterationDTOMapper(response.data))
        .then(data => {
          setCustomer({
            companyName: data.companyName,
            email: data.email,
            crNumber: data.psuid,
            mobileNumber: data.mobileNumber,
            password: formik.values.password,
            role: data.role,
          });
          navigate('/login');
        })
        .catch(() => {
          return;
        })
        .finally(() => setIsLoading(false)));
    },
  });

  // if (isLoading) return <Spinner />;
  /* 
  return (
    <GradientBackground>
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom color="white">
          {t('REGISTERATION')}
        </Typography>
        <Typography variant="body1" color="white" gutterBottom paddingBottom={2}>
          {t('CREATE_YOUR_ACCOUNT')}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              variant="filled"
              label={t('COMPANY_NAME')}
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.companyName && Boolean(formik.errors.companyName)}
              helperText={formik.touched.companyName && formik.errors.companyName}
              InputProps={{
                style: { color: 'black', backgroundColor: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label={t('EMAIL')}
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                style: { color: 'black', backgroundColor: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label={t('CR_NUMBER')}
              name="crNumber"
              value={formik.values.crNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.crNumber && Boolean(formik.errors.crNumber)}
              helperText={formik.touched.crNumber && formik.errors.crNumber}
              InputProps={{
                style: { color: 'black', backgroundColor: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label={t('MOBILE_NUMBER')}
              name="mobileNumber"
              type="tel"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
              helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
              InputProps={{
                style: { color: 'black', backgroundColor: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label={t('PASSWORD')}
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                style: { color: 'black', backgroundColor: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />
            <LoadingButton
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: 1,
                borderRadius: 2,
                fontWeight: 700,
              }}
              type="submit"
              loading={isLoading}
            >
              {t('SIGN_UP')}
            </LoadingButton>
            <Typography variant="body2" color="white">
              {t('HAVE_ACCOUNT')}{' '}
              <Link href="/login" underline="none" color="white">
                {t('LOGIN')}
              </Link>
            </Typography>
          </Stack>
        </form>

        <Box
          component="img"
          loading="lazy"
          sx={{
            height: 40,
            width: 120,
          }}
          alt="neotek logo"
          src={logo}
          marginTop={6}
          paddingTop={1}
        />
      </Box>

      <Box
        sx={{
          width: '50%',
          padding: 6,
          borderLeft: '1px solid grey',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
        }}
      >
        <Box
          component="img"
          loading="lazy"
          sx={{
            height: 'auto',
            width: 80,
          }}
          alt="neotek logo"
          src={chart}
          marginBottom={6}
          paddingTop={1}
        />
        <Typography variant="h4" gutterBottom color="white">
          Securely Connect and Simplify Your Path to Financial Support
        </Typography>
        <Typography variant="body1" gutterBottom color="white">
          Our portal ensures safe, transparent, and efficient sharing of financial data, enabling Fund X to provide tailored funding
          solutions that meet your needs.
        </Typography>
        <Typography variant="body1" color="white" gutterBottom paddingTop={5}>
          Powered by neotek
        </Typography>
      </Box>
    </GradientBackground>
  );
}; */
  return (
    <GradientBackground flexDirection='row'>
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom color="white">
          Registration
        </Typography>
        <Typography variant="body1" color="white" gutterBottom paddingBottom={2}>
          Create your account
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              variant="filled"
              label="Company Name"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.companyName && Boolean(formik.errors.companyName)}
              helperText={formik.touched.companyName && formik.errors.companyName}
              InputProps={{
                style: { color: 'black', backgroundColor: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                style: { color: 'black', backgroundColor: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="CR Number"
              name="crNumber"
              value={formik.values.crNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.crNumber && Boolean(formik.errors.crNumber)}
              helperText={formik.touched.crNumber && formik.errors.crNumber}
              InputProps={{
                style: { color: 'black', backgroundColor: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Mobile Number"
              name="mobileNumber"
              type="tel"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
              helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
              InputProps={{
                style: { color: 'black', backgroundColor: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                style: { color: 'black', backgroundColor: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />
            <LoadingButton
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: 1,
                borderRadius: 2,
                fontWeight: 700,
              }}
              type="submit"
              loading={isLoading}
            >
              Sign Up
            </LoadingButton>
            <Typography variant="body2" color="white">
              Have an account?{' '}
              <Link href="/login" underline="none" color="white">
                Login
              </Link>
            </Typography>
          </Stack>
        </form>

        <Box
          component="img"
          loading="lazy"
          sx={{
            height: 40,
            width: 120,
          }}
          alt="neotek logo"
          src={logo}
          marginTop={6}
          paddingTop={1}
        />
      </Box>

      <Box
        sx={{
          width: '50%',
          padding: 6,
          borderLeft: '1px solid grey',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
        }}
      >
        <Box
          component="img"
          loading="lazy"
          sx={{
            height: 'auto',
            width: 80,
          }}
          alt="neotek logo"
          src={chart}
          marginBottom={6}
          paddingTop={1}
        />
        <Typography variant="h4" gutterBottom color="white">
          Securely Connect and Simplify Your Path to Financial Support
        </Typography>
        <Typography variant="body1" gutterBottom color="white">
          Our portal ensures safe, transparent, and efficient sharing of financial data, enabling Fund X to provide tailored funding
          solutions that meet your needs.
        </Typography>
        <Typography variant="body1" color="white" gutterBottom paddingTop={5}>
          Powered by neotek
        </Typography>
      </Box>
    </GradientBackground>
  );
};

export default Registration;
