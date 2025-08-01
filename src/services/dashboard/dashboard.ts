import { AxiosResponse } from 'axios';

import { backendAxiosInstance } from '../axiosInstance';

import { DashboardDataResponse, DashboardDataReturnedObj } from './dashboard.types';

export const useDashboardServices = () => {
  const getDashboardData = async (psuid: string): Promise<DashboardDataReturnedObj | null> => {
    try {
      const res: AxiosResponse<DashboardDataResponse> = await backendAxiosInstance.get(`/admin/candidate/${psuid}`);
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
