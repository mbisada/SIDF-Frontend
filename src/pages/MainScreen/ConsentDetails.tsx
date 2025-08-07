import { Box, Button, Link, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import alrajhiBankLogo from '../../assets/alrajhiBankLogo.svg';
import alinmaBankLogo from '../../assets/alinmaBankLogo.svg';
import Layout from "../../templates/Layout";
const ConsentDetails: React.FC = () => {
    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);

    const fetchAccounts = () => {
        // Simulate fetching accounts from an API
        setAccounts([
            { name: 'Al Rajhi Bank', image: alrajhiBankLogo },
            { name: 'Alinma Bank', image: alinmaBankLogo },
            // Add more accounts as needed
        ]);
    };

    useEffect(() => {
        fetchAccounts();
    }, []);
    const calculateAndSubmit = (account: { name: string, image: string }) => {
    }
    function List() {
        return accounts.map((account, index) => {
            return (
                <Box key={index} style={{
                    flexDirection: 'row', display: 'flex', paddingLeft: "26.3px", paddingRight: "26.3px", justifyContent: 'space-between', alignItems: 'center', alignContent: 'flex-start', backgroundColor: 'white', width: '100%', height: '160px', flexShrink: 0, borderRadius: "27px", borderWidth: "1px", borderColor: "#E5E5E5", marginTop: 10
                }}
                >
                    <Box sx={{
                        flexDirection: 'row',
                        display: 'flex',
                        columnGap: ' 20px',
                    }}>
                        <Box
                            style={{ marginTop: 27 }}
                            component="img"
                            loading="lazy"
                            sx={{
                                height: "68px",
                                width: "68px",
                            }}
                            alt="neotek logo"
                            src={account.image}

                            paddingTop={1}
                        />
                        <Box style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'flex-start', width: '75%', marginTop: 36 }}>
                            <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'24px'} style={{}}>
                                {account.name}
                            </Typography>
                            <Typography variant="body2" color="#777777" fontWeight={'bold'} fontSize={'15px'} style={{}}>
                                Consent Date
                            </Typography>
                            <Typography variant="body2" color="#272424" fontWeight={'bold'} fontSize={'21px'} style={{}}>
                                2024-9-23
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        autoCapitalize="off"
                        disableElevation
                        onClick={() => { calculateAndSubmit(account) }}


                        sx={{
                            padding: 1,
                            borderRadius: 2,
                            fontWeight: 700,
                        }}

                    >
                        {'Calculate & Submit'}

                    </Button>
                </Box>

            )
        })
    }

    return (
        <Layout>
            <Box style={{ flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'center', height: '100vh', marginLeft: 10 }}
                sx={{}}>
                <Typography variant="body2" color="white" fontWeight={'500'} fontSize={'14px'} style={{ marginLeft: 8 }}>
                    <Link href="/register" underline="none" color="#9D9D9D" fontWeight={'400'} fontSize={'10px'}>
                        {'Dashboard > Consent Details'}
                    </Link>

                </Typography>

                <Box style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'space-between', marginTop: 12.5, marginBottom: 40 }}
                    sx={{ flexGrow: 1 }}
                    display={'flex'}>
                    <Typography variant="body2" color="black" fontWeight={'600'} fontSize={'24px'} style={{ marginLeft: 8 }}>
                        {'Consents Details'}
                    </Typography>

                    <Button
                        type="submit"
                        variant="contained"
                        autoCapitalize="off"
                        disableElevation
                        style={{ backgroundColor: '#F36D21', alignSelf: 'flex-end', width: "240px", height: "48px", borderRadius: "10px", fontSize: '13px', textTransform: 'none' }}
                        onClick={() => { navigate('/ob-connect/connect') }}
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
                <List />
            </Box>
        </Layout>
    )
}

export default ConsentDetails