import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Search, 
  AlertCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Users, 
  Database,
  Layers,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  FileQuestion
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const categoryStats = [
    { name: "Kitchen Equipment & Sinks", count: 480, percent: 38 },
    { name: "Pressure Appliances", count: 320, percent: 25 },
    { name: "Electrical Household", count: 240, percent: 19 },
    { name: "Water Purifiers & RO", count: 120, percent: 10 },
    { name: "Helmets & Safety Hardhats", count: 80, percent: 8 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0F2C61] text-xs font-bold">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>SIH 2026 Admin Telemetry & Analytics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C61]">
          BISENCE Intelligence Ops & Knowledge Gaps
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
          Real-time metrics tracking MSME natural-language queries, standard match accuracy, knowledge base deficits, and user sentiment.
        </p>
      </div>

      {/* Top Stat Metric Cards (using clean divs, no slop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Queries Parsed</span>
            <Search className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">1,240</div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% this week</span>
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Standards Searched</span>
            <Database className="w-4 h-4 text-[#0F2C61]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">3,892</div>
          <p className="text-[11px] text-slate-500 font-medium">
            Across 14 technical divisions
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>User Accuracy Rating</span>
            <ThumbsUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">91.4%</div>
          <p className="text-[11px] text-slate-500 font-medium">
            942 👍 positive vs 88 👎 reviews
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Average Confidence</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">84.6%</div>
          <p className="text-[11px] text-slate-500 font-medium">
            Post-DNA refinement step
          </p>
        </div>

      </div>

      {/* Grid: Most Searched Categories Bar Chart | Knowledge Gaps Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Most searched categories bar chart (using clean divs) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Most Searched Product Domains
              </h3>
              <p className="text-xs text-slate-500">
                Distribution of MSME queries analyzed over the last 30 days
              </p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
              Top 5 Domains
            </span>
          </div>

          {/* Simple Div Bar Chart */}
          <div className="space-y-3.5">
            {categoryStats.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{item.name}</span>
                  <span className="font-mono text-slate-500">{item.count} queries ({item.percent}%)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0F2C61] to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${item.percent * 2.2}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Knowledge Gaps Alert Card (Critical Innovation from prompt) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-rose-50/80 to-white rounded-2xl border border-rose-200 p-6 shadow-xs space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
              <FileQuestion className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-200/80 text-rose-900">
                Critical Knowledge Gap Alert
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Unresolved Search Demand
              </h3>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-rose-200 space-y-2">
            <p className="text-xs text-slate-800 font-bold leading-relaxed">
              &ldquo;143 users asked about EV batteries, but knowledge base is insufficient.&rdquo;
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Users frequently submitted queries for: <em>LFP cell thermal runaway, AIS 156 battery pack safety, and high-rate DC fast charging connectors</em>.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-700 block">Recommended BIS Committee Action:</span>
            <div className="p-3 rounded-lg bg-rose-50/50 border border-rose-100 text-rose-950 font-medium">
              &bull; Ingest AIS-156 & IS 16046 into the vector RAG index
            </div>
            <div className="p-3 rounded-lg bg-rose-50/50 border border-rose-100 text-rose-950 font-medium">
              &bull; Notify Sectional Committee ETD 51 (Secondary Cells & Batteries)
            </div>
          </div>

          <button
            onClick={() => alert("Simulated: Synced gap report with BIS Standards Formulation Technical Committee")}
            className="w-full py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-xs transition-colors"
          >
            Dispatch Gap Report to Sectional Committee
          </button>
        </div>

      </div>

      {/* Feedback telemetry logs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          User Feedback & Sentiment Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <ThumbsUp className="w-4 h-4" />
              <span>Positive Feedback (942)</span>
            </div>
            <p className="text-xs text-slate-600">
              Top praise: <em>&ldquo;Clarified sheet thickness and testing parameters without reading 50 pages of gazettes.&rdquo;</em>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
              <ThumbsDown className="w-4 h-4" />
              <span>Constructive Critique (88)</span>
            </div>
            <p className="text-xs text-slate-600">
              Common reason: <em>&ldquo;Need more industrial chemical piping standard references beyond domestic.&rdquo;</em>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
            <div className="flex items-center gap-2 text-blue-800 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero Hallucination Metric</span>
            </div>
            <p className="text-xs text-slate-600">
              100% of generated responses strictly adhered to verified sample reference labels and mandatory Manak Online fallback.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
