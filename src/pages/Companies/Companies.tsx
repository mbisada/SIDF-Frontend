import { useEffect, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';

import CompanyCard from '../../components/CompanyCard';
import Spinner from '../../components/Spinner';
import { useAdminServices } from '../../services/admin/admin';
import { CompaniesListDTO, Company } from '../../services/admin/admin.types';
import { CompaniesListDTOMapper } from '../../services/admin/adminDTOMappers';
import Layout from '../../templates/Layout';
import Referral from '../../assets/referral.svg';
import { useCustomer } from '../../contexts/CustomerContext/useContext';
import CopyIcon from '../../assets/CopyIcon.svg';
import CloseButton from '../../assets/CloseButton.svg';

function Companies() {
  const [companiesList, setCompaniesList] = useState<Company[]>();
  const [isLoading, setIsLoading] = useState(true);
  const { getCompaniesList } = useAdminServices();
  const [showDialouge, setShowDialouge] = useState<boolean>();
  const { customer } = useCustomer();

  useEffect(() => {
    setIsLoading(true);
    void getCompaniesList('COMPLETED') //NOW WE GET NEW REQUESTS ONLY
      .then(data => CompaniesListDTOMapper(data.data as unknown as CompaniesListDTO))
      .then(result => setCompaniesList(result))
      .catch(() => {
        return;
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Spinner />;

  const textToCopy = `${import.meta.env.VITE_BACKEND_BASE_URL_NAVIGATION}/register?referalCode=${customer?.referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <>
      <Layout
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Companies List Details', href: '/companies' },
        ]}
      // heading="Companies List Details"
      //  subheading="Select One Of The Supported Banks To Request Your Financial Data" */
      >
        <Box
          sx={{
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '16px' }}>
            <Typography color="#151538" variant={'h5'} fontWeight={'semibold'}>
              Companies List Details
            </Typography>
            <Button
              onClick={() => {
                setShowDialouge(true);
              }}
              variant={'contained'}
            >
              <Typography color="white" variant={'body2'} fontWeight={'bold'}>
                Generate referral code
              </Typography>
            </Button>
          </Box>

          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              rowGap: '16px',
            }}
          >
            {companiesList &&
              companiesList.length > 0 &&
              companiesList?.map(company => {
                console.log("company", company)
                return <CompanyCard identifier={company.companyName} key={company.psuid} calculationStatus={company.calculationStatus} crNumber={company.psuid ?? ''} />;
              })}
          </div>
        </Box>
      </Layout>

      {showDialouge && (
        <Box
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            width: '100%',
            height: '100%',
            zIndex: 100,
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            left: 240,
          }}
          display={'flex'}
        >
          <Box
            style={{
              flexDirection: 'column',
              padding: '16px',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              width: '640px',
              height: 'auto',
              backgroundColor: 'white',
              borderRadius: '12px',
            }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',

                  columnGap: '16px',
                }}
              >
                <Box
                  style={{ alignSelf: 'center' }}
                  component="img"
                  loading="lazy"
                  sx={{
                    height: '65px',
                    width: '65px',
                  }}
                  alt="neotek logo"
                  src={Referral}
                  paddingTop={1}
                />
                <Box style={{}}>
                  <Typography variant={'h6'}>Generate referral code</Typography>

                  <Typography variant={'body2'} color="#475467" fontWeight={'400'} fontSize={'13px'} style={{ marginTop: 0 }}>
                    Change this later
                  </Typography>
                </Box>
              </Box>
              <Box
                style={{}}
                component="img"
                loading="lazy"
                sx={{
                  height: '25px',
                  width: '25px',
                  paddingTop: '10px',
                }}
                alt="neotek logo"
                src={CloseButton}
                paddingTop={1}
                onClick={() => {
                  setShowDialouge(false);
                }}
              />
            </Box>
            <Typography variant={'body2'} color="#475467" fontWeight={'400'} fontSize={'15px'} style={{ marginTop: 20 }}>
              Copy link url below
            </Typography>
            <Box
              style={{
                padding: '10px',
                borderRadius: '7px',
                margin: '20px 0',
                backgroundColor: '#1018280D',
                width: '100%',
                height: 'auto',
              }}
            >
              <Typography variant={'body2'} color="#101828" fontWeight={'400'} fontSize={'15px'} style={{ marginTop: 0 }}>
                {textToCopy}
              </Typography>
            </Box>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                columnGap: '10px',
                width: '100%',
                height: 'auto',
              }}
            >
              <Typography variant={'body2'} color="#475467" fontWeight={'400'} fontSize={'13px'} style={{ marginTop: 0 }}>
                Cancel
              </Typography>
              <Button
                style={{ alignSelf: 'center', display: 'flex', flexDirection: 'row', columnGap: '10px' }}
                onClickCapture={() => {
                  handleCopy();
                }}
                variant={'contained'}
                onClick={() => {
                  setShowDialouge(false);
                }}
              >
                <Box
                  style={{ alignSelf: 'center' }}
                  component="img"
                  loading="lazy"
                  sx={{
                    height: '25px',
                    width: '25px',
                    paddingTop: '0px',
                  }}
                  alt="neotek logo"
                  src={CopyIcon}
                  paddingTop={1}
                />
                <Typography variant={'body2'} color="white" fontWeight={'400'} fontSize={'13px'} style={{ marginTop: 0 }}>
                  Copy Url
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Companies;
