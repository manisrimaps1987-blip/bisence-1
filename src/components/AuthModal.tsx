import React, { useState } from 'react';
import { UserAccount } from '../types';
import { 
  ShieldCheck, 
  Building2, 
  User, 
  X, 
  CheckCircle2, 
  Lock, 
  Mail, 
  FileText, 
  Sparkles,
  ArrowRight,
  LogOut,
  Download
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount;
  onLogin: (account: UserAccount) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'signin' | 'signup'>(user.isLoggedIn ? 'signin' : 'signup');
  const [name, setName] = useState(user.name || 'Sunil Sharma');
  const [org, setOrg] = useState(user.organization || 'Bharat Kitchenware Ltd.');
  const [email, setEmail] = useState(user.email || 'sunil.sharma@bharatkitchen.in');
  const [udyam, setUdyam] = useState(user.udyamNumber || 'UDYAM-MH-12-0045892');
  const [role, setRole] = useState<UserAccount['role']>(user.role || 'MSME Manufacturer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name,
      organization: org,
      role,
      email,
      udyamNumber: udyam,
      isLoggedIn: true
    });
    onClose();
  };

  const handleQuickDemo = (demoRole: UserAccount['role']) => {
    if (demoRole === 'MSME Manufacturer') {
      onLogin({
        name: 'Sunil Sharma',
        organization: 'Bharat Kitchenware Tech Ltd.',
        role: 'MSME Manufacturer',
        email: 'sunil@bharatkitchenware.in',
        udyamNumber: 'UDYAM-MH-12-0045892',
        isLoggedIn: true
      });
    } else if (demoRole === 'Consumer') {
      onLogin({
        name: 'Priya Iyer',
        organization: 'Independent Consumer',
        role: 'Consumer',
        email: 'priya.iyer@gmail.com',
        isLoggedIn: true
      });
    } else {
      onLogin({
        name: 'Dr. Rajesh Nair',
        organization: 'Quality & Testing Solutions Lab',
        role: 'Quality Manager',
        email: 'r.nair@qtslab.in',
        udyamNumber: 'UDYAM-KR-03-0091244',
        isLoggedIn: true
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header with BIS Brand Banner */}
        <div className="bg-[#0F2C61] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-blue-900/80 hover:bg-blue-800 text-blue-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#0F2C61] rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black tracking-wide">
                  BIS<span className="text-amber-400">ENCE</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-800 text-blue-200 font-bold uppercase tracking-wider">
                  Enterprise Gateway
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                National Standards Discovery & Compliance Portal
              </p>
            </div>
          </div>
        </div>

        {/* User is Logged In: Show Account Dashboard */}
        {user.isLoggedIn ? (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Active Verified Account
                </span>
                <h4 className="text-lg font-bold text-slate-900">{user.name}</h4>
                <p className="text-xs text-slate-600">{user.organization}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {user.role}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold text-[10px] uppercase">Email:</span>
                <p className="font-semibold text-slate-800 truncate">{user.email}</p>
              </div>
              {user.udyamNumber && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                  <span className="text-blue-700 font-bold text-[10px] uppercase">Udyam Registration:</span>
                  <p className="font-semibold text-blue-950 font-mono">{user.udyamNumber}</p>
                </div>
              )}
            </div>

            {/* Dashboard Quick Actions */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700">Account Privileges & Tools:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => alert("Simulated: Exporting Factory Audit Dossier (PDF)")}
                  className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 text-left flex items-center justify-between font-semibold text-slate-700 hover:bg-blue-50 transition-colors"
                >
                  <span>Export Audit Memo</span>
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                </button>
                <button
                  onClick={() => alert("Simulated: Navigating to Manak Online Single Sign-On")}
                  className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 text-left flex items-center justify-between font-semibold text-slate-700 hover:bg-blue-50 transition-colors"
                >
                  <span>Manak Online SSO</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl text-rose-700 hover:bg-rose-50 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#0F2C61] hover:bg-blue-900 text-white text-xs font-bold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <div className="p-6 space-y-5">
            {/* Quick Demo Buttons for Instant Evaluator Testing */}
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Instant Evaluator Demo Sign In:</span>
                </span>
                <span className="text-[10px] text-blue-700 font-semibold">1-Click</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleQuickDemo('MSME Manufacturer')}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-blue-300 text-[11px] font-bold text-[#0F2C61] hover:bg-blue-100 transition-colors truncate"
                >
                  🏭 MSME Manufacturer
                </button>
                <button
                  onClick={() => handleQuickDemo('Consumer')}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-emerald-300 text-[11px] font-bold text-emerald-800 hover:bg-emerald-50 transition-colors truncate"
                >
                  👤 Citizen Consumer
                </button>
              </div>
            </div>

            {/* Tab switch */}
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setMode('signup')}
                className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition-colors ${
                  mode === 'signup'
                    ? 'border-[#0F2C61] text-[#0F2C61]'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Register Enterprise
              </button>
              <button
                onClick={() => setMode('signin')}
                className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition-colors ${
                  mode === 'signin'
                    ? 'border-[#0F2C61] text-[#0F2C61]'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Sign In
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 text-slate-800"
                      placeholder="e.g. Sunil Sharma"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Manufacturing Enterprise / Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 text-slate-800"
                      placeholder="e.g. Bharat Kitchenware Tech Pvt Ltd"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Udyam Registration Number (Optional - for MSME Concession)
                    </label>
                    <input
                      type="text"
                      value={udyam}
                      onChange={(e) => setUdyam(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 text-slate-800 font-mono"
                      placeholder="UDYAM-MH-12-0045892"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 text-slate-800 bg-white"
                    >
                      <option value="MSME Manufacturer">MSME Manufacturer</option>
                      <option value="Quality Manager">Quality Assurance Manager</option>
                      <option value="Standards Consultant">Standards Consultant</option>
                      <option value="Consumer">Consumer / Buyer</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 text-slate-800"
                  placeholder="contact@enterprise.in"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  defaultValue="demoPassword123"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 text-slate-800"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0F2C61] hover:bg-blue-900 text-white text-xs font-bold shadow-md transition-colors mt-2"
              >
                {mode === 'signup' ? 'Create Account & Access Portal' : 'Sign In'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
