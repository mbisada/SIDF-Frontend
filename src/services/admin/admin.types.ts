// Define the type for an individual company
export interface Company {
  id: number;
  email: string;
  companyName: string;
  mobileNumber: string;
  status: string;
  psuid: string | null; // psuid === crNumber can be null
  role: string;
  calculationStatus: string;
}

// Define the type for the data structure returned by the API
interface CompaniesListData {
  returnedObj: Company[]; // Array of companies
  total: number; // Total number of companies
}

// Define the main DTO type for the API response
export interface CompaniesListDTO {
  code: number; // Response code
  status: string; // Response status
  data: CompaniesListData; // Data containing companies information
}
