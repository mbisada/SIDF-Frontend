import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import raghiLogo from '../../assets/raghiLogo.svg';
import { Box, Stack, TextField, Typography, Link, Button } from "@mui/material";
import BottomBar from "./BottomBar";
const RaghiLogin: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            userID: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        //TODO: UNCOMMENT THIS
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setIsLoading(true);
            navigate('/bank-accounts')
        },
    });

    return (<>
        <Box
            sx={{
                width: { xs: '100%', md: '100%' },

                padding: 3,
                borderRadius: 2,
            }}
            height={'100vh'}
            flexDirection={'column'}
            alignItems={'center'}
            alignContent={'space-between'}
            justifyContent={'space-between'}
            display={'flex'}
        >
            <Box
                component="img"
                loading="lazy"
                sx={{
                    height: 97,
                    width: 272,
                }}
                alt="neotek logo"
                src={raghiLogo}
                marginTop={6}
                paddingTop={1}
            />

            <Stack
                direction="column"
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={"center"}
                spacing={3}
            >
                <TextField
                    id="email"
                    name="email"
                    type="email"
                    label={t('email')}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    InputLabelProps={{
                        shrink: false,

                    }}
                    InputProps={{
                        style: { width: "640px", height: "80px", borderRadius: "25px", borderWidth: "8px", borderColor: '#C4C4C4', paddingTop: 30 },
                    }}
                />
                <TextField
                    id="userId"
                    name="userID"
                    type="number"
                    label={t('userID')}
                    value={formik.values.userID}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.userID)}
                    InputLabelProps={{
                        shrink: false,

                    }}
                    InputProps={{
                        style: { width: "640px", height: "80px", borderRadius: "25px", borderWidth: 3, borderColor: '#C4C4C4', paddingTop: 30 },
                    }}
                />
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    label={t('password')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.password)}
                    InputLabelProps={{
                        shrink: false,

                    }}
                    InputProps={{
                        style: { width: "640px", height: "80px", borderRadius: "25px", borderWidth: 3, borderColor: '#C4C4C4', paddingTop: 30 },
                    }}


                />
                <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: '#221AFB', height: "60px", borderRadius: "15px", marginTop: "42px" }}
                    onClick={formik.handleSubmit}
                    fullWidth
                    disabled={formik.isSubmitting}
                    sx={{
                        padding: 1,
                        borderRadius: 2,
                        fontWeight: 700,
                    }}

                    loading={isLoading}
                >
                    {formik.isSubmitting ? 'Logging in...' : 'Login'}

                </Button>
            </Stack>

            <BottomBar />
        </Box>
    </>
    )
};
export default RaghiLogin;