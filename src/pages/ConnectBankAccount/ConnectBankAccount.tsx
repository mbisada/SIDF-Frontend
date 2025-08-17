import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Link, Typography } from '@mui/material';
import Layout from '../../templates/Layout';
import { useUserProfileServices } from '../../services/user/profiles';
import Spinner from '../../components/Spinner';

type ListProps = {
  accounts: Array<{ FinancialInstitutionName: { NameEn: string }; Logo: string }>;
  selected: number;
  setSelected: (index: number) => void;
};

const List = ({ accounts, selected, setSelected }: ListProps) => {
  return accounts.map((account, index) => (
    <Box
      key={index}
      style={{
        flexDirection: 'row',
        display: 'flex',
        paddingLeft: '26.3px',
        paddingRight: '26.3px',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: selected === index ? '#FFEEE4' : '#FFF',
        height: '110px',
        marginTop: 10,
        borderRadius: '26px',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: selected === index ? '#F36D21' : '#E1E1E1',
      }}
      onClick={() => {
        setSelected(index);
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
        src={account.Logo}
        paddingTop={1}
      />
      <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'24px'} style={{ marginLeft: 13, alignSelf: 'center' }}>
        {account.FinancialInstitutionName.NameEn}
      </Typography>
    </Box>
  ));
};

const ConnectBankAccount: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(-1);
  const [loading, setLoading] = useState(false);
  const { getFinacialInstitutions } = useUserProfileServices();

  const [financialInstitutions, setFinancialInstitutions] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    getFinacialInstitutions()
      .then(res => {
        setFinancialInstitutions(res.data.Data.FinancialInstitution);
      })
      .catch(error => {
        console.error('Error initiating profile request:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Companies List Details', href: '/companies' },
        { label: 'Request Details', href: '/' },
      ]}
      heading=""
    >
      <Box
        style={{ flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'center', paddingLeft: '20px' }}
        sx={{}}
      >
        <Typography variant="body2" color="white" fontWeight={'500'} fontSize={'14px'} style={{}}>
          <Link href="/register" underline="none" color="#9D9D9D" fontWeight={'400'} fontSize={'10px'}>
            {'Dashboard > Dashboard'}
          </Link>
          <Typography variant="body2" color="black" fontWeight={'600'} fontSize={'24px'} style={{}}>
            {'Connect Bank Account'}
          </Typography>
          <Typography variant="body2" color="#7D7D7D" fontWeight={'400'} fontSize={'18px'} style={{ marginTop: 8 }}>
            {'Select one of the supported banks to request your financial data'}
          </Typography>
        </Typography>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
                width: '70%',
                margin: 'auto',
                alignSelf: 'center',
                marginTop: '20px',
              }}
            >
              <List accounts={financialInstitutions} selected={selected} setSelected={setSelected} />
            </Box>

            <Box
              style={{
                flexDirection: 'column',
                width: '84%',
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
                justifyContent: 'flex-end',
                marginTop: 50,
                height: '48px',
                marginLeft: 10,
              }}
              display={'flex'}
            >
              <Button
                type="submit"
                variant="contained"
                autoCapitalize="off"
                disableElevation
                style={{
                  backgroundColor: '#F36D21',
                  width: '140px',
                  height: '48px',
                  borderRadius: '10px',
                  textTransform: 'none',
                }}
                onClick={() => {
                  if (selected != -1) {
                    navigate('/ob-connect/review', { state: { inistituation: financialInstitutions[selected] } } as any);
                  }
                }}
                fullWidth
                sx={{
                  padding: 1,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: '18px',
                }}
              >
                {'Next'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default ConnectBankAccount;
