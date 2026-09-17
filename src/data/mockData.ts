import { StandardResult, BISServiceOption, LanguageCode } from '../types';

export const UNIVERSAL_DISCLAIMER =
  "This AI provides guidance based on available knowledge. It does not replace official BIS certification, testing, legal, or regulatory decisions.";

export const INSUFFICIENT_KB_MESSAGE =
  "I couldn't find sufficient verified information in the available BIS knowledge base to provide a reliable answer.";

export const DEFAULT_VERIFICATION_NOTICE =
  "Potentially relevant standard reference - Official verification required on manakonline.in";

// System prompt placeholder for Gemini API integration as required in specs
export const GEMINI_PROMPT = `
You are BISENCE Intelligence Core, a specialized National Standards engine for the Bureau of Indian Standards (BIS) framework.
Your task is to analyze user natural language product descriptions and extract structured Product DNA:
1. Product Name & Core Category
2. Intended Use & Target Users
3. Raw Material Specifications
4. Critical Risk & Safety Domains (Mechanical, Electrical, Chemical, Pressure, Food Contact)
5. Missing Essential Parameters required for definitive standard mapping.
CRITICAL CONSTRAINT: NEVER hallucinate or invent IS (Indian Standard) code numbers.
Always supply transparent confidence scoring and cite evidentiary attributes.
`;

