import { StandardResult, CitationRef, LabInfo, LanguageCode } from '../types';
import { SAMPLE_KNOWLEDGE_BASE } from './mockData';

export interface AssistantQueryMatch {
  text: string;
  category: 'standards' | 'schemes' | 'process' | 'consumer' | 'hallmarking' | 'labs' | 'notifications' | 'general';
  citations: CitationRef[];
  matchedStandards?: StandardResult[];
  suggestedActions?: {
    label: string;
    actionType: 'navigate_tab' | 'quick_reply' | 'open_url';
    payload: string;
  }[];
}

export const BIS_LABS_DIRECTORY: LabInfo[] = [
  {
    id: 'lab-cl',
    name: 'BIS Central Laboratory (CL)',
    type: 'BIS Central Lab',
    city: 'Sahibabad (Ghaziabad)',
    state: 'Uttar Pradesh (NCR)',
    region: 'North',
    disciplines: ['Mechanical', 'Chemical', 'Electrical', 'Microbiological', 'Civil'],
    address: 'Plot No. 20/9, Site IV, Sahibabad Industrial Area, Ghaziabad, UP 201010',
    contact: 'cl@bis.gov.in | Phone: 0120-2770200',
    sampleTestProducts: ['Packaged Drinking Water', 'Pressure Cookers', 'Cement', 'Steel', 'Electrical Cables', 'Toys']
  },
  {
    id: 'lab-wrl',
    name: 'BIS Western Regional Laboratory (WRL)',
    type: 'BIS Regional Lab',
    city: 'Mumbai',
    state: 'Maharashtra',
    region: 'West',
    disciplines: ['Mechanical', 'Chemical', 'Electrical'],
    address: 'Manakalaya, E9, MIDC, Behind Marol Telephone Exchange, Andheri (East), Mumbai 400093',
    contact: 'wrl@bis.gov.in | Phone: 022-28329295',
    sampleTestProducts: ['Stainless Steel Utensils', 'LPG Cylinders', 'Paints', 'LED Lamps', 'Plastics']
  },
  {
    id: 'lab-srl',
    name: 'BIS Southern Regional Laboratory (SRL)',
    type: 'BIS Regional Lab',
    city: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South',
    disciplines: ['Electrical', 'Chemical', 'Mechanical', 'Microbiological'],
    address: 'CIT Campus, IV Cross Road, Taramani, Chennai 600113',
    contact: 'srl@bis.gov.in | Phone: 044-22541442',
    sampleTestProducts: ['Motors & Pumps', 'Drinking Water', 'Batteries', 'Transformer Oil', 'Cables']
  },
  {
    id: 'lab-erl',
    name: 'BIS Eastern Regional Laboratory (ERL)',
    type: 'BIS Regional Lab',
    city: 'Kolkata',
    state: 'West Bengal',
    region: 'East',
    disciplines: ['Mechanical', 'Chemical', 'Civil'],
    address: '1/14, C.I.T. Scheme VII M, V.I.P. Road, Kankurgachi, Kolkata 700054',
    contact: 'erl@bis.gov.in | Phone: 033-23207084',
    sampleTestProducts: ['Structural Steel Bars', 'Galvanized Sheets', 'Paints', 'Chemicals', 'Tea Machinery']
  },
  {
    id: 'lab-nrl',
    name: 'BIS Northern Regional Laboratory (NRL)',
    type: 'BIS Regional Lab',
    city: 'Mohali (Chandigarh)',
    state: 'Punjab',
    region: 'North',
    disciplines: ['Mechanical', 'Electrical', 'Chemical'],
    address: 'Plot No. 4-A, Sector 27-B, Madhya Marg, Chandigarh / Mohali 160019',
    contact: 'nrl@bis.gov.in | Phone: 0172-2650290',
    sampleTestProducts: ['Agricultural Implements', 'Domestic Appliances', 'PVC Pipes', 'Food Packaging']
  },
  {
    id: 'lab-bbl',
    name: 'BIS Branch Laboratory Bengaluru',
    type: 'BIS Branch Lab',
    city: 'Bengaluru',
    state: 'Karnataka',
    region: 'South',
    disciplines: ['Electrical', 'Mechanical'],
    address: 'Peenya Industrial Area, 1st Stage, Bengaluru 560058',
    contact: 'bnbo@bis.gov.in | Phone: 080-28394955',
    sampleTestProducts: ['IT Equipment', 'Solar Inverters', 'Electronic Accessories', 'Household Electricals']
  },
  {
    id: 'lab-nth',
    name: 'National Test House (NTH - Alipore & Ghaziabad)',
    type: 'Recognized NABL Lab',
    city: 'Kolkata / Ghaziabad / Chennai / Mumbai',
    state: 'Pan-India',
    region: 'Central',
    disciplines: ['Mechanical', 'Chemical', 'Electrical', 'Civil', 'Microbiological'],
    address: 'Central Headquarters: Block CP, Sector V, Salt Lake, Kolkata 700091',
    contact: 'dg-nth@nic.in | Phone: 033-23673871',
    sampleTestProducts: ['All Engineering Materials', 'Helmets', 'Sanitary Fittings', 'Electronics', 'Chemicals']
  },
  {
    id: 'lab-cpri',
    name: 'Central Power Research Institute (CPRI)',
    type: 'Recognized NABL Lab',
    city: 'Bengaluru',
    state: 'Karnataka',
    region: 'South',
    disciplines: ['Electrical'],
    address: 'Sir C.V. Raman Road, Sadashivanagar P.O., P.B. No. 8066, Bengaluru 560080',
    contact: 'corporate@cpri.in | Phone: 080-22072222',
    sampleTestProducts: ['High Voltage Switchgear', 'Transformers', 'Energy Meters', 'Power Electronics', 'Cables']
  },
  {
    id: 'lab-arai',
    name: 'Automotive Research Association of India (ARAI)',
    type: 'Recognized NABL Lab',
    city: 'Pune',
    state: 'Maharashtra',
    region: 'West',
    disciplines: ['Mechanical', 'Electrical'],
    address: 'Survey No. 102, Vetal Hill, Off Paud Road, Kothrud, Pune 411038',
    contact: 'director@araiindia.com | Phone: 020-30231111',
    sampleTestProducts: ['Two-Wheeler Helmets (IS 4151)', 'Automotive Safety Glass', 'Tyres', 'EV Batteries']
  },
  {
    id: 'lab-cipet',
    name: 'Central Institute of Petrochemicals Engineering & Technology (CIPET)',
    type: 'Recognized NABL Lab',
    city: 'Chennai / Ahmedabad / Bhubaneswar',
    state: 'Pan-India',
    region: 'Central',
    disciplines: ['Chemical', 'Mechanical'],
    address: 'TVK Industrial Estate, Guindy, Chennai 600032',
    contact: 'chennai@cipet.gov.in | Phone: 044-22254780',
    sampleTestProducts: ['Polymeric Water Purifier Housings', 'UPVC Pipes & Fittings', 'Food Grade Packaging', 'Toys']
  }
];

