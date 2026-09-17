import React, { useState } from 'react';
import { BIS_SERVICES } from '../data/mockData';
import { BISServiceOption } from '../types';
import { 
  Award, 
  Cpu, 
  Globe, 
  Gem, 
  FlaskConical, 
  ShieldCheck, 
  Scale, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  CheckCircle,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

interface BISServiceNavigatorProps {
  onSelectService?: (service: BISServiceOption) => void;
}

export const BISServiceNavigator: React.FC<BISServiceNavigatorProps> = () => {
  const [selectedService, setSelectedService] = useState<BISServiceOption | null>(BIS_SERVICES[0]);
  const [activeTab, setActiveTab] = useState<'services' | 'roadmap'>('services');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Award': return <Award className="w-6 h-6 text-amber-500" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-blue-500" />;
      case 'Globe': return <Globe className="w-6 h-6 text-emerald-500" />;
      case 'Gem': return <Gem className="w-6 h-6 text-yellow-500" />;
      case 'FlaskConical': return <FlaskConical className="w-6 h-6 text-purple-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-cyan-500" />;
      case 'Scale': return <Scale className="w-6 h-6 text-rose-500" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-indigo-500" />;
      default: return <Award className="w-6 h-6 text-blue-500" />;
    }
  };

  const prioritizedNextSteps = [
    {
      priority: "Priority 1",
      title: "Identify Mandate & QCO Notification",
      desc: "Check if your product falls under mandatory Quality Control Orders (QCO) issued by DPIIT, Ministry of Steel, or MeitY.",
      action: "Check QCO List",
      time: "Immediate"
    },
    {
      priority: "Priority 2",
      title: "Setup Factory Quality Assurance & Testing Equipment",
      desc: "Ensure in-house calibrated gauges, tensile/deflection equipment, and chemical test reagents are operational.",
      action: "View SIT Specs",
      time: "Week 1 - 2"
    },
    {
      priority: "Priority 3",
      title: "Pre-Testing Sample at BIS-Recognized Lab",
      desc: "Submit test samples to an accredited laboratory to obtain a compliant preliminary test report.",
      action: "Find Recognized Labs",
      time: "Week 2 - 4"
    },
    {
      priority: "Priority 4",
      title: "E-file Application on Manak Online (e-BIS Portal)",
      desc: "Submit Form I, fee receipt, factory layout diagram, and test report to request BIS officer factory audit.",
      action: "Portal Registration",
      time: "Week 4 - 6"
    }
  ];

  const journeySteps = [
    { step: 1, name: "Product & Standard Mapping", desc: "Identify relevant Indian Standard & QCO regulatory status." },
    { step: 2, name: "Gap Analysis & In-house Lab", desc: "Align factory equipment with Scheme of Testing & Inspection (STI)." },
    { step: 3, name: "Sample Pilot Testing", desc: "Run batch testing to confirm chemical & mechanical tolerances." },
    { step: 4, name: "Application Submission", desc: "Submit documentation on Manak Online with factory layout & fees." },
    { step: 5, name: "Factory Audit & Witnessing", desc: "BIS officer visits factory, inspects QA system, and seals samples." },
    { step: 6, name: "Grant of License (CM/L)", desc: "Receive license number and authorization to apply the ISI mark." },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0F2C61] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>BIS Schemes & Service Navigator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C61]">
          What Do You Want to Accomplish with BIS?
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
          Choose the regulatory or quality scheme appropriate for your business model. Navigate licensing pathways across domestic, import, hallmarking, and lab networks.
        </p>
      </div>

      {/* 8 Options Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center justify-between">
          <span>BIS Core Service Portfolios (8 Pathways)</span>
          <span className="text-xs font-normal text-slate-500">Click any card to inspect requirements</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BIS_SERVICES.map((srv) => {
            const isSelected = selectedService?.id === srv.id;
            return (
              <div
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      {getIcon(srv.iconName)}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {srv.timeline}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {srv.title}
                  </h3>
                  <span className="text-[11px] font-semibold text-blue-700 block">
                    {srv.scheme}
                  </span>
                  <p className="text-xs text-slate-600 line-clamp-3">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Service Detail Drawer */}
      {selectedService && (
        <div className="bg-[#0F2C61] text-white rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-800 pb-4">
            <div>
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                Active Scheme Specification
              </span>
              <h3 className="text-xl font-bold mt-0.5">{selectedService.title}</h3>
              <p className="text-xs text-blue-200">{selectedService.scheme}</p>
            </div>
            <a
              href={selectedService.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Access Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-blue-900/60 border border-blue-700/60 space-y-1">
              <span className="text-blue-300 font-bold block">Estimated Processing Window:</span>
              <p className="font-semibold text-white text-sm">{selectedService.timeline}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-blue-900/60 border border-blue-700/60 space-y-1">
              <span className="text-blue-300 font-bold block">Eligibility & Pre-requisites:</span>
              <p className="text-slate-200">{selectedService.eligibility}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-blue-900/60 border border-blue-700/60 space-y-1">
              <span className="text-blue-300 font-bold block">Required Initial Filing:</span>
              <p className="text-slate-200">Factory layout, machinery list, test equipment calibration certificate, and sample batch test data.</p>
            </div>
          </div>
        </div>
      )}

      {/* Your BIS Journey Roadmap (6 Steps) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
            End-to-End Pathway
          </span>
          <h2 className="text-xl font-bold text-[#0F2C61] mt-0.5">
            Your BIS Journey: Step-by-Step Implementation
          </h2>
          <p className="text-xs text-slate-600">
            From initial standard mapping to authorized ISI mark stamping in your facility.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {journeySteps.map((j) => (
            <div
              key={j.step}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 relative"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0F2C61] text-white flex items-center justify-center font-bold text-xs">
                  {j.step}
                </span>
                <h4 className="text-xs font-bold text-slate-800">{j.name}</h4>
              </div>
              <p className="text-xs text-slate-600 pl-8 leading-relaxed">
                {j.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Priority 1 to 4 Action Plan */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Your Immediate Next Steps (Ranked by Priority)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prioritizedNextSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                    idx === 0 
                      ? 'bg-rose-100 text-rose-800' 
                      : idx === 1 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {step.priority}
                  </span>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {step.time}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-800">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer flex items-center gap-1">
                  {step.action} &rarr;
                </span>
                <span className="text-[11px] text-slate-400">Actionable Milestone</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
