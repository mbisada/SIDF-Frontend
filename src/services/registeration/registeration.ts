//import { AxiosError } from "axios";
import { backendAxiosInstance } from "../axiosInstance";

interface RegisterPayload {
  email: string;
  password: string;
  mobileNumber: string;
  companyName: string;
  psuid: string
}
export const useRegisterationServices =()=>{

     const createRegisterationRequest = async (payload: RegisterPayload) => {
    try {
      const response = await backendAxiosInstance.post('/register', payload);

      if (!response || !response?.data || !response?.data?.returnedObj) return null;
      return response?.data?.returnedObj[0];
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        throw new Error('401'); // Throw the '401' error to propagate it
      }

      throw error; // Propagate error to the calling function
    }
  };
 return {
    createRegisterationRequest,

  }; 
}