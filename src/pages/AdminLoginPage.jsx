import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import supabase from '../lib/supabase';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('login'); // 'login' | 'forgot'
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/admin/dashboard');
      }
    });
  }, [navigate]);

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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetError('');

    const redirectTo = `${window.location.origin}/admin/reset-password`;

    const { error: resetErr } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo,
    });

    setResetLoading(false);

    if (resetErr) {
      setResetError('Could not send reset email. Please check the address and try again.');
      return;
    }

    setResetSent(true);
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
        <div className="flex flex-col items-center justify-center mb-[1.5rem]">
          <img
            src="/DW_22-removebg-preview.png"
            alt="Drishti Wealth Logo"
            className="h-14 w-auto object-contain mb-2 shrink-0"
          />
          <div className="font-serif text-[#0d2545] text-[20px] font-bold text-center leading-tight">
            Drishti Wealth
          </div>
          <div className="text-[#5c6478] text-[11px] uppercase text-center tracking-widest mt-1">
            AMFI Registered &middot; Est. 2001
          </div>
        </div>

        {/* ── LOGIN VIEW ── */}
        {view === 'login' && (
          <>
            <h1 className="font-serif text-[20px] font-semibold text-[#0d2545] text-center mb-[4px]">
              Admin Login
            </h1>
            <p className="text-[#5c6478] text-[13px] text-center mb-[1.5rem]">
              This area is for Drishti Wealth staff only.
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-[#dc2626] px-[0.75rem] py-[0.5rem] rounded-[6px] text-[13px] mb-[1rem] text-center">
                {error}
              </div>
            )}

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

              <div className="mb-[0.75rem]">
                <label className={labelStyles}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>

              {/* Forgot password link */}
              <div className="flex justify-end mb-[1.25rem]">
                <button
                  type="button"
                  onClick={() => { setView('forgot'); setError(''); }}
                  className="text-[#c9922a] text-[12px] font-medium bg-transparent border-none cursor-pointer hover:underline p-0"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0d2545] text-white py-[13px] rounded-[8px] text-[14px] font-medium cursor-pointer hover:bg-[#1a365d] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login to Dashboard'}
              </button>
            </form>
          </>
        )}

        {/* ── FORGOT PASSWORD VIEW ── */}
        {view === 'forgot' && (
          <>
            <h1 className="font-serif text-[20px] font-semibold text-[#0d2545] text-center mb-[4px]">
              Reset Password
            </h1>
            <p className="text-[#5c6478] text-[13px] text-center mb-[1.5rem]">
              Enter your admin email and we'll send a reset link.
            </p>

            {!resetSent ? (
              <>
                {resetError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-[#dc2626] px-[0.75rem] py-[0.5rem] rounded-[6px] text-[13px] mb-[1rem] text-center">
                    {resetError}
                  </div>
                )}
                <form onSubmit={handleForgotPassword}>
                  <div className="mb-[1.5rem]">
                    <label className={labelStyles}>Email</label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className={inputStyles}
                      placeholder="rutvik4585@gmail.com"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full bg-[#c9922a] text-white py-[13px] rounded-[8px] text-[14px] font-medium cursor-pointer hover:bg-[#b07f21] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {resetLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="text-[2.5rem] mb-3">📧</div>
                <p className="text-[#0d2545] font-medium text-[14px] mb-1">Check your inbox!</p>
                <p className="text-[#5c6478] text-[13px] mb-[1.5rem]">
                  A password reset link has been sent to <strong>{resetEmail}</strong>.
                  The link expires in <strong>60 minutes</strong> and can only be used once.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => { setView('login'); setResetSent(false); setResetEmail(''); setResetError(''); }}
              className="w-full mt-3 text-[#5c6478] text-[13px] bg-transparent border-none cursor-pointer hover:text-[#0d2545] transition-colors flex items-center justify-center gap-1"
            >
              ← Back to login
            </button>
          </>
        )}

        {/* Footer Note */}
        <div className="mt-[1.5rem] text-center text-[#0d2545]/30 text-[11px]">
          Secure admin access only.
        </div>

      </div>
    </div>
  );
};

export default AdminLoginPage;
