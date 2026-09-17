import React, { useState } from 'react';
import { ProductDNA, LanguageCode } from '../types';
import { UI_TRANSLATIONS } from '../data/mockData';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Tag, 
  Activity, 
  ShieldAlert, 
  Layers, 
  RefreshCw,
  SlidersHorizontal,
  FileCheck
} from 'lucide-react';

interface SmartIntakeAndDNAProps {
  language: LanguageCode;
  productDNA: ProductDNA;
  onUpdateMissingDetail: (key: string, value: string) => void;
  onContinueToDiscovery: () => void;
  onResetIntake: () => void;
  isAnalyzing: boolean;
}

export const SmartIntakeAndDNA: React.FC<SmartIntakeAndDNAProps> = ({
  language,
  productDNA,
  onUpdateMissingDetail,
  onContinueToDiscovery,
  onResetIntake,
  isAnalyzing
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const [detailsFilled, setDetailsFilled] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Pipeline Status Banner */}
      <div className="bg-[#0F2C61] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-700/80 text-[11px] font-semibold text-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Step 2 of Compliance Pipeline: Semantic Intake & Extraction</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Product Intelligence & DNA Profiler
            </h2>
            <p className="text-xs sm:text-sm text-blue-200/90 max-w-2xl">
              Our AI engine parses natural-language product specs into structured technical attributes before matching Indian Standards to eliminate hallucinations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetIntake}
              className="px-3.5 py-2 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-xs font-medium text-blue-100 border border-blue-700 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Re-analyze Input</span>
            </button>
            <button
              onClick={onContinueToDiscovery}
              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Continue to Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Grid: Left Product DNA Card | Right: AI Needs 2 Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Visual Product DNA Card (Col 7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0F2C61] flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{t.dnaTitle}</h3>
                <p className="text-xs text-slate-500">Structured Technical Representation</p>
              </div>
            </div>

            {/* Confidence Meter */}
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-xs font-semibold text-slate-500">AI Confidence:</span>
                <span className="text-base font-extrabold text-[#0F2C61]">
                  {productDNA.confidenceScore}%
                </span>
              </div>
              <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden mt-1">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${productDNA.confidenceScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Identified Product Header */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Extracted Product Name
            </span>
            <span className="text-base font-bold text-[#0F2C61]">
              {productDNA.productName || "Stainless Steel Commercial Sinks & Prep Tables"}
            </span>
          </div>

          {/* Attributes Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100/80 space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-700">
                <Tag className="w-3 h-3" />
                <span>Product Category</span>
              </div>
              <p className="text-xs font-bold text-slate-800">{productDNA.category}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                <Activity className="w-3 h-3" />
                <span>Intended Use</span>
              </div>
              <p className="text-xs font-bold text-slate-800">{productDNA.intendedUse}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                <Layers className="w-3 h-3" />
                <span>Raw Material</span>
              </div>
              <p className="text-xs font-bold text-slate-800">{productDNA.material}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                <Tag className="w-3 h-3" />
                <span>Target User</span>
              </div>
              <p className="text-xs font-bold text-slate-800">{productDNA.targetUser}</p>
            </div>

            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-700">
                <ShieldAlert className="w-3 h-3" />
                <span>Primary Risk Area</span>
              </div>
              <p className="text-xs font-bold text-rose-900">{productDNA.riskArea}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                <SlidersHorizontal className="w-3 h-3" />
                <span>Industry Sector</span>
              </div>
              <p className="text-xs font-bold text-slate-800">{productDNA.industry}</p>
            </div>
          </div>

          {/* Detected Characteristics Chips */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Extracted Characteristic Keywords for Semantic Standard Matching:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {productDNA.detectedCharacteristics.map((chip, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F2C61]"></span>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: AI Needs 2 More Details Card (Col 5) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-amber-50/70 to-white rounded-2xl border border-amber-200 shadow-sm p-6 space-y-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-block px-2 py-0.5 rounded bg-amber-200/70 text-amber-900 text-[10px] font-bold uppercase tracking-wider mb-1">
                Refinement Protocol
              </div>
              <h3 className="text-base font-bold text-slate-900">
                AI Needs 2 More Technical Details
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                To narrow down the exact Indian Standard clauses without hallucination, please specify these parameters:
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            {productDNA.missingDetails.map((detail) => (
              <div key={detail.key} className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>{detail.label}</span>
                  <span className="text-[10px] font-normal text-amber-700">Required</span>
                </label>
                <input
                  type="text"
                  value={detail.value}
                  placeholder={detail.placeholder}
                  onChange={(e) => onUpdateMissingDetail(detail.key, e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 placeholder:text-slate-400"
                />
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-amber-100 space-y-3">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Filling these details increases matching confidence to &gt;90%</span>
            </div>

            <button
              onClick={onContinueToDiscovery}
              className="w-full py-3 rounded-xl bg-[#0F2C61] hover:bg-blue-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
