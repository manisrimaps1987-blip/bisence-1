import React, { useState } from 'react';
import { 
  Network, 
  Info, 
  ArrowRight, 
  Layers, 
  Tag, 
  FileText, 
  CheckCircle2, 
  FlaskConical, 
  Award,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface GraphNodeData {
  id: string;
  stepNumber: number;
  label: string;
  type: 'Product' | 'Category' | 'Technical Characteristics' | 'Indian Standard' | 'Requirement' | 'Testing' | 'BIS Service';
  title: string;
  description: string;
  details: string[];
  color: string;
  borderColor: string;
  textColor: string;
}

export const KnowledgeGraphVisual: React.FC = () => {
  const [activePathway, setActivePathway] = useState<'sink' | 'cooker' | 'appliance'>('sink');

  const pathways: Record<'sink' | 'cooker' | 'appliance', { title: string; nodes: GraphNodeData[] }> = {
    sink: {
      title: "Stainless Steel Sink & Commercial Kitchen Pipeline",
      nodes: [
        {
          id: "node-1",
          stepNumber: 1,
          type: "Product",
          label: "Identified Product",
          title: "SS 304 Commercial Sinks",
          description: "Dual basin stainless steel wash sinks with sound dampening undercoat.",
          details: ["Material: Austenitic SS", "Fabrication: Drawn / Welded", "Environment: Commercial Hospitality"],
          color: "bg-blue-50",
          borderColor: "border-blue-400",
          textColor: "text-blue-900"
        },
        {
          id: "node-2",
          stepNumber: 2,
          type: "Category",
          label: "Domain Classification",
          title: "Kitchen Equipment & Vessels",
          description: "Mechanical Engineering Division Council (MED) / Food Grade Surfaces.",
          details: ["Section: MED 15", "Sanitary Ware Norms", "Corrosion Category: Austenitic"],
          color: "bg-indigo-50",
          borderColor: "border-indigo-400",
          textColor: "text-indigo-900"
        },
        {
          id: "node-3",
          stepNumber: 3,
          type: "Technical Characteristics",
          label: "Extracted DNA",
          title: "Thickness > 0.8mm & 18/8 Cr-Ni",
          description: "Austenitic alloy containing minimum 18% Chromium and 8% Nickel.",
          details: ["Sheet gauge: 0.90 mm", "Drain diameter: 90 mm", "Sound deadening spray"],
          color: "bg-amber-50",
          borderColor: "border-amber-400",
          textColor: "text-amber-900"
        },
        {
          id: "node-4",
          stepNumber: 4,
          type: "Indian Standard",
          label: "Benchmark Standard",
          title: "Sample Ref: Stainless Steel Sinks",
          description: "Potentially relevant standard reference - Official verification required on manakonline.in.",
          details: ["Scope: Domestic & Semi-Commercial Sinks", "Label: 🟢 Verified Source Info", "Status: Active Gazette"],
          color: "bg-emerald-50",
          borderColor: "border-emerald-500",
          textColor: "text-emerald-950"
        },
        {
          id: "node-5",
          stepNumber: 5,
          type: "Requirement",
          label: "Normative Clauses",
          title: "Corrosion & Deflection Limits",
          description: "No permanent deformation under 120 kg distributed load. Chemical migration limits.",
          details: ["Deflection < 2 mm", "No pitting under salt mist", "Odourless damping material"],
          color: "bg-cyan-50",
          borderColor: "border-cyan-400",
          textColor: "text-cyan-900"
        },
        {
          id: "node-6",
          stepNumber: 6,
          type: "Testing",
          label: "Laboratory Protocols",
          title: "Salt Spray & Drain Flow Test",
          description: "Rigorous testing protocol in BIS recognized test house.",
          details: ["Intergranular corrosion test", "Drain flow speed test", "Impact drop ball test"],
          color: "bg-purple-50",
          borderColor: "border-purple-400",
          textColor: "text-purple-900"
        },
        {
          id: "node-7",
          stepNumber: 7,
          type: "BIS Service",
          label: "Certification Scheme",
          title: "Scheme I: ISI Mark License",
          description: "Domestic manufacturer certification authorizing CM/L marking.",
          details: ["Factory audit required", "STI test plan implementation", "Online filing via Manak Online"],
          color: "bg-[#0F2C61]",
          borderColor: "border-blue-900",
          textColor: "text-white"
        }
      ]
    },
    cooker: {
      title: "Pressure Cooker Safety & Relief Valve Pipeline",
      nodes: [
        {
          id: "c-1",
          stepNumber: 1,
          type: "Product",
          label: "Identified Product",
          title: "Aluminium Pressure Cooker 5L",
          description: "Domestic pressure vessel for steam cooking with safety relief mechanism.",
          details: ["Capacity: 5 Litres", "Body: Wrought Aluminium Alloy", "Safety Vent Valve included"],
          color: "bg-blue-50",
          borderColor: "border-blue-400",
          textColor: "text-blue-900"
        },
        {
          id: "c-2",
          stepNumber: 2,
          type: "Category",
          label: "Domain Classification",
          title: "Pressure Appliances",
          description: "Consumer Product Safety & High Pressure Containment.",
          details: ["Mandatory QCO in force", "Explosion hazard mitigation", "DPIIT Order"],
          color: "bg-indigo-50",
          borderColor: "border-indigo-400",
          textColor: "text-indigo-900"
        },
        {
          id: "c-3",
          stepNumber: 3,
          type: "Technical Characteristics",
          label: "Extracted DNA",
          title: "Operating Pressure 1.0 kgf/cm²",
          description: "Vent pipe release at 1 kgf/cm²; fusible safety plug melting at 130°C.",
          details: ["Gasket food-grade silicone", "Handle insulated thermal grip", "Burst ratio > 3x"],
          color: "bg-amber-50",
          borderColor: "border-amber-400",
          textColor: "text-amber-900"
        },
        {
          id: "c-4",
          stepNumber: 4,
          type: "Indian Standard",
          label: "Benchmark Standard",
          title: "Sample Ref: Pressure Cooker Safety",
          description: "Potentially relevant standard reference - Official verification required on manakonline.in.",
          details: ["Mandatory ISI Mark certification", "Strict quality control order", "Sample Reference Data"],
          color: "bg-emerald-50",
          borderColor: "border-emerald-500",
          textColor: "text-emerald-950"
        },
        {
          id: "c-5",
          stepNumber: 5,
          type: "Requirement",
          label: "Normative Clauses",
          title: "Hydrostatic Proof & Vent Flow",
          description: "Must withstand hydrostatic pressure without rupture or distortion.",
          details: ["Proof pressure 2.0 kgf/cm²", "Fusible device activation check", "Lid lock under pressure"],
          color: "bg-cyan-50",
          borderColor: "border-cyan-400",
          textColor: "text-cyan-900"
        },
        {
          id: "c-6",
          stepNumber: 6,
          type: "Testing",
          label: "Laboratory Protocols",
          title: "Hydraulic Burst & Thermal Cycling",
          description: "1,000 thermal cooking fatigue cycles and burst pressure confirmation.",
          details: ["Hydrostatic burst rig", "Gasket elasticity test", "Toxic migration test"],
          color: "bg-purple-50",
          borderColor: "border-purple-400",
          textColor: "text-purple-900"
        },
        {
          id: "c-7",
          stepNumber: 7,
          type: "BIS Service",
          label: "Certification Scheme",
          title: "Scheme I: Mandatory ISI Mark",
          description: "Legally prohibited from sale in India without authentic CM/L certification.",
          details: ["Factory audit & witness tests", "Surveillance batch draws", "BIS Care tracking"],
          color: "bg-[#0F2C61]",
          borderColor: "border-blue-900",
          textColor: "text-white"
        }
      ]
    },
    appliance: {
      title: "Household Electrical Safety (Mains 230V AC) Pipeline",
      nodes: [
        {
          id: "a-1",
          stepNumber: 1,
          type: "Product",
          label: "Identified Product",
          title: "Electric Household Mixer Grinder",
          description: "750W motor appliance with stainless steel jars and 3-pin plug.",
          details: ["Voltage: 230V AC 50Hz", "Power: 750 Watts", "Insulation Class: Class II / Earthed"],
          color: "bg-blue-50",
          borderColor: "border-blue-400",
          textColor: "text-blue-900"
        },
        {
          id: "a-2",
          stepNumber: 2,
          type: "Category",
          label: "Domain Classification",
          title: "Electrotechnical & Safety",
          description: "Electrotechnical Division (ETD) & Consumer Electronics.",
          details: ["Shock hazard mitigation", "Fire propagation prevention", "Mandatory safety norms"],
          color: "bg-indigo-50",
          borderColor: "border-indigo-400",
          textColor: "text-indigo-900"
        },
        {
          id: "a-3",
          stepNumber: 3,
          type: "Technical Characteristics",
          label: "Extracted DNA",
          title: "Leakage Current < 0.75mA",
          description: "High voltage breakdown immunity and creepage distances.",
          details: ["Earthing resistance < 0.1 ohm", "Thermal overload protector", "Glow-wire resistant plastic"],
          color: "bg-amber-50",
          borderColor: "border-amber-400",
          textColor: "text-amber-900"
        },
        {
          id: "a-4",
          stepNumber: 4,
          type: "Indian Standard",
          label: "Benchmark Standard",
          title: "Sample Ref: Electrical Safety",
          description: "Potentially relevant standard reference - Official verification required on manakonline.in.",
          details: ["Standard reference (Demo)", "Label: 🟡 AI-Assisted Recommendation", "Official lookup required"],
          color: "bg-emerald-50",
          borderColor: "border-emerald-500",
          textColor: "text-emerald-950"
        },
        {
          id: "a-5",
          stepNumber: 5,
          type: "Requirement",
          label: "Normative Clauses",
          title: "Dielectric Strength & Grounding",
          description: "Withstand 1500V AC test for 60 seconds without flashover.",
          details: ["Cord anchorage pull test", "Moisture ingress IPX0", "Temperature rise limits"],
          color: "bg-cyan-50",
          borderColor: "border-cyan-400",
          textColor: "text-cyan-900"
        },
        {
          id: "a-6",
          stepNumber: 6,
          type: "Testing",
          label: "Laboratory Protocols",
          title: "High Voltage & Glow-Wire Test",
          description: "Flammability of polymers at 850°C and abnormal operation endurance.",
          details: ["Dielectric withstand tester", "Glow-wire flammability rig", "Locked-rotor thermal run"],
          color: "bg-purple-50",
          borderColor: "border-purple-400",
          textColor: "text-purple-900"
        },
        {
          id: "a-7",
          stepNumber: 7,
          type: "BIS Service",
          label: "Certification Scheme",
          title: "Scheme I or CRS Certification",
          description: "Third-party factory assessment or registered test report conformity.",
          details: ["Accredited test report", "Factory SIT manual", "Manak Online e-application"],
          color: "bg-[#0F2C61]",
          borderColor: "border-blue-900",
          textColor: "text-white"
        }
      ]
    }
  };

  const currentGraph = pathways[activePathway];
  const [selectedNode, setSelectedNode] = useState<GraphNodeData>(currentGraph.nodes[3]);

  const handleSelectPathway = (p: 'sink' | 'cooker' | 'appliance') => {
    setActivePathway(p);
    setSelectedNode(pathways[p].nodes[3]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0F2C61] text-xs font-bold mb-2">
            <Network className="w-3.5 h-3.5" />
            <span>Interactive Knowledge Graph</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C61]">
            Standards & Compliance Ontological Graph
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Click any node below to inspect relationships: <strong className="text-slate-900">Product &rarr; Category &rarr; Technical Characteristics &rarr; Indian Standard &rarr; Requirement &rarr; Testing &rarr; BIS Service</strong>
          </p>
        </div>

        {/* Pathway Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => handleSelectPathway('sink')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activePathway === 'sink' ? 'bg-[#0F2C61] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kitchen Sinks
          </button>
          <button
            onClick={() => handleSelectPathway('cooker')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activePathway === 'cooker' ? 'bg-[#0F2C61] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pressure Cooker
          </button>
          <button
            onClick={() => handleSelectPathway('appliance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activePathway === 'appliance' ? 'bg-[#0F2C61] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Household Electrical
          </button>
        </div>
      </div>

      {/* Interactive Visual Graph Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <span>{currentGraph.title}</span>
          </h3>
          <span className="text-xs text-slate-400">Click any card to load technical drawer</span>
        </div>

        {/* The 7 Connected Graph Nodes Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 relative">
          {currentGraph.nodes.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 relative group ${
                  isSelected
                    ? `${node.color} ${node.borderColor} ring-2 ring-blue-500 shadow-md scale-102`
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      Step {node.stepNumber}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                      {node.type.slice(0, 7)}
                    </span>
                  </div>
                  <h4 className={`text-xs font-bold leading-snug ${node.textColor}`}>
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-tight">
                    {node.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-blue-700">Inspect</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-700 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Inspector Drawer */}
      <div className="bg-[#0F2C61] text-white rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold uppercase tracking-wider">
                Node Inspector: Step {selectedNode.stepNumber}
              </span>
              <span className="text-xs text-blue-300 font-medium">
                Ontology Entity: {selectedNode.type}
              </span>
            </div>
            <h3 className="text-xl font-bold mt-1 text-white">
              {selectedNode.title}
            </h3>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-blue-900 border border-blue-700 text-blue-200">
            {selectedNode.label}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-3xl">
          {selectedNode.description}
        </p>

        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
            Ontology Attributes & Evidentiary Citations:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {selectedNode.details.map((detail, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-blue-900/70 border border-blue-700/60 text-xs text-blue-100 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
