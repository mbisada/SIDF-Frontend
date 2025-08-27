import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { Box } from '@mui/material';

interface SpinnerProps {
  loading?: boolean;
  cssOverride?: React.CSSProperties;
}

const Spinner: React.FC<SpinnerProps> = ({ loading, cssOverride }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: '20vh', ...cssOverride }}>
      <ClipLoader
        color={'#F36D21'}
        loading={loading}
        cssOverride={cssOverride}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Box>
  );
};

export default Spinner;
