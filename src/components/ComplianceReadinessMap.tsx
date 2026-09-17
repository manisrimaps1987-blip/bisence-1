import React, { useState } from 'react';
import { ROADMAP_STAGES, UNIVERSAL_DISCLAIMER } from '../data/mockData';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  FileCheck2, 
  FlaskConical, 
  Download, 
  ExternalLink,
  ShieldAlert,
  ClipboardList
} from 'lucide-react';

interface ComplianceReadinessMapProps {
  onNavigateToServices: () => void;
  productName: string;
}

export const ComplianceReadinessMap: React.FC<ComplianceReadinessMapProps> = ({
  onNavigateToServices,
  productName
}) => {
  const [completedChecklist, setCompletedChecklist] = useState<number[]>([1, 2]);

  const toggleTask = (id: number) => {
    setCompletedChecklist(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const checklistItems = [
    { id: 1, title: "Bill of Materials (BOM) & Material Test Certificate (MTC) gathered", category: "Raw Materials" },
    { id: 2, title: "Standard scope verified with factory tolerances (Sheet thickness > 0.8mm)", category: "Specifications" },
    { id: 3, title: "In-house testing facility setup (Dimensional, leakage & load deflection gauges)", category: "Factory QA" },
    { id: 4, title: "Third-party preliminary batch testing in BIS-recognized lab", category: "Lab Testing" },
    { id: 5, title: "Quality Manual & Scheme of Inspection and Testing (SIT) documentation", category: "Quality System" },
    { id: 6, title: "Manak Online portal e-filing (Form I with manufacturing unit layout)", category: "Statutory" },
  ];

  const readinessPercent = Math.round((completedChecklist.length / checklistItems.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0F2C61] text-xs font-bold mb-2">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Pre-Certification Readiness Audit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C61]">
            BIS Readiness Map (AI Guidance Readiness, Not Certified)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tracking pre-application maturity for: <strong className="text-slate-900">{productName || "Your Specified Product"}</strong>
          </p>
        </div>

        <button
          onClick={onNavigateToServices}
          className="px-5 py-2.5 rounded-xl bg-[#0F2C61] hover:bg-blue-900 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
        >
          <span>Explore BIS Schemes & Services</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Advisory Banner */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>Notice:</strong> This readiness map is an AI-guided self-assessment tool. Official BIS licenses (such as CM/L numbers) can only be granted by the Bureau of Indian Standards following official factory audits and laboratory witness testing.
        </p>
      </div>

      {/* Visual Stepper */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            6-Stage Compliance Trajectory
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
            Current Stage: Technical Info Verification
          </span>
        </div>

        {/* Stepper Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
          {ROADMAP_STAGES.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <div
                key={stage.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  isCompleted 
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : isCurrent
                    ? 'bg-blue-50 border-blue-400 text-blue-950 ring-2 ring-blue-500/20 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 text-slate-500'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Stage 0{stage.id}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <Clock className="w-4 h-4 text-blue-600 animate-spin" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold leading-snug">
                    {stage.title} {isCompleted ? '✓' : isCurrent ? '⚙' : '?'}
                  </h4>
                  <p className="text-[11px] leading-tight opacity-85">
                    {stage.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Self-Assessment Checklist & Readiness Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Checklist (Col 8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Actionable Manufacturing Checklist
              </h3>
              <p className="text-xs text-slate-500">
                Check off items you have prepared in your facility to compute readiness score:
              </p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg">
              {completedChecklist.length} of {checklistItems.length} complete
            </span>
          </div>

          <div className="space-y-2.5">
            {checklistItems.map(item => {
              const isChecked = completedChecklist.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleTask(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isChecked
                      ? 'bg-blue-50/40 border-blue-300 text-slate-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs transition-colors ${
                      isChecked ? 'bg-[#0F2C61] border-[#0F2C61] text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isChecked && '✓'}
                    </div>
                    <div>
                      <span className="text-xs font-semibold block">{item.title}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">{item.category}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Readiness Meter & Export (Col 4) */}
        <div className="lg:col-span-4 bg-gradient-to-b from-blue-50 to-white rounded-2xl border border-blue-200 p-6 shadow-xs space-y-5">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
              Guidance Maturity Score
            </span>
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#0F2C61] transition-all duration-700"
                  strokeDasharray={`${readinessPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-[#0F2C61]">{readinessPercent}%</span>
                <span className="text-[10px] font-semibold text-slate-500">Readiness</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              {readinessPercent >= 60 
                ? "Your product technical profile has strong standard readiness. You can proceed with lab testing."
                : "Complete testing facilities and raw material certificates to reach pre-audit readiness."}
            </p>
          </div>

          <div className="pt-2 border-t border-blue-100 space-y-2">
            <button
              onClick={() => alert("Simulated: Exporting BISENCE Compliance Memo & Evidence Dossier (PDF)")}
              className="w-full py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Download Compliance Memo</span>
            </button>
            <a
              href="https://www.manakonline.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#0F2C61] hover:bg-blue-900 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Apply on Official Manak Online</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
