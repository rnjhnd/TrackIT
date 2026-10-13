import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Server, Key, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { authApi } from '../api';
import { ModalShell } from '../components/common';

const Login: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmployeeId, setForgotEmployeeId] = useState('');
  const [isSubmittingForgot, setIsSubmittingForgot] = useState(false);

  const { login, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeId || !password) {
      toast.error('ACCESS DENIED: MISSING CREDENTIALS');
      setError('Please provide both Employee ID and password.');
      return;
    }

    try {
      const data = await authApi.login(employeeId, password);
      login(data.user, data.token);
      toast.success('LOGGED IN SUCCESSFULLY', { id: 'login-toast' });
      navigate('/');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Login failed');
      } else {
        setError('Login failed');
      }
    }
  };

  const fillCredentials = (id: string, pass: string, roleName: string) => {
    setEmployeeId(id);
    setPassword(pass);
    setError('');
    toast.success(`LOADED ${roleName} CREDENTIALS`, { id: 'autofill-toast' });
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmployeeId) {
      toast.error('Please enter your Employee ID');
      return;
    }
    
    setIsSubmittingForgot(true);
    try {
      await authApi.requestReset(forgotEmployeeId);
      toast.success('Password reset request sent to Administrators!', { duration: 5000 });
      setIsForgotModalOpen(false);
      setForgotEmployeeId('');
    } catch {
      toast.error('Failed to send reset request');
    } finally {
      setIsSubmittingForgot(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* LEFT SIDE - BRANDING */}
      <div className="w-full md:w-1/2 bg-[#2563eb] p-8 md:p-14 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
        
        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between gap-4 text-white mb-12 md:mb-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white text-[#2563eb] flex items-center justify-center font-mono shrink-0 shadow-[4px_4px_0_0_#1e3a8a]">
              <Server size={22} />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-lg font-black tracking-tight uppercase leading-none">
                Track<span className="text-blue-200">IT</span>
              </span>
              <span className="text-white/40 font-mono text-xs font-bold">//</span>
              <span className="font-mono font-bold tracking-widest text-[11px] uppercase bg-blue-900/50 border border-blue-300/30 px-2 py-0.5 text-blue-100">
                IT Asset Operations
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] font-bold uppercase bg-blue-900/60 border border-blue-400/40 px-2.5 py-1 text-blue-100">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            SYSTEM ONLINE
          </div>
        </div>

        {/* Bottom Hero & Capabilities */}
        <div className="relative z-10 mt-auto pt-10">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-3">
            Track<span className="text-gray-900 bg-white px-2 ml-1 shadow-[4px_4px_0_0_#1e3a8a]">IT</span>
          </h1>
          <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-blue-100 mb-8 font-bold">
            Internal Hardware Asset Management Portal
          </p>

          {/* Core Capability Pills */}
          <div className="space-y-2.5 max-w-md">
            <div className="flex items-center gap-3 bg-blue-900/40 border border-blue-400/30 p-2.5">
              <span className="font-mono text-[10px] font-bold text-white bg-blue-600 px-1.5 py-0.5 border border-blue-300 shrink-0 uppercase tracking-wider">
                AUDIT
              </span>
              <p className="font-mono text-xs text-blue-100 uppercase tracking-wide">
                Timestamped hardware checkout & custody logs
              </p>
            </div>

            <div className="flex items-center gap-3 bg-blue-900/40 border border-blue-400/30 p-2.5">
              <span className="font-mono text-[10px] font-bold text-white bg-blue-600 px-1.5 py-0.5 border border-blue-300 shrink-0 uppercase tracking-wider">
                ROLES
              </span>
              <p className="font-mono text-xs text-blue-100 uppercase tracking-wide">
                Granular admin provisioning & employee views
              </p>
            </div>

            <div className="flex items-center gap-3 bg-blue-900/40 border border-blue-400/30 p-2.5">
              <span className="font-mono text-[10px] font-bold text-white bg-blue-600 px-1.5 py-0.5 border border-blue-300 shrink-0 uppercase tracking-wider">
                EXPORT
              </span>
              <p className="font-mono text-xs text-blue-100 uppercase tracking-wide">
                CSV batch import & inventory reporting
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN */}
      <div className="w-full md:w-1/2 bg-transparent flex items-center justify-center p-4 sm:p-8 relative">
        <div className="w-full max-w-md">
          {/* Main Login Box */}
          <div className="bg-white p-6 sm:p-10 border-2 border-gray-900 shadow-[8px_8px_0_0_#111827] relative z-10 mb-6">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-gray-900 mb-2">Authentication</h2>
              <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">Enter secure credentials</p>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-600 border-2 border-red-500 p-4 mb-6 font-mono text-xs sm:text-sm font-bold uppercase text-center shadow-[4px_4px_0_0_#dc2626]">
                ERROR: {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block font-mono text-xs font-bold text-gray-900 mb-2 uppercase tracking-widest">Employee ID</label>
                <input 
                  type="text" 
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full border-2 border-gray-900 bg-white p-3 sm:p-3.5 font-mono text-sm focus:shadow-[3px_3px_0_0_#111827] focus:outline-none transition-all placeholder:text-gray-400"
                  placeholder="EMP-001"
                />
              </div>
              <div>
                <label className="block font-mono text-xs font-bold text-gray-900 mb-2 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 border-gray-900 bg-white p-3 sm:p-3.5 pr-12 font-mono text-sm focus:shadow-[3px_3px_0_0_#111827] focus:outline-none transition-all placeholder:text-gray-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsForgotModalOpen(true)}
                    className="font-mono text-xs text-gray-500 hover:text-black uppercase font-bold tracking-widest transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#2563eb] text-white font-mono uppercase font-bold tracking-widest py-3.5 mt-6 hover:bg-blue-600 transition-all flex items-center justify-center gap-3 border-2 border-gray-900 shadow-[4px_4px_0_0_#111827] hover:shadow-[2px_2px_0_0_#111827] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
              >
                <Key size={18} /> Proceed
              </button>
            </form>
          </div>

          {/* Quick Demo Access Buttons */}
          <div className="bg-white border-2 border-gray-900 p-4 shadow-[4px_4px_0_0_#111827]">
            <div className="flex items-center justify-between mb-3 border-b-2 border-gray-900 pb-2">
              <p className="font-mono text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                <Server size={14} className="text-[#2563eb]" /> Demo Accounts
              </p>
              <span className="font-mono text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                Click to Autofill
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => fillCredentials('EMP-001', 'admin123', 'ADMIN')}
                className="group text-left p-2.5 border-2 border-gray-900 bg-gray-50 hover:bg-blue-50 hover:border-blue-600 transition-all shadow-[2px_2px_0_0_#111827] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-300 px-1.5 py-0.2">
                    ADMIN
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 group-hover:text-blue-600 font-bold uppercase">
                    Autofill ↵
                  </span>
                </div>
                <p className="font-mono text-xs font-bold text-gray-900">EMP-001</p>
                <p className="font-mono text-[10px] text-gray-500">Pass: admin123</p>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('EMP-002', 'employee123', 'STAFF')}
                className="group text-left p-2.5 border-2 border-gray-900 bg-gray-50 hover:bg-emerald-50 hover:border-emerald-600 transition-all shadow-[2px_2px_0_0_#111827] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.2">
                    STAFF
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 group-hover:text-emerald-600 font-bold uppercase">
                    Autofill ↵
                  </span>
                </div>
                <p className="font-mono text-xs font-bold text-gray-900">EMP-002</p>
                <p className="font-mono text-[10px] text-gray-500">Pass: employee123</p>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      <ModalShell
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        title={
          <span className="flex items-center gap-2">
            <Key size={24} /> Reset Request
          </span>
        }
        subtitle="Enter your Employee ID to submit a password reset request to your IT Administrator."
      >
        <form onSubmit={handleForgotSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs font-bold text-gray-900 mb-2 uppercase tracking-widest">Employee ID</label>
            <input 
              type="text" 
              value={forgotEmployeeId}
              onChange={(e) => setForgotEmployeeId(e.target.value)}
              className="w-full border-2 border-gray-900 bg-white p-3 font-mono text-sm focus:shadow-[3px_3px_0_0_#111827] focus:outline-none transition-all placeholder:text-gray-400"
              placeholder="EMP-001"
              required
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={() => setIsForgotModalOpen(false)}
              className="flex-1 bg-gray-200 text-gray-900 font-mono uppercase font-bold tracking-widest py-3 hover:bg-gray-300 transition-colors border-2 border-gray-900 shadow-[2px_2px_0_0_#111827] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmittingForgot}
              className="flex-1 bg-gray-900 text-white font-mono uppercase font-bold tracking-widest py-3 hover:bg-black transition-colors border-2 border-gray-900 shadow-[2px_2px_0_0_#111827] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer disabled:opacity-50"
            >
              {isSubmittingForgot ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>
      </ModalShell>
    </div>
  );
};

export default Login;
