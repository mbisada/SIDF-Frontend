import { Box, Button, Link, Modal, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ic_export from '../../assets/ic_export.svg';
import React from 'react';

import Layout from "../../templates/Layout";
import { useLocation } from 'react-router-dom';
import { useUserProfileServices } from "../../services/user/profiles";
import { useCustomer } from '../../contexts/CustomerContext/useContext';
import moment from 'moment';
import RedirectDialog from "./RedirectDialog";
interface NeotekDataGroup {
    DataGroupId: string;
    DescriptionEn: string;
    DescriptionAr: string;
    Permissions: Array<any>;
}


const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ReviewBelowInformation: React.FC = () => {
    let maxCalls = 10;
    let delayTime = 0;
    const [interruptAuthentication, setInterruptAuth] = useState(false);
    const [open, setOpen] = useState(false);
    const [accountLinkStatus, setAccountLinkStatus] = useState('');
    const [AccountsLinkId, setAccountsLinkId] = useState<string>('');
    const [EventId, setEventId] = useState<string>('');
    const [redirectionUrl, setRedirectionUrl] = useState<string>('');
    const location = useLocation();
    console.log("Location state:", location.state);
    const { inistituation } = location.state;
    console.log("inistituation", inistituation);
    const { customer } = useCustomer();
    const { getDataGroups, getAccountLink, linkAccountEvent, linkProfile } = useUserProfileServices();
    const [dataGroups, setDataGroups] = useState<any[]>([]);
    const handleClose = async () => {
        setOpen(false);
    };
    let profileId = "";
    console.log("redirectionUl Review", redirectionUrl)
    const listenToAccountLinkStatus = async (EventId: string) => {
        const getEventInfoResponse = await linkAccountEvent(EventId) as any;
        console.log("getEventInfoResponse", getEventInfoResponse);
        if (
            getEventInfoResponse?.data?.code === 400 ||
            getEventInfoResponse?.data?.code > 500
        ) {
            setAccountLinkStatus('Failed');
            return;
        }
        if (
            !getEventInfoResponse?.data?.data ||
            getEventInfoResponse?.data?.data?.returnedObj[0]?.status !== 'READY'
        ) {
            maxCalls = maxCalls - 1;

            if (maxCalls > 0 && !interruptAuthentication) {
                delayTime = delayTime + 10000;
                await delay(delayTime);
                await listenToAccountLinkStatus(EventId);
            }

            maxCalls = 5;
            setInterruptAuth(true);
            // goToCompleteState();
            //return alertHandler('danger', t('LBL_NO_RESPONSE'));
        }

        linkProfile(getEventInfoResponse?.data?.data?.returnedObj[0]?.response.AccountsLinkId);

        maxCalls = 5;
        // getEventInfoResponse?.data?.returnedObj[0]?.response.AccountsLinkId
        setAccountLinkStatus(
            getEventInfoResponse?.data?.returnedObj[0]?.response.AccountsLinkStatus
        );
    };


    useEffect(() => {
        if (inistituation && inistituation.FinancialInstitutionId) {
            getDataGroups(inistituation.FinancialInstitutionId)
                .then(response => {
                    const tempDataGroups: Array<{
                        DataGroupId: string;
                        Permissions: Array<string>;
                    }> = [];
                    const items = response.data.Data.DataGroups;
                    if (items) {
                        items.forEach((dataGroup: NeotekDataGroup) => {
                            const tempDataGroup: { DataGroupId: string; Permissions: Array<any> } =
                                { DataGroupId: dataGroup.DataGroupId, Permissions: [] };

                            if (dataGroup?.Permissions) {
                                const tempPermissions = dataGroup?.Permissions.map(
                                    (permission) => permission.PermissionId
                                );
                                tempDataGroup.Permissions = tempPermissions || [];
                            }

                            tempDataGroups.push(tempDataGroup);
                        });
                    }

                    tempDataGroups;
                    setDataGroups(tempDataGroups)
                })
                .catch(error => {
                    console.error("Error fetching data groups:", error);
                });
        }
    }, [inistituation]);


    useEffect(() => {
        if (accountLinkStatus == "ACTIVE") {
            alert("Account link is active");
        }
    }, [accountLinkStatus]);

    const expiryDate = moment().add(1, 'year');

    const navigate = useNavigate();
    const [selected, setSelected] = useState(-1);
    const createAccountLinkPayload = () => {
        const payload = {
            Data: {
                FinancialInstitutionId: inistituation?.FinancialInstitutionId,
                SecurityProfile: 'Redirection',
                DataGroups: dataGroups,
                PSUId: customer?.crNumber ?? '',
                UserLoginId: 'RJHISARI_',
                ExpirationDateTime: expiryDate.startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                AccountTypesList: ['KSAOB.Retail'],
                AccountSubTypesList: ['CurrentAccount'],
                PurposeList: ['Account Aggregation'],
                OnBehalfOf: {
                    TradingName: 'Acme Accounting Trading Name',
                    LegalName: 'Acme Accounting Legal Name',
                    IdentifierType: 'Other',
                    Identifier: 'abcd1234',
                },
            },
        };
        return payload;
    };

    const createAccountLink = async () => {
        if (inistituation) {
            const response = await getAccountLink(createAccountLinkPayload());
            console.log("Account link response:", response);
            if (response && response.data) {
                setAccountsLinkId(response.data.Data.AccountsLinkId);
                setEventId(response.data.Data.EventId);
                setRedirectionUrl(response.data.Data.RedirectionURL);
                setOpen(true)
                console.log("EventId", response.data.Data.EventId);
                setTimeout(() => {
                    listenToAccountLinkStatus(response.data.Data.EventId);
                }, 10000);
            } else {
                console.error("No redirect URL found in response");
            }
        } else {
            console.error("inistituation is undefined or null");
        }
    };

    const accounts = [
        { title: 'Company Name', name: 'Turki Construction Co' },
        { title: 'Requester Name', name: 'Fahad Alzahrany' },
        { title: 'Requester Register Address', name: 'Riyadh, King Fahd Road' },
        { title: 'Letter Of Guarantee Type', name: 'Performance' },
        { title: 'Letter Of Guarantee Type', name: 'Performance' },
        { title: 'Aggrement number', name: '00000 33333 77777' },
        { title: 'Amount Guaranteed', name: '50 SAR' },
        { title: 'Amount Guaranteed', name: '50 SAR' },
        { title: 'Expired Date', name: '30/12/2025' },

    ];
    function List() {
        return accounts.map((account, index) => {
            return (
                <Box
                    key={index}
                    style={{
                        flexDirection: 'column',
                        display: 'flex',
                        paddingLeft: '12.3px',
                        paddingRight: '12.3px',
                        justifyContent: 'center',
                        alignContent: 'flex-start',
                        alignItems: 'flex-start',
                        backgroundColor: '#ffffff',
                        width: '27vw',
                        height: '90px',
                        marginTop: 10,
                        borderRadius: '26px',
                    }}
                    display={'flex'}
                >
                    <Typography variant="body2" color="#7D7D7D" fontWeight={'bold'} fontSize={'12px'} style={{ marginLeft: 13, }}>
                        {account.title}
                    </Typography>
                    <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'16px'} style={{ marginLeft: 13, }}>
                        {account.name}
                    </Typography>

                </Box >
            );
        });
    }


    return (
        <Layout>
            <Box style={{ flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center', justifyContent: 'center', height: '100vh', marginLeft: 10 }}
                sx={{ width: '83%' }}>
                <Typography variant="body2" color="white" fontWeight={'500'} fontSize={'14px'} style={{ marginLeft: 8 }}>
                    <Link href="/register" underline="none" color="#9D9D9D" fontWeight={'400'} fontSize={'10px'}>
                        {'Dashboard > Dashboard'}
                    </Link>
                    <Typography variant="body2" color="black" fontWeight={'600'} fontSize={'24px'} style={{ marginLeft: 8 }}>
                        {'Review The Below Information'}
                    </Typography>
                    <Typography variant="body2" color="#7D7D7D" fontWeight={'400'} fontSize={'18px'} style={{ marginLeft: 8, marginTop: 8, marginBottom: 66 }}>
                        {'For you To Use This Service, Will Collect The Required Data From Your Bank Through The Neotek Services'}
                    </Typography>
                </Typography>


                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)', // 3 equal columns
                        gap: 2, // spacing between grid items, adjust as needed
                        width: '100%',
                        maxWidth: '100%', // or whatever width fits your design
                        margin: 'auto',
                        alignSelf: 'center'
                    }}
                >
                    <List />
                </Box>


                <Box style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf: 'flex-start', justifyContent: 'flex-start', marginTop: 20, width: '100%' }}
                    display={'flex'}
                >
                    <Box
                        style={{
                            flexDirection: 'column', display: 'flex', paddingLeft: '12.3px', paddingRight: '12.3px', justifyContent: 'flex-start',
                            alignContent: 'flex-start', alignItems: 'flex-start', backgroundColor: '#ffffff', height: '140px',
                            borderRadius: '26px',
                        }}
                        sx={{ width: '70%' }}
                        display={'flex'}
                    >
                        <Typography variant="body2" color="#7D7D7D" fontWeight={'bold'} fontSize={'12px'} style={{ marginLeft: 13, marginTop: 13 }}>
                            Guarntee Details
                        </Typography>
                        <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'16px'} style={{ marginLeft: 13, }}>
                            For you To Use This Service, Will Collect The Required Data From Your Bank Through The Neotek Services,For you To Use This Service,
                            Will Collect The Required Data From Your Bank Through The Neotek Services
                        </Typography>

                    </Box >

                    <Box
                        style={{
                            flexDirection: 'column', display: 'flex', paddingLeft: '12.3px', paddingRight: '12.3px', justifyContent: 'flex-start',
                            alignContent: 'flex-start', alignItems: 'flex-start', backgroundColor: '#ffffff', height: '140px', marginLeft: 20,
                            borderRadius: '26px',
                        }}
                        sx={{ width: '34%' }}
                        display={'flex'}
                    >
                        <Typography variant="body2" color="#7D7D7D" fontWeight={'bold'} fontSize={'12px'} style={{ marginLeft: 13, marginTop: 13 }}>
                            Guarntee File
                        </Typography>
                        <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'16px'} style={{ marginLeft: 13, }}>
                            LG475665.pdf
                        </Typography>

                        <Button
                            type="submit"
                            variant="contained"
                            autoCapitalize="off"
                            disableElevation
                            style={{ backgroundColor: '#ffffff', width: "140px", height: "48px", alignSelf: 'center', borderRadius: "10px", fontSize: '13px', textTransform: 'none', marginTop: 30, color: '#221AFB' }}
                            onClick={() => { navigate('/raghi-bank-success-login') }}
                            fullWidth

                            sx={{
                                padding: 1,
                                borderRadius: 2,
                                fontWeight: 700,
                            }}

                        >
                            <img src={ic_export} alt={"altText"} style={{ width: '40px', height: '40px' }} />
                            {'Download'}

                        </Button>

                    </Box >
                </Box>

                <Box style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf: 'flex-start', justifyContent: 'flex-start', marginTop: 40, width: '100%', height: '1px', backgroundColor: '##C4C4C4' }} />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end', // pushes children to the right horizontally
                        marginTop: 6, // use spacing units if you want
                    }}
                >
                    <Box
                        sx={{
                            width: '30%',
                            // optionally flexDirection 'column' if needed inside
                        }}
                    >
                        <Typography variant="body2" color="black" fontWeight="bold" fontSize="16px" sx={{ ml: 1 }}>
                            {'By clicking allow, you will redirected to your bank to complete your letter of Guarantee request.'}
                        </Typography>
                        <Box style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf: 'flex-start', justifyContent: 'space-between', marginTop: 10, width: '100%' }}
                            display={'flex'}>
                            <Button
                                type="submit"
                                variant="contained"
                                autoCapitalize="off"
                                disableElevation
                                style={{ width: '48%', backgroundColor: '#FFE9D8', height: "48px", alignSelf: 'center', borderRadius: "10px", fontSize: '13px', textTransform: 'none', color: '#F36D21' }}
                                onClick={() => { }}
                                fullWidth

                                sx={{
                                    padding: 1,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                }}

                            >
                                {'Back'}

                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                autoCapitalize="off"
                                disableElevation
                                style={{ width: '48%', backgroundColor: '#F36D21', height: "48px", alignSelf: 'center', borderRadius: "10px", fontSize: '13px', textTransform: 'none', color: 'white' }}
                                onClick={createAccountLink}
                                fullWidth

                                sx={{
                                    padding: 1,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                }}

                            >
                                {'Allow'}

                            </Button>
                        </Box>
                    </Box>
                </Box>

            </Box>
            {open && (
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <RedirectDialog close={handleClose} RedirectUrl={redirectionUrl} />
                </Modal>
            )}
        </Layout>
    )
}

export default ReviewBelowInformation