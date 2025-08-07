import { useCustomer } from '../../contexts/CustomerContext/useContext';
import { backendAxiosInstance } from '../axiosInstance';

export const useUserProfileServices = () => {
  const { customer } = useCustomer();
  console.log('customer', customer);

  const initiateProfileRequest = async () => {
    return await backendAxiosInstance.get(`/ob/single-api-aggregator/v1/profiles?PSUId=${customer?.crNumber}&Page=1&Order=DESC`);
  };

  // https://uat.qaema.com/sdk/ob/accounts-information/v1/accounts-links?PSUId=99991239999&Page=1&Status=Active&Order=DESC

  const getAccountLinks = async () => {
    return await backendAxiosInstance.get(
      `/ob/accounts-information/v1/accounts-links?PSUId=${customer?.crNumber}&Page=1&Order=DESC&Status=Active`
    );
  };

  // https://uat.qaema.com/sdk/ob/financial-institutions-information/v1/financial-institutions
  const getFinacialInstitutions = async () => {
    return await backendAxiosInstance.get(`/ob/financial-institutions-information/v1/financial-institutions`);
  };

  const getDataGroups = async (FinancialInstitutionId: string) => {
    return await backendAxiosInstance.get(
      `/ob/financial-institutions-information/v1/financial-institutions/${FinancialInstitutionId}/data-groups`
    );
  };
  const getAccountLink = async (createAccountLinkPayload: any) => {
    return await backendAxiosInstance.post(`/ob/accounts-information/v1/accounts-links`, createAccountLinkPayload);
  };
  return { initiateProfileRequest, getAccountLinks, getFinacialInstitutions, getDataGroups, getAccountLink };
};
