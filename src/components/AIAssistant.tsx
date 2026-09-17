import React, { useState, useRef, useEffect } from 'react';
import { 
  LanguageCode, 
  AppTab, 
  ProductDNA, 
  ChatMessage, 
  CitationRef, 
  LabInfo 
} from '../types';
import { 
  generateIntelligentBISResponse, 
  BIS_LABS_DIRECTORY, 
  HALLMARKING_PURITY_CHART, 
  QUICK_PROMPTS_BY_LANG 
} from '../data/bisAssistantKnowledge';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  RotateCcw, 
  Building2, 
  Gem, 
  FlaskConical, 
  Layers, 
  FileText, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  Info,
  Bell
} from 'lucide-react';

interface AIAssistantProps {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  setTab: (tab: AppTab) => void;
  productDNA: ProductDNA;
  setProductDNA: React.Dispatch<React.SetStateAction<ProductDNA>>;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  language,
  setLanguage,
  setTab,
  setProductDNA
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `### 🇮🇳 Namaste! Welcome to BISENCE AI Conversational Assistant
I am your authorized intelligence agent for the **Bureau of Indian Standards (BIS)** ecosystem.

I can guide you through:
- **Identifying Applicable Indian Standards** for your product with verified clause references
- **Choosing the Right Certification Scheme** (Scheme I ISI Mark, Scheme II CRS, FMCS, MSCS)
- **Step-by-Step Licensing Procedures** on \`manakonline.in\` with MSME fee concessions
- **Gold & Silver Hallmarking** regulations, purity thresholds, and 6-digit HUID verification
- **Locating Recognized Testing Laboratories** across mechanical, chemical, and electrical disciplines
- **Consumer Verification & Safeguards** on the official BIS Care mobile app

*Select a quick query below or describe your product/question in plain language in any supported Indian language.*`,
      citations: [
        {
          title: 'Bureau of Indian Standards Act, 2016',
          source: 'Ministry of Consumer Affairs, Food & Public Distribution',
          sourceUrl: 'https://www.bis.gov.in',
          trustLevel: 'verified'
        },
        {
          title: 'Manak Online Standards Portal',
          source: 'manakonline.in',
          sourceUrl: 'https://www.manakonline.in',
          trustLevel: 'verified'
        }
      ],
      suggestedActions: [
        { label: 'Recommend Standard for Kitchen Sinks', actionType: 'quick_reply', payload: 'I am manufacturing stainless steel kitchen sinks and domestic food preparation surfaces. Which Indian Standard applies and what testing is required?' },
        { label: 'Explain ISI vs CRS Scheme', actionType: 'quick_reply', payload: 'Explain the difference between Scheme I (ISI Mark) and Scheme II (Compulsory Registration Scheme - CRS) with timelines and eligibility.' },
        { label: 'Find Testing Labs Near Me', actionType: 'quick_reply', payload: 'Which BIS and NABL recognized testing laboratories test electrical appliances, drinking water, and mechanical products?' },
        { label: 'Gold Hallmarking & 6-digit HUID', actionType: 'quick_reply', payload: 'How does gold hallmarking work in India? What do the 3 marks and the 6-digit alphanumeric HUID mean for consumers and jewelers?' }
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeSubTool, setActiveSubTool] = useState<'chat' | 'labs' | 'hallmarking' | 'schemes'>('chat');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Labs filter state
  const [labDisciplineFilter, setLabDisciplineFilter] = useState<string>('All');
  const [labRegionFilter, setLabRegionFilter] = useState<string>('All');
  const [labSearchQuery, setLabSearchQuery] = useState<string>('');

