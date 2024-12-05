import axios from 'axios';

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
