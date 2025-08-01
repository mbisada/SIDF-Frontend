import type  { LoginDTO, LoginType, RegisterationDTO, RegisterationType } from "./registeration.types";

export const RegisterationDTOMapper = (data: RegisterationDTO): RegisterationType => {
  // Extract the first object from the returnedObj array
  const returnedObj = data?.data?.returnedObj?.[0];

  // Ensure returnedObj exists before returning the mapped object
  if (!returnedObj) {
    throw new Error("Invalid data: returnedObj is missing or empty");
  }

  // Map to RegisterationType
  return {
    id: returnedObj.id,
    email: returnedObj.email,
    companyName: returnedObj.companyName,
    mobileNumber: returnedObj.mobileNumber,
    registrationStatus: returnedObj.registrationStatus,
    status: returnedObj.status,
    psuid: returnedObj.psuid,
    role: returnedObj.role,
  };
};

export const LoginDTOMapper = (data: LoginDTO): LoginType => {
  // Extract the first object from the returnedObj array
  const returnedObj = data?.data?.returnedObj?.[0];

  // Ensure returnedObj exists before proceeding
  if (!returnedObj) {
    throw new Error("Invalid data: returnedObj is missing or empty");
  }

  // Map to LoginType
  return {
    checksum: returnedObj.checksum,
    email: returnedObj.email,
    companyName: returnedObj.companyName,
    mobileNumber: returnedObj.mobileNumber,
    crNumber: returnedObj.crNumber,
    role: returnedObj.roles[0] || "", // Take the first role or an empty string if no roles exist
  };
};
