import  { useId } from 'react';
import { NeotekLayout, NeotekOB } from 'neotek-ob-sdk';
import Layout from '../../templates/Layout';
import { Box } from '@mui/material';
import { useCustomer } from '../../contexts/CustomerContext/useContext';

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
  const env = 'prod';
  const {customer} = useCustomer()

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

        }}
      >
         <NeotekLayout>
              <NeotekOB
                /*   clientId="566aefcd53e306e908b7dc60a6092ec7"
                clientSecret="4e4ac28bdd731189a0e46036d1286c79"
                psuId="255cc"
                products={['ob_connect', 'iban_verification', 'income_verification', 'single_api', 'e_statements']} */
                /* clientId="566aefcd53e306e908b7dc60a6092ec7"
                clientSecret="4e4ac28bdd731189a0e46036d1286c79" */
                 clientId="fb10a17881e58a4527a13b4a0466050c"
                 clientSecret="ac9df777471afb7c760d2ffede093451"
                psuId={customer?.crNumber??'guestUser'}
                //product="ob_connect"
                product="single_api"
                theme={theme}
                baseRoute="/open-banking"
                key={key} // Replace with an actual key if needed
                env={env}
                lang={'en'}
                role='endUser'
               /*  renderError={(type, message) => {
                  const temptype = type[0].toUpperCase() + type.slice(1);
                  alertHandler(temptype, message);
                }} */
              />
            </NeotekLayout>
      </Box>
    </Layout>
  );

}

export default NeotekSDK



