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
import ProtectedRoute from './pages/ProtectedRoutes/ProtectedRoutes';
import Unauthorized from './pages/Unauthorized';
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
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/ob-connect/*"
            element={
              <ProtectedRoute requiredRole="user">
                <NeotekSDK />
              </ProtectedRoute>
            }
          />

          <Route
            path="/companies"
            element={
              <ProtectedRoute requiredRole="admin">
                <Companies />
              </ProtectedRoute>
            }
          />

          <Route
            path="/companies/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ob-connect/success"
            element={
              <ProtectedRoute requiredRole="user">
                <SuccessSubmission />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ob-connect/fail"
            element={
              <ProtectedRoute requiredRole="user">
                <FailSubmission />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
