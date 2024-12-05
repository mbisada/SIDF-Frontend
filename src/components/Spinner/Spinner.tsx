import { Box } from '@mui/material';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface SpinnerProps {
  color: string;
  loading?: boolean;
  cssOverride?: React.CSSProperties;
}

const Spinner: React.FC<SpinnerProps> = ({ color, loading, cssOverride }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={cssOverride}>
      <ClipLoader color={color} loading={loading} cssOverride={cssOverride} size={150} aria-label="Loading Spinner" data-testid="loader" />
    </Box>
  );
};

export default Spinner;
