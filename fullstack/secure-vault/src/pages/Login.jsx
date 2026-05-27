import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [passkey, setPasskey] = useState('');
  const [identity, setIdentity] = useState('Sec_Officer_7');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const navigate = useNavigate();

  const handleSystemAccess = (e) => {
    e.preventDefault();
    if (!passkey.trim()) return;

    setIsAuthenticating(true);
    setErrorStatus(null);

    // Realistic cryptographic verification latency simulation
    setTimeout(() => {
      if (passkey === 'secure2026') {
        setIsAuthenticating(false);
        navigate('/dashboard');
      } else {
        setIsAuthenticating(false);
        setErrorStatus('INVALID CREDENTIAL PROTOCOL: DECRYPTION FAILED.');
        setPasskey('');
      }
    }, 1400);
  };

  return (
    <div className="min-h-screen w-full bg-[#06090E] flex items-center justify-center relative px-4 overflow-hidden">
      {/* Decorative cyber grid matrices */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

      <div className="w-full max-w-md bg-[#0B0F17]/80 backdrop-blur-md rounded-xl p-8 border border-slate-850 relative z-10 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-12 w-12 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4">
            <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold font-sans tracking-wide text-white">
            SecureVault
            <span className="text-xs font-mono font-normal block text-cyan-400 mt-1">Enterprise Cloud Security</span>
          </h1>
        </div>

        <form onSubmit={handleSystemAccess} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono tracking-wider text-slate-500 uppercase block">Security Identifier</label>
            <select 
              value={identity} 
              onChange={(e) => setIdentity(e.target.value)}
              className="w-full bg-[#070A0F] text-slate-300 font-mono text-xs px-3.5 py-2.5 rounded border border-slate-800 outline-none focus:border-cyan-500 transition-colors cursor-pointer"
            >
              <option value="Sec_Officer_7">Sec_Officer_7 (Compliance)</option>
              <option value="Admin_Alpha">Admin_Alpha (Superuser)</option>
              <option value="David_K">David_K (Finance Lead)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono tracking-wider text-slate-500 uppercase block">Vault Decryption Passkey</label>
            <input
              type="password"
              required
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="••••••••••••••••"
              className="w-full bg-[#070A0F] text-slate-200 font-mono text-xs px-3.5 py-2.5 rounded border border-slate-800 outline-none focus:border-cyan-500 transition-colors placeholder-slate-800 tracking-widest"
            />
          </div>

          {errorStatus && (
            <div className="p-3 rounded bg-rose-950/30 border border-rose-900/40 text-rose-400 font-mono text-[11px] leading-relaxed">
              {errorStatus}
            </div>
          )}

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs py-3 rounded transition-colors uppercase tracking-wider relative overflow-hidden"
          >
            {isAuthenticating ? (
              <span className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Running Authentication...</span>
              </span>
            ) : "Initialize System Session"}
          </button>
        </form>

        <div className="mt-8 border-t border-slate-900/60 pt-4 text-center">
          <p className="text-[10px] font-mono text-slate-600">
            Authorized Personnel Only. Terminal Actions Monitored Under Protocol SV-2026.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;