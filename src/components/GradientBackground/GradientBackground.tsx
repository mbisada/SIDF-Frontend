import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface GradientBackgroundProps {
  children: ReactNode;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children }) => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #F26F22, #000000)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        width: '100%'
      }}
    >
      {children}
    </Box>
  );
};

export default GradientBackground;
