import React, { useState } from 'react';
import { 
  AppTab, 
  LanguageCode, 
  ProductDNA, 
  StandardResult, 
  UserAccount 
} from './types';
import { 
  SAMPLE_KNOWLEDGE_BASE, 
  UNIVERSAL_DISCLAIMER, 
  GEMINI_PROMPT 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { SmartIntakeAndDNA } from './components/SmartIntakeAndDNA';
import { StandardDiscovery } from './components/StandardDiscovery';
import { ComplianceReadinessMap } from './components/ComplianceReadinessMap';
import { BISServiceNavigator } from './components/BISServiceNavigator';
import { DocumentIntelligence } from './components/DocumentIntelligence';
import { ConsumerIndustryModes } from './components/ConsumerIndustryModes';
import { KnowledgeGraphVisual } from './components/KnowledgeGraphVisual';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { AIAssistant } from './components/AIAssistant';
import { BISNotificationsView } from './components/BISNotificationsView';
import { FloatingAssistantWidget } from './components/FloatingAssistantWidget';
import { ShieldCheck, ExternalLink, HeartHandshake } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('landing');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [query, setQuery] = useState<string>(
    "I manufacture stainless-steel kitchen equipment for commercial restaurants."
  );
  
  // Auth state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<UserAccount>({
    name: 'Sunil Sharma',
    organization: 'Bharat Kitchenware Tech Ltd.',
    role: 'MSME Manufacturer',
    email: 'sunil@bharatkitchenware.in',
    udyamNumber: 'UDYAM-MH-12-0045892',
    isLoggedIn: false
  });

  // Dynamic Product DNA based on user natural language description
  const [productDNA, setProductDNA] = useState<ProductDNA>({
    productName: "Stainless Steel Commercial Sinks & Prep Surfaces",
    category: "Commercial Kitchen Equipment",
    intendedUse: "Food prep, sanitization, dish washing in restaurant kitchens",
    material: "Austenitic Stainless Steel (AISI 304/316)",
    targetUser: "Commercial Hospitality & Restaurant Kitchens",
    riskArea: "Food Contact Leaching & Weld Seam Corrosion",
    industry: "Food Service Equipment & Metal Fabrication",
    confidenceScore: 82,
    detectedCharacteristics: [
      "Stainless Steel 304",
      "Food Contact Surface",
      "Corrosion Resistance",
      "Commercial Restaurant",
      "Drainage & Water Basin",
      "Acoustic Undercoating"
    ],
    missingDetails: [
      {
        key: "thickness",
        label: "Sheet Material Gauge / Thickness (mm)",
        placeholder: "e.g. 0.90 mm drawn bowl / 1.2 mm fabricated deck",
        value: "0.90 mm"
      },
      {
        key: "drainage",
        label: "Drain Diameter & Acidic Contact Environment",
        placeholder: "e.g. 90mm waste outlet with citrus/vinegar contact",
        value: "90 mm waste outlet"
      }
    ]
  });

  // Current matched standards
  const [matchedStandards, setMatchedStandards] = useState<StandardResult[]>(SAMPLE_KNOWLEDGE_BASE);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Analyze function that maps user query to Product DNA and standards
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    const q = query.toLowerCase();

    // Dynamically adjust DNA based on keywords
    setTimeout(() => {
      setIsAnalyzing(false);

      if (q.includes('cooker') || q.includes('pressure')) {
        setProductDNA({
          productName: "Domestic Aluminium Pressure Cooker 5L",
          category: "Pressure Appliances",
          intendedUse: "High-pressure thermal steam cooking in domestic households",
          material: "Wrought Aluminium Alloy & Food-Grade Silicone Gasket",
          targetUser: "Domestic Consumer Kitchens",
          riskArea: "Vessel Bursting, Thermal Stress & Safety Valve Blockage",
          industry: "Household Consumer Durables",
          confidenceScore: 88,
          detectedCharacteristics: [
            "Operating Pressure 1.0 kgf/cm²",
            "Fusible Safety Device",
            "Thermal Insulation Handle",
            "Burst Ratio > 3x",
            "Gasket Release System"
          ],
          missingDetails: [
            {
              key: "cooker_volume",
              label: "Nominal Operating Capacity (Litres)",
              placeholder: "e.g. 3 Litres, 5 Litres, 10 Litres",
              value: "5 Litres"
            },
            {
              key: "lid_mechanism",
              label: "Lid Locking Mechanism",
              placeholder: "e.g. Inner lid vs outer clamp lid",
              value: "Inner lid locking"
            }
          ]
        });
        setMatchedStandards(SAMPLE_KNOWLEDGE_BASE.filter(s => s.category === "Pressure Appliances" || s.category === "Kitchen Equipment"));
      } else if (q.includes('electric') || q.includes('motor') || q.includes('mixer') || q.includes('heater')) {
        setProductDNA({
          productName: "Electric Household Appliance / Mixer Grinder",
          category: "Household Electrical Goods",
          intendedUse: "Food blending and grinding using 230V AC electric motor",
          material: "Polycarbonate Housing, Copper Motor Winding, SS Blades",
          targetUser: "Household & Commercial Food Preparation",
          riskArea: "Electric Shock, Dielectric Breakdown & Flammability",
          industry: "Electrotechnical & Appliances",
          confidenceScore: 85,
          detectedCharacteristics: [
            "230V AC Mains Powered",
            "750W Universal Motor",
            "Earth Continuity Continuity < 0.1 ohm",
            "Glow-Wire Resistant Plastics",
            "Overload Thermal Cutoff"
          ],
          missingDetails: [
            {
              key: "power_rating",
              label: "Input Power Wattage & Ingress IP Rating",
              placeholder: "e.g. 750W, IPX0 or IPX4",
              value: "750W, IPX0"
            },
            {
              key: "earthing",
              label: "Insulation Class (Class I or Class II)",
              placeholder: "e.g. Class I with 3-pin earthed plug",
              value: "Class I earthed"
            }
          ]
        });
        setMatchedStandards(SAMPLE_KNOWLEDGE_BASE.filter(s => s.category === "Electrical" || s.category === "Kitchen Equipment"));
      } else if (q.includes('water') || q.includes('ro') || q.includes('purifier')) {
        setProductDNA({
          productName: "Point-of-Use Domestic Water Purifier (RO+UV)",
          category: "Water Purification Systems",
          intendedUse: "Removal of dissolved solids and pathogens from potable municipal water",
          material: "Food Grade ABS Housing, Polyamide RO Membrane, UV Chamber",
          targetUser: "Household Drinking Water Consumers",
          riskArea: "Microbial Leaching, Chemical Migration & Electrical Ingress",
          industry: "Water & Environmental Health",
          confidenceScore: 80,
          detectedCharacteristics: [
            "TDS Reduction > 90%",
            "Log-6 Bacterial Reduction",
            "Food Contact Polymer Storage Tank",
            "High-Pressure Booster Pump"
          ],
          missingDetails: [
            {
              key: "recovery_rate",
              label: "Permeate Water Recovery Rate (%)",
              placeholder: "e.g. Minimum 25% or 40% water recovery",
              value: "35% recovery"
            },
            {
              key: "uv_dosage",
              label: "UV Lamp Disinfection Dosage (mJ/cm²)",
              placeholder: "e.g. Minimum 40 mJ/cm²",
              value: "40 mJ/cm²"
            }
          ]
        });
        setMatchedStandards(SAMPLE_KNOWLEDGE_BASE.filter(s => s.category === "Water Purification" || s.category === "Electrical"));
      } else if (q.includes('ev') || q.includes('battery')) {
        // Demonstrate Knowledge Gap behavior
        setProductDNA({
          productName: "EV Lithium-Ion Traction Battery Pack",
          category: "Electric Mobility & Batteries",
          intendedUse: "Automotive propulsion for electric two-wheelers",
          material: "LFP / NMC Prismatic Cells with Thermal BMS",
          targetUser: "Automotive OEMs & Two-Wheeler Drivers",
          riskArea: "Thermal Runaway, Overcharging & Vibration Fatigue",
          industry: "Automotive Electrotechnical",
          confidenceScore: 68,
          detectedCharacteristics: [
            "48V 30Ah Lithium-ion Pack",
            "IP67 Water & Dust Ingress",
            "CAN-bus BMS Telemetry"
          ],
          missingDetails: [
            {
              key: "cell_chem",
              label: "Exact Cell Chemistry & Form Factor",
              placeholder: "e.g. LFP 3.2V 100Ah Cylindrical 21700",
              value: "LFP 3.2V Prismatic"
            },
            {
              key: "homologation",
              label: "Target Vehicle Category (L1 vs L2)",
              placeholder: "e.g. L2 Two-Wheeler (AIS 156 Amendment 3)",
              value: "L2 Electric Two-Wheeler"
            }
          ]
        });
        // Intentionally empty standards to trigger knowledge gap fallback
        setMatchedStandards([]);
      } else {
        // Default to Stainless Steel Kitchen Sinks
        setProductDNA({
          productName: "Stainless Steel Commercial Sinks & Prep Surfaces",
          category: "Commercial Kitchen Equipment",
          intendedUse: "Food prep, sanitization, dish washing in restaurant kitchens",
          material: "Austenitic Stainless Steel (AISI 304/316)",
          targetUser: "Commercial Hospitality & Restaurant Kitchens",
          riskArea: "Food Contact Leaching & Weld Seam Corrosion",
          industry: "Food Service Equipment & Metal Fabrication",
          confidenceScore: 86,
          detectedCharacteristics: [
            "Stainless Steel 304",
            "Food Contact Surface",
            "Corrosion Resistance",
            "Commercial Restaurant",
            "Drainage & Water Basin",
            "Acoustic Undercoating"
          ],
          missingDetails: [
            {
              key: "thickness",
              label: "Sheet Material Gauge / Thickness (mm)",
              placeholder: "e.g. 0.90 mm drawn bowl / 1.2 mm fabricated deck",
              value: "0.90 mm"
            },
            {
              key: "drainage",
              label: "Drain Diameter & Acidic Contact Environment",
              placeholder: "e.g. 90mm waste outlet with citrus/vinegar contact",
              value: "90 mm waste outlet"
            }
          ]
        });
        setMatchedStandards(SAMPLE_KNOWLEDGE_BASE);
      }

      // Transition to Product Intelligence & DNA Intake Step (NOT direct chatbot answer!)
      setCurrentTab('intake');
    }, 400);
  };

  const handleSearchOnly = () => {
    handleAnalyze();
  };

  const handleUpdateMissingDetail = (key: string, value: string) => {
    setProductDNA(prev => ({
      ...prev,
      confidenceScore: Math.min(prev.confidenceScore + 4, 94),
      missingDetails: prev.missingDetails.map(d => d.key === key ? { ...d, value } : d)
    }));
  };

  const handlePersonaSelect = (mode: 'industry' | 'consumer' | 'testing') => {
    if (mode === 'consumer') {
      setCurrentTab('consumer');
    } else if (mode === 'industry') {
      setCurrentTab('industry');
    } else {
      setCurrentTab('navigator');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-200">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Container by Tab */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingHero
            language={language}
            query={query}
            setQuery={setQuery}
            onAnalyze={handleAnalyze}
            onSearch={handleSearchOnly}
            onSelectPersona={handlePersonaSelect}
            onOpenAssistant={() => setCurrentTab('assistant')}
            onOpenNotifications={() => setCurrentTab('notifications')}
          />
        )}

        {currentTab === 'assistant' && (
          <AIAssistant
            language={language}
            setLanguage={setLanguage}
            setTab={setCurrentTab}
            productDNA={productDNA}
            setProductDNA={setProductDNA}
          />
        )}

        {currentTab === 'notifications' && (
          <BISNotificationsView
            language={language}
            setTab={setCurrentTab}
            onAskAboutStandard={(std) => {
              setQuery(`What are the mandatory testing requirements and Quality Control Orders under ${std}?`);
              setCurrentTab('assistant');
            }}
          />
        )}

        {currentTab === 'intake' && (
          <SmartIntakeAndDNA
            language={language}
            productDNA={productDNA}
            onUpdateMissingDetail={handleUpdateMissingDetail}
            onContinueToDiscovery={() => setCurrentTab('discovery')}
            onResetIntake={() => setCurrentTab('landing')}
            isAnalyzing={isAnalyzing}
          />
        )}

        {currentTab === 'discovery' && (
          <StandardDiscovery
            language={language}
            standards={matchedStandards}
            productDNA={productDNA}
            onNavigateToCompliance={() => setCurrentTab('compliance')}
            onNavigateToServices={() => setCurrentTab('navigator')}
          />
        )}

        {currentTab === 'compliance' && (
          <ComplianceReadinessMap
            productName={productDNA.productName}
            onNavigateToServices={() => setCurrentTab('navigator')}
          />
        )}

        {currentTab === 'navigator' && (
          <BISServiceNavigator />
        )}

        {currentTab === 'document' && (
          <DocumentIntelligence />
        )}

        {currentTab === 'consumer' && (
          <ConsumerIndustryModes
            initialMode="consumer"
            onNavigateToDiscovery={() => setCurrentTab('discovery')}
          />
        )}

        {currentTab === 'industry' && (
          <ConsumerIndustryModes
            initialMode="industry"
            onNavigateToDiscovery={() => setCurrentTab('discovery')}
          />
        )}

        {currentTab === 'graph' && (
          <KnowledgeGraphVisual />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Global Public Service Footer */}
      <footer className="bg-[#091d42] text-slate-300 text-xs border-t border-blue-950 mt-12 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F2C61] border border-blue-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-base font-extrabold text-white tracking-wider">
                  BIS<span className="text-amber-400">ENCE</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                National Standards Discovery & Compliance Intelligence Engine. Developed for Smart India Hackathon (SIH 2026) Problem SIH26107.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-bold uppercase text-[11px] tracking-wider">Official BIS Repositories</h4>
              <ul className="space-y-1.5 text-slate-400">
                <li><a href="https://www.manakonline.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">Manak Online e-BIS Portal ↗</a></li>
                <li><a href="https://www.bis.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">Bureau of Indian Standards Main Portal ↗</a></li>
                <li><a href="https://www.crsbis.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">Compulsory Registration Scheme (CRS) ↗</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-bold uppercase text-[11px] tracking-wider">Platform Capabilities</h4>
              <ul className="space-y-1.5 text-slate-400">
                <li><button onClick={() => setCurrentTab('assistant')} className="text-amber-400 hover:text-white text-left font-semibold">✨ AI Conversational Assistant</button></li>
                <li><button onClick={() => setCurrentTab('notifications')} className="text-emerald-300 hover:text-white text-left font-semibold flex items-center gap-1">📢 Standards Notifications (QCOs)</button></li>
                <li><button onClick={() => setCurrentTab('intake')} className="hover:text-white text-left">Product DNA Semantic Profiler</button></li>
                <li><button onClick={() => setCurrentTab('discovery')} className="hover:text-white text-left">Evidentiary Standard Recommendations</button></li>
                <li><button onClick={() => setCurrentTab('compliance')} className="hover:text-white text-left">Factory Readiness Stepper</button></li>
                <li><button onClick={() => setCurrentTab('graph')} className="hover:text-white text-left">Ontology Knowledge Graph</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-bold uppercase text-[11px] tracking-wider">Statutory Disclaimer</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {UNIVERSAL_DISCLAIMER}
              </p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-blue-900 text-blue-200 border border-blue-800">
                  Zero Hallucination Standard Grounding Engine
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-blue-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <div>
              &copy; {new Date().getFullYear()} BISENCE Prototype &bull; Ministry of Consumer Affairs, Food & Public Distribution
            </div>
            <div className="flex items-center gap-4">
              <span>Primary Color: #0F2C61 (BIS Blue)</span>
              <span>&bull;</span>
              <span>Evidence-Backed AI Architecture</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        user={user}
        onLogin={(acc) => setUser(acc)}
        onLogout={() => setUser(prev => ({ ...prev, isLoggedIn: false }))}
      />

      {/* Floating AI Assistant Access across all tabs */}
      <FloatingAssistantWidget
        currentTab={currentTab}
        setTab={setCurrentTab}
        language={language}
      />

    </div>
  );
}
