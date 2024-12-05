// src/pages/Login.tsx
import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Link, Stack } from '@mui/material';
import GradientBackground from '../../components/GradientBackground';
import logo from '../../assets/logoWhite.svg';
import chart from '../../assets/favorite-chart.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCustomer } from '../../contexts/CustomerContext/useContext';
import { useRegisterationServices } from '../../services/registeration/registeration';
import { LoginDTOMapper } from '../../services/registeration/registerationMappers';

// Mock API call for login
const mockLoginApi = async (email: string, password: string) => {
  return new Promise<{ role: string; companyName: string; email: string; crNumber: string; mobileNumber: string; checksum: string }>(
    (resolve, reject) => {
      setTimeout(() => {
        if (email === 'user@example.com' && password === 'password') {
          resolve({
            role: 'user',
            companyName: 'testCompany',
            email: 'testemail@example.com',
            crNumber: 'testCR12345',
            mobileNumber: '966243564567',
            checksum: '12345678',
          }); // User role
        } else if (email === 'admin@example.com' && password === 'password') {
          resolve({
            role: 'admin',
            companyName: 'testCompany',
            email: 'testemail@example.com',
            crNumber: 'testCR12345',
            mobileNumber: '966243564567',
            checksum: '12345678',
          }); // Admin role
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    }
  );
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setCustomer } = useCustomer();
  const { createLoginRequest } = useRegisterationServices();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    //TODO: UNCOMMENT THIS
    /*   onSubmit: async (values, { setSubmitting, setErrors }) => {
    setIsLoading(true);
  try {
    // Call the login API with form values
    const response = await createLoginRequest({
      email: values.email,
      password: values.password,
    });

    // Map the response using the LoginDTOMapper
    const mappedData = LoginDTOMapper(response.data);

    // Check the role and navigate accordingly
    if (mappedData.role.toLowerCase().includes('user')) {
      navigate('/ob-connect'); // Navigate to user route
    } else if (mappedData.role.toLowerCase().includes('admin')) {
      navigate('/companies'); // Navigate to admin route
    }

    // Create a global customer object
    const registeredCustomer = {
      companyName: mappedData.companyName,
      email: mappedData.email,
      crNumber: mappedData.crNumber,
      mobileNumber: mappedData.mobileNumber,
      role: mappedData.role,
      checksum: response.data.checksum, // Assuming the token is available in the response
    };

    // Set the customer globally (using a context or global state manager)
    setCustomer(registeredCustomer);

  } catch (error: any) {
    // Handle API errors and display them
    setErrors({ email: error.response?.data?.message || error.message });
  } finally {
    // Stop form submission spinner
    setSubmitting(false);
    setIsLoading(false);
  }
} */
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await mockLoginApi(values.email, values.password);

        if (response.role.toLowerCase().includes('user')) {
          //navigate('/ob-connect'); // Navigate to user route
          // Retrieve the `from` state or set a default path
          const from = (location.state as { from?: Location })?.from?.pathname || '/ob-connect';

          navigate(from, { replace: true });
        } else if (response.role.toLowerCase().includes('admin')) {
          const from = (location.state as { from?: Location })?.from?.pathname || '/companies';
          navigate(from, { replace: true });

          //navigate('/companies'); // Navigate to admin route
        }

        const registeredCustomer = {
          companyName: response.companyName,
          email: response.email,
          crNumber: response.crNumber,
          mobileNumber: response.mobileNumber,
          role: response.role,
          checksum: response.checksum,
        };

        setCustomer(registeredCustomer);
      } catch (error: any) {
        setErrors({ email: error.message }); // Display error on email field
      } finally {
        setSubmitting(false);
      }
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
        <Typography variant="h4" gutterBottom color="white">
          Welcome
        </Typography>
        <Typography variant="body1" color="white" gutterBottom paddingBottom={2}>
          Please log in to access your dashboard
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              variant="filled"
              label="Email"
              type="email"
              name="email"
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
              label="Password"
              type="password"
              name="password"
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={formik.isSubmitting}
              sx={{
                padding: 1,
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              {formik.isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
            <Typography variant="body2" color="white">
              Don’t have an account?{' '}
              <Link href="/register" underline="none" color="white">
                Sign up
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

export default Login;
