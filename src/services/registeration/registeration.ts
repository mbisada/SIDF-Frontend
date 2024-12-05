//import { AxiosError } from "axios";
import { backendAxiosInstance } from "../axiosInstance";
import type { LoginPayload, RegisterPayload } from "./registeration.types";


export const useRegisterationServices =()=>{

  const createRegisterationRequest = async (payload: RegisterPayload) => {
    return await backendAxiosInstance.post('/register', payload);
  };

/*   const createLoginRequest = async (payload: LoginPayload) =>{
    return await backendAxiosInstance.post('/login', payload);
  } */

  const createLoginRequest = async (payload: LoginPayload) => {
    // Convert payload to URL-encoded format
    const urlEncodedPayload = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      urlEncodedPayload.append(key, String(value));
    });

    // Send the POST request with the correct headers
    return await backendAxiosInstance.post('/login', urlEncodedPayload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  };

 return {
  createRegisterationRequest,
  createLoginRequest
  }; 
}