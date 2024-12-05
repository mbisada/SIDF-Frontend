import { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import CashFlowBarChartCard from '../../components/CashFlowBarChartCard';
import CashFlowCard from '../../components/CashFlowCard/CashFlowCard';
import CashFlowPieChartCard from '../../components/CashFlowPieChartCard';
import LoansCard from '../../components/LoansCard';
import ProfileCard from '../../components/ProfileCard';
import { RISK_ASSESSMENT_DATA } from '../../constants/dummy';
import Layout from '../../templates/Layout';
import { RiskAssessmentData } from '../../types';

export default function Dashboard() {
  const [companyDetails, setCompanyDetails] = useState({ role: '', companyName: '', email: '', crNumber: '', mobileNumber: '' });
  const [requestDetails] = useState<RiskAssessmentData | null>(RISK_ASSESSMENT_DATA?.Data);

  useEffect(() => {
    //TODO: API CALL TO GET THE DETAILS OF THE COMPANY BY THE ID
    setCompanyDetails({
      role: 'admin',
      companyName: 'testCompany',
      email: 'testemail@example.com',
      crNumber: 'testCR12345',
      mobileNumber: '966243564567',
      //token:'12345678'
    });
    //TODO: API CALL TO GET THE DATA OF THE DASHBAORD

    //TODO: To be used to test loading and then removed
    // const timeout = setTimeout(() => {
    //   setRequestDetails(RISK_ASSESSMENT_DATA?.Data);
    // }, 3000);

    // // Cleanup the timeout on component unmount
    // return () => clearTimeout(timeout);
  }, []);

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
          crNumber={companyDetails.crNumber}
          mobileNumber={companyDetails.mobileNumber}
          email={companyDetails.email}
          companyName={companyDetails.companyName}
        />
        <Box
          sx={{
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <CashFlowCard
            totalCashFlow={requestDetails?.TotalCashFlow ?? 0}
            totalCashIn={requestDetails?.TotalCashIn ?? 0}
            totalCashOut={requestDetails?.TotalCashOut ?? 0}
          />
          <LoansCard liability={requestDetails?.Liabilities ?? 0} />
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <CashFlowBarChartCard
            inflowTotal={requestDetails?.TotalCashIn ?? 0}
            outflowTotal={requestDetails?.TotalCashOut ?? 0}
            monthlyCashFlow={requestDetails?.MonthlyCashFlow ?? []}
          />
          <CashFlowPieChartCard
            inflowTotal={requestDetails?.TotalCashIn ?? 0}
            outflowTotal={requestDetails?.TotalCashOut ?? 0}
            cashInTypes={requestDetails?.CashInTypes ?? []}
            cashOutTypes={requestDetails?.CashOutTypes ?? []}
          />
        </Box>
      </Layout>
    </div>
  );
}
