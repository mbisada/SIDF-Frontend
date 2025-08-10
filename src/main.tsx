import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { MuiTheme } from './theme';
import { CustomerProvider } from './contexts/CustomerContext/CustomerContext.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={MuiTheme}>
    <CssBaseline />
    <CustomerProvider>
      <App />
    </CustomerProvider>
  </ThemeProvider>
);
