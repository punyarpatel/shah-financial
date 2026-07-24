import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import supabase from '../lib/supabase';

const AdminResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error' | 'invalid'
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase redirects the user here with the recovery token in the URL hash.
    // Supabase JS automatically parses the hash and sets a temporary session.
    // We listen for the PASSWORD_RECOVERY event to confirm the token is valid.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // Token is valid and session is active — user can now set a new password.
        setStatus('idle');
      }
      if (event === 'SIGNED_OUT') {
        // Token was invalid or already used
        setStatus('invalid');
      }
    });

    // Also check if there's already an active recovery session on page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // No session means the link is invalid or already been used
        setStatus('invalid');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setStatus('loading');

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message || 'Failed to update password. The link may have expired.');
      setStatus('idle');
      return;
    }

    // Sign out to invalidate the recovery session so the link can't be reused
    await supabase.auth.signOut();
    setStatus('success');
  };

  const labelStyles = "block text-[#5c6478] text-[12px] uppercase tracking-[0.04em] mb-[4px] font-medium";
  const inputStyles = "w-full px-[12px] py-[10px] border border-[#0d2545]/15 rounded-[8px] text-[14px] bg-white outline-none focus:border-[#c9922a] transition-colors";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f4]">
      <Helmet>
        <title>Reset Password | Drishti Wealth</title>
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

        {/* ── INVALID / EXPIRED LINK ── */}
        {status === 'invalid' && (
          <div className="text-center">
            <div className="text-[2.5rem] mb-3">🔗</div>
            <h1 className="font-serif text-[18px] font-semibold text-[#0d2545] mb-2">
              Link Invalid or Expired
            </h1>
            <p className="text-[#5c6478] text-[13px] mb-[1.5rem]">
              This password reset link has already been used, has expired, or is invalid.
              Reset links are <strong>single-use</strong> and expire after <strong>60 minutes</strong>.
            </p>
            <button
              onClick={() => navigate('/admin/login')}
              className="w-full bg-[#c9922a] text-white py-[13px] rounded-[8px] text-[14px] font-medium cursor-pointer hover:bg-[#b07f21] transition-colors"
            >
              Request a New Link
            </button>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {status === 'success' && (
          <div className="text-center">
            <div className="text-[2.5rem] mb-3">✅</div>
            <h1 className="font-serif text-[18px] font-semibold text-[#0d2545] mb-2">
              Password Updated!
            </h1>
            <p className="text-[#5c6478] text-[13px] mb-[1.5rem]">
              Your password has been changed successfully. You can now log in with your new password.
            </p>
            <button
              onClick={() => navigate('/admin/login')}
              className="w-full bg-[#0d2545] text-white py-[13px] rounded-[8px] text-[14px] font-medium cursor-pointer hover:bg-[#1a365d] transition-colors"
            >
              Go to Login
            </button>
          </div>
        )}

        {/* ── RESET FORM ── */}
        {(status === 'idle' || status === 'loading') && (
          <>
            <h1 className="font-serif text-[20px] font-semibold text-[#0d2545] text-center mb-[4px]">
              Set New Password
            </h1>
            <p className="text-[#5c6478] text-[13px] text-center mb-[1.5rem]">
              Choose a strong password for your admin account.
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-[#dc2626] px-[0.75rem] py-[0.5rem] rounded-[6px] text-[13px] mb-[1rem] text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-[1rem]">
                <label className={labelStyles}>New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputStyles + ' pr-[40px]'}
                    placeholder="Minimum 8 characters"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#5c6478] bg-transparent border-none cursor-pointer text-[12px]"
                    tabIndex={-1}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {/* Strength hint */}
                {password.length > 0 && (
                  <div className={`mt-1 text-[11px] font-medium ${password.length < 8 ? 'text-red-500' : password.length < 12 ? 'text-amber-500' : 'text-green-600'}`}>
                    {password.length < 8 ? 'Too short' : password.length < 12 ? 'Moderate strength' : 'Strong password ✓'}
                  </div>
                )}
              </div>

              <div className="mb-[1.5rem]">
                <label className={labelStyles}>Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputStyles}
                  placeholder="Repeat your new password"
                  required
                />
                {confirmPassword.length > 0 && password !== confirmPassword && (
                  <div className="mt-1 text-[11px] font-medium text-red-500">Passwords don't match</div>
                )}
                {confirmPassword.length > 0 && password === confirmPassword && (
                  <div className="mt-1 text-[11px] font-medium text-green-600">Passwords match ✓</div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || password !== confirmPassword || password.length < 8}
                className="w-full bg-[#0d2545] text-white py-[13px] rounded-[8px] text-[14px] font-medium cursor-pointer hover:bg-[#1a365d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </>
        )}

        <div className="mt-[1.5rem] text-center text-[#0d2545]/30 text-[11px]">
          Secure admin access only.
        </div>
      </div>
    </div>
  );
};

export default AdminResetPasswordPage;
