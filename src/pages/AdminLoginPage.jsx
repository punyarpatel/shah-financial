import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import supabase from '../lib/supabase';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (authError) {
      setError('Invalid email or password.');
      setLoading(false);
      return;
    }

    navigate('/admin/dashboard');
  };

  const labelStyles = "block text-[#5c6478] text-[12px] uppercase tracking-[0.04em] mb-[4px] font-medium";
  const inputStyles = "w-full px-[12px] py-[10px] border border-[#0d2545]/15 rounded-[8px] text-[14px] bg-white outline-none focus:border-[#c9922a] transition-colors";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f4]">
      <Helmet>
        <title>Admin Login | Drishti Wealth</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="bg-white border border-[#0d2545]/12 rounded-[14px] p-[2.5rem] max-w-[400px] w-[90%] shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
        
        {/* Branding */}
        <div className="font-serif text-[#0d2545] text-[18px] font-semibold text-center mb-[4px]">
          Drishti Wealth
        </div>
        <div className="text-[#5c6478] text-[11px] uppercase text-center mb-[2rem] tracking-widest">
          AMFI Registered &middot; Est. 2001
        </div>

        {/* Heading */}
        <h1 className="font-serif text-[20px] font-semibold text-[#0d2545] text-center mb-[4px]">
          Admin Login
        </h1>
        <p className="text-[#5c6478] text-[13px] text-center mb-[1.5rem]">
          This area is for Drishti Wealth staff only.
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-[#dc2626] px-[0.75rem] py-[0.5rem] rounded-[6px] text-[13px] mb-[1rem] text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-[1rem]">
            <label className={labelStyles}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyles}
              required
            />
          </div>

          <div className="mb-[1.5rem]">
            <label className={labelStyles}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputStyles}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#0d2545] text-white py-[13px] rounded-[8px] text-[14px] font-medium cursor-pointer mt-[0.5rem] hover:bg-[#1a365d] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-[1.5rem] text-center text-[#0d2545]/30 text-[11px]">
          Secure admin access only.
        </div>

      </div>

    </div>
  );
};

export default AdminLoginPage;
