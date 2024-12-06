import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import CashFlowBarChartCard from '../../components/CashFlowBarChartCard';
import CashFlowCard from '../../components/CashFlowCard/CashFlowCard';
import CashFlowPieChartCard from '../../components/CashFlowPieChartCard';
import LoansCard from '../../components/LoansCard';
import ProfileCard from '../../components/ProfileCard';
import Spinner from '../../components/Spinner';
import { useDashboardServices } from '../../services/dashboard/dashboard';
import { DashboardDataReturnedObj } from '../../services/dashboard/dashboard.types';
import Layout from '../../templates/Layout';

export default function Dashboard() {
  const [requestDetails, setRequestDetails] = useState<DashboardDataReturnedObj | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const userInfo = requestDetails?.userInfo;
  const financialData = requestDetails?.financialData;

  const { psuid } = useParams<{ psuid: string }>();
  const { getDashboardData } = useDashboardServices();

  const getDashboardDataHandler = async () => {
    if (!psuid) return setIsLoading(false);

    setIsLoading(true);
    const res = await getDashboardData(psuid);
    if (res) setRequestDetails(res);
    setIsLoading(false);
  };

  useEffect(() => {
    getDashboardDataHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <Layout
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Companies List Details', href: '/companies' },
          { label: 'Request Details', href: '/' },
        ]}
        heading="Request Details"
      >
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
      </Layout>
    </div>
  );
}
