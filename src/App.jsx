import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import supabase from './lib/supabase';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import NRIPage from './pages/NRIPage';
import AboutPage from './pages/AboutPage';
import MutualFundPage from './pages/MutualFundPage';
import InsurancePage from './pages/InsurancePage';
import RetirementPage from './pages/RetirementPage';
import ELSSPage from './pages/ELSSPage';
import GoalPlanningPage from './pages/GoalPlanningPage';
import BlogPage from './pages/BlogPage';
import SingleBlogPage from './pages/SingleBlogPage';
import ClientPortalPage from './pages/ClientPortalPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// ProtectedRoute Component
function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  if (session === undefined) {
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

  if (!session) return <Navigate to="/admin/login" replace />;

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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nri" element={<NRIPage />} />
            <Route path="/services/mutual-funds" element={<MutualFundPage />} />
            <Route path="/services/insurance" element={<InsurancePage />} />
            <Route path="/services/retirement" element={<RetirementPage />} />
            <Route path="/services/elss" element={<ELSSPage />} />
            <Route path="/services/goal-planning" element={<GoalPlanningPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<SingleBlogPage />} />
            <Route path="/client-portal" element={<ClientPortalPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
