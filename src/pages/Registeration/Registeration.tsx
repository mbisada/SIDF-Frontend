// src/pages/Registration.tsx
import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Link,
  Stack,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import GradientBackground from '../../components/GradientBackground';
import logo from '../../assets/logoWhite.svg';
import { useCustomer } from '../../contexts/CustomerContext/useContext';

// Validation schema using Yup
const validationSchema = Yup.object({
  companyName: Yup.string().required('Company Name is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  crNumber: Yup.string().required('CR Number is required'),
  mobileNumber: Yup.string()
/*     .matches(/^\d+$/, 'Mobile Number must contain only digits')
    .min(10, 'Mobile Number must be at least 10 digits') */
    .required('Mobile Number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const { setCustomer } = useCustomer();

  const formik = useFormik({
    initialValues: {
      companyName: '',
      email: '',
      crNumber: '',
      mobileNumber: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form Submitted', values);
      // Navigate to the login page upon successful submission
    const registeredCustomer = {
      companyName: formik.values.companyName,
      email: formik.values.email,
      crNumber: formik.values.crNumber,
      mobileNumber: formik.values.mobileNumber,
      password: formik.values.password,
      role:'user'
    };

    setCustomer(registeredCustomer);
    console.log('Customer registered and saved globally!');
    // TODO: CALL API REGISTER
      navigate('/login');
    },
  });

  return (
    <GradientBackground>
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom color="text.primary">
          Registration
        </Typography>
        <Typography variant="body1" color="text.primary" gutterBottom paddingBottom={2}>
          Create your account
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Company Name"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.companyName && Boolean(formik.errors.companyName)}
              helperText={formik.touched.companyName && formik.errors.companyName}
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="CR Number"
              name="crNumber"
              value={formik.values.crNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.crNumber && Boolean(formik.errors.crNumber)}
              helperText={formik.touched.crNumber && formik.errors.crNumber}
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Mobile Number"
              name="mobileNumber"
              type="tel"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
              helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: 1,
                borderRadius: 2,
                fontWeight: 700,
              }}
              type="submit"
            >
              Sign Up
            </Button>
            <Typography variant="body2" color="text.primary">
              Have an account?{' '}
              <Link href="/login" underline="none" color="text.primary">
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
        <Typography variant="h4" gutterBottom color="text.primary">
          Securely Connect and Simplify Your Path to Financial Support
        </Typography>
        <Typography variant="body1" gutterBottom color="text.primary">
          Our portal ensures safe, transparent, and efficient sharing of financial data, enabling Fund X to provide tailored funding solutions that meet your needs.
        </Typography>
        <Typography variant="body1" color="text.primary" gutterBottom paddingTop={5}>
          Powered by neotek
        </Typography>
      </Box>
    </GradientBackground>
  );
};

export default Registration;
