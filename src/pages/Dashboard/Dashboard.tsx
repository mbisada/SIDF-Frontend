import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Layout from '../../templates/Layout';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function Dashboard() {
  return (
   

    <div>   
        <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Request Details' , href:'/'},
      ]}
      heading="Request Details"
    >
      
      <Box
        sx={{
          width: '100%',
          height: 'fit-content',
          display:'flex',
          flexDirection:'row',
          flexWrap: 'wrap',
          alignItems:'center',
          justifyContent:'space-between',
          backgroundColor: grey[400],
          borderRadius: '1rem',
          padding:3
        }}
      >
       <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
      </Box>
    </Layout>
  </div>
  );
}
