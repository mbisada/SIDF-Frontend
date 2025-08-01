import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import backArrow from '../../assets/backArrow.svg';
import { Box, Stack, TextField, Typography, Link, Button } from "@mui/material";
import BottomBar from "../RaghiLogin/BottomBar";
const BankAccounts: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);



    return (<>
        <Box
            sx={{
                width: { xs: '100%', md: '100%' },

                padding: 3,
                borderRadius: 2,
            }}
            height={'100vh'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            alignContent={'space-between'}
            justifyContent={'space-between'}
            display={'flex'}
        >


            <Box style={{ flexDirection: 'column', justifyContent: 'flex-start', alignSelf: 'flex-start' }}>
                <Box
                    component="img"
                    loading="lazy"
                    sx={{
                        height: 43,
                        width: 43,
                    }}
                    alt="neotek logo"
                    src={backArrow}
                    marginTop={6}
                    paddingTop={1}
                    onClick={() => navigate(-1)}
                />
                <Typography variant="body2" color="black" fontWeight={'bold'} style={{ marginTop: 10 }}>
                    Select which bank account you want to share
                </Typography>


            </Box>



            <div style={{ flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'center' }}>
                <BottomBar />
            </div>
        </Box>
    </>
    )
};
export default BankAccounts;