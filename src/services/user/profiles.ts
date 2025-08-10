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
    return await backendAxiosInstance.post(`/account-link`, createAccountLinkPayload, {
      headers: {
        apikey: customer?.checksum,
      },
    });
  };

  const linkAccountEvent = async (EventId: string) => {
    return await backendAxiosInstance.get(`/event/${EventId}/info`);
  };

  const linkProfile = async (AccountsLinkId: string) => {
    return await backendAxiosInstance.post(`/ob/single-api-aggregator/v1/profiles/profile-accounts-link`, {
      AccountsLinkId: AccountsLinkId,
      PSUId: customer?.crNumber,
      AccountsLinkInfo: {
        AccountsLinkId,
        FetchingType: 'SINGLE',
      },
    });
  };
  const ListUserAccounts = async () => {
    return await backendAxiosInstance.post(`/user/list-accounts`, {
      PSUId: customer?.crNumber,
      isCalclated: false,
    });
  };

  const calculateAccount = async ({
    AccountsLinkId,
    FinancialInstitutionId,
  }: {
    AccountsLinkId: string;
    FinancialInstitutionId: string;
  }) => {
    return await backendAxiosInstance.post(`/user/calculate`, {
      PSUId: customer?.crNumber,
      AccountsLinkId,
      FinancialInstitutionId,
    });
  };

  const exportReport = async (PSUId: string, format: string) => {
    return await backendAxiosInstance.get(`/admin/e-statements/export`, {
      params: { PSUId, format },
    });
  };
  return {
    initiateProfileRequest,
    getAccountLinks,
    getFinacialInstitutions,
    getDataGroups,
    getAccountLink,
    linkAccountEvent,
    linkProfile,
    ListUserAccounts,
    calculateAccount,
    exportReport,
  };
};
