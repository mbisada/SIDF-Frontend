import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FailSubmission from './components/FailSubmission';
import SuccessSubmission from './components/SuccessSubmission';
import { useCustomer } from './contexts/CustomerContext/useContext';
import { initializeI18n } from './i18n/i18n';
import Companies from './pages/Companies';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NeotekSDK from './pages/NeotekSDK';
import ProtectedRoute from './pages/ProtectedRoutes/ProtectedRoutes';
import Registration from './pages/Registeration';
import Unauthorized from './pages/Unauthorized';

function App() {
  useCustomer();

  useEffect(() => {
    initializeI18n();
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
            path="/companies/:psuid"
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
