import { Box, Button, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../templates/Layout';
import { useUserProfileServices } from '../../services/user/profiles';
import moment from 'moment';
import { useCustomer } from '../../contexts/CustomerContext/useContext';
import Spinner from '../../components/Spinner';

const ConsentDetails: React.FC<{ calculated: boolean }> = ({ calculated }) => {
    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);
    const { ListUserAccounts, calculateAccount } = useUserProfileServices();
    const { customer } = useCustomer();
    const [loading, setLoading] = useState(false);
    const fetchAccounts = () => {
        setLoading(true);
        ListUserAccounts(calculated)
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
            .then(res => {
                fetchAccounts();
            })
            .catch(error => {
                console.error('Error calculating account:', error);
                alert('Error calculating account');
            });
    };

    function List() {
        return accounts.map((account: any, index: number) => {
            return (
                <Box
                    key={index}
                    style={{
                        flexDirection: 'row',
                        display: 'flex',
                        paddingLeft: '26.3px',
                        paddingRight: '26.3px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        alignContent: 'flex-start',
                        backgroundColor: 'white',
                        width: '100%',
                        height: '160px',
                        flexShrink: 0,
                        borderRadius: '27px',
                        borderWidth: '1px',
                        borderColor: '#E5E5E5',
                        marginTop: 10,
                    }}
                >
                    <Box
                        sx={{
                            flexDirection: 'row',
                            display: 'flex',
                            columnGap: ' 20px',
                        }}
                    >
                        <Box
                            style={{ marginTop: 27 }}
                            component="img"
                            loading="lazy"
                            sx={{
                                height: '68px',
                                width: '68px',
                            }}
                            alt="neotek logo"
                            src={account.FinancialInstitution?.Logo}
                            paddingTop={1}
                        />
                        <Box style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'flex-start', width: '75%', marginTop: 36 }}>
                            <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'24px'} style={{}}>
                                {account.FinancialInstitution?.NameEn}
                            </Typography>
                            <Typography variant="body2" color="#777777" fontWeight={'bold'} fontSize={'15px'} style={{}}>
                                Consent Date
                            </Typography>
                            <Typography variant="body2" color="#272424" fontWeight={'bold'} fontSize={'21px'} style={{}}>
                                {moment(new Date()).format('DD-MM-YYYY')}
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        autoCapitalize="off"
                        disableElevation
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
                                        }))
                                    }
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
                </Box >
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
                        {'Connect Bank Account'}
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
                {loading ? <Spinner /> : <List />}
            </Box>
        </Layout>
    );
};

export default ConsentDetails;
