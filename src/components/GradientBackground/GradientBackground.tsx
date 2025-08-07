import React, { ReactNode } from 'react';

import { Box } from '@mui/material';

interface GradientBackgroundProps {
  children: ReactNode;
  alignItems?: string | undefined;
  justifyContent?: string | undefined;
  flexDirection?: string | undefined;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children, alignItems, justifyContent, flexDirection }) => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #F26F22, #000000)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: justifyContent || 'center',
        alignItems: alignItems || 'center',
        color: 'white',
        textAlign: 'center',
        width: '100%',
        flexDirection: flexDirection || 'column',
      }}
    >
      {children}
    </Box>
  );
};

export default GradientBackground;