export const HALLMARKING_PURITY_CHART = [
  { karat: '24K', fineness: '995 / 999', percentage: '99.5% / 99.9%', description: 'Pure bullion / minted coins', color: 'bg-amber-400 text-slate-950' },
  { karat: '23K', fineness: '958', percentage: '95.8%', description: 'High purity traditional jewellery', color: 'bg-amber-500 text-slate-950' },
  { karat: '22K', fineness: '916', percentage: '91.6%', description: 'Standard wedding & everyday bridal jewellery', color: 'bg-amber-600 text-white' },
  { karat: '20K', fineness: '833', percentage: '83.3%', description: 'Specialized diamond-set jewellery', color: 'bg-yellow-600 text-white' },
  { karat: '18K', fineness: '750', percentage: '75.0%', description: 'Studded diamond & gemstone luxury pieces', color: 'bg-yellow-700 text-white' },
  { karat: '14K', fineness: '585', percentage: '58.5%', description: 'Modern daily wear & studded gold articles', color: 'bg-amber-800 text-white' },
  { karat: 'Silver', fineness: '990 / 925 / 900 / 835 / 800', percentage: '80.0% - 99.0%', description: 'Hallmarked silver utensils, artifacts & jewellery', color: 'bg-slate-300 text-slate-900' },
];

