import React, { useState } from 'react';
import { 
  UserCheck, 
  Building2, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  QrCode, 
  FileCheck2, 
  FileText, 
  Plus, 
  ArrowRight,
  ExternalLink,
  BookOpen,
  MessageSquareWarning,
  BadgeAlert
} from 'lucide-react';

interface ConsumerIndustryModesProps {
  initialMode?: 'consumer' | 'industry';
  onNavigateToDiscovery: () => void;
}

export const ConsumerIndustryModes: React.FC<ConsumerIndustryModesProps> = ({
  initialMode = 'consumer',
  onNavigateToDiscovery
}) => {
  const [activeMode, setActiveMode] = useState<'consumer' | 'industry'>(initialMode);
  
  // Consumer verification state
  const [licenseInput, setLicenseInput] = useState('CM/L-8400012345');
  const [verifyResult, setVerifyResult] = useState<any>(null);

  // Industry My Products demo data
  const [myProducts, setMyProducts] = useState([
    {
      id: "prod-1",
      product: "SS Commercial Double Sink Unit",
      status: "In Assessment",
      statusColor: "bg-blue-100 text-blue-800",
      relevantStandards: "Kitchen Equipment Standard Ref (Demo)",
      openActions: "Complete salt-spray test report",
      lastAudit: "2026-08-15"
    },
    {
      id: "prod-2",
      product: "Aluminium Pressure Cooker 5L",
      status: "Compliant & Tested",
      statusColor: "bg-emerald-100 text-emerald-800",
      relevantStandards: "Pressure Cooker Safety Ref (Demo)",
      openActions: "Annual surveillance fee due",
      lastAudit: "2026-06-20"
    },
    {
      id: "prod-3",
      product: "Electric Induction Cooktop 2000W",
      status: "Action Required",
      statusColor: "bg-amber-100 text-amber-800",
      relevantStandards: "Household Electrical Safety Ref (Demo)",
      openActions: "Submit updated dielectric breakdown log",
      lastAudit: "2026-07-02"
    },
    {
      id: "prod-4",
      product: "Commercial RO Purifier 50LPH",
      status: "Draft Specification",
      statusColor: "bg-slate-100 text-slate-800",
      relevantStandards: "Water Treatment Unit Ref (Demo)",
      openActions: "Run missing details extraction",
      lastAudit: "Pending"
    }
  ]);

  const [newProductModal, setNewProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');

  const handleAddProduct = () => {
    if (!newProdName.trim()) return;
    setMyProducts(prev => [
      ...prev,
      {
        id: `prod-${Date.now()}`,
        product: newProdName,
        status: "In Assessment",
        statusColor: "bg-blue-100 text-blue-800",
        relevantStandards: "Pending Standard Mapping",
        openActions: "Run semantic intake engine",
        lastAudit: "Just added"
      }
    ]);
    setNewProdName('');
    setNewProductModal(false);
  };

  const handleSimulateVerify = () => {
    if (licenseInput.includes('8400012345')) {
      setVerifyResult({
        valid: true,
        manufacturer: "Apex Stainless Tech Private Limited",
        product: "Domestic and Commercial Stainless Steel Sinks",
        standardRef: "Sample Standard Reference - Sinks",
        status: "Active & Valid till 31-Dec-2027",
        location: "Pune, Maharashtra, India"
      });
    } else {
      setVerifyResult({
        valid: false,
        message: "License number not found in current cached sample register. Please verify directly via official BIS Care App or manakonline.in."
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Mode Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C61]">
            Perspective Portals
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Tailored interfaces for Indian consumers verifying marks, and manufacturers managing factory standards.
          </p>
        </div>

        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveMode('consumer')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'consumer'
                ? 'bg-white text-[#0F2C61] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Consumer Mode</span>
          </button>

          <button
            onClick={() => setActiveMode('industry')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'industry'
                ? 'bg-white text-[#0F2C61] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Industry & MSME Dashboard</span>
          </button>
        </div>
      </div>

      {/* CONSUMER MODE */}
      {activeMode === 'consumer' && (
        <div className="space-y-8 animate-in fade-in">
          
          {/* Consumer Hero Banner */}
          <div className="bg-gradient-to-r from-emerald-900 via-[#0F2C61] to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="max-w-2xl space-y-3 relative z-10">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Consumer Safety & Rights Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                &ldquo;I bought a product with a BIS Mark. What does it mean?&rdquo;
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                When you see the ISI mark, CRS registration number, or Hallmarking stamp on a product in India, it signifies that third-party independent testing has verified compliance with national safety and quality benchmarks.
              </p>
            </div>
          </div>

          {/* 4 Cards: Understand | Verify | Learn | Report */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* 1. Understand */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">1. Understand the Marks</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Understand what ISI (Domestic Manufacturing), CRS (Electronics & IT Registration), and 6-digit HUID (Gold Hallmark) indicate on everyday items.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 block">
                Safety Guarantee &bull; Purity
              </span>
            </div>

            {/* 2. Verify */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F2C61] flex items-center justify-center font-bold">
                  <QrCode className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">2. Verify License</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Check the 7-digit CM/L license number underneath the ISI mark or 8-digit R-number on electronics to confirm legitimacy.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 block">
                Real-Time Verification Tool below &darr;
              </span>
            </div>

            {/* 3. Learn */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-purple-300 transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">3. Learn Standards</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Learn mandatory safety rules governing pressure cookers, baby toys, drinking water purifiers, and helmets.
                </p>
              </div>
              <button 
                onClick={onNavigateToDiscovery}
                className="text-xs font-bold text-purple-700 text-left hover:underline"
              >
                Browse Safe Standards &rarr;
              </button>
            </div>

            {/* 4. Report */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-rose-300 transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                  <MessageSquareWarning className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">4. Report Substandard</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Encountered fake ISI mark or defective goods? File an enforcement complaint directly via BIS Care App or National Consumer Helpline.
                </p>
              </div>
              <a
                href="https://www.bis.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-rose-700 hover:underline inline-flex items-center gap-1"
              >
                <span>BIS Care Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Interactive License Verification Sandbox */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Interactive Simulator
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Verify a Product&apos;s BIS License (CM/L or CRS Number)
                </h3>
                <p className="text-xs text-slate-500">
                  Try demo CM/L: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">CM/L-8400012345</code>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={licenseInput}
                  onChange={(e) => setLicenseInput(e.target.value)}
                  className="px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 text-slate-800 w-52"
                  placeholder="e.g. CM/L-8400012345"
                />
                <button
                  onClick={handleSimulateVerify}
                  className="px-4 py-2 rounded-xl bg-[#0F2C61] hover:bg-blue-900 text-white text-xs font-bold transition-colors"
                >
                  Verify
                </button>
              </div>
            </div>

            {verifyResult && (
              <div className={`p-4 rounded-xl border ${
                verifyResult.valid 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                {verifyResult.valid ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Authentic BIS License Record (Sample Database):</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs pt-1">
                      <div>
                        <span className="text-[10px] text-emerald-800 uppercase font-bold block">Manufacturer:</span>
                        <strong className="text-emerald-950">{verifyResult.manufacturer}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-800 uppercase font-bold block">Scope Product:</span>
                        <strong className="text-emerald-950">{verifyResult.product}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-800 uppercase font-bold block">Status:</span>
                        <strong className="text-emerald-950">{verifyResult.status}</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{verifyResult.message}</span>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      )}

      {/* INDUSTRY MODE */}
      {activeMode === 'industry' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Enterprise & MSME Quality Management
              </span>
              <h2 className="text-xl font-bold text-[#0F2C61] mt-0.5">
                My Production Lines & Evaluated Products
              </h2>
              <p className="text-xs text-slate-500">
                Track pre-certification gap analysis, test reports, and open audit action items.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setNewProductModal(true)}
                className="px-4 py-2 rounded-xl bg-[#0F2C61] hover:bg-blue-900 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          {/* Table: Product | Status | Relevant standards | Open actions */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Product Name</th>
                    <th className="py-3.5 px-4">Compliance Status</th>
                    <th className="py-3.5 px-4">Relevant Standards</th>
                    <th className="py-3.5 px-4">Open Actions</th>
                    <th className="py-3.5 px-4 text-right">Audit Schedule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {myProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {p.product}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${p.statusColor}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-600">
                        {p.relevantStandards}
                      </td>
                      <td className="py-3.5 px-4 text-amber-700 font-semibold">
                        {p.openActions}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-500">
                        {p.lastAudit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MSME Scheme Notice */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 flex items-center justify-between">
            <div className="space-y-0.5">
              <strong className="block font-bold">MSME & Women Entrepreneurs Benefit:</strong>
              <p className="text-blue-800">
                Eligible micro-enterprises with Udyam Registration enjoy up to 50% concession on BIS certification marking fees and fast-track processing.
              </p>
            </div>
            <a
              href="https://www.manakonline.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#0F2C61] text-white font-bold text-xs hover:bg-blue-900 transition-colors shrink-0 ml-4"
            >
              Verify Udyam Eligibility
            </a>
          </div>

        </div>
      )}

      {/* Add Product Modal */}
      {newProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Add New Manufacturing Product</h3>
            <p className="text-xs text-slate-500">
              Enter your product name to track standard discovery and factory readiness.
            </p>
            <input
              type="text"
              placeholder="e.g. Electric Storage Water Heater 25L"
              value={newProdName}
              onChange={(e) => setNewProdName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 text-slate-800"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setNewProductModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="px-5 py-2 rounded-xl bg-[#0F2C61] hover:bg-blue-900 text-white text-xs font-bold transition-colors"
              >
                Add to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
