import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FailSubmission from './components/FailSubmission';
import SuccessSubmission from './components/SuccessSubmission';
import { initializeI18n } from './i18n/i18n';
import BankAccounts from './pages/BankAccounts';
import Companies from './pages/Companies';
import ConnectBankAccount from './pages/ConnectBankAccount';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import ProtectedRoute from './pages/ProtectedRoutes/ProtectedRoutes';

import Registration from './pages/Registeration';
import Unauthorized from './pages/Unauthorized';

import './i18n/i18n';
import ReviewBelowInformation from './pages/MainScreen/ReviewBelowInformation';
import ConsentDetails from './pages/MainScreen/ConsentDetails';

function App() {
  initializeI18n();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/ob-connect/*"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              {/* <NeotekSDK /> */}

              <ConsentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ob-connect/connect"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              {/* <NeotekSDK /> */}

              <ConnectBankAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ob-connect/review"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              <ReviewBelowInformation />

            </ProtectedRoute>
          }
        />
        <Route
          path="/companies"
          element={
            <ProtectedRoute requiredRole={'ROLE_ADMIN'}>
              <Companies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/companies/:psuid"
          element={
            <ProtectedRoute requiredRole={'ROLE_ADMIN'}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ob-connect/success"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              <SuccessSubmission />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ob-connect/fail"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              <FailSubmission />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/raghi-login" element={<RaghiLogin />} />
        <Route path="/raghi-bank-success-login" element={<RaghiBankSuccessfullyLogin />} />
        <Route path="/raghi-home" element={<MainScreen />} /> */}
        <Route path="/bank-accounts" element={<BankAccounts />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
