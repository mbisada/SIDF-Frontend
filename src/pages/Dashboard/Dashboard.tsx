import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';

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
import { useCustomer } from '../../contexts/CustomerContext/useContext';
import { BankTabs } from './BankTabs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #DADADA',
  boxShadow: 24,
  p: 2,
};

const data = [
  { day: 1, inflow: 48000000, outflow: -25000000, profit: 10000000 },
  { day: 2, inflow: 20000000, outflow: -15000000, profit: 5000000 },
  // ... your data
];

export default function Dashboard() {
  const [requestDetails, setRequestDetails] = useState<DashboardDataReturnedObj | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [financialInstitutions, setFinancialInstitutions] = useState<any[]>([]);
  const [currentFinancialInstitution, setCurrentFinancialInstitution] = useState<string>('All');
  const handleClose = async () => {
    setOpen(false);
  };

  const userInfo = requestDetails?.userInfo;
  const financialData = requestDetails?.financialData;

  const { psuid } = useParams<{ psuid: string }>();
  const { getDashboardData } = useDashboardServices();

  const getDashboardDataHandler = async () => {
    if (!psuid) return setIsLoading(false);

    setIsLoading(true);
    const res = await getDashboardData(psuid, currentFinancialInstitution);
    if (res) setRequestDetails(res);
    setIsLoading(false);
  };

  useEffect(() => {
    getDashboardDataHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFinancialInstitution]);

  const { getFinacialInstitutions } = useUserProfileServices();

  useEffect(() => {
    getFinacialInstitutions()
      .then(res => {
        setFinancialInstitutions(res.data.Data.FinancialInstitution);
      })
      .catch(error => {
        console.error('Error fetching financial institutions:', error);
      });
  }, []);

  return (
    <div>
      {isLoading && <Spinner />}
      <Layout
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Companies List Details', href: '/companies' },
          { label: 'Request Details', href: '/' },
        ]}
        heading="Request Details"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <BankTabs financialInstitutions={financialInstitutions} setCurrentFinancialInstitution={setCurrentFinancialInstitution} />
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button variant="contained" endIcon={<DownloadIcon />} onClick={() => setOpen(true)}>
              {t('EXPORT_REPORT')}
            </Button>
          </Box>
        </Box>
        <ProfileCard
          crNumber={userInfo?.psuid}
          mobileNumber={userInfo?.mobileNumber}
          email={userInfo?.email}
          companyName={userInfo?.companyName}
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
            gap: 1,
            marginBottom: 1,
          }}
        >
          <CashFlowCard
            totalCashFlow={financialData?.TotalCashFlow ?? 0}
            totalCashIn={financialData?.TotalCashIn ?? 0}
            totalCashOut={financialData?.TotalCashOut ?? 0}
          />
          <LoansCard liability={financialData?.Liabilities ?? 0} />
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
            gap: 1,
            marginBottom: 1,
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

        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <ExportDialog close={handleClose} PSUId={userInfo?.psuid || ''} />

          {/* <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
              {t('COMING_SOON')}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="body2" textAlign={'center'}>
              {t('UNDER_DEVELOPMENT')}
            </Typography>
            <Stack direction={'row'} justifyContent={'flex-end'} mt={3}>
              <Button onClick={handleClose}>{t('CLOSE')}</Button>
            </Stack>
          </Box> */}
        </Modal>
      </Layout>
    </div>
  );
}
