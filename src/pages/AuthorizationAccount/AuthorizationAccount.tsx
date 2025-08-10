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
import { useSearchParams } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

export default function AuthorizationAccount() {
  const [requestDetails, setRequestDetails] = useState<DashboardDataReturnedObj | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    setIsLoading(false);
  }, [queryParams]);

  if (isLoading) return <Spinner />;

  return <div>GG</div>;
}
