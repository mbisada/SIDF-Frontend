import { Box, Button, Link, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Layout from '../../templates/Layout';
import { useUserProfileServices } from '../../services/user/profiles';
import { useCustomer } from '../../contexts/CustomerContext/useContext';
import moment from 'moment';
import RedirectDialog from './RedirectDialog';
import QrCodeDialog from './QrCodeDialog';
import QRCode from 'qrcode';
import styled from 'styled-components';
import logo from '../../assets/noTextLogo.svg';
import Lock from '../../assets/Lock.svg';
import ClipLoader from 'react-spinners/ClipLoader';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 10px;

  border-radius: 8px;
  width: 350px;
  height: 107.35px;
  background-color: #f9f9fb;
`;

const IconBox = styled.div`
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
`;

const LockWrapper = styled.div`
  width: 50px;
  height: 50px;
  background-color: #e9f6f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 35px;
    top: 50%;
    transform: translateY(-50%);
  }

  &::before {
    left: -35px;
    border-style: dotted;
    border-width: 0 0 2px 0;
    border-color: #99d6c2;
    width: 35px;
  }

  &::after {
    right: -35px;
    border-style: dotted;
    border-width: 0 0 2px 0;
    border-color: #99d6c2;
    width: 35px;
  }
`;

function ConnectionCard({ inistituation }: { inistituation: any }) {
  return (
    <Container>
      <IconBox>
        <Box
          component="img"
          loading="lazy"
          sx={{
            height: '30px',
            width: '30px',
          }}
          alt="neotek logo"
          src={logo}
        />
      </IconBox>
      <LockWrapper>
        <Box
          component="img"
          loading="lazy"
          sx={{
            height: '30px',
            width: '30px',
          }}
          alt="neotek logo"
          src={Lock}
        />
      </LockWrapper>
      <IconBox>
        <Box
          component="img"
          loading="lazy"
          sx={{
            height: '50px',
            width: '50px',
          }}
          alt="neotek logo"
          src={inistituation.Logo}
        />
      </IconBox>
    </Container>
  );
}

interface NeotekDataGroup {
  DataGroupId: string;
  DescriptionEn: string;
  DescriptionAr: string;
  Permissions: Array<any>;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const ReviewBelowInformation: React.FC = () => {
  let maxCalls = 10;
  let delayTime = 0;
  const location = useLocation();
  const { inistituation } = location.state;
  const { customer } = useCustomer();
  const navigate = useNavigate();
  const expiryDate = moment().add(1, 'year');

  const [interruptAuthentication, setInterruptAuth] = useState(false);
  const [open, setOpen] = useState(false);
  const [EventId, setEventId] = useState<string>('');
  const [redirectionUrl, setRedirectionUrl] = useState<string>('');
  const { getDataGroups, getAccountLink, linkAccountEvent, linkProfile } = useUserProfileServices();
  const [dataGroups, setDataGroups] = useState<any[]>([]);
  const [QrCodeOpen, setQrCodeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [qrCode, setQrCode] = useState<string>('');

  const handleClose = async () => {
    setOpen(false);
  };

  const handleCloseQrCode = async () => {
    setQrCodeOpen(false);
  };

  const listenToAccountLinkStatus = async (EventId: string) => {
    setLoading(true);
    const getEventInfoResponse = (await linkAccountEvent(EventId)) as any;
    if (getEventInfoResponse?.data?.data?.code === 400 || getEventInfoResponse?.data?.data?.code > 500) {
      navigate('/ob-connect/fail');
      setLoading(false);

      return;
    }
    if (getEventInfoResponse?.data?.data?.returnedObj[0]?.status !== 'READY') {
      maxCalls = maxCalls - 1;

      if (maxCalls > 0 && !interruptAuthentication) {
        delayTime = delayTime + 10000;
        await delay(delayTime);
        await listenToAccountLinkStatus(EventId);
      }

      maxCalls = 5;
      setInterruptAuth(true);
    }

    linkProfile(getEventInfoResponse?.data?.data?.returnedObj[0]?.response.AccountsLinkId);

    maxCalls = 5;

    setLoading(false);
    navigate('/ob-connect/success');
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
              const tempDataGroup: { DataGroupId: string; Permissions: Array<any> } = {
                DataGroupId: dataGroup.DataGroupId,
                Permissions: [],
              };

              if (dataGroup?.Permissions) {
                const tempPermissions = dataGroup?.Permissions.map(permission => permission.PermissionId);
                tempDataGroup.Permissions = tempPermissions || [];
              }

              tempDataGroups.push(tempDataGroup);
            });
          }

          tempDataGroups;
          setDataGroups(tempDataGroups);
        })
        .catch(error => {
          console.error('Error fetching data groups:', error);
        });
    }
  }, [inistituation]);

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
    setIsLoading(true);
    if (inistituation) {
      const response = await getAccountLink(createAccountLinkPayload());

      if (response && response.data) {
        setEventId(response.data.Data.EventId);
        setRedirectionUrl(response.data.Data.RedirectionURL);
        setOpen(true);
        setIsLoading(false);
      } else {
        console.error('No redirect URL found in response');
      }
    } else {
      setIsLoading(false);
      console.error('inistituation is undefined or null');
    }
  };

  function List({ accounts }: { accounts: any[] }) {
    return accounts.map((account, index) => {
      return (
        <Box
          key={index}
          style={{
            flexDirection: 'column',
            display: 'flex',
            paddingRight: '12.3px',
            justifyContent: 'center',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            backgroundColor: '#ffffff',
            width: '27vw',
            height: '90px',
            marginTop: 10,
            borderRadius: '26px',
            paddingLeft: 24,
          }}
          display={'flex'}
        >
          <Typography variant="body2" color="#787878" fontWeight={'bold'} fontSize={'12px'} style={{ marginBottom: '10px' }}>
            {account.title}
          </Typography>
          <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'16px'} style={{}}>
            {account.name}
          </Typography>
        </Box>
      );
    });
  }

  const generateQRCode = async () => {
    if (redirectionUrl) {
      QRCode.toDataURL(redirectionUrl, { width: 200, margin: 2 }, (err: any, dataUrl: string) => {
        if (err) {
          console.error(err);
          return;
        }
        setQrCode(dataUrl);
      });
      handleClose();
      setQrCodeOpen(true);
      listenToAccountLinkStatus(EventId);
    }
  };
  const handleReirection = () => {
    if (redirectionUrl) {
      window.open(redirectionUrl, '_blank');
      listenToAccountLinkStatus(EventId);
    }
  };
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
        sx={{ width: '100%' }}
      >
        <Typography variant="body2" color="white" fontWeight={'500'} fontSize={'14px'} style={{ marginLeft: 8 }}>
          <Link href="/register" underline="none" color="#9D9D9D" fontWeight={'400'} fontSize={'10px'}>
            {'Dashboard > Dashboard'}
          </Link>
          <Typography variant="body2" color="black" fontWeight={'600'} fontSize={'24px'} style={{ marginLeft: 8 }}>
            {'Review the below Consent Details '}
          </Typography>
          <Typography
            variant="body2"
            color="#7D7D7D"
            fontWeight={'400'}
            fontSize={'18px'}
            style={{ marginLeft: 8, marginTop: 8, marginBottom: '30px' }}
          >
            {'For you to use this service,  will collect the required data from your bank through neotek services.'}
          </Typography>
        </Typography>

        <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex', marginBottom: '30px' }}>
          <ConnectionCard inistituation={inistituation} />
        </Box>

        <Box>
          <Typography variant="body2" color="#7D7D7D" fontWeight={'bold'} fontSize={'12px'} style={{ marginLeft: 13, marginTop: 13 }}>
            Account Details
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 0fr)',
            gap: 1,
            width: '100%',
            maxWidth: '100%',
            margin: 'auto',
            alignSelf: 'center',
          }}
        >
          <List
            accounts={[
              { title: 'Account Number', name: 'Turki Construction Co' },
              { title: 'Bank Name', name: inistituation?.FinancialInstitutionName.NameEn },
            ]}
          />
        </Box>

        <Box>
          <Typography variant="body2" color="#7D7D7D" fontWeight={'bold'} fontSize={'12px'} style={{ marginLeft: 13, marginTop: 13 }}>
            Data Groups and Permission
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 0fr)',
            gap: 1,
            width: '100%',
            maxWidth: '100%',
            margin: 'auto',
            alignSelf: 'center',
          }}
        >
          <List
            accounts={[
              { title: 'Service Name', name: 'E-Statement' },
              { title: 'Data Group', name: 'Transactions and Balance ' },
            ]}
          />
        </Box>

        <Box>
          <Typography variant="body2" color="#7D7D7D" fontWeight={'bold'} fontSize={'12px'} style={{ marginLeft: 13, marginTop: 25 }}>
            Data Usage Purpose
          </Typography>
        </Box>

        <Box
          style={{
            flexDirection: 'column',
            display: 'flex',

            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            backgroundColor: '#ffffff',
            borderRadius: '26px',
            marginTop: '12px',
            padding: '20px 25px',
          }}
          sx={{ width: '98%' }}
          display={'flex'}
        >
          <Typography variant="body2" color="#7D7D7D" fontWeight={'bold'} fontSize={'12px'} style={{}}>
            Purpose
          </Typography>
          <Typography variant="body2" color="black" fontWeight={'bold'} fontSize={'16px'} style={{}}>
            With your permission, SIDF will use open banking through neotek to securely view important parts of your financial
            information—such as income, spending, and account history. This helps SIDF understand your financial situation better, to make
            quicker lending decisions, offer solutions that fit your needs, and provide a smoother experience, while always protecting your
            privacy and following all data protection rules.
          </Typography>
        </Box>

        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: 40,
            width: '100%',
            height: '1px',
            backgroundColor: '##C4C4C4',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 2,
            width: '98%',
          }}
        >
          <Typography variant="body2" color="black" fontWeight="bold" fontSize="16px" sx={{ maxWidth: '50%' }}>
            By proceeding, you agree to securely share your selected bank account and transaction data via regulated Open Banking channels
            for the stated service purpose.{' '}
          </Typography>
          <Box
            sx={{
              width: '30%',
            }}
          >
            <Box
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                alignSelf: 'flex-start',
                justifyContent: 'space-between',
                marginTop: 10,
                width: '100%',
              }}
              display={'flex'}
            >
              <Button
                type="submit"
                variant="contained"
                autoCapitalize="off"
                disableElevation
                style={{
                  width: '48%',
                  backgroundColor: '#FFE9D8',
                  height: '48px',
                  alignSelf: 'center',
                  borderRadius: '10px',
                  fontSize: '13px',
                  textTransform: 'none',
                  color: '#F36D21',
                }}
                onClick={() => {
                  navigate(-1);
                }}
                fullWidth
                sx={{
                  padding: 1,
                  borderRadius: 2,
                  fontWeight: 700,
                }}
              >
                {'Cancel'}
              </Button>

              <Button
                type="submit"
                variant="contained"
                autoCapitalize="off"
                disableElevation
                style={{
                  width: '48%',
                  backgroundColor: '#F36D21',
                  height: '48px',
                  alignSelf: 'center',
                  borderRadius: '10px',
                  fontSize: '13px',
                  textTransform: 'none',
                  color: 'white',
                }}
                onClick={createAccountLink}
                fullWidth
                sx={{
                  padding: 1,
                  borderRadius: 2,
                  fontWeight: 700,
                }}
              >
                {isLoading ? (
                  <ClipLoader color={'white'} loading={isLoading} size={20} aria-label="Loading Spinner" data-testid="loader" />
                ) : (
                  'Proceed'
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      {open && (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <RedirectDialog close={handleClose} handleReirection={handleReirection} generateQRCode={generateQRCode} loading={loading} />
        </Modal>
      )}
      {QrCodeOpen && (
        <Modal open={QrCodeOpen} onClose={handleCloseQrCode} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <QrCodeDialog close={handleCloseQrCode} QrCode={qrCode} loading={loading} />
        </Modal>
      )}
    </Layout>
  );
};

export default ReviewBelowInformation;
