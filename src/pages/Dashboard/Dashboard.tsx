import {useState, useEffect} from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Layout from '../../templates/Layout';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import ProfileCard from '../../components/ProfileCard';

export default function Dashboard() {
const [companyDetails, setCompanyDetails] = useState({role: '' , companyName: '',
      email: '',
      crNumber: '',
      mobileNumber: '',
      })

  useEffect(()=>{
    //TODO: API CALL TO GET THE DETAILS OF THE COMPANY BY THE ID
    setCompanyDetails({
      role: 'admin', 
      companyName: 'testCompany',
      email: 'testemail@example.com',
      crNumber: 'testCR12345',
      mobileNumber: '966243564567',
      //token:'12345678'
    })
    //TODO: API CALL TO GET THE DATA OF THE DASHBAORD
  },[])
  return (
    <div>   
        <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Companies List Details' , href:'/companies'},
        { label: 'Request Details' , href:'/'},
      ]}
      heading="Request Details"
    >
      <ProfileCard crNumber={companyDetails.crNumber} mobileNumber={companyDetails.mobileNumber} email={companyDetails.email} companyName={companyDetails.companyName} />
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
