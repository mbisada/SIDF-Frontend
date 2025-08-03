import { Box } from '@mui/material';
import React from 'react';

const Unauthorized: React.FC = () => {
  return (
    <Box sx={{width:'100%', display:'flex', flexDirection:'column', height:'100vh', alignItems:'center', justifyContent:'center'}}>
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
    </Box>
  );
};

export default Unauthorized;