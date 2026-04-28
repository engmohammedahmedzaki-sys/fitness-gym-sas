import React, { createContext, lazy, useMemo, useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';
import SEO from './components/SEO.jsx';

const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Members = lazy(() => import('./pages/Members.jsx'));
const Finance = lazy(() => import('./pages/Finance.jsx'));
const More = lazy(() => import('./pages/More.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Landing = lazy(() => import('./pages/Landing.jsx'));
const PublicInfo = lazy(() => import('./pages/PublicInfo.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const ThankYou = lazy(() => import('./pages/ThankYou.jsx'));
const BasicData = lazy(() => import('./pages/BasicData.jsx'));
const BasicDataManager = lazy(() => import('./pages/BasicDataManager.jsx'));
const MasterConsole = lazy(() => import('./pages/MasterConsole.jsx'));
const TenantBranding = lazy(() => import('./pages/TenantBranding.jsx'));
const WhatsAppAutomation = lazy(() => import('./pages/WhatsAppAutomation.jsx'));
const PaymentGateways = lazy(() => import('./pages/PaymentGateways.jsx'));
const ReportsCenter = lazy(() => import('./pages/ReportsCenter.jsx'));
const PrintSettings = lazy(() => import('./pages/PrintSettings.jsx'));
const LocalizationSettings = lazy(() => import('./pages/LocalizationSettings.jsx'));
const Permissions = lazy(() => import('./pages/Permissions.jsx'));

export const GymContext = createContext(null);

const initialStats = {
  totalMembers: 1284,
  activeSubscriptions: 973,
  dailyRevenue: 18450,
  todayAttendance: 216,
};

function ProtectedRoutes({ isAuthenticated }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function App() {
  const [aiCommand, setAiCommand] = useState('');
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    gymCode: '',
    branch: '',
    language: 'العربية',
  });

  const login = (payload) => {
    setAuth({
      isAuthenticated: true,
      user: payload.username || 'admin',
      gymCode: payload.gymCode || 'Fitness Gym',
      branch: payload.branch || 'الفرع الرئيسي',
      language: payload.language || 'العربية',
    });
  };

  const logout = () => {
    setAiCommand('');
    setAuth({
      isAuthenticated: false,
      user: null,
      gymCode: '',
      branch: '',
      language: 'العربية',
    });
  };

  const gymState = useMemo(
    () => ({
      user: 'محمد زكي',
      brand: 'Fitness Gym',
      developer: 'Mohamed Zaki - Panda Plus',
      stats: initialStats,
      aiCommand,
      setAiCommand,
      auth,
      login,
      logout,
    }),
    [aiCommand, auth],
  );

  return (
    <GymContext.Provider value={gymState}>
      <SEO />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="about" element={<PublicInfo type="about" />} />
        <Route path="contact" element={<PublicInfo type="contact" />} />
        <Route path="privacy" element={<PublicInfo type="privacy" />} />
        <Route path="terms" element={<PublicInfo type="terms" />} />
        <Route path="refund-policy" element={<PublicInfo type="refund" />} />
        <Route path="signup" element={<Signup />} />
        <Route path="thank-you" element={<ThankYou />} />
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoutes isAuthenticated={auth.isAuthenticated} />}>
          <Route element={<MainLayout />}>
            <Route path="app" element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="finance" element={<Finance />} />
            <Route path="more" element={<More />} />
            <Route path="master-console" element={<MasterConsole />} />
            <Route path="tenant-branding" element={<TenantBranding />} />
            <Route path="whatsapp-automation" element={<WhatsAppAutomation />} />
            <Route path="payment-gateways" element={<PaymentGateways />} />
            <Route path="reports" element={<ReportsCenter />} />
            <Route path="print-settings" element={<PrintSettings />} />
            <Route path="localization-settings" element={<LocalizationSettings />} />
            <Route path="permissions" element={<Permissions />} />
            <Route path="basic-data" element={<BasicData />} />
            <Route path="basic-data/:section" element={<BasicDataManager />} />
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Route>
        </Route>
      </Routes>
    </GymContext.Provider>
  );
}
