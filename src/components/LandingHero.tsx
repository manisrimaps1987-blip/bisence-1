import React from 'react';
import { LanguageCode } from '../types';
import { UI_TRANSLATIONS } from '../data/mockData';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck2, 
  BrainCircuit, 
  MapPin, 
  Languages, 
  FileText,
  AlertTriangle,
  Factory,
  User,
  FlaskConical,
  Bot,
  Bell
} from 'lucide-react';

interface LandingHeroProps {
  language: LanguageCode;
  query: string;
  setQuery: (val: string) => void;
  onAnalyze: () => void;
  onSearch: () => void;
  onSelectPersona: (mode: 'industry' | 'consumer' | 'testing') => void;
  onOpenAssistant?: () => void;
  onOpenNotifications?: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  language,
  query,
  setQuery,
  onAnalyze,
  onSearch,
  onSelectPersona,
  onOpenAssistant,
  onOpenNotifications
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const samplePrompts = [
    "I manufacture stainless-steel kitchen equipment and sinks for commercial restaurants.",
    "Domestic aluminium pressure cookers with fusible safety release plugs.",
    "Electric household mixer grinder and immersion heater with 230V plug.",
    "Point-of-use domestic drinking water reverse osmosis (RO) purification unit."
  ];

  const whyCards = [
    {
      title: "Natural-Language Discovery",
      desc: "No need to memorize technical BIS classification or IS codes. Just explain your product specs in plain Indian English or regional languages.",
      icon: Sparkles,
      tag: "Semantic NLP"
    },
    {
      title: "Evidence-Backed Guidance",
      desc: "Every recommendation links directly to verified standard scopes, sample test protocols, and official Manak Online repositories.",
      icon: FileCheck2,
      tag: "Audit Trail"
    },
    {
      title: "Explainable AI Engine",
      desc: "Full transparency on why a standard was suggested: see matched characteristics, material grades, and safety thresholds.",
      icon: BrainCircuit,
      tag: "No Black Box"
    },
    {
      title: "Compliance Readiness Map",
      desc: "Turn vague standard numbers into an actionable checklist of required lab tests, raw material certificates, and factory audit steps.",
      icon: MapPin,
      tag: "Action Plan"
    },
    {
      title: "Multilingual Access (7 Languages)",
      desc: "Democratizing standard compliance for MSMEs across Hindi, Telugu, Tamil, Kannada, Bengali, Marathi, and English.",
      icon: Languages,
      tag: "Inclusivity"
    },
    {
      title: "Document Intelligence",
      desc: "Upload technical data sheets, bill of materials, or test certificates for automated clause extraction and gap analysis.",
      icon: FileText,
      tag: "Spec Parser"
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-50/70 via-white to-slate-50/50 pt-10 pb-16 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-[#0F2C61] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Government of India &bull; Smart Standards Intelligence Prototype (SIH 2026)</span>
          </div>

          {/* Hero Title & Tagline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F2C61] tracking-tight leading-tight">
              BISENCE
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-slate-800 max-w-3xl mx-auto">
              {t.tagline}
            </p>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal">
              {t.heroSub}
            </p>
          </div>

          {/* Quick Persona Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs font-semibold text-slate-500 mr-1">Quick Perspectives:</span>
            <button
              onClick={() => onSelectPersona('industry')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white hover:bg-blue-50 text-slate-700 border border-slate-300 shadow-xs transition-colors"
            >
              <Factory className="w-3.5 h-3.5 text-blue-700" />
              <span>🏭 Industry & MSMEs</span>
            </button>
            <button
              onClick={() => onSelectPersona('consumer')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white hover:bg-emerald-50 text-slate-700 border border-slate-300 shadow-xs transition-colors"
            >
              <User className="w-3.5 h-3.5 text-emerald-700" />
              <span>👤 Consumer Verification</span>
            </button>
            <button
              onClick={() => onSelectPersona('testing')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white hover:bg-purple-50 text-slate-700 border border-slate-300 shadow-xs transition-colors"
            >
              <FlaskConical className="w-3.5 h-3.5 text-purple-700" />
              <span>🧪 Testing & Certification</span>
            </button>
            {onOpenAssistant && (
              <button
                onClick={onOpenAssistant}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 border border-amber-500 shadow-xs transition-all hover:scale-105"
              >
                <Bot className="w-3.5 h-3.5 text-slate-950" />
                <span>✨ AI Conversational Agent</span>
              </button>
            )}
            {onOpenNotifications && (
              <button
                onClick={onOpenNotifications}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0F2C61] hover:bg-blue-900 text-white border border-blue-700 shadow-xs transition-all hover:scale-105"
              >
                <Bell className="w-3.5 h-3.5 text-amber-300" />
                <span>📢 Standards Notifications & QCOs</span>
              </button>
            )}
          </div>

          {/* Large Search / Input Box */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 sm:p-4 text-left transition-all focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Describe Your Product, Material, or Intended Application:
            </label>
            
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
              placeholder="I manufacture stainless-steel kitchen equipment for commercial restaurants."
              className="w-full resize-none border-0 p-2 text-slate-800 text-sm sm:text-base placeholder:text-slate-400 focus:outline-none bg-slate-50/60 rounded-xl"
            />

            {/* Quick Sample Prompts */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium">Try sample:</span>
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(p)}
                  className="text-left px-2 py-1 rounded bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-[#0F2C61] transition-colors truncate max-w-[200px]"
                  title={p}
                >
                  &ldquo;{p.slice(0, 24)}...&rdquo;
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero hallucination guarantee: IS numbers verified strictly against knowledge base</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={onSearch}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>{t.searchBtn}</span>
                </button>
                <button
                  onClick={onAnalyze}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#0F2C61] hover:bg-blue-900 text-white text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t.analyzeBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mandatory Critical Disclaimer Rule #3 */}
          <div className="max-w-3xl mx-auto flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/90 border border-amber-200/80 text-left text-xs text-amber-900 shadow-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="font-semibold">Statutory Advisory:</strong> {t.disclaimer}
            </p>
          </div>

        </div>
      </div>

      {/* Section: Why SmartStandards AI? (6 cards) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Intelligent Standards Infrastructure
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2C61]">
            {t.whySmartTitle}
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Engineered specifically to solve the gap between raw Indian Standards text and MSME manufacturing reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div 
                key={i}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all hover:border-blue-300 flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0F2C61] flex items-center justify-center group-hover:bg-[#0F2C61] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
