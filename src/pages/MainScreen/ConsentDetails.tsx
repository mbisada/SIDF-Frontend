import { Box, Button, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../templates/Layout';
import { useUserProfileServices } from '../../services/user/profiles';
import { useCustomer } from '../../contexts/CustomerContext/useContext';
import Spinner from '../../components/Spinner';
import emptyList from '../../assets/emptylist.svg';
import { useSnackbar } from '../../utils/SnackBarProvider';

const ConsentDetails: React.FC<{ calculated: boolean }> = ({ calculated }) => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [accounts, setAccounts] = useState([]);
  const { ListUserAccounts, calculateAccount } = useUserProfileServices();
  const { customer } = useCustomer();
  const [loading, setLoading] = useState(false);
  const fetchAccounts = () => {
    setLoading(true);
    ListUserAccounts(calculated, customer?.crNumber || '')
      .then(res => {
        setAccounts(res.data.data?.returnedObj[0]?.Data?.AccountsLinks);
      })
      .catch(error => {
        console.error('Error fetching user accounts:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (customer?.crNumber) {
      fetchAccounts();
    }
  }, [customer?.crNumber, calculated]);

  const calculateAndSubmit = ({ AccountsLinkId, FinancialInstitutionId }: { AccountsLinkId: string; FinancialInstitutionId: string }) => {
    setLoading(true);
    calculateAccount({ AccountsLinkId, FinancialInstitutionId })
      .then(() => {
        showSnackbar('Account calculated successfully', 'success');
        setTimeout(() => {
          fetchAccounts();
        }, 2000);
      })
      .catch(error => {
        console.error('Error calculating account:', error);
        showSnackbar('Error calculating account', 'error');
      });
  };

  function List() {
    if (accounts.length === 0)
      return (
        <Box sx={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
          <Box
            component="img"
            loading="lazy"
            sx={{
              height: 'auto',
              width: 100,
              marginBottom: 3,
              marginTop: 4,
            }}
            alt="empty accounts list"
            src={emptyList}
            paddingTop={1}
          />
          <Typography style={{ fontWeight: '600', fontSize: '25px' }}>No accounts found</Typography>
        </Box>
      );
    return accounts.map((account: any, index: number) => {
      return (
        <Box
          key={index}
          style={{
            flexDirection: 'column',
            display: 'flex',
            backgroundColor: 'white',

            alignItems: 'center',

            width: '100%',

            padding: '0px 16px',
            borderTopLeftRadius: index === 0 ? '27px' : '0px',
            borderTopRightRadius: index === 0 ? '27px' : '0px',
            borderBottomRightRadius: index === accounts.length - 1 ? '27px' : '0px',
            borderBottomLeftRadius: index === accounts.length - 1 ? '27px' : '0px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
              height: '100%',
              padding: '35px 20px',
            }}
          >
            <Box
              sx={{
                flexDirection: 'row',
                display: 'flex',
                columnGap: ' 20px',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Box
                component="img"
                loading="lazy"
                sx={{
                  height: '68px',
                  width: '68px',
                }}
                alt="neotek logo"
                src={account.FinancialInstitution?.Logo}
              />
              <Box style={{}}>
                <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'24px'} style={{}}>
                  {account.FinancialInstitution?.NameEn}
                </Typography>
              </Box>
            </Box>
            <Button
              type="submit"
              variant="contained"
              autoCapitalize="off"
              onClick={() => {
                if (account.IsCalculated) {
                  navigate(`/companies/${customer?.crNumber}`, {
                    state: {
                      financialInstitutions: accounts.map((item: any) => ({
                        FinancialInstitutionId: item?.FinancialInstitution.FinancialInstitutionId,
                        FinancialInstitutionName: {
                          NameEn: item?.FinancialInstitution?.NameEn,
                          NameAr: item?.FinancialInstitution?.NameAr,
                        },

                        Logo: item?.FinancialInstitution?.Logo,
                      })),
                    },
                  });
                } else {
                  calculateAndSubmit({
                    FinancialInstitutionId: account.FinancialInstitution?.FinancialInstitutionId,
                    AccountsLinkId: account.AccountsLinkId,
                  });
                }
              }}
              sx={{
                padding: 1,
                borderRadius: 2,
                fontWeight: 700,
                backgroundColor: account.IsCalculated ? 'gray' : '#FFE9D8',
                color: account.IsCalculated ? 'white' : '#F36D21',
              }}
            >
              {account.IsCalculated ? 'done ' : 'Calculate & Submit'}
            </Button>
          </Box>
          {index < accounts.length - 1 && <Box sx={{ height: '2px', background: '#E9E9E9', width: '100%' }} />}
        </Box>
      );
    });
  }

  return (
    <Layout>
      <Box
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          alignSelf: 'center',
          justifyContent: 'center',
          height: '100vh',
          marginLeft: 10,
        }}
        sx={{}}
      >
        <Typography variant="body2" color="white" fontWeight={'500'} fontSize={'14px'} style={{ marginLeft: 8 }}>
          <Link href="/register" underline="none" color="#9D9D9D" fontWeight={'400'} fontSize={'10px'}>
            {'Dashboard > Consent Details'}
          </Link>
        </Typography>

        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginTop: 12.5,
            marginBottom: 40,
          }}
          sx={{ flexGrow: 1 }}
          display={'flex'}
        >
          <Typography variant="body2" color="black" fontWeight={'600'} fontSize={'24px'} style={{ marginLeft: 8 }}>
            {!calculated ? 'Connect Bank Account' : 'Consent Details'}
          </Typography>

          <Button
            type="submit"
            variant="contained"
            autoCapitalize="off"
            disableElevation
            style={{
              backgroundColor: '#F36D21',
              alignSelf: 'flex-end',
              width: '240px',
              height: '48px',
              borderRadius: '10px',
              fontSize: '13px',
              textTransform: 'none',
            }}
            onClick={() => {
              navigate('/ob-connect/connect');
            }}
            fullWidth
            sx={{
              padding: 1,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            {'Connect New Bank Account'}
          </Button>
        </Box>
        {loading ? (
          <Spinner />
        ) : (
          <Box sx={{ borderRadius: '27px', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <List />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default ConsentDetails;
