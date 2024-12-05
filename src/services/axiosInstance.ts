/* import axios from 'axios';

// add axios backend instance
export const backendAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/`,
});

// Add a request interceptor
backendAxiosInstance.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    const token = import.meta.env.VITE_BACKEND_API_KEY as string;

    if (token) {
      config.headers.apikey = token;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
 */

import axios, { /* AxiosError,  */ InternalAxiosRequestConfig } from 'axios';

// Add axios backend instance
export const backendAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/`,
});

// Add a request interceptor
backendAxiosInstance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    // Do something before the request is sent
    const token = import.meta.env.VITE_BACKEND_API_KEY as string;

    if (token) {
      config.headers.apikey = token;
    }

    // Add checksum header for all routes except /register and /login
    const url = config.url?.toLowerCase();
    if (url && !url.endsWith('/register') && !url.endsWith('/login')) {
      const customerData = localStorage.getItem('customer');
      if (customerData) {
        const customer = JSON.parse(customerData);
        if (customer.checksum) {
          config.headers.checksum = customer.checksum;
        }
      }
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