export const SAMPLE_KNOWLEDGE_BASE: StandardResult[] = [
  {
    id: "kb-01",
    title: "Stainless Steel Sinks for Domestic Purposes - Sample Reference",
    standardReferenceNote: "Potentially relevant standard reference - Official verification required on manakonline.in",
    category: "Kitchen Equipment",
    relevance_score: 92,
    label: "verified",
    why: [
      "Matched primary material: Austenitic Stainless Steel (Food grade 304/316)",
      "Matched application: Kitchen wash basins, sinks, and food preparation surfaces",
      "Corrosion resistance, welding seam integrity, and drainage design specifications aligned"
    ],
    limitation: "Scope is primarily geared towards domestic and semi-commercial sinks; heavy duty 2mm+ industrial fabrication may require custom verification under commercial vessel norms.",
    evidence: "Sample Clause 4.2 & 5.1: Specifies sheet thickness tolerances (not less than 0.8 mm), finish criteria, sound deadening coating requirements, and salt-spray corrosion tests.",
    clauseExcerpt: "Clause 5.1.2 - Sinks shall be manufactured from stainless steel grade with minimum 18% Chromium and 8% Nickel for corrosion resistance and food safety.",
    testingRequirements: [
      "Intergranular Corrosion Resistance Test",
      "Overfill & Drainage Flow Capacity Test",
      "Impact Load & Structural Deflection Test",
      "Heavy Metal Leaching Test in acidic contact"
    ],
    officialSourceUrl: "https://www.manakonline.in"
  },
  {
    id: "kb-02",
    title: "Pressure Cooker Safety - Sample Reference",
    standardReferenceNote: "Potentially relevant standard reference - Official verification required on manakonline.in",
    category: "Pressure Appliances",
    relevance_score: 88,
    label: "verified",
    why: [
      "Matched pressurized steam vessel thermodynamics",
      "Matched safety release mechanism: Spring vent & fusible safety plug requirements",
      "Aligned with thermal stress and bursting pressure safety thresholds"
    ],
    limitation: "Applies to cookers up to 20-liter capacity; large industrial retort autoclaves require separate Boiler Regulation (IBR) conformity.",
    evidence: "Sample Section 6: Mandates minimum operating pressure safety factor of 3x working pressure before burst threshold, plus mandatory secondary fusible relief device.",
    clauseExcerpt: "Clause 7.4 - The cooker shall be provided with a safety relief device which will operate if the vent pipe gets blocked, releasing pressure safely below 2.5 kgf/cm².",
    testingRequirements: [
      "Hydrostatic Bursting Pressure Test (Minimum 3x operating)",
      "Thermal Cycle Life Endurance Test (1,000 cooking cycles)",
      "Lid Handle Torque & Insulation Temperature Rise Test",
      "Gasket Food Grade Migration & Elasticity Test"
    ],
    officialSourceUrl: "https://www.manakonline.in"
  },
  {
    id: "kb-03",
    title: "Electrical Safety for Household Appliances - Sample Reference",
    standardReferenceNote: "Potentially relevant standard reference - Official verification required on manakonline.in",
    category: "Electrical",
    relevance_score: 85,
    label: "ai_assisted",
    why: [
      "Matched low-voltage (230V AC) mains powered equipment",
      "Matched insulation resistance, earthing continuity, and ingress protection criteria",
      "Identifies shock hazard mitigation for wet/kitchen environments"
    ],
    limitation: "General electrical baseline safety; equipment with wireless/Bluetooth modules additionally requires WPC / Telecommunication TEC approvals.",
    evidence: "Sample General Requirements: Class I and Class II appliance insulation standards, creepage distances, and leakage current under damp heat conditions.",
    clauseExcerpt: "Clause 13.2 - Electric leakage current between live parts and accessible metallic surfaces shall not exceed 0.75 mA under full load operating conditions.",
    testingRequirements: [
      "High Voltage Dielectric Breakdown (1500V test)",
      "Earth Continuity & Ground Bond Resistance (<0.1 ohm)",
      "Glow-Wire Flammability Resistance for plastic enclosures",
      "Moisture Ingress Protection (IPX1 to IPX4 testing)"
    ],
    officialSourceUrl: "https://www.manakonline.in"
  },
  {
    id: "kb-04",
    title: "Drinking Water Treatment & Purifier Systems - Sample Reference",
    standardReferenceNote: "Potentially relevant standard reference - Official verification required on manakonline.in",
    category: "Water Purification",
    relevance_score: 79,
    label: "ai_assisted",
    why: [
      "Matched microbiological barrier and TDS reduction objectives",
      "Evaluates food-grade polymeric housing and UV disinfection dosage",
      "Addresses chemical leaching risk into potable drinking water"
    ],
    limitation: "Point-of-use domestic purifiers only; community municipal reverse osmosis plants fall under public health engineering frameworks.",
    evidence: "Sample Performance Metrics: Log-6 reduction for bacteria (E. coli), Log-4 reduction for viral pathogens, and arsenic/fluoride rejection metrics.",
    clauseExcerpt: "Clause 6.3 - Components in contact with treated water shall not impart odor, taste, or leach toxic metals exceeding IS 10500 drinking water thresholds.",
    testingRequirements: [
      "Microbial Challenge Reduction Test",
      "Chemical Extraction & Volatile Organic Compound Test",
      "Pressure Vessel Fatigue Test (100,000 pulse cycles)",
      "Electrical Component Water Ingress Safety Test"
    ],
    officialSourceUrl: "https://www.manakonline.in"
  },
  {
    id: "kb-05",
    title: "Protective Helmets for Two-Wheeler Riders - Sample Reference",
    standardReferenceNote: "Potentially relevant standard reference - Official verification required on manakonline.in",
    category: "Personal Protective Equipment",
    relevance_score: 74,
    label: "verification_required",
    why: [
      "Matched head protection against deceleration shock and penetrating sharp objects",
      "Mandatory ISI certification required by Ministry of Road Transport & Highways",
      "Chinstrap retention system and peripheral vision angle standards"
    ],
    limitation: "Applies exclusively to motorcycle street helmets; bicycle, equestrian, or industrial safety hardhats fall under separate distinct standard series.",
    evidence: "Sample Impact Attenuation Standard: Maximum permissible peak acceleration onto flat and hemispherical anvils conditioned at -10°C, +50°C, and water immersion.",
    clauseExcerpt: "Clause 8.1 - Peak acceleration transmitted to headform shall not exceed 300g and cumulative duration above 150g shall be less than 5 milliseconds.",
    testingRequirements: [
      "Impact Attenuation Test using Monorail Drop Rig",
      "Chinstrap Dynamic Retention & Slip Test",
      "Visor Optical Clarity, Distortion & Scratch Resistance Test",
      "Environmental Conditioning (Hot, Cold, UV, Solvent)"
    ],
    officialSourceUrl: "https://www.manakonline.in"
  }
];

