//{ name: string; crNumber: string }

import { CompaniesListDTO, Company } from './admin.types';

export const CompaniesListDTOMapper = (data: CompaniesListDTO): Company[] => {
  // Check if data and returnedObj are available
  if (!data || !data.data || !data.data.returnedObj) {
    return []; // Return an empty array if data is not valid
  }

  // Map the returnedObj array to Company objects
  return data.data.returnedObj.map(company => ({
    id: company.id,
    email: company.email,
    companyName: company.companyName,
    mobileNumber: company.mobileNumber,
    status: company.status,
    psuid: company.psuid, // Assuming psuid is mapped to crNumber
    role: company.role,
  }));
};
