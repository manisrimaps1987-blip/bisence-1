import React, { useState } from 'react';
import { 
  FileUp, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Eye, 
  RefreshCw, 
  ArrowRight,
  Download,
  BookOpen
} from 'lucide-react';

export const DocumentIntelligence: React.FC = () => {
  const [fileUploaded, setFileUploaded] = useState(true);
  const [fileName, setFileName] = useState("SpecSheet_SS304_Commercial_Sink_v2.pdf");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSimulatedUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setFileUploaded(true);
      setFileName("Manufacturer_Tech_Data_Sheet_Rev4.pdf");
    }, 1200);
  };

  const extractedSections = [
    {
      section: "Section 2.1 — Material Chemistry & Grade",
      page: "Page 03",
      text: "Sheet material shall be Austenitic Stainless Steel Grade 304 conforming to ASTM A240 / IS specifications. Nickel content: 8.12%, Chromium content: 18.34%.",
      explanation: "Complies with food contact hygiene requirements and meets the anti-corrosion chemical threshold for kitchen equipment.",
      source: "Uploaded document: Section 2.1, Line 14-19",
      status: "Compliant"
    },
    {
      section: "Section 3.4 — Minimum Wall Thickness Tolerances",
      page: "Page 07",
      text: "Nominal sheet thickness of the drawn bowl is specified as 0.90 mm (± 0.04 mm tolerance). Drain outlet diameter 90 mm.",
      explanation: "Meets the minimum requirement (>0.80 mm) under domestic and semi-commercial sink standard references.",
      source: "Uploaded document: Section 3.4, Table B",
      status: "Compliant"
    },
    {
      section: "Section 4.2 — Sound Deadening & Undercoating",
      page: "Page 11",
      text: "Polymerized spray coating applied on the underside of sink basins to suppress acoustic vibration and resonance.",
      explanation: "Fulfills dampening criteria. However, flammability and odor leaching tests under warm water contact must be verified.",
      source: "Uploaded document: Section 4.2, Paragraph 3",
      status: "Verification Recommended"
    },
    {
      section: "Section 6.1 — Static Deflection & Overfill Drain Flow",
      page: "Page 14",
      text: "Drain flow rate tested at 24 liters/minute without pooling. Static load capacity rated to 120 kg uniformly distributed.",
      explanation: "Exceeds standard minimum threshold for deflection and drainage velocity.",
      source: "Uploaded document: Section 6.1, Test Log #44B",
      status: "Compliant"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0F2C61] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Automated Technical Parsing</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C61]">
          Document Intelligence & Technical Clause Extractor
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
          Upload product technical data sheets, laboratory test reports, or engineering drawings (PDF) to automatically match against Indian Standards.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors p-8 text-center space-y-4 shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0F2C61] flex items-center justify-center mx-auto shadow-xs">
          <FileUp className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800">
            Upload Product Specification Sheet (PDF / Doc)
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Drag and drop your engineering drawing or bill of materials, or click to browse files.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleSimulatedUpload}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-xl bg-[#0F2C61] hover:bg-blue-900 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Parsing Technical Clauses...</span>
              </>
            ) : (
              <>
                <FileUp className="w-4 h-4" />
                <span>Upload Custom Document</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setFileName("Sample_BOM_Pressure_Cooker_Alloy.pdf");
              setIsProcessing(true);
              setTimeout(() => setIsProcessing(false), 800);
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Load Sample PDF (Commercial Sink Specs)
          </button>
        </div>

        <span className="text-[11px] text-slate-400 block pt-1">
          Supported formats: PDF, DOCX, TXT &bull; Max file size: 25 MB &bull; Client-side secure processing
        </span>
      </div>

      {/* Extracted Document Analysis Results */}
      {fileUploaded && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{fileName}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    4 Sections Extracted
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Source: Uploaded document &bull; OCR & NLP Confidence: 94%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert("Simulated: Exporting Clause-by-Clause Compliance Matrix (CSV)")}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Matrix</span>
              </button>
            </div>
          </div>

          {/* Clauses List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Automated Technical Extraction & Compliance Alignment:
            </h4>

            <div className="grid grid-cols-1 gap-4">
              {extractedSections.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all bg-slate-50/50 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#0F2C61]">{item.section}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {item.page}
                      </span>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full self-start sm:self-auto ${
                      item.status === 'Compliant'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status === 'Compliant' ? '✓ ' : '⚠ '} {item.status}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700">
                    &ldquo;{item.text}&rdquo;
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-slate-700">
                      <strong className="text-blue-900 block mb-0.5">AI Interpretation:</strong>
                      {item.explanation}
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-100/80 border border-slate-200 text-slate-600 text-[11px]">
                      <strong className="text-slate-800 block mb-0.5">Grounding Citation:</strong>
                      {item.source}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
            <span>Ready to link these extracted parameters to the BIS Standards Engine?</span>
            <button 
              onClick={() => alert("Parameters synchronized with Active Product DNA!")}
              className="px-3.5 py-1.5 rounded-lg bg-[#0F2C61] text-white font-bold hover:bg-blue-900 transition-colors"
            >
              Sync with Product DNA
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
