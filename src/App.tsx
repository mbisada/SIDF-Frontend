import { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './pages/Registeration';
import Login from './pages/Login';
import Companies from './pages/Companies';
import NeotekSDK from './pages/NeotekSDK';
import { useCustomer } from './contexts/CustomerContext/useContext';
import Dashboard from './pages/Dashboard';
import SuccessSubmission from './components/SuccessSubmission';
import FailSubmission from './components/FailSubmission';
import { initializeI18n } from './i18n/i18n';

function App() {
  const { customer } = useCustomer();

  useEffect(() => {
    initializeI18n('en');
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/ob-connect" element={<NeotekSDK />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id" element={<Dashboard />} />
          <Route path="/ob-connect/success" element={<SuccessSubmission />} />
          <Route path="/ob-connect/fail" element={<FailSubmission />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