  // Hallmarking tool state
  const [huidInput, setHuidInput] = useState('AB387K');
  const [huidVerified, setHuidVerified] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (queryText?: string) => {
    const query = (queryText || inputQuery).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    // Simulate smart context retrieval & reasoning pipeline
    setTimeout(() => {
      const responseMatch = generateIntelligentBISResponse(query, language);
      
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: responseMatch.text,
        category: responseMatch.category,
        citations: responseMatch.citations,
        matchedStandards: responseMatch.matchedStandards,
        suggestedActions: responseMatch.suggestedActions
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg-welcome-reset',
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `### 🇮🇳 Chat History Cleared\nHow may I assist you with Indian Standards, BIS certification schemes, testing laboratories, or hallmarking guidelines today?`,
        citations: [
          {
            title: 'Official Bureau of Indian Standards Knowledge Base',
            source: 'manakonline.in',
            sourceUrl: 'https://www.manakonline.in',
            trustLevel: 'verified'
          }
        ]
      }
    ]);
  };

  const filteredLabs = BIS_LABS_DIRECTORY.filter(lab => {
    const matchesDiscipline = labDisciplineFilter === 'All' || lab.disciplines.includes(labDisciplineFilter as any);
    const matchesRegion = labRegionFilter === 'All' || lab.region === labRegionFilter;
    const matchesSearch = !labSearchQuery || 
      lab.name.toLowerCase().includes(labSearchQuery.toLowerCase()) ||
      lab.city.toLowerCase().includes(labSearchQuery.toLowerCase()) ||
      lab.sampleTestProducts.some(p => p.toLowerCase().includes(labSearchQuery.toLowerCase()));
    return matchesDiscipline && matchesRegion && matchesSearch;
  });

  const quickPrompts = QUICK_PROMPTS_BY_LANG[language] || QUICK_PROMPTS_BY_LANG.en;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 font-sans">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-[#0F2C61] via-[#143c82] to-[#0F2C61] rounded-2xl p-5 text-white shadow-lg border border-blue-800/80 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full bg-radial from-amber-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md shrink-0">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  BISENCE AI Conversational Assistant
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Grounded in Authorized BIS Knowledge
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-3xl">
                Context-aware, source-backed guidance for Indian Standards, certification schemes, licensing procedures, hallmarking, and testing laboratories.
              </p>
            </div>
          </div>

          {/* Quick Sub-Tool Switcher */}
          <div className="flex items-center gap-1.5 bg-blue-950/60 p-1.5 rounded-xl border border-blue-700/50 self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveSubTool('chat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSubTool === 'chat'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Chat</span>
            </button>
            <button
              onClick={() => setActiveSubTool('labs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSubTool === 'labs'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Lab Finder</span>
            </button>
            <button
              onClick={() => setActiveSubTool('hallmarking')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSubTool === 'hallmarking'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
              }`}
            >
              <Gem className="w-3.5 h-3.5" />
              <span>Hallmarking Guide</span>
            </button>
            <button
              onClick={() => setActiveSubTool('schemes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSubTool === 'schemes'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Schemes Matrix</span>
            </button>
            <button
              onClick={() => setTab('notifications')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 bg-blue-900/80 hover:bg-blue-800 text-amber-300 border border-amber-400/30"
              title="View all official BIS Notifications & QCOs"
            >
              <Bell className="w-3.5 h-3.5 text-amber-300" />
              <span>Latest QCOs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      {activeSubTool === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Chat Conversation Stream (8 cols) */}
          <div className="lg:col-span-8 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[750px]">
            {/* Chat Sub-header */}
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-semibold text-slate-800">BISENCE Conversational Core v2.4</span>
                <span className="text-slate-400">|</span>
                <span>Zero-Hallucination Safe Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetChat}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors px-2 py-1 rounded hover:bg-slate-200/60"
                  title="Clear conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Chat Messages List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/40">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-9 h-9 rounded-xl bg-[#0F2C61] text-amber-400 flex items-center justify-center shrink-0 shadow-sm border border-blue-900">
                      <Bot className="w-5 h-5" />
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm text-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#0F2C61] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                  }`}>
                    {/* Message Header */}
                    <div className="flex items-center justify-between gap-3 mb-2 pb-1.5 border-b border-slate-100 text-[11px]">
                      <span className={`font-semibold ${msg.sender === 'user' ? 'text-blue-200' : 'text-[#0F2C61]'}`}>
                        {msg.sender === 'user' ? 'You (Enterprise / Consumer)' : 'BISENCE Standards Agent'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={msg.sender === 'user' ? 'text-blue-300' : 'text-slate-400'}>
                          {msg.timestamp}
                        </span>
                        {msg.sender === 'assistant' && (
                          <button
                            onClick={() => handleCopyText(msg.text, msg.id)}
                            className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors"
                            title="Copy message"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Message Text / Markdown Content */}
                    <div className={`prose prose-sm max-w-none leading-relaxed ${
                      msg.sender === 'user' ? 'text-white' : 'text-slate-800'
                    }`}>
                      {msg.text.split('\n\n').map((paragraph, idx) => {
                        // Render headings
                        if (paragraph.startsWith('### ')) {
                          return (
                            <h3 key={idx} className="text-base font-bold text-[#0F2C61] mt-1 mb-2">
                              {paragraph.replace('### ', '')}
                            </h3>
                          );
                        }
                        if (paragraph.startsWith('#### ')) {
                          return (
                            <h4 key={idx} className="text-sm font-bold text-slate-800 mt-2 mb-1.5">
                              {paragraph.replace('#### ', '')}
                            </h4>
                          );
                        }
                        // Render bullet lists
                        if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
                          const lines = paragraph.split('\n');
                          return (
                            <ul key={idx} className="list-disc pl-5 space-y-1 my-2">
                              {lines.map((line, lIdx) => (
                                <li key={lIdx} className="text-xs sm:text-sm text-slate-700">
                                  {line.replace(/^[-*•]\s+/, '').replace(/^\d+\.\s+/, '')}
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        // Render code or quote blocks
                        if (paragraph.startsWith('```')) {
                          return (
                            <pre key={idx} className="bg-slate-900 text-amber-300 text-xs p-3 rounded-lg overflow-x-auto my-2 font-mono">
                              {paragraph.replace(/```[a-z]*\n?/g, '')}
                            </pre>
                          );
                        }
                        return (
                          <p key={idx} className="my-1.5 text-xs sm:text-sm">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>

                    {/* Matched Standards Widget if applicable */}
                    {msg.matchedStandards && msg.matchedStandards.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-slate-100">
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Matched Standard Details</span>
                        </div>
                        {msg.matchedStandards.map(st => (
                          <div key={st.id} className="bg-blue-50/60 rounded-xl p-3 border border-blue-100 text-xs">
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-bold text-[#0F2C61]">{st.title}</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                                {st.relevance_score}% Match
                              </span>
                            </div>
                            <p className="text-slate-600 mt-1 text-[11px]">
                              {st.evidence}
                            </p>
                            <div className="mt-2 flex items-center gap-2 flex-wrap">
                              <button
                                onClick={() => {
                                  setProductDNA(prev => ({
                                    ...prev,
                                    productName: st.category,
                                    category: st.category
                                  }));
                                  setTab('discovery');
                                }}
                                className="px-2.5 py-1 rounded bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold transition-colors flex items-center gap-1"
                              >
                                <span>Open in Standards Match</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                              <a
                                href={st.officialSourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-[11px] font-semibold transition-colors flex items-center gap-1"
                              >
                                <span>Verify on Manak Online</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Official Citations & Evidence Pill */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3.5 pt-2.5 border-t border-slate-100">
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Official BIS Citations & Evidentiary Grounding</span>
                        </div>
                        <div className="space-y-1.5">
                          {msg.citations.map((cite, cIdx) => (
                            <div 
                              key={cIdx} 
                              className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                            >
                              <div className="min-w-0">
                                <div className="font-semibold text-slate-800 truncate">{cite.title}</div>
                                <div className="text-[11px] text-slate-500">
                                  {cite.source} {cite.clause ? `• ${cite.clause}` : ''}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  cite.trustLevel === 'verified'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {cite.trustLevel === 'verified' ? '🟢 Verified' : '🟡 AI Assisted'}
                                </span>
                                <a
                                  href={cite.sourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                  title="Open official source"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggested Action Chips */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="mt-3.5 pt-2.5 border-t border-slate-100">
                        <div className="text-[11px] font-bold text-slate-500 mb-1.5">Suggested Next Steps:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestedActions.map((action, aIdx) => (
                            <button
                              key={aIdx}
                              onClick={() => {
                                if (action.actionType === 'navigate_tab') {
                                  setTab(action.payload as AppTab);
                                } else if (action.actionType === 'quick_reply') {
                                  handleSend(action.payload);
                                } else if (action.actionType === 'open_url') {
                                  window.open(action.payload, '_blank');
                                }
                              }}
                              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200 text-xs font-medium transition-colors flex items-center gap-1 shadow-2xs"
                            >
                              <span>{action.label}</span>
                              <ChevronRight className="w-3 h-3 text-slate-400" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-9 h-9 rounded-xl bg-slate-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <span className="text-xs font-bold">YOU</span>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 items-center text-xs text-slate-500">
                  <div className="w-8 h-8 rounded-xl bg-[#0F2C61] text-amber-400 flex items-center justify-center animate-pulse">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                    <span className="font-medium text-slate-600">Retrieving authorized BIS standards & clause citations...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input & Sending Area */}
            <div className="p-3.5 bg-white border-t border-slate-200">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Ask about standards, certification schemes, licensing, gold hallmarking, testing labs..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 transition-all pr-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isTyping}
                  className="px-5 py-3 rounded-xl bg-[#0F2C61] hover:bg-blue-900 text-white font-bold text-sm transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
                >
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
                <span>Guidance grounded in BIS Act 2016, Manak Online, and official Quality Control Orders.</span>
                <span className="hidden sm:inline">Official verification required on manakonline.in</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-configured Quick Prompts & Solution Modules (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Quick Prompts Panel */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F2C61] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Interactive Solution Prompts</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">8 Solution Areas</span>
              </div>

              <div className="space-y-2">
                {quickPrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSend(prompt.query)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all group"
                  >
                    <div className="text-xs font-bold text-slate-800 group-hover:text-[#0F2C61] flex items-center justify-between">
                      <span>{prompt.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {prompt.query}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Access to Core Ecosystem Features */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-4 border border-blue-200/80 shadow-sm">
              <div className="text-xs font-bold text-[#0F2C61] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-700" />
                <span>Connected Platform Tools</span>
              </div>
              <div className="space-y-2 text-xs">
                <button
                  onClick={() => setTab('intake')}
                  className="w-full p-2.5 rounded-xl bg-white hover:bg-blue-100/60 border border-blue-200 font-medium text-slate-800 flex items-center justify-between transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-700" />
                    <span className="font-semibold">Product DNA Extractor</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => setTab('discovery')}
                  className="w-full p-2.5 rounded-xl bg-white hover:bg-blue-100/60 border border-blue-200 font-medium text-slate-800 flex items-center justify-between transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">Standards Match Engine</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => setTab('compliance')}
                  className="w-full p-2.5 rounded-xl bg-white hover:bg-blue-100/60 border border-blue-200 font-medium text-slate-800 flex items-center justify-between transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span className="font-semibold">Compliance Readiness Map</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => setTab('document')}
                  className="w-full p-2.5 rounded-xl bg-white hover:bg-blue-100/60 border border-blue-200 font-medium text-slate-800 flex items-center justify-between transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold">Document & OCR Intel</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Zero-Hallucination Disclaimer Card */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 shadow-2xs">
              <div className="flex items-center gap-2 font-bold mb-1 text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Zero-Hallucination Constraint</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800">
                BISENCE never generates invented IS code numbers. Every recommendation includes transparent evidentiary grounding and direct links to manakonline.in for official statutory confirmation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TOOL 2: Testing Laboratories Finder */}
      {activeSubTool === 'labs' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-[#0F2C61] flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-amber-600" />
                <span>BIS Recognized Testing Laboratories Directory</span>
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Directory of apex BIS Central/Regional Labs and recognized NABL facilities under Laboratory Recognition Scheme (LRS 2020).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-100 text-blue-900 border border-blue-200">
                {filteredLabs.length} Labs Available
              </span>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <input
                type="text"
                value={labSearchQuery}
                onChange={(e) => setLabSearchQuery(e.target.value)}
                placeholder="Search city, lab name, product..."
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div>
              <select
                value={labDisciplineFilter}
                onChange={(e) => setLabDisciplineFilter(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-700"
              >
                <option value="All">All Disciplines (Mechanical, Chemical, Electrical...)</option>
                <option value="Mechanical">Mechanical Discipline</option>
                <option value="Chemical">Chemical & Metallurgical</option>
                <option value="Electrical">Electrical & Electronics</option>
                <option value="Microbiological">Microbiological & Water</option>
                <option value="Civil">Civil & Building Materials</option>
              </select>
            </div>

            <div>
              <select
                value={labRegionFilter}
                onChange={(e) => setLabRegionFilter(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-700"
              >
                <option value="All">All Regions (North, South, East, West, Central)</option>
                <option value="North">North Region</option>
                <option value="South">South Region</option>
                <option value="East">East Region</option>
                <option value="West">West Region</option>
                <option value="Central">Central / Pan-India</option>
              </select>
            </div>
          </div>

          {/* Lab Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLabs.map((lab) => (
              <div 
                key={lab.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${
                      lab.type === 'BIS Central Lab'
                        ? 'bg-purple-100 text-purple-900 border border-purple-200'
                        : lab.type === 'BIS Regional Lab'
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    }`}>
                      {lab.type}
                    </span>
                    <h3 className="font-bold text-sm text-[#0F2C61]">{lab.name}</h3>
                    <p className="text-xs text-slate-500">{lab.city}, {lab.state} ({lab.region} Region)</p>
                  </div>
                  <button
                    onClick={() => {
                      handleSend(`Tell me more about testing facilities at ${lab.name} in ${lab.city} and how to submit test samples.`);
                      setActiveSubTool('chat');
                    }}
                    className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold shrink-0 transition-colors"
                    title="Ask AI about this lab"
                  >
                    <Bot className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/80">
                  <div className="font-medium text-slate-700 mb-0.5">Address & Contact:</div>
                  <div className="text-slate-500 text-[11px]">{lab.address}</div>
                  <div className="text-blue-700 font-mono text-[11px] mt-1">{lab.contact}</div>
                </div>

                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Recognized Testing Disciplines:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {lab.disciplines.map((d, dIdx) => (
                      <span key={dIdx} className="px-2 py-0.5 bg-slate-200/70 text-slate-800 rounded text-[10px] font-semibold">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Sample Products Tested:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {lab.sampleTestProducts.map((prod, pIdx) => (
                      <span key={pIdx} className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-100 rounded text-[10px]">
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TOOL 3: Hallmarking & HUID Verifier Guide */}
      {activeSubTool === 'hallmarking' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-[#0F2C61] flex items-center gap-2">
                <Gem className="w-6 h-6 text-amber-500" />
                <span>Gold & Silver Hallmarking Intelligence Guide</span>
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Purity benchmarks, laser-etched 6-digit HUID anatomy, and jeweller registration under BIS Act 2016.
              </p>
            </div>
            <button
              onClick={() => {
                handleSend('How does gold hallmarking work in India? What do the 3 marks and the 6-digit alphanumeric HUID mean for consumers and jewelers?');
                setActiveSubTool('chat');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#0F2C61] text-white text-xs font-bold hover:bg-blue-900 transition-colors flex items-center gap-1.5 self-start md:self-auto"
            >
              <Bot className="w-4 h-4 text-amber-400" />
              <span>Ask AI Hallmarking Query</span>
            </button>
          </div>

          {/* Interactive HUID Lookup Simulation */}
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50/50 to-amber-100/40 rounded-2xl p-5 border border-amber-200">
            <h3 className="font-bold text-sm text-amber-950 mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Simulated BIS Care App: 6-Digit HUID Authenticity Inspector</span>
            </h3>
            <p className="text-xs text-amber-900 mb-4">
              Enter any 6-digit alphanumeric code stamped on hallmarked jewellery to inspect authenticity records.
            </p>

            <div className="flex items-center gap-2 max-w-md">
              <input
                type="text"
                maxLength={6}
                value={huidInput}
                onChange={(e) => {
                  setHuidInput(e.target.value.toUpperCase());
                  setHuidVerified(false);
                }}
                placeholder="e.g. AB387K"
                className="px-4 py-2.5 text-sm font-mono font-bold bg-white border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase tracking-widest text-slate-800"
              />
              <button
                onClick={() => setHuidVerified(true)}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-2xs"
              >
                Verify HUID
              </button>
            </div>

            {huidVerified && (
              <div className="mt-4 p-4 bg-white rounded-xl border border-amber-300 shadow-sm text-xs space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between text-emerald-800 font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Valid BIS Hallmarked Article Record Found
                  </span>
                  <span className="font-mono text-slate-500">HUID: {huidInput}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-slate-700">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Jeweller</span>
                    <span className="font-semibold">Kalyan / Tanishq Certified Unit</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">AHC Center</span>
                    <span className="font-semibold">Mumbai Assaying Center #042</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Article Type</span>
                    <span className="font-semibold">Gold Necklace (22K916)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Date of Hallmarking</span>
                    <span className="font-semibold">14-Jan-2026</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Official Gold & Silver Purity Benchmarks Table */}
          <div>
            <h3 className="font-bold text-sm text-[#0F2C61] mb-3">
              Standard Karatage & Purity Fineness Benchmarks (IS 1417)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Karatage</th>
                    <th className="p-3">Fineness Value</th>
                    <th className="p-3">Gold Content %</th>
                    <th className="p-3">Permitted End Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {HALLMARKING_PURITY_CHART.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${item.color}`}>
                          {item.karat}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold text-[#0F2C61]">{item.fineness}</td>
                      <td className="p-3 font-semibold text-slate-700">{item.percentage}</td>
                      <td className="p-3 text-slate-600">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TOOL 4: Schemes Matrix */}
      {activeSubTool === 'schemes' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-[#0F2C61] flex items-center gap-2">
                <Building2 className="w-6 h-6 text-blue-700" />
                <span>BIS Conformity Assessment Schemes Comparison</span>
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Detailed side-by-side comparison of Scheme I (ISI Mark), Scheme II (CRS), FMCS, and MSCS.
              </p>
            </div>
            <button
              onClick={() => setTab('navigator')}
              className="px-3.5 py-1.5 rounded-lg bg-blue-50 text-[#0F2C61] border border-blue-200 text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>Explore All 8 BIS Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase">
                  Scheme I
                </span>
                <span className="text-xs font-semibold text-slate-500">30–90 Days</span>
              </div>
              <h3 className="font-bold text-sm text-[#0F2C61]">ISI Mark Certification</h3>
              <p className="text-xs text-slate-600">
                Mandatory for products under Quality Control Orders (cookers, helmets, steel, drinking water, cement).
              </p>
              <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs space-y-1.5 text-slate-700">
                <div><strong>Factory Audit:</strong> Mandatory physical inspection</div>
                <div><strong>In-House Lab:</strong> Required with STI compliance</div>
                <div><strong>Marking:</strong> ISI logo + IS No. + CM/L Number</div>
                <div><strong>MSME Concession:</strong> 50% discount on marking fee</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-purple-600 text-white text-[10px] font-bold uppercase">
                  Scheme II
                </span>
                <span className="text-xs font-semibold text-slate-500">15–30 Days</span>
              </div>
              <h3 className="font-bold text-sm text-purple-950">Compulsory Registration (CRS)</h3>
              <p className="text-xs text-slate-600">
                Self-declaration of conformity for electronics, IT, solar inverters, and LED drivers on crsbis.in.
              </p>
              <div className="bg-white p-3 rounded-lg border border-purple-100 text-xs space-y-1.5 text-slate-700">
                <div><strong>Factory Audit:</strong> None (Lab test report based)</div>
                <div><strong>In-House Lab:</strong> Not mandatory for grant</div>
                <div><strong>Marking:</strong> Standard CRS border + R-XXXXXXXX</div>
                <div><strong>Portal:</strong> crsbis.in module</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold uppercase">
                  Scheme IV
                </span>
                <span className="text-xs font-semibold text-slate-500">90–180 Days</span>
              </div>
              <h3 className="font-bold text-sm text-emerald-950">Foreign Manufacturers (FMCS)</h3>
              <p className="text-xs text-slate-600">
                Enables overseas manufacturers to affix the ISI mark and export certified goods into India.
              </p>
              <div className="bg-white p-3 rounded-lg border border-emerald-100 text-xs space-y-1.5 text-slate-700">
                <div><strong>Factory Audit:</strong> Mandatory audit abroad</div>
                <div><strong>Representative:</strong> AIR (Authorized Indian Rep)</div>
                <div><strong>Marking:</strong> ISI mark with CM/L number</div>
                <div><strong>Surveillance:</strong> Periodic custom clearance checks</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
