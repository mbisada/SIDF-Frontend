import axios, { InternalAxiosRequestConfig } from 'axios';

export const backendAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/`,
});

backendAxiosInstance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const token = import.meta.env.VITE_BACKEND_API_KEY as string;

    if (token) {
      config.headers.apikey = token;
    }

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
    return Promise.reject(error);
  }
);

backendAxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      const url = error.config.url?.toLowerCase();
      if (url && !url.endsWith('/login')) {
        localStorage.clear();
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  }
);