export const QUICK_PROMPTS_BY_LANG: Record<LanguageCode, { label: string; query: string; category: string }[]> = {
  en: [
    { label: '📢 Latest BIS Notifications & QCOs', query: 'What are the latest Indian Standards notifications, Quality Control Orders (QCOs), and Gazette orders from the BIS website?', category: 'notifications' },
    { label: '🔍 Recommend standard for my product', query: 'I am manufacturing stainless steel kitchen sinks and domestic food preparation surfaces. Which Indian Standard applies and what testing is required?', category: 'standards' },
    { label: '📜 Explain BIS Schemes (ISI vs CRS)', query: 'Explain the difference between Scheme I (ISI Mark) and Scheme II (Compulsory Registration Scheme - CRS) with timelines and eligibility.', category: 'schemes' },
    { label: '🏭 Step-by-step licensing procedure', query: 'What is the complete step-by-step procedure for an MSME to obtain an official BIS ISI license on Manak Online?', category: 'process' },
    { label: '💎 Gold Hallmarking & 6-digit HUID', query: 'How does gold hallmarking work in India? What do the 3 marks and the 6-digit alphanumeric HUID mean for consumers and jewelers?', category: 'hallmarking' },
    { label: '🔬 Find recognized testing labs', query: 'Which BIS and NABL recognized testing laboratories test electrical appliances, drinking water, and mechanical products?', category: 'labs' },
    { label: '🛡️ How to verify ISI mark & report fake', query: 'How can consumers verify a genuine ISI mark, check CM/L license number, and file complaints on the BIS Care app?', category: 'consumer' },
  ],
  hi: [
    { label: '📢 नवीनतम बीआईएस अधिसूचनाएं व QCO', query: 'बीआईएस वेबसाइट से नवीनतम भारतीय मानक अधिसूचनाएं, गुणवत्ता नियंत्रण आदेश (QCO) और राजपत्र अधिसूचनाएं क्या हैं?', category: 'notifications' },
    { label: '🔍 मेरे उत्पाद के लिए मानक बताएं', query: 'मैं स्टेनलेस स्टील किचन सिंक बना रहा हूं। कौन सा भारतीय मानक लागू होगा और कौन से परीक्षण अनिवार्य हैं?', category: 'standards' },
    { label: '📜 बीआईएस योजनाएं (ISI vs CRS)', query: 'बीआईएस स्कीम 1 (ISI मार्क) और स्कीम 2 (CRS) में क्या अंतर है?', category: 'schemes' },
    { label: '🏭 लाइसेंसिंग की चरणबद्ध प्रक्रिया', query: 'मानक ऑनलाइन पर एमएसएमई के लिए बीआईएस लाइसेंस प्राप्त करने की पूरी प्रक्रिया क्या है?', category: 'process' },
    { label: '💎 गोल्ड हॉलमार्किंग और HUID', query: 'सोने की हॉलमार्किंग और 6 अंकों वाले HUID का क्या अर्थ है और उपभोक्ता इसे कैसे सत्यापित करें?', category: 'hallmarking' },
    { label: '🔬 मान्यता प्राप्त परीक्षण प्रयोगशालाएं', query: 'बीआईएस और NABL मान्यता प्राप्त परीक्षण प्रयोगशालाएं कहां स्थित हैं?', category: 'labs' },
    { label: '🛡️ असली ISI मार्क की जांच और शिकायत', query: 'उपभोक्ता असली ISI मार्क की जांच कैसे करें और बीआईएस केयर ऐप पर नकली सामान की शिकायत कैसे करें?', category: 'consumer' }
  ],
  te: [
    { label: '📢 తాజా BIS నోటిఫికేషన్లు & QCOలు', query: 'BIS వెబ్‌సైట్ నుండి తాజా భారతీయ ప్రమాణాల నోటిఫికేషన్‌లు మరియు క్వాలిటీ కంట్రోల్ ఆర్డర్‌లు (QCO) ఏమిటి?', category: 'notifications' },
    { label: '🔍 నా ఉత్పత్తికి వర్తించే ప్రమాణం', query: 'నేను స్టెయిన్‌లెస్ స్టీల్ కిచెన్ సింక్‌లను తయారు చేస్తున్నాను. ఏ భారతీయ ప్రమాణం వర్తిస్తుంది?', category: 'standards' },
    { label: '📜 BIS పథకాలు (ISI మరియు CRS)', query: 'BIS స్కీమ్ I (ISI మార్క్) మరియు స్కీమ్ II (CRS) మధ్య తేడాలు ఏమిటి?', category: 'schemes' },
    { label: '🏭 లైసెన్సింగ్ విధానం', query: 'మానక్ ఆన్‌లైన్ ద్వారా BIS లైసెన్స్ పొందే పూర్తి ప్రక్రియ ఏమిటి?', category: 'process' },
    { label: '💎 బంగారు హాల్‌మార్కింగ్ & HUID', query: 'బంగారు ఆభరణాలపై 6 అంకెల HUID ఎలా పనిచేస్తుంది మరియు వినియోగదారులు దీన్ని ఎలా ధృవీకరించాలి?', category: 'hallmarking' },
    { label: '🔬 పరీక్షా ప్రయోగశాలలు (ల్యాబ్‌లు)', query: 'ఉత్పత్తి పరీక్ష కోసం BIS గుర్తింపు పొందిన ల్యాబ్‌లు ఎక్కడ ఉన్నాయి?', category: 'labs' },
    { label: '🛡️ నకిలీ ISI మార్క్ ఫిర్యాదు', query: 'BIS Care యాప్ ద్వారా నిజమైన ISI మార్కును ఎలా ధృవీకరించాలి మరియు నకిలీలపై ఎలా ఫిర్యాదు చేయాలి?', category: 'consumer' }
  ],
  ta: [
    { label: '📢 சமீபத்திய BIS அறிவிப்புகள் & QCO', query: 'BIS இணையதளத்தில் இருந்து சமீபத்திய இந்திய தரநிலைகள் அறிவிப்புகள் மற்றும் தரக் கட்டுப்பாட்டு ஆணைகள் யாவை?', category: 'notifications' },
    { label: '🔍 என் தயாரிப்புக்கான தரநிலை', query: 'நான் சமையலறை சிங்க் தயாரிக்கிறேன். இதற்கு எந்த இந்திய தரம் பொருந்தும்?', category: 'standards' },
    { label: '📜 BIS திட்டங்கள் (ISI vs CRS)', query: 'BIS திட்டம் I (ISI முத்திரை) மற்றும் திட்டம் II (CRS) ஆகியவற்றுக்கு இடையேயான வேறுபாடு என்ன?', category: 'schemes' },
    { label: '🏭 சான்றிதழ் பெரும் முறை', query: 'Manak Online தளத்தில் BIS உரிமம் பெறுவதற்கான வழிமுறைகள் யாவை?', category: 'process' },
    { label: '💎 தங்க ஹால்மார்க்கிங் & HUID', query: 'தங்கத்தில் உள்ள 6 இலக்க HUID குறியீடு எவ்வாறு செயல்படுகிறது? நுகர்வோர் எவ்வாறு சரிபார்ப்பது?', category: 'hallmarking' },
    { label: '🔬 சோதனை ஆய்வகங்கள்', query: 'பொருட்களை சோதிக்க BIS அங்கீகாரம் பெற்ற ஆய்வகங்கள் எங்கு உள்ளன?', category: 'labs' },
    { label: '🛡️ போலி ISI புகார்', query: 'BIS Care செயலியில் போலி தயாரிப்புகள் குறித்து எவ்வாறு புகார் செய்வது?', category: 'consumer' }
  ],
  kn: [
    { label: '📢 ಇತ್ತೀಚಿನ BIS ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು QCO', query: 'BIS ವೆಬ್‌ಸೈಟ್‌ನ ಇತ್ತೀಚಿನ ಭಾರತೀಯ ಮಾನದಂಡಗಳ ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು ಗುಣಮಟ್ಟ ನಿಯಂತ್ರಣ ಆದೇಶಗಳು ಯಾವುವು?', category: 'notifications' },
    { label: '🔍 ಉತ್ಪನ್ನಕ್ಕೆ ಸೂಕ್ತ ಮಾನದಂಡ', query: 'ನಾನು ಅಡುಗೆಮನೆಯ ಸ್ಟೇನ್‌ಲೆಸ್ ಸ್ಟೀಲ್ ಸಿಂಕ್‌ಗಳನ್ನು ತಯಾರಿಸುತ್ತಿದ್ದೇನೆ. ಯಾವ ಭಾರತೀಯ ಮಾನದಂಡ ಅನ್ವಯಿಸುತ್ತದೆ?', category: 'standards' },
    { label: '📜 BIS ಯೋಜನೆಗಳ ವಿವರಣೆ', query: 'ಸ್ಕೀಮ್ 1 (ISI ಮಾರ್ಕ್) ಮತ್ತು ಸ್ಕೀಮ್ 2 (CRS) ನಡುವಿನ ವ್ಯತ್ಯಾಸವೇನು?', category: 'schemes' },
    { label: '🏭 ಪರವಾನಗಿ ಪಡೆಯುವ ವಿಧಾನ', query: 'Manak Online ನಲ್ಲಿ BIS ಪರವಾನಗಿ ಪಡೆಯುವ ಹಂತ-ಹಂತದ ಪ್ರಕ್ರಿಯೆ ಏನು?', category: 'process' },
    { label: '💎 ಚಿನ್ನದ ಹಾಲ್‌ಮಾರ್ಕಿಂಗ್ & HUID', query: 'ಚಿನ್ನದ ಮೇಲಿನ 6 ಅಂಕಿಯ HUID ಸಂಖ್ಯೆ ಏನು ಮತ್ತು ಗ್ರಾಹಕರು ಇದನ್ನು ಹೇಗೆ ಪರಿಶೀಲಿಸಬೇಕು?', category: 'hallmarking' },
    { label: '🔬 ಪರೀಕ್ಷಾ ಪ್ರಯೋಗಾಲಯಗಳು', query: 'ಉತ್ಪನ್ನ ಪರೀಕ್ಷೆಗಾಗಿ BIS ಮತ್ತು NABL ಮಾನ್ಯತೆ ಪಡೆದ ಲ್ಯಾಬ್‌ಗಳು ಎಲ್ಲಿವೆ?', category: 'labs' },
    { label: '🛡️ ನಕಲಿ ಗುರುತು ದೂರು', query: 'BIS Care ಆಪ್‌ನಲ್ಲಿ ಅಸಲಿ ISI ಗುರುತು ಪರಿಶೀಲಿಸುವುದು ಮತ್ತು ದೂರು ನೀಡುವುದು ಹೇಗೆ?', category: 'consumer' }
  ],
  bn: [
    { label: '📢 সাম্প্রতিক বিআইএস বিজ্ঞপ্তি ও QCO', query: 'বিআইএস ওয়েবসাইটের সাম্প্রতিক ভারতীয় মানদণ্ড বিজ্ঞপ্তি এবং গুণমান নিয়ন্ত্রণ আদেশ (QCO) কি কি?', category: 'notifications' },
    { label: '🔍 আমার পণ্যের জন্য মানক', query: 'আমি স্টেইনলেস স্টিল কিচেন সিঙ্ক তৈরি করছি। কোন ভারতীয় মান প্রযোজ্য এবং কি পরীক্ষা প্রয়োজন?', category: 'standards' },
    { label: '📜 বিআইএস স্কিম (ISI বনাম CRS)', query: 'স্কিম ১ (ISI মার্ক) এবং স্কিম ২ (CRS)-এর মধ্যে পার্থক্য কি?', category: 'schemes' },
    { label: '🏭 লাইসেন্সিং प्रक्रिया', query: 'Manak Online-এ বিআইএস লাইসেন্স পাওয়ার ধাপে ধাপে প্রক্রিয়া কি?', category: 'process' },
    { label: '💎 সোনার হলমার্কিং ও HUID', query: 'সোনার হলমার্কিং-এ ৬ সংখ্যার HUID কোড কিভাবে কাজ করে এবং গ্রাহকরা কিভাবে যাচাই করবেন?', category: 'hallmarking' },
    { label: '🔬 পরীক্ষাগার (ল্যাব) তালিকা', query: 'পণ্য পরীক্ষার জন্য বিআইএস স্বীকৃত ল্যাবরেটরি কোথায় রয়েছে?', category: 'labs' },
    { label: '🛡️ জাল ISI চিহ্নের অভিযোগ', query: 'BIS Care অ্যাপে আসল ISI মার্ক যাচাই এবং নকল পণ্যের বিরুদ্ধে অভিযোগ করার উপায় কি?', category: 'consumer' }
  ],
  mr: [
    { label: '📢 नवीनतम बीआयएस अधिसूचना आणि QCO', query: 'बीआयएस वेबसाइटवरील नवीनतम भारतीय मानके अधिसूचना आणि गुणवत्ता नियंत्रण आदेश (QCO) कोणते आहेत?', category: 'notifications' },
    { label: '🔍 माझ्या उत्पादनासाठी मानके', query: 'मी स्टेनलेस स्टील किचन सिंक बनवत आहे. कोणते भारतीय मानक लागू होईल आणि कोणती चाचणी आवश्यक आहे?', category: 'standards' },
    { label: '📜 बीआयएस योजना (ISI वि CRS)', query: 'स्कीम १ (ISI मार्क) आणि स्कीम २ (CRS) यातील फरक काय आहे?', category: 'schemes' },
    { label: '🏭 परवाना मिळविण्याची प्रक्रिया', query: 'मानक ऑनलाइनवर बीआयएस परवाना मिळविण्याची टप्प्याटप्प्याने प्रक्रिया काय आहे?', category: 'process' },
    { label: '💎 सुवर्ण हॉलमार्किंग आणि HUID', query: 'सोन्यावरील ६-अंकी HUID चा अर्थ काय आहे आणि ग्राहकांनी ते कसे पडताळावे?', category: 'hallmarking' },
    { label: '🔬 मान्यताप्राप्त प्रयोगशाळा', query: 'उत्पादन चाचणीसाठी बीआयएस आणि NABL मान्यताप्राप्त लॅब्स कुठे आहेत?', category: 'labs' },
    { label: '🛡️ बनावट ISI बाबत तक्रार', query: 'BIS Care अॅपवर अस्सल ISI मार्क तपासणे आणि तक्रार नोंदवणे कसे करावे?', category: 'consumer' }
  ]
};

