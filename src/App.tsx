import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FailSubmission from './components/FailSubmission';
import SuccessSubmission from './components/SuccessSubmission';
import { initializeI18n } from './i18n/i18n';
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
import ViewReport from './pages/MainScreen/ViewReport';
import RegisterationSuccess from './pages/Registeration/RegisterationSuccess';

function App() {
  initializeI18n();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/registrationSuccess" element={<RegisterationSuccess />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/ob-connect/*"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              <ConsentDetails calculated={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consent-details"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              <ConsentDetails calculated={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ob-connect/connect"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
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

        <Route path="/companies/:psuid" element={<Dashboard />} />

        <Route
          path="/ob-connect/success"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              <SuccessSubmission />
            </ProtectedRoute>
          }
        />
        <Route path="/ViewReport" element={<ViewReport />} />
        <Route
          path="/ob-connect/fail"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              <FailSubmission />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
