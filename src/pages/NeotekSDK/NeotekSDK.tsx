import  { useId } from 'react';
import { NeotekLayout, NeotekOB } from 'neotek-ob-sdk';
import Layout from '../../templates/Layout';
import { Box, Button } from '@mui/material';
import { useCustomer } from '../../contexts/CustomerContext/useContext';
import { useNavigate } from 'react-router-dom';

const theme = {
  colors: {
    ///text: '#fff',
    background: '#e6f7ef',
    primary: '#F36D21',
    ternary: '#667085',
    primaryBtnBackgroundHover: '#d8f2e5',
    primaryBtnColorHover: '#667085',
    secondaryBtnBackgroundHover: '#FFFFFF',
    secondaryBtnColorHover: '#667085',
    fill: '#FFE4D4',
    // dark:'#101828',
    danger: '#FA5858',
    secondary: '#FFFFFF',
  },
};

function NeotekSDK() {

  const key = useId();
  const env = 'uat';
  const {customer} = useCustomer()
const navigate = useNavigate()

  const handleCalulate =() =>{
// TODO: CALL API TO TRIGGER CALCULATION
// BASED ON RESPONSE EITHER NAVIGATE TPO FAIL OR SUCCESS
   navigate('./success')
    navigate('./fail')
  }

    return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Connect Bank Account' , href:'/'},
      ]}
    /*   heading="Connect Bank Account"
      subheading="Select One Of The Supported Banks To Request Your Financial Data" */
    >
      <Box
        sx={{
          width: '100%',
          height: 'fit-content',
          alignItems:'center',
          display:'flex',
          flexDirection:'column',
          borderColor: 'grey'

        }}
      >
        <Box sx={{display:'flex',flexDirection:'row', justifyContent:'flex-end', width: '100%'}}>
          <Button   variant={'contained'} onClick={handleCalulate}>Calulate Risk Assessment</Button>
      </Box>
        <Box
        sx={{
          width: '100%',
          height: 'fit-content',
          alignItems:'center',
          display:'flex',
          flexDirection:'column',
         // border: '1px solid grey',
         // borderRadius: '1rem',
          marginBottom:1

        }}
      >
         <NeotekLayout>
              <NeotekOB
                 clientId="fb10a17881e58a4527a13b4a0466050c"
                 clientSecret="ac9df777471afb7c760d2ffede093451"
                psuId={customer?.crNumber??'guestUser'}
                product="single_api"
                singleApiClientManagement={false}
                theme={theme}
                baseRoute="/ob-connect"
                key={key} // Replace with an actual key if needed
                env={env}
                lang={'en'}
                role='endUser'
         
              />
            </NeotekLayout>
            </Box>

      </Box>
    </Layout>
  );

}

export default NeotekSDK



