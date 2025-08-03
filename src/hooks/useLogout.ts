// src/hooks/useLogout.ts
import { useNavigate } from 'react-router-dom';

import { useCustomer } from '../contexts/CustomerContext/useContext'; // Correct path to your useCustomer hook

/**
 * Custom hook for logging out the user
 */
export const useLogout = (): (() => void) => {
  const { clearCustomer } = useCustomer(); // Get clearCustomer from useCustomer hook
  const navigate = useNavigate();

  const logout = (): void => {
    clearCustomer(); // Clear the customer context
    localStorage.clear(); // Optionally clear all data from localStorage
    navigate('/login'); // Redirect the user to the login page
  };

  return logout; // Return the logout function
};
