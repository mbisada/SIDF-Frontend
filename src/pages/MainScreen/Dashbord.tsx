import { Box, Button, Link, Typography } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import alrajhiBankLogo from '../../assets/alrajhiBankLogo.svg';
import alinmaBankLogo from '../../assets/alinmaBankLogo.svg';
import React from 'react';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([
        { id: 1, name: 'Raghi Bank', image: alrajhiBankLogo },
        { id: 2, name: 'Alinma Bank', image: alinmaBankLogo },
    ])
    function List() {
        return accounts.map((account, index) => {
            return (
                <React.Fragment key={account.id || index}>
                    <Box
                        style={{
                            flexDirection: 'column',
                            display: 'flex',
                            paddingLeft: "26.3px",
                            paddingRight: "26.3px",
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            width: '100%',
                            height: '133px',
                            flexShrink: 0,
                        }}
                        display={'flex'}
                    >
                        <Box
                            style={{
                                flexDirection: 'row',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                alignSelf: 'center',
                                alignContent: 'center',
                                width: '100%',
                            }}
                            display={'flex'}
                        >
                            <Box
                                style={{ alignSelf: 'center' }}
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
                            <Box style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'center', width: '75%' }}>
                                <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'24px'}>
                                    {account.name}
                                </Typography>
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                autoCapitalize="off"
                                disableElevation
                                style={{ backgroundColor: '#FFE9D8', width: "155px", height: "32px", borderRadius: "10px", fontWeight: 600, fontSize: '12px', color: '#F36D21', textTransform: 'none', }}
                                onClick={() => { navigate('/raghi-bank-success-login') }}
                                fullWidth
                                sx={{
                                    padding: 1,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                }}
                            >
                                {'Calculate & Submit'}
                            </Button>
                        </Box>
                    </Box>
                    {/* Separator: render if not the last item */}
                    {index < accounts.length - 1 && (
                        <Box
                            style={{
                                width: '96%',
                                height: '2px',
                                alignSelf: 'center',
                                backgroundColor: '#E9E9E9',
                                marginLeft: "26.3px",
                                marginRight: "26.3px",
                            }}
                        />
                    )}
                </React.Fragment>
            );
        });
    }


    return (
        <Box style={{ flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'center', height: '100vh', marginLeft: 10 }}
            sx={{ width: '83%' }}>
            <Typography variant="body2" color="white" fontWeight={'500'} fontSize={'14px'} style={{ marginLeft: 8 }}>
                <Link href="/register" underline="none" color="#9D9D9D" fontWeight={'400'} fontSize={'10px'}>
                    {'Dashboard > Dashboard'}
                </Link>

            </Typography>

            <Box style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'space-between', marginTop: 12.5, marginBottom: 40 }}
                sx={{ flexGrow: 1 }}
                display={'flex'}>
                <Typography variant="body2" color="black" fontWeight={'600'} fontSize={'24px'} style={{ marginLeft: 8 }}>
                    {'Connect Bank Account'}
                </Typography>

                <Button
                    type="submit"
                    variant="contained"
                    autoCapitalize="off"
                    disableElevation
                    style={{ backgroundColor: '#F36D21', alignSelf: 'flex-end', width: "240px", height: "48px", borderRadius: "10px", fontSize: '13px', textTransform: 'none' }}
                    onClick={() => { navigate('/raghi-bank-success-login') }}
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
            <Box style={{ flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'space-between', borderRadius: "26px", borderWidth: '1px', borderColor: '#E5E5E5', width: '100%', backgroundColor: 'white', overflow: 'hidden', maxHeight: '70%', overflowY: 'auto' }}
                display={'flex'}>
                <List />
            </Box>
        </Box>
    )
}

export default Dashboard