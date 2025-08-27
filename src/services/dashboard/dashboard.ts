import { AxiosResponse } from 'axios';

import { backendAxiosInstance } from '../axiosInstance';

import { DashboardDataResponse, DashboardDataReturnedObj } from './dashboard.types';
import { useCustomer } from '../../contexts/CustomerContext/useContext';

export const useDashboardServices = () => {
  const { customer } = useCustomer();
  const getDashboardData = async (psuid: string, FinancialInstitutionID: string): Promise<DashboardDataReturnedObj | null> => {
    try {
      const res: AxiosResponse<DashboardDataResponse> = await backendAxiosInstance.get(
        customer?.role == 'ROLE_USER' ? `/user/candidate` : `/admin/candidate/${psuid}`,
        {
          params: { financialInstitutionId: FinancialInstitutionID == 'All' ? undefined : FinancialInstitutionID },
        }
      );
      const data = res?.data?.data?.returnedObj?.[0];
      if (res?.data?.code === 200 && data) return data;
      return null;
    } catch {
      return null;
    }
  };

  return {
    getDashboardData,
  };
};
