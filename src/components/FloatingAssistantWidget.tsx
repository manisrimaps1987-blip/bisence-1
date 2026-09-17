import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Maximize2, Send, Sparkles, ExternalLink, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { AppTab, LanguageCode, ChatMessage } from '../types';
import { generateIntelligentBISResponse, QUICK_PROMPTS_BY_LANG } from '../data/bisAssistantKnowledge';

interface FloatingAssistantWidgetProps {
  currentTab: AppTab;
  setTab: (tab: AppTab) => void;
  language: LanguageCode;
}

export const FloatingAssistantWidget: React.FC<FloatingAssistantWidgetProps> = ({
  currentTab,
  setTab,
  language
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'float-welcome',
      sender: 'assistant',
      timestamp: 'Now',
      text: `Namaste! I am the **BISENCE Conversational Agent**. Ask any question about Indian Standards, certification schemes, licensing, or testing laboratories!`,
      citations: [
        {
          title: 'Authorized BIS Standards Base',
          source: 'manakonline.in',
          sourceUrl: 'https://www.manakonline.in',
          trustLevel: 'verified'
        }
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Don't show floating button if already on assistant tab to avoid redundancy
  if (currentTab === 'assistant') {
    return null;
  }

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || input).trim();
    if (!q || isTyping) return;

    const userMsg: ChatMessage = {
      id: `f-u-${Date.now()}`,
      sender: 'user',
      timestamp: 'Now',
      text: q
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const resp = generateIntelligentBISResponse(q, language);
      const assistantMsg: ChatMessage = {
        id: `f-a-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Now',
        text: resp.text,
        category: resp.category,
        citations: resp.citations,
        suggestedActions: resp.suggestedActions
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 500);
  };

  const quickPrompts = QUICK_PROMPTS_BY_LANG[language] || QUICK_PROMPTS_BY_LANG.en;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#0F2C61] hover:bg-blue-900 text-white rounded-full shadow-2xl border-2 border-amber-400/80 hover:scale-105 transition-all duration-200"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          </div>
          <div className="text-left hidden sm:block pr-1">
            <div className="text-xs font-black tracking-wide leading-none text-white">
              Ask BISENCE AI
            </div>
            <div className="text-[10px] text-blue-200 leading-tight mt-0.5">
              Standards & Schemes Assistant
            </div>
          </div>
        </button>
      ) : (
        <div className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-blue-900/40 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#0F2C61] text-white p-3.5 flex items-center justify-between border-b border-blue-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span>BISENCE Conversational Agent</span>
                  <span className="text-[9px] px-1 py-0.2 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/40">Verified</span>
                </h3>
                <p className="text-[10px] text-blue-200">Grounded in BIS Act 2016 & Manak Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-blue-200">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setTab('assistant');
                }}
                className="p-1.5 hover:bg-blue-800 rounded-lg transition-colors text-blue-200 hover:text-white"
                title="Expand to Full Assistant View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-blue-800 rounded-lg transition-colors text-blue-200 hover:text-white"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-blue-50/70 px-3 py-2 border-b border-blue-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px] whitespace-nowrap">
            <span className="font-bold text-[#0F2C61] shrink-0 text-[10px] uppercase">Quick:</span>
            {quickPrompts.slice(0, 3).map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.query)}
                className="px-2 py-0.5 rounded-full bg-white hover:bg-blue-100/70 border border-blue-200 text-slate-700 text-[11px] transition-colors shrink-0"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-50/60 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-md bg-[#0F2C61] text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-xl p-3 shadow-2xs ${
                    m.sender === 'user'
                      ? 'bg-[#0F2C61] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <div className="leading-relaxed whitespace-pre-line">
                    {m.text.replace(/###\s?/g, '').replace(/####\s?/g, '')}
                  </div>

                  {m.citations && m.citations.length > 0 && (
                    <div className="mt-2 pt-1.5 border-t border-slate-100 text-[10px] text-slate-500">
                      <div className="font-bold text-slate-600 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-blue-600" />
                        <span>Official BIS Citation</span>
                      </div>
                      <div className="truncate text-blue-700">{m.citations[0].title}</div>
                    </div>
                  )}

                  {m.suggestedActions && m.suggestedActions.length > 0 && (
                    <div className="mt-2 pt-1.5 border-t border-slate-100 flex flex-wrap gap-1">
                      {m.suggestedActions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => {
                            if (act.actionType === 'navigate_tab') {
                              setIsOpen(false);
                              setTab(act.payload as AppTab);
                            } else if (act.actionType === 'quick_reply') {
                              handleSend(act.payload);
                            } else if (act.actionType === 'open_url') {
                              window.open(act.payload, '_blank');
                            }
                          }}
                          className="px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-50 text-slate-700 text-[10px] font-medium border border-slate-200 flex items-center gap-1"
                        >
                          <span>{act.label}</span>
                          <ChevronRight className="w-2.5 h-2.5 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-slate-500">
                <div className="w-6 h-6 rounded-md bg-[#0F2C61] text-amber-400 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-slate-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[11px]">Searching BIS standards...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-2.5 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-1.5"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about standards, ISI mark, labs, gold..."
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2 rounded-lg bg-[#0F2C61] hover:bg-blue-900 text-white transition-colors disabled:opacity-50 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 px-1">
              <span>Zero-hallucination engine</span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setTab('assistant');
                }}
                className="text-blue-600 font-semibold hover:underline flex items-center gap-0.5"
              >
                <span>Full Screen</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