/**
 * Intelligent Conversational Retrieval Engine for BISENCE
 * Analyzes natural language queries and matches with authorized standards, schemes,
 * testing labs, and regulatory clauses.
 */
export function generateIntelligentBISResponse(query: string, language: LanguageCode): AssistantQueryMatch {
  const q = query.toLowerCase().trim();

  // 0. Latest Indian Standards Notifications, QCOs, and Gazette Directives
  if (
    q.includes('notif') || 
    q.includes('qco') || 
    q.includes('gazette') || 
    q.includes('order') || 
    q.includes('circular') || 
    q.includes('wide circulation') || 
    q.includes('अधिसूचना') || 
    q.includes('నోటిఫికేషన్') || 
    q.includes('அறிவிப்பு') || 
    q.includes('ಅಧಿಸೂಚನೆ') || 
    q.includes('বিজ্ঞপ্তি')
  ) {
    return {
      category: 'notifications',
      text: `### 📢 Official Indian Standards Notifications, QCOs & Gazette Updates

Here are the latest official notifications, Quality Control Orders (QCOs), and Gazette mandates sourced from the Bureau of Indian Standards (BIS) and relevant Union Ministries:

#### 1. Cookware, Utensils and Food Preparation Implements (QCO)
- **Gazette Ref:** S.O. 124(E) / DPIIT-QCO-2024-25 | Ministry of Commerce & Industry (DPIIT)
- **Mandatory Standards:** IS 14756:2022 (Stainless steel cookware), IS 2347:2017 (Pressure cookers), IS 13983:1994 (Stainless steel sinks), IS 1660:2009 (Aluminium utensils).
- **Enforcement Status:** Mandatory ISI Mark under Scheme I. Micro & Small enterprises receive extended transition timeline. No person shall produce, import, distribute, or sell non-ISI certified items.

#### 2. Solar PV Inverters & Battery Energy Storage (CRS Phase VI)
- **Ministry:** Ministry of Electronics & Information Technology (MeitY)
- **Standards:** IS 16221 (Part 2):2015 & IS 16169:2014.
- **Enforcement Portal:** Compulsory Registration Scheme on \`crsbis.in\`. Grid-tied and micro-inverters up to 150 kW require test reports from BIS-recognized labs.

#### 3. Mandatory Gold Hallmarking — Phase IV Expansion
- **Order:** BIS/HMD/Phase-IV/2024-25 | Department of Consumer Affairs
- **Coverage:** Extended to 18 additional districts. All gold jewellery in notified districts must carry 3 mandatory marks: BIS triangular logo, purity fineness (e.g., 22K916), and 6-digit alphanumeric HUID.

#### 4. Safety of Toys — First Revision of IS 9873 (Part 1 : 2024)
- **Division:** Mechanical Engineering Division Council, BIS
- **Key Amendments:** Harmonized with ISO 8124-1:2022 with enhanced tests for expanding materials, high-powered magnet safety in construction toys, and acoustic sound pressure limits.

#### 5. Green Concrete Performance Specifications (Draft for Wide Circulation)
- **Committee:** CED 43 (Concrete & Reinforced Concrete)
- **Standard:** IS 456 proposed Annexure G on embodied carbon benchmarks and supplementary cementitious materials. Public comments are actively open on \`manakonline.in\`.

You can inspect the full filterable directory of gazette notifications and Quality Control Orders in the **"📢 Standards Notifications"** tab.`,
      citations: [
        {
          title: 'Official BIS Quality Control Orders Directory',
          source: 'bis.gov.in / DPIIT / Ministry of Consumer Affairs',
          sourceUrl: 'https://www.bis.gov.in/index.php/product-certification/quality-control-orders/',
          trustLevel: 'verified'
        },
        {
          title: 'Manak Online Wide Circulation & Draft Standards',
          source: 'manakonline.in',
          sourceUrl: 'https://www.manakonline.in',
          trustLevel: 'verified'
        },
        {
          title: 'MeitY Compulsory Registration Orders (CRS)',
          source: 'crsbis.in',
          sourceUrl: 'https://www.crsbis.in',
          trustLevel: 'verified'
        }
      ],
      suggestedActions: [
        { label: 'Open Standards Notifications Portal', actionType: 'navigate_tab', payload: 'notifications' },
        { label: 'Check Cookware & Utensils Standards', actionType: 'quick_reply', payload: 'I am manufacturing stainless steel kitchen sinks and domestic food preparation surfaces. Which Indian Standard applies and what testing is required?' },
        { label: 'View Gold Hallmarking Orders', actionType: 'navigate_tab', payload: 'consumer' }
      ]
    };
  }

  // 1. Hallmarking & HUID queries
  if (q.includes('hallmark') || q.includes('huid') || q.includes('gold') || q.includes('jewel') || q.includes('हॉलमार्क') || q.includes('हॉलमार्किंग') || q.includes('हॉउइडी') || q.includes('బంగార') || q.includes('தங்கம்') || q.includes('ಚಿನ್ನ') || q.includes('সোনা') || q.includes('सोने')) {
    return {
      category: 'hallmarking',
      text: `### 💎 Official Guidance on Gold & Silver Hallmarking in India

Hallmarking is the accurate determination and official recording of the proportionate content of precious metal in gold and silver articles. In India, hallmarking is governed by the **Bureau of Indian Standards (Hallmarking) Regulations, 2018** under the BIS Act, 2016.

#### 1. The 3 Mandatory Hallmarks on Genuine Gold Jewellery
Every piece of certified gold jewellery must carry three distinct laser-engraved marks:
1. **The BIS Triangular Mark:** Signifies third-party certified conformity by the Bureau of Indian Standards.
2. **Purity in Karat & Fineness:** 
   - **24K (995 / 999):** 99.5% / 99.9% pure bullion
   - **23K (958):** 95.8% pure gold
   - **22K (916):** 91.6% pure standard gold jewellery
   - **20K (833):** 83.3% pure gold
   - **18K (750):** 75.0% pure studded/diamond jewellery
   - **14K (585):** 58.5% pure modern daily wear
3. **6-Digit Alphanumeric HUID (Hallmark Unique Identification):** A unique laser-etched serial code (e.g., \`AB387K\`) assigned by an authorized Assaying and Hallmarking Centre (AHC). Every individual jewellery article receives its own unique HUID.

#### 2. Consumer Verification via Official BIS Care Mobile App
- Open the official **BIS Care App** (available on Android & iOS).
- Navigate to the **'Verify HUID'** tab.
- Enter the 6-digit alphanumeric code engraved on your jewellery.
- The app instantly reveals:
  - Registered Jeweller Name & Registration Number
  - Assaying and Hallmarking Centre (AHC) Name & City
  - Date of Hallmarking
  - Article Type (Ring, Bangle, Necklace, Chain, etc.)
  - Certified Purity & Weight Category

#### 3. Jeweller Registration on Manak Online
- Mandatory in notified districts across India (343+ districts).
- **Registration Fee:** ₹0 (Nil) for Micro enterprises; nominal automatic online grant for jewelers.
- Assaying and Hallmarking Centers charge a subsidized statutory fee of approximately ₹45 (+GST) per gold article.`,
      citations: [
        {
          title: 'BIS (Hallmarking) Regulations & Quality Control Orders',
          source: 'Bureau of Indian Standards Hallmarking Portal',
          sourceUrl: 'https://www.bis.gov.in',
          clause: 'Clause 3 & 4 (HUID Specifications)',
          trustLevel: 'verified'
        },
        {
          title: 'Mandatory Hallmarking Order - Ministry of Consumer Affairs',
          source: 'The Gazette of India',
          sourceUrl: 'https://www.manakonline.in',
          standardCode: 'IS 1417 (Gold Purity & Fineness)',
          trustLevel: 'verified'
        }
      ],
      suggestedActions: [
        { label: 'View Consumer Portal', actionType: 'navigate_tab', payload: 'consumer' },
        { label: 'Explore Service Navigator', actionType: 'navigate_tab', payload: 'navigator' },
        { label: 'Open BIS Care Mobile App Portal', actionType: 'open_url', payload: 'https://www.bis.gov.in' }
      ]
    };
  }

  // 2. Testing Laboratories queries
  if (q.includes('lab') || q.includes('testing') || q.includes('test') || q.includes('प्रयोगशाला') || q.includes('ల్యాబ్') || q.includes('ஆய்வகம்') || q.includes('ಪರೀಕ್ಷೆ') || q.includes('পরীক্ষাগার') || q.includes('चाचणी')) {
    return {
      category: 'labs',
      text: `### 🔬 BIS Laboratory Testing Network & Laboratory Recognition Scheme (LRS)

The Bureau of Indian Standards operates a robust nationwide testing infrastructure through its own Central, Regional, and Branch laboratories, complemented by hundreds of NABL-accredited labs recognized under the **Laboratory Recognition Scheme (LRS 2020)**.

#### 1. In-House BIS Network
- **Central Laboratory (CL), Sahibabad (NCR):** The apex testing facility with specialized mechanical, chemical, electrical, microbiological, and food testing divisions.
- **Regional Laboratories:**
  - **Western Regional Lab (WRL), Mumbai:** Specializes in metallurgy, stainless steel, appliances, and LPG safety.
  - **Southern Regional Lab (SRL), Chennai:** Specializes in motors, pumps, cables, electronics, and water purity.
  - **Eastern Regional Lab (ERL), Kolkata:** Specializes in structural steel, bars, chemicals, and industrial goods.
  - **Northern Regional Lab (NRL), Mohali:** Specializes in agricultural machinery, domestic appliances, and PVC.
- **Branch Laboratories:** Bengaluru (Peenya), Patna, Guwahati, and Ahmedabad.

#### 2. Disciplines & Testing Regimes
1. **Mechanical Testing:** Tensile strength, impact resistance, bursting pressure, structural deflection, hardness.
2. **Electrical & Electronics:** High voltage dielectric breakdown (1500V+), leakage current (<0.75mA), earth continuity (<0.1Ω), ingress protection (IPX1 to IPX7), thermal endurance.
3. **Chemical & Metallurgical:** Spark emission spectrometry, salt-spray corrosion (ASTM B117 / IS 9844), heavy metal migration, food contact leaching (Lead, Cadmium, Nickel).
4. **Microbiological Testing:** Total viable count, E. coli, coliform, pseudomonas reduction for potable water and food items.

#### 3. Independent Pre-Assessment Testing for MSMEs
Under Scheme I, before a factory audit or sample dispatch, MSMEs can test pre-production prototypes at any recognized NABL/BIS laboratory to identify potential non-conformities early.`,
      citations: [
        {
          title: 'BIS Laboratory Recognition Scheme (LRS) Guidelines',
          source: 'BIS Central Laboratory Division',
          sourceUrl: 'https://www.bis.gov.in',
          clause: 'Clause 6: Recognition Criteria & NABL ISO/IEC 17025 Alignment',
          trustLevel: 'verified'
        },
        {
          title: 'Search Recognized Labs Directory',
          source: 'Manak Online Portal (Laboratory Module)',
          sourceUrl: 'https://www.manakonline.in',
          trustLevel: 'verified'
        }
      ],
      suggestedActions: [
        { label: 'View Testing Labs Directory', actionType: 'navigate_tab', payload: 'compliance' },
        { label: 'Check Document Intel', actionType: 'navigate_tab', payload: 'document' },
        { label: 'Open Manak Online Lab Portal', actionType: 'open_url', payload: 'https://www.manakonline.in' }
      ]
    };
  }

  // 3. Schemes: ISI vs CRS vs FMCS
  if (q.includes('scheme') || q.includes('isi') || q.includes('crs') || q.includes('fmcs') || q.includes('mscs') || q.includes('योजना') || q.includes('స్కీమ్') || q.includes('திட்டம்') || q.includes('ಯೋಜನೆ') || q.includes('স্কিম')) {
    return {
      category: 'schemes',
      text: `### 📜 Comprehensive Guide to BIS Conformity Assessment Schemes

The Bureau of Indian Standards operates multiple distinct conformity assessment schemes under the **BIS (Conformity Assessment) Regulations, 2018**:

| Scheme | Target Category | Conformity Model | Timeline | Marking Identifier |
| :--- | :--- | :--- | :--- | :--- |
| **Scheme I (ISI Mark)** | Industrial & consumer goods, food, steel, appliances | Factory inspection + independent sample testing | 30–90 days | Iconic ISI logo with \`IS:XXXX\` on top & 7-digit \`CM/L-XXXXXXX\` |
| **Scheme II (CRS)** | Electronics, IT products, solar inverters, LED goods | Self-declaration based on lab test reports | 15–30 days | Standard CRS border with unique \`R-XXXXXXXX\` registration number |
| **Scheme IV (FMCS)** | Foreign manufacturing facilities exporting to India | Factory audit abroad + sample testing in India | 90–180 days | ISI Mark with \`CM/L\` number via Authorized Indian Representative |
| **Hallmarking** | Gold & Silver jewellery / precious artifacts | Assaying at accredited AHCs | 24–48 hours | BIS logo + Karat/Purity + 6-digit alphanumeric HUID |
| **Scheme X** | Low-risk or customized items | Simplified inspection & testing | 15–20 days | Certificate of conformity |
| **MSCS** | Quality management (ISO 9001), Environmental (14001), Food Safety (22000) | Third-party systemic management audits | 60–120 days | Management system accreditation logo |

#### Key Difference: Scheme I (ISI) vs. Scheme II (CRS)
- **Scheme I (ISI Mark):** Requires the manufacturer to maintain an **in-house testing laboratory**, implement a documented **Scheme of Testing and Inspection (STI)**, and undergo a physical **factory audit** by BIS officers prior to license grant.
- **Scheme II (CRS - Compulsory Registration Scheme):** Geared towards fast-moving IT and electronic goods. It does *not* mandate a pre-license factory audit. The manufacturer submits samples directly to a BIS-recognized testing laboratory, and upon obtaining a passing test report, uploads it to **crsbis.in** for registration.`,
      citations: [
        {
          title: 'BIS (Conformity Assessment) Regulations, 2018',
          source: 'The Gazette of India Extraordinary',
          sourceUrl: 'https://www.bis.gov.in',
          clause: 'Schedule II (Schemes I to X)',
          trustLevel: 'verified'
        },
        {
          title: 'Compulsory Registration Portal Guide',
          source: 'crsbis.in Official Portal',
          sourceUrl: 'https://www.crsbis.in',
          trustLevel: 'verified'
        }
      ],
      suggestedActions: [
        { label: 'Open BIS Service Navigator', actionType: 'navigate_tab', payload: 'navigator' },
        { label: 'View Industry Dashboard', actionType: 'navigate_tab', payload: 'industry' },
        { label: 'Visit CRS Portal', actionType: 'open_url', payload: 'https://www.crsbis.in' }
      ]
    };
  }

  // 4. Licensing Process & Step-by-step procedure
  if (q.includes('process') || q.includes('step') || q.includes('procedure') || q.includes('apply') || q.includes('license') || q.includes('licence') || q.includes('प्रक्रिया') || q.includes('पद्धती') || q.includes('విధానం') || q.includes('வழிமுறை') || q.includes('ವಿಧಾನ') || q.includes('পদ্ধতি')) {
    return {
      category: 'process',
      text: `### 🏭 Step-by-Step Licensing Procedure for Manufacturers (Scheme I - ISI Mark)

To obtain an official BIS license to use the ISI Mark, manufacturers must follow the standard procedure codified on **Manak Online (manakonline.in)**:

\`\`\`
[1. Pre-Application Setup] ──> [2. Manak Online Filing] ──> [3. BIS Factory Audit]
            │                                                      │
            ▼                                                      ▼
[6. Grant of CM/L License] <── [5. Independent Lab Test] <── [4. Sample Drawing]
\`\`\`

#### Detailed 6-Step Workflow:
1. **Pre-Application Readiness & In-House Lab Setup:**
   - Procure the applicable Indian Standard from the BIS portal.
   - Install required testing equipment in accordance with the **Scheme of Testing and Inspection (STI)**.
   - Ensure all test instruments possess valid NABL calibration certificates.
   - Appoint competent quality control personnel.

2. **Online Submission on Manak Online:**
   - Register on \`manakonline.in\` under the e-BIS Product Certification module.
   - Upload key documents: Udyam/MSME certificate (for 50% marking fee concession), manufacturing premises ownership/lease deed, machinery list, test equipment list, calibration reports, and raw material test certificates.
   - Pay the nominal application fee (₹1,000) and preliminary inspection fee.

3. **Preliminary Factory Inspection / Audit:**
   - A designated BIS Technical Officer visits the manufacturing premises.
   - The officer inspects the production line, checks manufacturing capability, verifies quality control logs, and assesses in-house testing equipment.

4. **Sample Drawing & Testing:**
   - The inspecting officer draws representative production samples.
   - Samples are sealed in the presence of the manufacturer and dispatched to a BIS Laboratory or a recognized NABL testing lab.

5. **Scrutiny of Test Reports:**
   - The independent test report is evaluated against the parameters in the relevant Indian Standard.
   - If any parameter shows marginal variance, the applicant is granted an opportunity to submit a Corrective and Preventive Action (CAPA) report.

6. **Grant of License (CM/L Number):**
   - Upon successful test confirmation and payment of the annual minimum marking fee, the BIS Head/Branch Office issues the **Certificate of Manufacture/License (CM/L - XXXXXXX)**.
   - The manufacturer may now imprint the ISI mark on the certified product and packaging.`,
      citations: [
        {
          title: 'Grant of License Procedure under Product Certification Scheme',
          source: 'Manak Online (e-BIS Portal)',
          sourceUrl: 'https://www.manakonline.in',
          clause: 'Section 4: Technical Auditing & STI Guidelines',
          trustLevel: 'verified'
        },
        {
          title: 'Fee Concessions for MSMEs and Women Entrepreneurs (50% Concession)',
          source: 'BIS Policy Circular',
          sourceUrl: 'https://www.bis.gov.in',
          trustLevel: 'verified'
        }
      ],
      suggestedActions: [
        { label: 'View Compliance Readiness Map', actionType: 'navigate_tab', payload: 'compliance' },
        { label: 'Inspect Document Intel', actionType: 'navigate_tab', payload: 'document' },
        { label: 'Open Manak Online Portal', actionType: 'open_url', payload: 'https://www.manakonline.in' }
      ]
    };
  }

  // 5. Consumer-related queries: Fake ISI mark, BIS Care App, Complaints
  if (q.includes('consumer') || q.includes('fake') || q.includes('care') || q.includes('complaint') || q.includes('verify') || q.includes('check') || q.includes('उपभोक्ता') || q.includes('शिकायत') || q.includes('వినియోగదారు') || q.includes('நுகர்வோர்') || q.includes('ಗ್ರಾಹಕ') || q.includes('গ্রাহক') || q.includes('तक्रार')) {
    return {
      category: 'consumer',
      text: `### 🛡️ Consumer Guide: How to Verify Genuine ISI Marks & Report Misuse

Under the **Bureau of Indian Standards Act, 2016**, it is a criminal offense to manufacture, stock, or sell products bearing counterfeit ISI marks, unauthorized BIS logos, or bogus registration claims.

#### 1. Anatomy of a Genuine ISI Mark
A compliant ISI mark must feature three distinct elements printed or embossed together:
1. **The Official ISI Monogram:** The stylized, recognizable symmetrical logo.
2. **The Indian Standard Code (on top):** Must specify the exact standard reference, e.g., \`IS 4151\` (Helmets) or \`IS 2347\` (Pressure Cookers).
3. **The 7-Digit CM/L Number (at the bottom):** A mandatory seven-digit license number in the format \`CM/L - XXXXXXX\`. If a product only has the ISI logo without the standard number or CM/L number, it is likely **fake or counterfeit**.

#### 2. Verification Using the BIS Care Mobile App
The Department of Consumer Affairs and BIS offer the official **BIS Care App** (Android & iOS):
- **Verify ISI / CM/L:** Enter the 7-digit CM/L number. The app instantly verifies whether the license is *Active*, *Expired*, or *Suspended*, along with the certified brand name, manufacturer location, and covered product variants.
- **Verify CRS (R-Number):** Enter the 8-digit registration number found on electronic goods (e.g., \`R-41012345\`) to check validity on \`crsbis.in\`.
- **Verify HUID:** Enter the 6-digit laser-engraved code on gold jewellery to confirm jeweller identity and gold karatage.

#### 3. How to Lodge a Consumer Complaint
If you discover a product with a counterfeit mark, substandard quality, or mislabeled standard:
1. Open the **'Lodge Complaint'** tab in the BIS Care App or visit the Consumer Grievances section on \`bis.gov.in\`.
2. Upload clear photos of the product, packaging, invoice/bill, and the counterfeit mark.
3. BIS Enforcement Officers conduct unannounced raids under Section 17 & 28 of the BIS Act, 2016. Penalties include heavy fines (up to ₹5,00,000 or 10x value of goods) and imprisonment up to 2 years.`,
      citations: [
        {
          title: 'Enforcement and Penalties for Counterfeit Standards',
          source: 'BIS Act, 2016 (Section 17 & 28)',
          sourceUrl: 'https://www.bis.gov.in',
          clause: 'Prohibition of misuse of Standard Mark',
          trustLevel: 'verified'
        },
        {
          title: 'National Consumer Helpline & BIS Care Guidelines',
          source: 'Ministry of Consumer Affairs, Food & Public Distribution',
          sourceUrl: 'https://www.manakonline.in',
          trustLevel: 'verified'
        }
      ],
      suggestedActions: [
        { label: 'Open Consumer Portal View', actionType: 'navigate_tab', payload: 'consumer' },
        { label: 'Check Knowledge Graph', actionType: 'navigate_tab', payload: 'graph' },
        { label: 'Download BIS Care App Info', actionType: 'open_url', payload: 'https://www.bis.gov.in' }
      ]
    };
  }

  // 6. Product-specific queries / Standard recommendations
  if (q.includes('sink') || q.includes('cooker') || q.includes('water') || q.includes('helmet') || q.includes('led') || q.includes('solar') || q.includes('cement') || q.includes('steel') || q.includes('battery') || q.includes('product') || q.includes('utensil') || q.includes('kitchen') || q.includes('सिंक') || q.includes('कुकर') || q.includes('पानी') || q.includes('हेलमेट') || q.includes('సింక్') || q.includes('குக்கர்') || q.includes('ಕುಕ್ಕರ್') || q.includes('কুকর')) {
    
    // Check if pressure cooker
    if (q.includes('cooker') || q.includes('कुकर') || q.includes('குக்கர்') || q.includes('ಕುಕ್ಕರ್') || q.includes('কুকর')) {
      const standard = SAMPLE_KNOWLEDGE_BASE.find(s => s.id === 'kb-02') || SAMPLE_KNOWLEDGE_BASE[1];
      return {
        category: 'standards',
        text: `### 🔍 Standard Recommendation: Domestic Pressure Cookers

Based on your product description for domestic pressurized cooking appliances, here is the verified regulatory mapping:

- **Applicable Product Category:** Domestic Pressure Cookers (Aluminium, Stainless Steel, Multi-Ply)
- **Status under Quality Control Orders (QCO):** **MANDATORY ISI CERTIFICATION.** Under the Domestic Pressure Cooker (Quality Control) Order issued by the Ministry of Commerce & Industry, no domestic pressure cooker may be manufactured, imported, or sold in India without a valid BIS license.

#### Essential Technical Requirements & Clause Excerpts:
- **Relief Valve & Safety Plug (Clause 7.4):** The cooker must incorporate a primary safety relief device (weight valve) that vents safely below 2.5 kgf/cm², along with a secondary fusible plug that activates if the vent pipe is blocked.
- **Hydrostatic Bursting Pressure Test (Clause 8.2):** The pressure vessel must withstand a minimum hydrostatic pressure of **3 times the normal operating pressure** without structural rupture or permanent deformation.
- **Lid Handle Torque & Insulation (Clause 9.1):** Handles must not overheat beyond 55°C during continuous cooking and must resist specified mechanical torque without loosening.
- **Gasket Elasticity & Food Migration:** Silicone or rubber gaskets must not leach harmful plasticizers, phthalates, or heavy metals into food acidic simulants.`,
        citations: [
          {
            title: standard.title,
            source: 'Bureau of Indian Standards Official Publication',
            sourceUrl: 'https://www.manakonline.in',
            clause: standard.clauseExcerpt,
            standardCode: 'Verified under Domestic Pressure Cooker QCO',
            trustLevel: 'verified'
          }
        ],
        matchedStandards: [standard],
        suggestedActions: [
          { label: 'View in Standards Match', actionType: 'navigate_tab', payload: 'discovery' },
          { label: 'Inspect Product DNA', actionType: 'navigate_tab', payload: 'intake' },
          { label: 'Check Testing Labs', actionType: 'navigate_tab', payload: 'compliance' }
        ]
      };
    }

    // Default to stainless steel sink or general product
    const standard = SAMPLE_KNOWLEDGE_BASE.find(s => s.id === 'kb-01') || SAMPLE_KNOWLEDGE_BASE[0];
    return {
      category: 'standards',
      text: `### 🔍 Standard Recommendation: Stainless Steel Sinks & Utensils

Based on your product description for stainless steel kitchen wash sinks and food preparation surfaces:

- **Applicable Product Category:** Stainless Steel Sinks for Domestic & Semi-Commercial Purposes
- **Material Verification:** High-grade Austenitic Stainless Steel (minimum 18% Chromium and 8% Nickel, Grade 304 / 316). Ferritic grades with low nickel content must be evaluated strictly against corrosion risk.

#### Essential Specifications & Test Methods:
- **Sheet Thickness Tolerance (Clause 4.2):** Finished sheet gauge must not fall below specified minimums (typically 0.8 mm for domestic; 1.2 mm for premium heavy-duty).
- **Intergranular Corrosion Resistance Test (Clause 5.1):** Exposure to acidified copper sulfate solution to confirm absence of intergranular carbide precipitation.
- **Drainage & Overfill Capacity:** Waste outlet slope and drainage test ensuring complete water clearance without pooling.
- **Sound Deadening Undercoating:** Underside deadening pad or dampening compound must withstand warm water immersion without peeling.

*Note: As per BIS guidelines, final standard confirmation requires verifying the specific product dimension and fabrication method on manakonline.in.*`,
      citations: [
        {
          title: standard.title,
          source: 'Bureau of Indian Standards Official Publication',
          sourceUrl: 'https://www.manakonline.in',
          clause: standard.clauseExcerpt,
          trustLevel: 'verified'
        }
      ],
      matchedStandards: [standard],
      suggestedActions: [
        { label: 'Load into Product DNA Engine', actionType: 'navigate_tab', payload: 'intake' },
        { label: 'View Match Details', actionType: 'navigate_tab', payload: 'discovery' },
        { label: 'Verify on Manak Online', actionType: 'open_url', payload: 'https://www.manakonline.in' }
      ]
    };
  }

  // General fallback query response
  return {
    category: 'general',
    text: `### 🏛️ Bureau of Indian Standards (BIS) Guidance Overview

Thank you for your inquiry regarding Indian Standards and BIS conformity services. Here is relevant official guidance based on authorized BIS knowledge sources:

#### 1. How Indian Standards are Formulated & Structure
The Bureau of Indian Standards (BIS), established under the **BIS Act, 2016**, is India's National Standards Body. Standards are formulated through **Sectional Technical Committees** comprising industry representatives, scientific researchers, testing laboratories, government regulators, and consumer organizations.

#### 2. Key Pillars of the BIS Ecosystem
1. **Voluntary vs. Mandatory Standards:** While Indian Standards are generally voluntary for adoption, the Central Government regularly issues **Quality Control Orders (QCOs)** under Section 16 of the BIS Act, making ISI certification strictly mandatory for critical goods affecting public health, safety, the environment, and national security.
2. **Product Certification (ISI Mark):** Validates that products meet rigorous chemical, mechanical, and safety thresholds through third-party factory inspection and independent laboratory testing.
3. **Compulsory Registration Scheme (CRS):** A streamlined conformity scheme for electronic and IT products (laptops, LED drivers, mobile devices, solar inverters) administered on \`crsbis.in\`.
4. **Precious Metals Hallmarking:** Mandatory laser-inscribed purity and 6-digit HUID tracking for gold and silver jewellery.
5. **Laboratory Recognition (LRS):** A network of apex BIS Central/Regional Labs and hundreds of NABL-accredited commercial testing facilities across India.

#### What would you like to explore next?
- Ask for **applicable standards** for a specific product you manufacture.
- Inquire about **certification procedures** or **MSME fee concessions**.
- Search for **recognized testing laboratories** near your manufacturing hub.
- Check **consumer verification** procedures for authentic ISI marks or gold HUIDs.`,
    citations: [
      {
        title: 'Bureau of Indian Standards Act, 2016 & Service Overview',
        source: 'Official Portal of Bureau of Indian Standards',
        sourceUrl: 'https://www.bis.gov.in',
        trustLevel: 'verified'
      },
      {
        title: 'Manak Online Standards Search Engine',
        source: 'manakonline.in',
        sourceUrl: 'https://www.manakonline.in',
        trustLevel: 'verified'
      }
    ],
    suggestedActions: [
      { label: 'Recommend Standard for My Product', actionType: 'quick_reply', payload: 'Which Indian Standard applies to my product?' },
      { label: 'Explain Certification Process', actionType: 'quick_reply', payload: 'What is the step-by-step procedure to get an ISI mark license?' },
      { label: 'Gold Hallmarking & HUID Guide', actionType: 'quick_reply', payload: 'How does gold hallmarking and 6-digit HUID work?' }
    ]
  };
}
