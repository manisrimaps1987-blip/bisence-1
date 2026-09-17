import React, { useState, useMemo } from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  ExternalLink, 
  Download, 
  Calendar, 
  Building2, 
  ShieldAlert, 
  FileText, 
  Tag, 
  Clock, 
  AlertCircle,
  ArrowUpRight,
  Bookmark,
  Share2,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';
import { BISNotification, LanguageCode, AppTab } from '../types';
import { 
  OFFICIAL_BIS_NOTIFICATIONS, 
  BIS_NOTIFICATIONS_CATEGORIES, 
  BIS_MINISTRIES 
} from '../data/bisNotificationsData';

interface BISNotificationsViewProps {
  language: LanguageCode;
  setTab: (tab: AppTab) => void;
  onAskAboutStandard?: (standardCode: string) => void;
}

export const BISNotificationsView: React.FC<BISNotificationsViewProps> = ({
  setTab,
  onAskAboutStandard
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedUrgency, setSelectedUrgency] = useState<'all' | 'urgent' | 'important' | 'routine'>('all');
  const [selectedPortal, setSelectedPortal] = useState<string>('All');
  const [activeNoticeId, setActiveNoticeId] = useState<string | null>(OFFICIAL_BIS_NOTIFICATIONS[0].id);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    return OFFICIAL_BIS_NOTIFICATIONS.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Urgency match
      if (selectedUrgency !== 'all' && item.urgency !== selectedUrgency) {
        return false;
      }
      // Portal match
      if (selectedPortal !== 'All' && item.sourcePortal !== selectedPortal) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inNumber = item.noticeNumber.toLowerCase().includes(q);
        const inSummary = item.summary.toLowerCase().includes(q);
        const inIndustry = item.targetIndustry.toLowerCase().includes(q);
        const inStandards = item.applicableStandards.some(s => s.toLowerCase().includes(q));
        const inProducts = item.affectedProducts.some(p => p.toLowerCase().includes(q));
        const inTags = item.tags.some(t => t.toLowerCase().includes(q));
        return inTitle || inNumber || inSummary || inIndustry || inStandards || inProducts || inTags;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedUrgency, selectedPortal]);

  const activeNotice = useMemo(() => {
    return OFFICIAL_BIS_NOTIFICATIONS.find(n => n.id === activeNoticeId) || filteredNotifications[0] || null;
  }, [activeNoticeId, filteredNotifications]);

  const handleShare = (notice: BISNotification) => {
    navigator.clipboard.writeText(`${notice.title} (${notice.noticeNumber}) - Official Reference: ${notice.sourceUrl}`);
    setCopiedLink(notice.id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-sans space-y-6 animate-in fade-in duration-300">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#0F2C61] via-[#163a7d] to-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black tracking-wide flex items-center gap-1.5 shadow-sm">
                <Bell className="w-3.5 h-3.5" />
                OFFICIAL GAZETTE FEED
              </span>
              <span className="px-2.5 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold border border-blue-700">
                Sourced from bis.gov.in & manakonline.in
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Indian Standards Notifications & Quality Control Orders (QCOs)
            </h1>
            <p className="text-sm text-blue-100/90 max-w-3xl leading-relaxed">
              Real-time feed of mandatory Quality Control Orders, technical revisions, Gazette notifications, wide circulation draft standards, and ministerial directives affecting Indian industry and trade.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setTab('assistant')}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Ask AI About QCOs</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href="https://www.bis.gov.in/index.php/product-certification/quality-control-orders/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors flex items-center gap-1.5"
            >
              <span>Open BIS Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Highlights Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-blue-800/60 text-xs">
          <div className="bg-blue-950/40 p-3 rounded-xl border border-blue-700/40">
            <div className="text-slate-400 text-[11px] font-semibold">Total Active QCOs</div>
            <div className="text-lg font-black text-amber-300 mt-0.5">140+ Orders</div>
            <div className="text-[10px] text-blue-200">Covering 650+ IS Codes</div>
          </div>
          <div className="bg-blue-950/40 p-3 rounded-xl border border-blue-700/40">
            <div className="text-slate-400 text-[11px] font-semibold">Mandatory Scheme I (ISI)</div>
            <div className="text-lg font-black text-emerald-300 mt-0.5">Strict Enforcement</div>
            <div className="text-[10px] text-blue-200">Domestic & Imports</div>
          </div>
          <div className="bg-blue-950/40 p-3 rounded-xl border border-blue-700/40">
            <div className="text-slate-400 text-[11px] font-semibold">MSME Relief Windows</div>
            <div className="text-lg font-black text-sky-300 mt-0.5">3–9 Mo. Extension</div>
            <div className="text-[10px] text-blue-200">Small & Micro units</div>
          </div>
          <div className="bg-blue-950/40 p-3 rounded-xl border border-blue-700/40">
            <div className="text-slate-400 text-[11px] font-semibold">Compulsory CRS Phase</div>
            <div className="text-lg font-black text-purple-300 mt-0.5">Phase VI Active</div>
            <div className="text-[10px] text-blue-200">Electronics & Solar</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by IS code (e.g. IS 14756, IS 2347), product name, order number, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {BIS_NOTIFICATIONS_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Portal Filter */}
            <select
              value={selectedPortal}
              onChange={(e) => setSelectedPortal(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="All">All Portals</option>
              <option value="bis.gov.in">bis.gov.in</option>
              <option value="manakonline.in">manakonline.in</option>
              <option value="crsbis.in">crsbis.in</option>
              <option value="egazette.gov.in">egazette.gov.in</option>
            </select>

            {/* Urgency Buttons */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0">
              <button
                onClick={() => setSelectedUrgency('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedUrgency === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedUrgency('urgent')}
                className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                  selectedUrgency === 'urgent' ? 'bg-red-600 text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                Urgent
              </button>
              <button
                onClick={() => setSelectedUrgency('important')}
                className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                  selectedUrgency === 'important' ? 'bg-amber-500 text-slate-950 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Important
              </button>
            </div>
          </div>
        </div>

        {/* Filter Quick Pills */}
        <div className="flex items-center gap-1.5 text-xs overflow-x-auto scrollbar-none pt-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">Quick Topics:</span>
          {['Cookware & Sinks', 'Pressure Cookers', 'Solar Inverters', 'Toys', 'Gold Hallmarking', 'Green Concrete', 'Steel Products', 'Drinking Water'].map((topic) => (
            <button
              key={topic}
              onClick={() => setSearchQuery(topic)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 border border-slate-200 text-xs transition-colors shrink-0"
            >
              {topic}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-blue-600 font-semibold hover:underline shrink-0 ml-1"
            >
              Clear filter
            </button>
          )}
        </div>
      </div>

      {/* Main Split-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List of Notifications (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-semibold">
            <span>Showing {filteredNotifications.length} of {OFFICIAL_BIS_NOTIFICATIONS.length} Notifications</span>
            <span className="text-[11px]">Updated Official Gazette Feed</span>
          </div>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-700">No matching notifications found</h4>
                <p className="text-xs text-slate-500 mt-1">Try clearing your filters or search keywords.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedUrgency('all');
                  }}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 hover:bg-blue-100"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredNotifications.map((item) => {
                const isActive = activeNotice?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveNoticeId(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer text-left relative ${
                      isActive
                        ? 'bg-blue-50/90 border-blue-600 shadow-sm ring-1 ring-blue-600'
                        : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.urgency === 'urgent'
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : item.urgency === 'important'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}>
                        {item.category}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{item.date}</span>
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px]">
                      <span className="text-slate-600 font-medium truncate max-w-[200px]">
                        {item.noticeNumber}
                      </span>
                      <span className="font-bold text-blue-700 flex items-center gap-0.5 shrink-0">
                        <span>Details</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed Notification Inspector (7 cols) */}
        <div className="lg:col-span-7">
          {activeNotice ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 sticky top-20">
              {/* Header Details */}
              <div className="space-y-2 border-b border-slate-200 pb-5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                      activeNotice.urgency === 'urgent'
                        ? 'bg-red-600 text-white'
                        : activeNotice.urgency === 'important'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-blue-600 text-white'
                    }`}>
                      {activeNotice.category}
                    </span>
                    {activeNotice.isMandatory && (
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[11px] font-extrabold border border-red-300 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 text-red-600" />
                        Mandatory Compliance
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => handleShare(activeNotice)}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center gap-1 transition-colors"
                      title="Copy reference info"
                    >
                      {copiedLink === activeNotice.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-slate-500" />
                          <span>Share</span>
                        </>
                      )}
                    </button>
                    <a
                      href={activeNotice.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-[#0F2C61] hover:bg-blue-900 text-white font-semibold flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <span>BIS Source</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {activeNotice.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span><strong>Order No:</strong> {activeNotice.noticeNumber}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span><strong>Notification Date:</strong> {activeNotice.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:col-span-2">
                    <Building2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span><strong>Ministry / Authority:</strong> {activeNotice.ministryDepartment}</span>
                  </div>
                </div>
              </div>

              {/* Effective Date & Mandatory Warning Box */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-amber-950 text-sm">
                    Effective Enforcement Timeline: {activeNotice.effectiveDate}
                  </div>
                  <p className="text-amber-900/90 leading-relaxed">
                    Under the <strong>BIS Act, 2016</strong>, contravention of a Quality Control Order is punishable with fines and imprisonment. Non-certified stocks cannot be distributed or imported once the order takes full legal effect.
                  </p>
                </div>
              </div>

              {/* Regulatory Summary */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Official Regulatory Summary
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {activeNotice.summary}
                </p>
              </div>

              {/* Mandatory Indian Standards Covered */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Applicable Indian Standards (IS Codes)
                  </h3>
                  <span className="text-[11px] text-blue-700 font-semibold">Click code to inquire</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeNotice.applicableStandards.map((std, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => {
                        if (onAskAboutStandard) {
                          onAskAboutStandard(std);
                        } else {
                          setTab('discovery');
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 shadow-2xs"
                    >
                      <span>{std}</span>
                      <ArrowUpRight className="w-3 h-3 text-blue-600" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Affected Product Lines */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Affected Products & Assemblies
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeNotice.affectedProducts.map((prod, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs bg-slate-50 p-2 rounded-lg border border-slate-200 text-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                      <span>{prod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Seamless Integration with the Rest of BISENCE */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setTab('intake')}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-2xs text-center"
                  >
                    Check Factory Readiness
                  </button>
                  <button
                    onClick={() => setTab('compliance')}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-300 text-center"
                  >
                    Compliance Stepper
                  </button>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setTab('assistant')}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <span>Ask AI About This Notice</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-500">Select any notification from the list to view its complete regulatory scope and mandatory standards.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