export const BIS_SERVICES: BISServiceOption[] = [
  {
    id: "srv-01",
    title: "Product Certification (ISI Mark)",
    scheme: "Scheme I - Domestic Manufacturers",
    description: "Conformity assessment granting license to apply the iconic ISI mark on products fulfilling Indian Standards.",
    iconName: "Award",
    timeline: "30 - 90 Days",
    eligibility: "Manufacturing units with in-house laboratory and qualified quality personnel",
    link: "https://www.manakonline.in"
  },
  {
    id: "srv-02",
    title: "Compulsory Registration Scheme (CRS)",
    scheme: "Scheme II - IT & Electronic Products",
    description: "Self-declaration of conformity based on testing in BIS-recognized labs for designated electronic and solar goods.",
    iconName: "Cpu",
    timeline: "15 - 30 Days",
    eligibility: "Domestic or foreign manufacturers of electronics covered under MeitY/MNRE orders",
    link: "https://www.crsbis.in"
  },
  {
    id: "srv-03",
    title: "Foreign Manufacturers Certification (FMCS)",
    scheme: "Scheme I - Overseas Facilities",
    description: "Enables overseas production facilities to export certified goods bearing the ISI mark into India.",
    iconName: "Globe",
    timeline: "90 - 180 Days",
    eligibility: "Foreign manufacturers with Authorized Indian Representative (AIR)",
    link: "https://www.manakonline.in"
  },
  {
    id: "srv-04",
    title: "Hallmarking of Precious Metals",
    scheme: "Gold & Silver Purity Certification",
    description: "Accredited verification of gold and silver jewelry purity with unique 6-digit HUID tracking.",
    iconName: "Gem",
    timeline: "24 - 48 Hours per batch",
    eligibility: "Jewelers and Assaying & Hallmarking Centers registered with BIS",
    link: "https://www.bis.gov.in"
  },
  {
    id: "srv-05",
    title: "Laboratory Testing & Recognition",
    scheme: "LRS - National Test House & Private Labs",
    description: "Sample testing across chemical, civil, electrical, mechanical, and microbiological laboratories.",
    iconName: "FlaskConical",
    timeline: "5 - 15 Working Days",
    eligibility: "Enterprises seeking third-party compliance verification or lab accreditation",
    link: "https://www.bis.gov.in"
  },
  {
    id: "srv-06",
    title: "Management Systems Certification (MSCS)",
    scheme: "ISO Equivalents (9001, 14001, 45001)",
    description: "Auditing and certification of organizational management quality, environmental, and occupational safety systems.",
    iconName: "ShieldCheck",
    timeline: "60 - 120 Days",
    eligibility: "Any registered business entity seeking institutional management accreditation",
    link: "https://www.bis.gov.in"
  },
  {
    id: "srv-07",
    title: "Conformity Assessment & Market Surveillance",
    scheme: "Quality Control Orders (QCO) Compliance",
    description: "Verification of mandatory Quality Control Orders issued by Central Ministries to curb substandard imports.",
    iconName: "Scale",
    timeline: "Continuous / Surveillance basis",
    eligibility: "Importers, distributors, and domestic market participants",
    link: "https://www.bis.gov.in"
  },
  {
    id: "srv-08",
    title: "Standard Formulation & Participation",
    scheme: "Sectional Technical Committees",
    description: "Propose new national standards or participate in reviewing and formulating emerging industry norms.",
    iconName: "BookOpen",
    timeline: "Ongoing Committee Sittings",
    eligibility: "Industry associations, academic experts, research bodies, and enterprises",
    link: "https://www.bis.gov.in"
  }
];

export const ROADMAP_STAGES = [
  { id: 1, title: "Product Identification", status: "completed", note: "Product DNA & critical risk areas catalogued" },
  { id: 2, title: "Standard Discovery", status: "completed", note: "Potentially relevant Indian Standards matched with evidence" },
  { id: 3, title: "Technical Parameters", status: "current", note: "Verify raw material grade and testing tolerances" },
  { id: 4, title: "Laboratory Testing", status: "pending", note: "Pre-assessment batch testing in BIS-recognized lab" },
  { id: 5, title: "Certification Application", status: "pending", note: "Submission on Manak Online with factory QA plan" },
  { id: 6, title: "Official Verification", status: "pending", note: "BIS auditor inspection & license grant (CM/L number)" }
];

