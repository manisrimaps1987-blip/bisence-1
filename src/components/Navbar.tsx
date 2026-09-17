import React, { useState } from 'react';
import { 
  AppTab, 
  LanguageCode, 
  UserAccount 
} from '../types';
import { 
  ShieldCheck, 
  Globe, 
  Search, 
  Layers, 
  FileText, 
  CheckCircle2, 
  BarChart3, 
  Network, 
  Building2, 
  UserCheck, 
  LogIn, 
  ChevronDown,
  Bot,
  Bell
} from 'lucide-react';

interface NavbarProps {
  currentTab: AppTab;
  setTab: (tab: AppTab) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  user: UserAccount;
  onOpenAuth: () => void;
}

const LANGUAGES: { code: LanguageCode; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setTab,
  language,
  setLanguage,
  user,
  onOpenAuth,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0F2C61] text-white shadow-md border-b border-blue-900">
      {/* Top Gov/BIS strip */}
      <div className="bg-[#091d42] px-4 py-1 text-xs text-blue-200 flex justify-between items-center border-b border-blue-950/60">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200">National Standards Discovery Portal — SIH 2026 Innovation Engine</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-blue-300">
          <span className="hidden md:inline">Bureau of Indian Standards Ecosystem Prototype</span>
          <a 
            href="https://www.manakonline.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white underline underline-offset-2 flex items-center gap-1"
          >
            Official Portal: manakonline.in ↗
          </a>
        </div>
      </div>

      {/* Main Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => setTab('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Custom BIS Logo Emblem */}
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-[#0F2C61] to-slate-900 p-0.5 shadow-lg border border-blue-400/40 flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0F2C61] rounded-[10px] flex items-center justify-center relative overflow-hidden">
              {/* Subtle tri-color accent glow */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-orange-500/30 rounded-full blur-sm"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-emerald-500/30 rounded-full blur-sm"></div>
              <ShieldCheck className="w-6 h-6 text-amber-400 z-10" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-wider text-white font-sans">
                BIS<span className="text-amber-400">ENCE</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-800/80 text-blue-200 font-semibold uppercase tracking-widest border border-blue-700">
                AI Engine
              </span>
            </div>
            <p className="text-[11px] text-blue-200/80 tracking-wide font-medium hidden sm:block">
              From Product Idea to the Right Indian Standard — With Evidence
            </p>
          </div>
        </div>

        {/* Right Tools: Language Switcher & Auth */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/70 hover:bg-blue-800 border border-blue-700/60 text-xs font-medium text-slate-100 transition-colors"
              title="Select Regional Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>{LANGUAGES.find(l => l.code === language)?.native || 'English'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-blue-300" />
            </button>

            {langMenuOpen && (
              <div 
                className="absolute right-0 mt-1 w-44 bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1"
                onClick={() => setLangMenuOpen(false)}
              >
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Language (भाषा)
                </div>
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
                      language === l.code ? 'font-bold text-[#0F2C61] bg-blue-50/70' : 'text-slate-700'
                    }`}
                  >
                    <span>{l.native}</span>
                    <span className="text-[10px] text-slate-400">{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile / Sign In */}
          {user.isLoggedIn ? (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 hover:bg-emerald-900/60 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span className="max-w-[110px] truncate font-medium">{user.organization || user.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Enterprise Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Sub-Menu Tabs */}
      <div className="bg-[#0b224d] border-t border-blue-900/70 px-4 sm:px-6 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1 py-1 text-xs whitespace-nowrap min-w-max">
          <button
            onClick={() => setTab('landing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              currentTab === 'landing'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search & Discovery</span>
          </button>

          <button
            onClick={() => setTab('assistant')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all relative ${
              currentTab === 'assistant'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-amber-300 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Conversational Agent</span>
            <span className="text-[9px] px-1.5 py-0.2 bg-amber-400/20 text-amber-300 font-extrabold rounded-full border border-amber-400/40">
              NEW
            </span>
          </button>

          <button
            onClick={() => setTab('notifications')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all relative ${
              currentTab === 'notifications'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-amber-300" />
            <span>Standards Notifications (QCOs)</span>
            <span className="text-[9px] px-1.5 py-0.2 bg-red-500/80 text-white font-extrabold rounded-full animate-pulse">
              LIVE
            </span>
          </button>

          <button
            onClick={() => setTab('intake')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              currentTab === 'intake'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Product DNA</span>
          </button>

          <button
            onClick={() => setTab('discovery')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              currentTab === 'discovery'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Standards Match</span>
          </button>

          <button
            onClick={() => setTab('compliance')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              currentTab === 'compliance'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Compliance Map</span>
          </button>

          <button
            onClick={() => setTab('navigator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              currentTab === 'navigator'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>BIS Services</span>
          </button>

          <button
            onClick={() => setTab('document')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              currentTab === 'document'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Document Intel</span>
          </button>

          <button
            onClick={() => setTab('consumer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              currentTab === 'consumer'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Consumer Portal</span>
          </button>

          <button
            onClick={() => setTab('industry')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              currentTab === 'industry'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Industry Dashboard</span>
          </button>

          <button
            onClick={() => setTab('graph')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              currentTab === 'graph'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Knowledge Graph</span>
          </button>

          <button
            onClick={() => setTab('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              currentTab === 'admin'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Admin Intelligence</span>
          </button>
        </div>
      </div>
    </header>
  );
};
