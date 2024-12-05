import { useCustomer } from '../../contexts/CustomerContext/useContext';
import { backendAxiosInstance } from '../axiosInstance';

export const useUserServices = () => {
  const { customer } = useCustomer();
  const initiateCalculateRequest = async () => {
    return await backendAxiosInstance.post(`/user/calculate`, { data: { psuid: customer?.crNumber } });
  };

  return { initiateCalculateRequest };
};
