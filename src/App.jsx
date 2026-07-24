import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import supabase from './lib/supabase';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';

// Lazy Loaded Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const NRIPage = lazy(() => import('./pages/NRIPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const MutualFundPage = lazy(() => import('./pages/MutualFundPage'));
const InsurancePage = lazy(() => import('./pages/InsurancePage'));
const TravelInsurancePage = lazy(() => import('./pages/TravelInsurancePage'));
const RetirementPage = lazy(() => import('./pages/RetirementPage'));
const GoalPlanningPage = lazy(() => import('./pages/GoalPlanningPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const SingleBlogPage = lazy(() => import('./pages/SingleBlogPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminResetPasswordPage = lazy(() => import('./pages/AdminResetPasswordPage'));
const LogoShowcasePage = lazy(() => import('./pages/LogoShowcasePage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const DisclosuresPage = lazy(() => import('./pages/DisclosuresPage'));

// Dynamic Loading Fallback Screen
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#faf8f4]">
    <div className="w-12 h-12 border-4 border-[#c9922a] border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-[#0d2545] font-sans font-medium text-xs tracking-wider uppercase animate-pulse">
      Loading Drishti Wealth...
    </p>
  </div>
);

// ProtectedRoute Component
// Checks:
//   1. The user is logged in (has a Supabase session)
//   2. Their email is in the admin allowlist (VITE_ADMIN_EMAILS env var,
//      comma-separated). Falls back to checking user_metadata.is_admin.
function ProtectedRoute({ children }) {
  const [authState, setAuthState] = useState('loading'); // 'loading' | 'admin' | 'denied' | 'unauthenticated'

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setAuthState('unauthenticated');
        return;
      }

      const userEmail = session.user?.email || '';
      const allowedEmails = (import.meta.env.VITE_ADMIN_EMAILS || '')
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);

      // Check email allowlist first; fall back to user_metadata flag
      const isAdmin =
        (allowedEmails.length > 0 && allowedEmails.includes(userEmail.toLowerCase())) ||
        session.user?.user_metadata?.is_admin === true;

      setAuthState(isAdmin ? 'admin' : 'denied');
    });
  }, []);

  if (authState === 'loading') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'DM Sans',
        color: '#5c6478'
      }}>
        Loading...
      </div>
    );
  }

  if (authState === 'unauthenticated') return <Navigate to="/admin/login" replace />;
  if (authState === 'denied') return <Navigate to="/" replace />;

  return children;
}

// NotFoundPage Component
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#faf8f4]">
      <h1 className="text-[120px] font-serif font-bold text-[#0d2545] leading-none mb-4">404</h1>
      <p className="text-[#5c6478] text-[18px] mb-8">Page not found</p>
      <Link
        to="/"
        className="bg-[#c9922a] text-white px-8 py-3 rounded-[8px] font-medium hover:bg-[#f0c96a] transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
};



export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100 flex flex-col relative">
          <ScrollToTop />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/nri" element={<NRIPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/mutual-funds" element={<MutualFundPage />} />
              <Route path="/services/insurance" element={<InsurancePage />} />
              <Route path="/services/travel-insurance" element={<TravelInsurancePage />} />
              <Route path="/services/retirement" element={<RetirementPage />} />
              <Route path="/services/goal-planning" element={<GoalPlanningPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<SingleBlogPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/logo-showcase" element={<LogoShowcasePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/disclosures" element={<DisclosuresPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
