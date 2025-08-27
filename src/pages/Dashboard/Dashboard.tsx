import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, Modal, Typography } from '@mui/material';

import CashFlowBarChartCard from '../../components/CashFlowBarChartCard';
import CashFlowCard from '../../components/CashFlowCard/CashFlowCard';
import CashFlowPieChartCard from '../../components/CashFlowPieChartCard';
import LoansCard from '../../components/LoansCard';
import ProfileCard from '../../components/ProfileCard';
import Spinner from '../../components/Spinner';
import { useDashboardServices } from '../../services/dashboard/dashboard';
import { DashboardDataReturnedObj } from '../../services/dashboard/dashboard.types';
import Layout from '../../templates/Layout';
import ExportDialog from '../MainScreen/ExportDialog';
import { useUserProfileServices } from '../../services/user/profiles';
import { BankTabs } from './BankTabs';
import { useCustomer } from '../../contexts/CustomerContext/useContext';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '1px solid #DADADA',
//   boxShadow: 24,
//   p: 2,
// };

export default function Dashboard() {
  const [requestDetails, setRequestDetails] = useState<DashboardDataReturnedObj | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [financialInstitutions, setFinancialInstitutions] = useState<any[]>([]);
  const [currentFinancialInstitution, setCurrentFinancialInstitution] = useState<string>('All');
  const handleClose = async () => {
    setOpen(false);
  };
  const { customer } = useCustomer()
  const location = useLocation();
  const financialInstitutionsBANKS = location.state?.financialInstitutions || [];
  const componentRef = useRef<HTMLDivElement>(null);
  const { ListUserAccounts } = useUserProfileServices();
  const userInfo = requestDetails?.userInfo;
  const financialData = requestDetails?.financialData;

  const { psuid } = useParams<{ psuid: string }>();
  const { getDashboardData } = useDashboardServices();

  const fetchAccounts = (userInfo: any) => {
    setIsLoading(true);
    ListUserAccounts(true, userInfo?.psuid || '')
      .then(res => {
        const userFinancialInstitutionsBANKS = res.data.data?.returnedObj[0]?.Data?.AccountsLinks.map((item: any) => ({
          FinancialInstitutionId: item?.FinancialInstitution.FinancialInstitutionId,
          FinancialInstitutionName: {
            NameEn: item?.FinancialInstitution?.NameEn,
            NameAr: item?.FinancialInstitution?.NameAr,
          },

          Logo: item?.FinancialInstitution?.Logo,
        }));
        setFinancialInstitutions(userFinancialInstitutionsBANKS);
      })
      .catch(error => {
        console.error('Error fetching user accounts:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getDashboardDataHandler = async () => {
    if (!psuid) return setIsLoading(false);

    setIsLoading(true);
    const res = await getDashboardData(psuid, currentFinancialInstitution);
    if (res) {
      setRequestDetails(res);
      if (financialInstitutionsBANKS.length) {
        setFinancialInstitutions(financialInstitutionsBANKS);
        setIsLoading(false);
      } else {
        if (!financialInstitutions.length) {
          fetchAccounts(res.userInfo);
        } else {
          setIsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    getDashboardDataHandler();
  }, [currentFinancialInstitution]);

  return (
    <div>
      <Layout>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            borderTop: '1px solid #E9E9E9',
            paddingTop: '15px',
          }}
        >
          <Typography sx={{ fontSize: '34px', fontWeight: 'bold', color: '#151538' }}>Dashboard</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', columnGap: '10px' }}>
            {customer?.role == 'ROLE_USER' && <Button
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
            </Button>}
            <Button
              variant="contained"
              style={{
                backgroundColor: '#FFE4D5',
                alignSelf: 'flex-end',
                width: '240px',
                height: '48px',
                borderRadius: '10px',
                fontSize: '13px',
                textTransform: 'none',
                color: '#F36D21',
              }}
              endIcon={<DownloadIcon color="primary" />}
              onClick={() => {
                !isLoading && setOpen(true);
              }}
            >
              <Typography style={{ color: '#F36D21', fontSize: 13, fontWeight: '600' }}>{t('Exports E-Statements As')}</Typography>
            </Button>
          </Box>
        </Box>

        {isLoading && <Spinner />}
        {!isLoading && (
          <div ref={componentRef}>
            <BankTabs
              financialInstitutions={financialInstitutions ?? []}
              currentFinancialInstitution={currentFinancialInstitution}
              setCurrentFinancialInstitution={setCurrentFinancialInstitution}
            />
            <ProfileCard
              crNumber={userInfo?.psuid}
              mobileNumber={userInfo?.mobileNumber}
              email={userInfo?.email}
              companyName={userInfo?.companyName}
              banks={financialInstitutions?.map(item => item.FinancialInstitutionName.NameEn).join(', ')}
              currentFinancialInstitution={currentFinancialInstitution}
            />
            <Box
              sx={{
                width: '100%',
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'stretch',
                justifyContent: 'space-between',
                gap: 2,
                marginBottom: 1,
                marginTop: '20px',
              }}
            >
              <CashFlowCard
                totalCashFlow={financialData?.TotalCashFlow ?? 0}
                totalCashIn={financialData?.TotalCashIn ?? 0}
                totalCashOut={financialData?.TotalCashOut ?? 0}
              />
              <LoansCard
                liability={financialData?.Liabilities ?? 0}
                averageBalance={financialData?.AverageBalance ?? 0}
                balance={financialData?.Balance ?? 0}
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'stretch',
                justifyContent: 'space-between',
                gap: 2,
                marginBottom: 1,
                marginTop: '20px',
              }}
            >
              <CashFlowBarChartCard
                inflowTotal={financialData?.TotalCashIn ?? 0}
                outflowTotal={financialData?.TotalCashOut ?? 0}
                monthlyCashFlow={financialData?.MonthlyCashFlow ?? []}
              />
              <CashFlowPieChartCard
                inflowTotal={financialData?.TotalCashIn ?? 0}
                outflowTotal={financialData?.TotalCashOut ?? 0}
                cashInTypes={financialData?.CashInTypes ?? []}
                cashOutTypes={financialData?.CashOutTypes ?? []}
              />
            </Box>
          </div>
        )}
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <ExportDialog
            close={handleClose}
            PSUId={userInfo?.psuid || ''}
            componentRef={componentRef}
            financialInstitutions={financialInstitutions}
          />
        </Modal>
      </Layout>
    </div>
  );
}