export const UI_TRANSLATIONS: Record<LanguageCode, {
  tagline: string;
  heroSub: string;
  analyzeBtn: string;
  searchBtn: string;
  intakeTitle: string;
  dnaTitle: string;
  missingDetailsTitle: string;
  standardsTitle: string;
  whySmartTitle: string;
  disclaimer: string;
}> = {
  en: {
    tagline: "From Product Idea to the Right Indian Standard — With Evidence.",
    heroSub: "Describe your product in your own words. Discover potentially relevant Indian Standards and BIS services with transparent AI guidance.",
    analyzeBtn: "Analyze with BIS AI",
    searchBtn: "Search Standards",
    intakeTitle: "Smart Intake & Extraction",
    dnaTitle: "Structured Product DNA",
    missingDetailsTitle: "AI needs 2 more details to finalize standard scope",
    standardsTitle: "Potentially Relevant Standards",
    whySmartTitle: "Why BISENCE SmartStandards AI?",
    disclaimer: UNIVERSAL_DISCLAIMER
  },
  hi: {
    tagline: "उत्पाद विचार से सही भारतीय मानक तक — प्रमाण के साथ।",
    heroSub: "अपने उत्पाद का वर्णन अपने शब्दों में करें। पारदर्शी एआई मार्गदर्शन के साथ संभावित भारतीय मानक और बीआईएस सेवाएं खोजें।",
    analyzeBtn: "बीआईएस एआई से विश्लेषण करें",
    searchBtn: "मानक खोजें",
    intakeTitle: "स्मार्ट इनटेक एवं विश्लेषण",
    dnaTitle: "संरचित उत्पाद डीएनए",
    missingDetailsTitle: "मानक दायरे को अंतिम रूप देने के लिए एआई को 2 और विवरण चाहिए",
    standardsTitle: "संभावित प्रासंगिक मानक",
    whySmartTitle: "बीआईएसेंस स्मार्टस्टैंडर्ड्स एआई क्यों?",
    disclaimer: "यह एआई उपलब्ध ज्ञान के आधार पर मार्गदर्शन प्रदान करता है। यह आधिकारिक बीआईएस प्रमाणन, परीक्षण या कानूनी निर्णयों का विकल्प नहीं है।"
  },
  te: {
    tagline: "ఉత్పత్తి ఆలోచన నుండి సరైన భారతీయ ప్రమాణం వరకు — సాక్ష్యాలతో.",
    heroSub: "మీ ఉత్పత్తిని మీ స్వంత మాటల్లో వివరించండి. సంభావ్య భారతీయ ప్రమాణాలు మరియు BIS సేవలను సులభంగా కనుగొనండి.",
    analyzeBtn: "BIS AI తో విశ్లేషించండి",
    searchBtn: "ప్రమాణాలను శోధించండి",
    intakeTitle: "స్మార్ట్ ఇన్‌టేక్ ఇంజిన్",
    dnaTitle: "ఉత్పత్తి డిఎన్‌ఏ కార్డ్",
    missingDetailsTitle: "ఖచ్చితమైన గుర్తింపు కోసం AI కి మరో 2 వివరాలు కావాలి",
    standardsTitle: "సంభావ్య సంబంధిత ప్రమాణాలు",
    whySmartTitle: "BISENCE AI ఎందుకు?",
    disclaimer: "ఈ AI అందుబాటులో ఉన్న సమాచారం ఆధారంగా మాత్రమే మార్గదర్శకత్వం ఇస్తుంది. ఇది అధికారిక ధృవీకరణను భర్తీ చేయదు."
  },
  ta: {
    tagline: "தயாரிப்பு யோசனையிலிருந்து சரியான இந்திய தரம் வரை — சான்றுகளுடன்.",
    heroSub: "உங்கள் தயாரிப்பை உங்கள் சொந்த வார்த்தைகளில் விவரிக்கவும். பொருத்தமான இந்திய தரநிலைகள் மற்றும் BIS சேவைகளைக் கண்டறியவும்.",
    analyzeBtn: "BIS AI உடன் பகுப்பாய்வு செய்க",
    searchBtn: "தரநிலைகளைத் தேடுங்கள்",
    intakeTitle: "நுண்ணறிவு மதிப்பீடு",
    dnaTitle: "தயாரிப்பு டி.என்.ஏ கட்டமைப்பு",
    missingDetailsTitle: "துல்லியமான முடிவுக்கு AI க்கு இன்னும் 2 தகவல்கள் தேவை",
    standardsTitle: "பொருத்தமான இந்திய தரநிலைகள்",
    whySmartTitle: "ஏன் BISENCE?",
    disclaimer: "இந்த AI வழிகாட்டுதலை மட்டுமே வழங்குகிறது. இது அதிகாரப்பூர்வ BIS சான்றிதழ் அல்ல."
  },
  kn: {
    tagline: "ಉತ್ಪನ್ನದ ಕಲ್ಪನೆಯಿಂದ ಸೂಕ್ತವಾದ ಭಾರತೀಯ ಗುಣಮಟ್ಟದವರೆಗೆ — ಸಾಕ್ಷ್ಯದೊಂದಿಗೆ.",
    heroSub: "ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ನಿಮ್ಮದೇ ಮಾತುಗಳಲ್ಲಿ ವಿವರಿಸಿ. ಸೂಕ್ತ ಭಾರತೀಯ ಮಾನದಂಡಗಳು ಮತ್ತು BIS ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
    analyzeBtn: "BIS AI ಮೂಲಕ ವಿಶ್ಲೇಷಿಸಿ",
    searchBtn: "ಮಾನದಂಡಗಳನ್ನು ಹುಡುಕಿ",
    intakeTitle: "ಸ್ಮಾರ್ಟ್ ಇನ್‌ಟೇಕ್",
    dnaTitle: "ಉತ್ಪನ್ನ ಡಿಎನ್‌ಎ",
    missingDetailsTitle: "AI ಗೆ ಇನ್ನೂ 2 ವಿವರಗಳ ಅಗತ್ಯವಿದೆ",
    standardsTitle: "ಸಂಭಾವ್ಯ ಸಂಬಂಧಿತ ಮಾನದಂಡಗಳು",
    whySmartTitle: "BISENCE ಏಕೆ?",
    disclaimer: "ಈ AI ಲಭ್ಯವಿರುವ ಜ್ಞಾನದ ಆಧಾರದ ಮೇಲೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ. ಇದು ಅಧಿಕೃತ BIS ಪ್ರಮಾಣೀಕರಣಕ್ಕೆ ಬದಲಿಯಾಗಿಲ್ಲ."
  },
  bn: {
    tagline: "পণ্যের ধারণা থেকে সঠিক ভারতীয় মানক পর্যন্ত — প্রমাণের সাথে।",
    heroSub: "আপনার নিজের ভাষায় পণ্যটির বর্ণনা দিন। সম্ভাব্য প্রাসঙ্গিক ভারতীয় মান এবং বিআইএস পরিষেবা খুঁজুন।",
    analyzeBtn: "বিআইএস এআই দিয়ে বিশ্লেষণ করুন",
    searchBtn: "মান অনুসন্ধান করুন",
    intakeTitle: "স্মার্ট ইনটেক ইঞ্জিন",
    dnaTitle: "পণ্যের ডিএনএ কার্ড",
    missingDetailsTitle: "সঠিক ফলাফলের জন্য এআই-এর আরও ২টি তথ্য প্রয়োজন",
    standardsTitle: "সম্ভাব্য প্রাসঙ্গিক ভারতীয় মান",
    whySmartTitle: "কেন BISENCE AI?",
    disclaimer: "এই এআই নির্দেশিকা প্রদান করে। এটি অফিসিয়াল বিআইএস সার্টিফিকেশন প্রতিস্থাপন করে না।"
  },
  mr: {
    tagline: "उत्पादन कल्पनेपासून ते योग्य भारतीय मानकांपर्यंत — पुराव्यासह.",
    heroSub: "आपल्या उत्पादनाचे वर्णन आपल्या शब्दांत करा. पारदर्शक एआय मार्गदर्शनासह संबंधित भारतीय मानके शोधा.",
    analyzeBtn: "बीआईएस एआय सह विश्लेषण करा",
    searchBtn: "मानके शोधा",
    intakeTitle: "स्मार्ट इनटेक",
    dnaTitle: "उत्पादन डीएनए कार्ड",
    missingDetailsTitle: "अचूकतेसाठी एआयला आणखी २ तपशील आवश्यक आहेत",
    standardsTitle: "संभाव्य संबंधित भारतीय मानके",
    whySmartTitle: "BISENCE का निवडावे?",
    disclaimer: "हे एआय उपलब्ध ज्ञानाच्या आधारे मार्गदर्शन प्रदान करते. हे अधिकृत बीआयएस प्रमाणपत्राची जागा घेत नाही."
  }
};
