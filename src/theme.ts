


import {  responsiveFontSizes } from '@mui/material/styles';
import createTheme from "@mui/material/styles/createTheme";
// Define base theme
const baseTheme = createTheme({
  palette: {
    primary: {
      main: 'rgba(243, 109, 33, 1)',
      light: '#FFE5B4',
      dark: 'rgba(181, 71, 8, 1)',
      contrastText: 'rgba(255, 255, 255, 1)',
    },
    secondary: {
      main: 'rgba(52, 64, 84, 1)',
    },
    info: {
      //main: 'rgba(0, 0, 0, 0.54)',
      main: 'rgba(208, 213, 221, 1)',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    text: {
      primary: '#000000', // White text
      secondary: '#B3B3B3', // Light gray for secondary text
    },
  },
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1440, xl: 1546 } },
});

// Create the theme with responsive typography
export let MuiTheme = createTheme(baseTheme, {
  typography: {
    //  ...getTypography(getItem('code') ? 'en' : ''),
    h1: {
      [baseTheme.breakpoints.only('lg')]: {
        fontSize: '3.25rem !important', // 60px // was 3.75
      },
      [baseTheme.breakpoints.only('md')]: {
        fontSize: '2.5rem !important',
      },
      [baseTheme.breakpoints.only('sm')]: {
        fontSize: '2rem !important',
      },
      [baseTheme.breakpoints.only('xs')]: {
        fontSize: '1.75rem !important',
      },
      fontWeight: 600,
      lineHeight: 1.2, // 72px
      color: 'rgba(16, 24, 40, 1)',
    },
    h2: {
      [baseTheme.breakpoints.only('lg')]: {
        fontSize: '2.5rem !important', // 48px // was 3
      },
      fontWeight: 600,
      lineHeight: 1.25, // 60px
      color: 'rgba(16, 24, 40, 1)',
    },
    h3: {
      [baseTheme.breakpoints.only('lg')]: {
        fontSize: '2rem !important', // 36px
      },
      [baseTheme.breakpoints.only('md')]: {
        fontSize: '1.9rem !important',
      },
      [baseTheme.breakpoints.only('sm')]: {
        fontSize: '1.75rem !important',
      },
      [baseTheme.breakpoints.only('xs')]: {
        fontSize: '1.5rem !important',
      },
      fontWeight: 600,
      lineHeight: 1.23, // 44px
      color: 'rgba(16, 24, 40, 1)',
    },
    h4: {
      [baseTheme.breakpoints.only('lg')]: {
        fontSize: '1.8rem !important', // 30px was 1.875
      },
      [baseTheme.breakpoints.only('md')]: {
        fontSize: '1.5rem !important',
      },
      [baseTheme.breakpoints.only('sm')]: {
        fontSize: '1.3rem !important',
      },
      [baseTheme.breakpoints.only('xs')]: {
        fontSize: '1.3rem !important',
      },
      fontWeight: 600,
      lineHeight: 1.3, // 38px
      color: 'rgba(16, 24, 40, 1)',
    },
    h5: {
      [baseTheme.breakpoints.only('lg')]: {
        fontSize: '1.2rem !important', // 20px // was 1.25
      },
      [baseTheme.breakpoints.only('md')]: {
        fontSize: '1rem !important',
      },
      [baseTheme.breakpoints.only('sm')]: {
        fontSize: '1rem !important',
      },
      [baseTheme.breakpoints.only('xs')]: {
        fontSize: '1rem !important',
      },
      fontWeight: 400,
      lineHeight: 1.5, // 30px
      color: 'rgba(71, 84, 103, 1)',
    },
    subtitle1: {
      [baseTheme.breakpoints.only('lg')]: {
        fontSize: '1.1rem !important', // 18px was 1.125
      },
      fontWeight: 400,
      lineHeight: 1.6, // 28px
      color: 'rgba(71, 84, 103, 1)',
    },
    subtitle2: {
      [baseTheme.breakpoints.only('lg')]: {
        fontSize: '1.12rem !important', // 20px was 1.25
      },
      [baseTheme.breakpoints.only('md')]: {
        fontSize: '1rem !important',
      },
      [baseTheme.breakpoints.only('sm')]: {
        fontSize: '1rem !important',
      },
      [baseTheme.breakpoints.only('xs')]: {
        fontSize: '1rem !important',
      },
      fontWeight: 600,
      lineHeight: 1.5, // 30px
      color: 'rgba(16, 24, 40, 1)',
    },
    body2: {
      [baseTheme.breakpoints.only('lg')]: {
        fontSize: '1rem !important', // 16px was 1
      },
      fontWeight: 400,
      lineHeight: 1.5, // 24px
      color: 'rgba(71, 84, 103, 1)',
    },
    caption: {
      [baseTheme.breakpoints.only('lg')]: {
        fontSize: '0.822rem', // 14px was 0.875rem
      },
      fontWeight: 500,
      lineHeight: 1.5, // 28px
      color: 'rgba(52, 64, 84, 1)',
    },
  },
});

// Make the theme responsive
MuiTheme = responsiveFontSizes(MuiTheme, { breakpoints: ['xs', 'sm', 'md', 'lg'], factor: 2 });



/* // src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F26F22', // Neotek orange
    },
    secondary: {
      main: '#FFFFFF', // White for contrast
    },
    background: {
      default: '#000000', // Black for gradient base
    },
    text: {
      primary: '#FFFFFF', // White text
      secondary: '#B3B3B3', // Light gray for secondary text
    },
  },
  typography: {
    fontFamily: "'IBM Plex Sans', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none', // Keep buttons text lowercase for a modern look
    },
  },
});

export default theme;
 */