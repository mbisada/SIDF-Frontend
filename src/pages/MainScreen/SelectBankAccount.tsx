import { Box, Button, Link, Typography } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import alrajhiBankLogo from '../../assets/alrajhiBankLogo.svg';
import alinmaBankLogo from '../../assets/alinmaBankLogo.svg';
import React from 'react';

const SelectBankAccount: React.FC = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(-1);
    const accounts = [
        { name: 'Raghi Bank', image: alrajhiBankLogo },
        { name: 'Alinma Bank', image: alinmaBankLogo },
        { name: 'Raghi Bank', image: alrajhiBankLogo },
        { name: 'Alinma Bank', image: alinmaBankLogo },
        { name: 'Raghi Bank', image: alrajhiBankLogo },
        { name: 'Alinma Bank', image: alinmaBankLogo },
    ];
    function List() {
        return accounts.map((account, index) => {
            return (
                <Box
                    key={index}
                    style={{
                        flexDirection: 'row',
                        display: 'flex',
                        paddingLeft: '26.3px',
                        paddingRight: '26.3px',
                        justifyContent: 'flex-start',
                        alignContent: 'center',
                        backgroundColor: selected === index ? '#FFEEE4' : '#F7F8FA',
                        width: '451px',
                        height: '110px',
                        marginTop: 10,
                        borderRadius: '26px',
                        borderWidth: 2,
                        borderStyle: 'solid',
                        borderColor: selected === index ? '#F36D21' : '#E1E1E1'
                    }}
                    onClick={() => { setSelected(index) }}
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
                        src={account.image}
                        paddingTop={1}
                    />
                    <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'24px'} style={{ marginLeft: 13, alignSelf: 'center' }}>
                        {account.name}
                    </Typography>

                </Box>
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
                <Typography variant="body2" color="black" fontWeight={'600'} fontSize={'24px'} style={{ marginLeft: 8 }}>
                    {'Connect Bank Account'}
                </Typography>
                <Typography variant="body2" color="#7D7D7D" fontWeight={'400'} fontSize={'18px'} style={{ marginLeft: 8, marginTop: 8, marginBottom: 66 }}>
                    {'Select one of the supported banks to request your financial data'}
                </Typography>
            </Typography>


            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)', // 3 equal columns
                    gap: 2, // spacing between grid items, adjust as needed
                    width: '60%',
                    maxWidth: '60%', // or whatever width fits your design
                    margin: 'auto',
                    alignSelf: 'center'
                }}
            >
                <List />
            </Box>

            <Box style={{ flexDirection: 'column', width: '84%', alignItems: 'flex-end', alignSelf: 'flex-end', justifyContent: 'flex-end', marginTop: 50, height: '48px', marginLeft: 10 }}
                display={'flex'}>
                <Button
                    type="submit"
                    variant="contained"
                    autoCapitalize="off"
                    disableElevation
                    style={{ backgroundColor: '#F36D21', width: "140px", height: "48px", borderRadius: "10px", fontSize: '13px', textTransform: 'none' }}
                    onClick={() => { navigate('/raghi-bank-success-login') }}
                    fullWidth

                    sx={{
                        padding: 1,
                        borderRadius: 2,
                        fontWeight: 700,
                    }}

                >
                    {'Next'}

                </Button>
            </Box>

        </Box>
    )
}

export default SelectBankAccount