export type LanguageCode = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'bn' | 'mr';

export type AppTab = 
  | 'landing' 
  | 'assistant'
  | 'notifications'
  | 'intake' 
  | 'discovery' 
  | 'compliance' 
  | 'navigator' 
  | 'document' 
  | 'consumer' 
  | 'industry' 
  | 'graph' 
  | 'admin';

export interface BISNotification {
  id: string;
  noticeNumber: string;
  title: string;
  date: string;
  category: 'Quality Control Order (QCO)' | 'Standard Revision' | 'Draft Standard (Wide Circulation)' | 'Gazette Notification' | 'Hallmarking Directive' | 'Advisory & Guideline';
  ministryDepartment: string;
  applicableStandards: string[];
  effectiveDate: string;
  urgency: 'urgent' | 'important' | 'routine';
  isMandatory: boolean;
  summary: string;
  targetIndustry: string;
  sourcePortal: 'bis.gov.in' | 'manakonline.in' | 'crsbis.in' | 'egazette.gov.in';
  sourceUrl: string;
  pdfUrl?: string;
  affectedProducts: string[];
  tags: string[];
}

export interface CitationRef {
  title: string;
  source: string;
  sourceUrl: string;
  clause?: string;
  standardCode?: string;
  trustLevel: 'verified' | 'ai_assisted' | 'verification_required';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  citations?: CitationRef[];
  matchedStandards?: StandardResult[];
  suggestedActions?: {
    label: string;
    actionType: 'navigate_tab' | 'quick_reply' | 'open_url';
    payload: string;
  }[];
  category?: 'standards' | 'schemes' | 'process' | 'consumer' | 'hallmarking' | 'labs' | 'notifications' | 'general';
  isStreaming?: boolean;
}

export interface LabInfo {
  id: string;
  name: string;
  type: 'BIS Central Lab' | 'BIS Regional Lab' | 'BIS Branch Lab' | 'Recognized NABL Lab';
  city: string;
  state: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  disciplines: ('Mechanical' | 'Chemical' | 'Electrical' | 'Microbiological' | 'Civil')[];
  address: string;
  contact: string;
  sampleTestProducts: string[];
}

export interface ProductDNA {
  productName: string;
  category: string;
  intendedUse: string;
  material: string;
  targetUser: string;
  riskArea: string;
  industry: string;
  confidenceScore: number;
  detectedCharacteristics: string[];
  missingDetails: {
    key: string;
    label: string;
    placeholder: string;
    value: string;
  }[];
}

export interface StandardResult {
  id: string;
  title: string;
  standardReferenceNote: string;
  category: string;
  relevance_score: number;
  label: 'verified' | 'ai_assisted' | 'verification_required';
  why: string[];
  limitation: string;
  evidence: string;
  clauseExcerpt: string;
  testingRequirements: string[];
  officialSourceUrl: string;
}

export interface BISServiceOption {
  id: string;
  title: string;
  scheme: string;
  description: string;
  iconName: string;
  timeline: string;
  eligibility: string;
  link: string;
}

export interface UserAccount {
  name: string;
  organization: string;
  role: 'MSME Manufacturer' | 'Quality Manager' | 'Standards Consultant' | 'Consumer';
  email: string;
  udyamNumber?: string;
  isLoggedIn: boolean;
}
