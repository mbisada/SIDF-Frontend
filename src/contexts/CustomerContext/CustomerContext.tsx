// src/context/CustomerContext.tsx
import React, { createContext, /* useContext, */ useState, ReactNode, useEffect } from 'react';

export interface CustomerInfo {
  companyName: string,
  email: string,
  crNumber: string,
  mobileNumber: string,
  password?: string,
  role?:string,
  checksum?:string
}

export interface CustomerContextType {
  customer: CustomerInfo | null;
  setCustomer: (customer: CustomerInfo | null) => void;
  clearCustomer: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
/*   const [customer, setCustomerState] = useState<CustomerInfo | null>(null);

  const setCustomer = (customer: CustomerInfo | null) => {
    setCustomerState(customer);
  };

  const clearCustomer = () => {
    setCustomerState(null);
  }; */
const [customer, setCustomerState] = useState<CustomerInfo | null>(() => {
    const savedCustomer = localStorage.getItem("customer");
    return savedCustomer ? JSON.parse(savedCustomer) : null;
  });

  const setCustomer = (customer: CustomerInfo) => {
    setCustomerState(customer);
    localStorage.setItem("customer", JSON.stringify(customer));
  };

   const clearCustomer = () => {
    setCustomerState(null);
    localStorage.removeItem("customer")
  };

  useEffect(() => {
    // Check if user is already logged in
    const savedCustomer = localStorage.getItem("customer");
    if (savedCustomer) {
      setCustomerState(JSON.parse(savedCustomer));
    }
  }, []);

  return (
    <CustomerContext.Provider value={{ customer, setCustomer, clearCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
/* 
export const useCustomer = (): CustomerContextType => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
 */