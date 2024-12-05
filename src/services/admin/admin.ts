import { backendAxiosInstance } from '../axiosInstance';
import { CompaniesListDTO } from './admin.types';

export const useAdminServices = () => {
  const getCompaniesList = async (status: string /* page?: string, size?: string */): Promise<CompaniesListDTO> => {
    return await backendAxiosInstance.get(`/admin/listcandidates?status=${status}`);
  };

  return { getCompaniesList };
};
