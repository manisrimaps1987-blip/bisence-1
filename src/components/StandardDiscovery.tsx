import React, { useState } from 'react';
import { StandardResult, ProductDNA, LanguageCode } from '../types';
import { 
  UNIVERSAL_DISCLAIMER, 
  INSUFFICIENT_KB_MESSAGE,
  UI_TRANSLATIONS 
} from '../data/mockData';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  Check, 
  Eye, 
  HelpCircle, 
  Search, 
  Filter, 
  ThumbsUp, 
  ThumbsDown, 
  X, 
  BookOpen, 
  Clock, 
  FileText,
  BadgeAlert,
  ArrowRight,
  Info
} from 'lucide-react';

interface StandardDiscoveryProps {
  language: LanguageCode;
  standards: StandardResult[];
  productDNA: ProductDNA;
  onNavigateToCompliance: () => void;
  onNavigateToServices: () => void;
}

export const StandardDiscovery: React.FC<StandardDiscoveryProps> = ({
  language,
  standards,
  productDNA,
  onNavigateToCompliance,
  onNavigateToServices
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'ai_assisted' | 'verification_required'>('all');
  
  // Modals
  const [whyStandardModal, setWhyStandardModal] = useState<StandardResult | null>(null);
  const [evidenceModal, setEvidenceModal] = useState<StandardResult | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<{ [key: string]: 'yes' | 'no' }>({});
  const [feedbackReasonOpen, setFeedbackReasonOpen] = useState<string | null>(null);
  const [feedbackToast, setFeedbackToast] = useState(false);

  // Filter standards based on search and status
  const filteredStandards = standards.filter(std => {
    const matchesSearch = 
      std.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.why.some(w => w.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!matchesSearch) return false;
    if (activeFilter === 'all') return true;
    return std.label === activeFilter;
  });

  const handleFeedback = (stdId: string, type: 'yes' | 'no') => {
    setFeedbackGiven(prev => ({ ...prev, [stdId]: type }));
    if (type === 'no') {
      setFeedbackReasonOpen(stdId);
    } else {
      setFeedbackToast(true);
      setTimeout(() => setFeedbackToast(false), 3000);
    }
  };

  const getStatusBadge = (label: 'verified' | 'ai_assisted' | 'verification_required') => {
    switch (label) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>🟢 Verified Source Info</span>
          </span>
        );
      case 'ai_assisted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>🟡 AI-Assisted Recommendation</span>
          </span>
        );
      case 'verification_required':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-300">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>🔴 Official Verification Required</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header & Disclaimer */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0F2C61] text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Standard Discovery & Evidentiary RAG Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C61]">
              {t.standardsTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Grounded standard mappings based on extracted Product DNA: <strong className="text-slate-800">{productDNA.productName || 'Analyzed Product'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToCompliance}
              className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0F2C61] border border-blue-200 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span>View Compliance Stepper</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNavigateToServices}
              className="px-4 py-2 rounded-xl bg-[#0F2C61] hover:bg-blue-900 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <span>BIS Services</span>
            </button>
          </div>
        </div>

        {/* Universal Disclaimer */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/90 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-bold">Advisory & Disclaimer:</strong> {UNIVERSAL_DISCLAIMER}
          </p>
        </div>
      </div>

      {/* Semantic Search & Status Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search standards by keyword, material..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 text-slate-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === 'all' ? 'bg-[#0F2C61] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({standards.length})
          </button>
          <button
            onClick={() => setActiveFilter('verified')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === 'verified' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🟢 Verified
          </button>
          <button
            onClick={() => setActiveFilter('ai_assisted')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === 'ai_assisted' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🟡 AI-Assisted
          </button>
          <button
            onClick={() => setActiveFilter('verification_required')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === 'verification_required' ? 'bg-rose-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🔴 Verification Required
          </button>
        </div>
      </div>

      {/* Standards List / Empty KB fallback */}
      {filteredStandards.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-3">
          <BadgeAlert className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            {INSUFFICIENT_KB_MESSAGE}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search criteria or consult the official Bureau of Indian Standards standards repository directly on Manak Online.
          </p>
          <a
            href="https://www.manakonline.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F2C61] text-white text-xs font-bold hover:bg-blue-900 transition-colors"
          >
            <span>Search Official Manak Online Database</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredStandards.map((std) => (
            <div
              key={std.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 space-y-4"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {getStatusBadge(std.label)}
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                      {std.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      SAMPLE / DEMO RECORD
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F2C61]">
                    {std.title}
                  </h3>
                  <p className="text-xs text-slate-500 italic flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{std.standardReferenceNote}</span>
                  </p>
                </div>

                {/* Relevance Score Pill */}
                <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Match Confidence
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-black text-blue-700">
                      {std.relevance_score}%
                    </span>
                  </div>
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-0.5">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${std.relevance_score}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Why this result? */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Why this result was recommended?</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {std.why.map((reason, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2"
                    >
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                        ✓
                      </span>
                      <span className="leading-snug">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Potential limitation warning */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="font-semibold">Potential Scope Limitation: </strong>
                  {std.limitation}
                </p>
              </div>

              {/* Card Footer: Action Buttons + Feedback */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setEvidenceModal(std)}
                    className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0F2C61] text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-700" />
                    <span>View Evidence</span>
                  </button>

                  <button
                    onClick={() => setWhyStandardModal(std)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
                    <span>Why Recommended?</span>
                  </button>

                  <a
                    href={std.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>Check Official Source (manakonline.in)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>

                {/* Feedback Loop: Was this useful? 👍 👎 */}
                <div className="flex items-center gap-2 text-xs text-slate-500 self-end sm:self-center">
                  <span className="font-medium">Useful?</span>
                  <button
                    onClick={() => handleFeedback(std.id, 'yes')}
                    className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 ${
                      feedbackGiven[std.id] === 'yes'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    title="Yes, this recommendation was helpful"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Yes</span>
                  </button>
                  <button
                    onClick={() => handleFeedback(std.id, 'no')}
                    className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 ${
                      feedbackGiven[std.id] === 'no'
                        ? 'bg-rose-50 border-rose-400 text-rose-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    title="No, this was not accurate"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>No</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* WHY THIS STANDARD? MODAL (Section 5) */}
      {whyStandardModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  Explainable AI &bull; Transparent Mapping Timeline
                </span>
                <h3 className="text-lg font-bold text-[#0F2C61] mt-0.5">
                  Why Was This Standard Recommended?
                </h3>
                <p className="text-xs text-slate-500">
                  {whyStandardModal.title}
                </p>
              </div>
              <button
                onClick={() => setWhyStandardModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Timeline: Product description -> Detected characteristics -> Matched knowledge -> Recommended standard */}
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-800">Your Product Description</span>
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    &ldquo;{productDNA.productName || 'Stainless steel commercial kitchen sinks and prep equipment'}&rdquo;
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800">Detected Technical Characteristics</span>
                  <div className="flex flex-wrap gap-1.5">
                    {productDNA.detectedCharacteristics.map((char, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md text-xs bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-800">Matched BIS Knowledge Base Rules</span>
                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    {whyStandardModal.why.map((r, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                  4
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-800">Recommended Indian Standard Reference</span>
                  <div className="text-xs text-slate-700 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                    <p className="font-bold text-emerald-950">{whyStandardModal.title}</p>
                    <p className="text-[11px] text-emerald-800 mt-1 italic">
                      {whyStandardModal.standardReferenceNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 text-slate-600 text-xs">
              <strong className="text-slate-800">Plain Language Explanation:</strong> Based on the food-contact requirement and stainless-steel grade specified, the primary standard benchmark governs sheet thickness, corrosion resistance, and chemical migration thresholds.
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setWhyStandardModal(null)}
                className="px-5 py-2 rounded-xl bg-[#0F2C61] text-white text-xs font-bold hover:bg-blue-900 transition-colors"
              >
                Close Explanation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW EVIDENCE MODAL */}
      {evidenceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Source Grounding & Evidence
                </span>
                <h3 className="text-lg font-bold text-[#0F2C61] mt-0.5">
                  Standard Clause Excerpts & Verification Data
                </h3>
                <p className="text-xs text-slate-500">
                  {evidenceModal.title}
                </p>
              </div>
              <button
                onClick={() => setEvidenceModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5">
                <span className="font-bold text-blue-950 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-700" />
                  <span>Sample Standard Clause Excerpt</span>
                </span>
                <p className="text-slate-700 italic bg-white p-3 rounded-lg border border-blue-100 font-mono text-[11px]">
                  &ldquo;{evidenceModal.clauseExcerpt}&rdquo;
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-800 block">
                  Mandatory Laboratory Testing Protocols Ceded:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {evidenceModal.testingRequirements.map((test, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                      &bull; {test}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800">Evidence Citation:</span>
                <p className="text-slate-600">{evidenceModal.evidence}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                <strong>Notice:</strong> {evidenceModal.standardReferenceNote}. Always refer to Manak Online for official gazetted Indian Standard texts.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <a
                href={evidenceModal.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:underline font-bold"
              >
                <span>Open Manak Online Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setEvidenceModal(null)}
                className="px-5 py-2 rounded-xl bg-[#0F2C61] text-white text-xs font-bold hover:bg-blue-900 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Reason Prompt (When user clicks No) */}
      {feedbackReasonOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h4 className="text-base font-bold text-slate-900">
              Help Us Improve the BISENCE Knowledge Base
            </h4>
            <p className="text-xs text-slate-600">
              Why was this recommendation not satisfactory?
            </p>
            <div className="space-y-2">
              {[
                "Missing specific product sub-category",
                "Testing requirement felt out of date",
                "Need higher capacity/industrial standard",
                "Other feedback"
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setFeedbackReasonOpen(null);
                    setFeedbackToast(true);
                    setTimeout(() => setFeedbackToast(false), 3000);
                  }}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-xs text-slate-700 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setFeedbackReasonOpen(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Thank you! Your feedback has been recorded in the SIH 2026 telemetry log.</span>
        </div>
      )}

    </div>
  );
};
