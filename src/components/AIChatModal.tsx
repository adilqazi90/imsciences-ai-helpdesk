import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  ExternalLink, 
  Phone, 
  Mail, 
  MapPin, 
  Ticket, 
  RefreshCw,
  Clock,
  BookOpen,
  Info
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AIChatMessage, IntentType } from '../types';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledPrompt?: string;
  onOpenTicketFromHandoff: (subject: string, description: string, office: string) => void;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({
  isOpen,
  onClose,
  prefilledPrompt,
  onOpenTicketFromHandoff
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Welcome to the **IMSciences Peshawar AI University Helpdesk**.

I am your source-grounded assistant, strictly trained on verified official **IMSciences Peshawar** sources (website notices, admission portal, academic regulations, fee structures, and scholarship criteria).

How can I help you today? You can ask about:
- **Admissions & Programs:** Requirements for BSCS, BBA, MS, or PhD
- **Entrance Test:** When entrance test slips are issued & test instructions
- **Scholarships:** HEC Need Based, CMEEF KP, Institutional Merit & Rebates
- **Fees & Challans:** Approved payment banks, voucher generation & deadlines
- **Student Services:** Transcripts, attendance 75% rule, hostel, or transport`,
      timestamp: 'Just now',
      intent: 'GENERAL_FAQ'
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    'When will the entrance test slip be available?',
    'What are the admission requirements for BS Computer Science?',
    'What scholarships are available at IMSciences?',
    'How do I submit my semester fee?',
    'What is the mandatory attendance policy for exams?',
    'How can I request my official transcript?',
    'Where is the Finance & Accounts Office located?',
    'What bus transport routes are operated across Peshawar?'
  ];

  useEffect(() => {
    if (prefilledPrompt) {
      setInputValue(prefilledPrompt);
    }
  }, [prefilledPrompt]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim() || isLoading) return;

    const userMsg: AIChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          conversationHistory: messages.slice(-6).map(m => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const assistantMsg: AIChatMessage = {
        id: 'reply-' + Date.now(),
        sender: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intent: data.intent,
        confidence: data.confidence,
        sources: data.citations,
        handoffOffice: data.handoffOffice
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error querying chat API:', err);
      const fallbackMsg: AIChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'assistant',
        text: `I could not verify this information from the available official IMSciences sources. Please check the relevant official notice at https://imsciences.edu.pk/ or contact the concerned office.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intent: 'GENERAL_FAQ'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
      >
        {/* Chat Drawer Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white flex items-center justify-between border-b border-emerald-800/40">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-700/60 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base tracking-tight">IMSciences AI Helpdesk</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  RAG Grounded
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Verified Information Only · Zero Hallucinations Policy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Verification banner */}
        <div className="bg-emerald-50 border-b border-emerald-200/80 px-4 py-2 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
            <span>Strictly grounded in official IMSciences policies, admission portal & notices.</span>
          </div>
          <span className="font-semibold text-emerald-800 hidden sm:inline">Fall 2026</span>
        </div>

        {/* Messages scroll area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="h-8 w-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-sm shadow-xs ${
                  isUser 
                    ? 'bg-emerald-800 text-white rounded-tr-xs' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                }`}>
                  {/* Intent & Confidence Pill */}
                  {!isUser && msg.intent && (
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100 text-[11px]">
                      <span className="inline-flex items-center gap-1 font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                        <Sparkles className="h-3 w-3 text-emerald-700" />
                        Intent: {msg.intent}
                      </span>
                      {msg.confidence && (
                        <span className="text-slate-500 text-[10px]">
                          Confidence: {Math.round(msg.confidence * 100)}%
                        </span>
                      )}
                    </div>
                  )}

                  {/* Message Content with Markdown rendering */}
                  <div className="prose prose-sm max-w-none text-slate-800 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
                    {isUser ? (
                      <p className="text-white whitespace-pre-wrap font-medium">{msg.text}</p>
                    ) : (
                      <div className="markdown-body">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    )}
                  </div>

                  {/* Grounded Sources & Citations */}
                  {!isUser && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 bg-slate-50/80 -mx-2 -mb-2 p-2.5 rounded-b-xl">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 mb-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-emerald-700" />
                        <span>Official Grounded Sources & Citations:</span>
                      </div>
                      <div className="space-y-1">
                        {msg.sources.map((src, idx) => (
                          <a
                            key={idx}
                            href={src.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between text-[11px] text-emerald-800 hover:text-emerald-950 hover:underline bg-white p-1.5 rounded-md border border-slate-200/80 transition-colors"
                          >
                            <span className="font-medium truncate mr-2">
                              {idx + 1}. {src.title}
                            </span>
                            <span className="text-[10px] text-slate-500 shrink-0 flex items-center gap-1">
                              {src.sourceType}
                              <ExternalLink className="h-2.5 w-2.5 text-slate-400" />
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Human Handoff Offer */}
                  {!isUser && msg.handoffOffice && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-bold text-xs">Official Human Assistance Required</p>
                          <p className="text-xs text-amber-900 mt-0.5">{msg.handoffOffice.reason}</p>
                          
                          <div className="mt-2 text-xs space-y-1 bg-white/70 p-2 rounded-lg border border-amber-200/60 font-medium">
                            <div className="flex items-center gap-1.5 text-slate-800">
                              <span className="font-bold text-emerald-900">{msg.handoffOffice.officeName}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <Phone className="h-3 w-3 text-slate-500" />
                              <span>{msg.handoffOffice.phone}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <Mail className="h-3 w-3 text-slate-500" />
                              <span>{msg.handoffOffice.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <MapPin className="h-3 w-3 text-slate-500" />
                              <span>{msg.handoffOffice.location}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              onOpenTicketFromHandoff(
                                `Helpdesk Inquiry: ${msg.handoffOffice?.reason || 'Assistance Request'}`,
                                `Original conversation question: "${userMsgText(messages)}"`,
                                msg.handoffOffice?.officeName || 'Admissions Office'
                              );
                              onClose();
                            }}
                            className="mt-2.5 w-full py-1.5 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                          >
                            <Ticket className="h-3.5 w-3.5" />
                            <span>Create Official Support Ticket</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-1 text-[10px] text-right text-slate-400">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-500 text-xs py-2 animate-pulse">
              <div className="h-8 w-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2">
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-700" />
                <span>Searching verified IMSciences records and applying anti-hallucination guardrails...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions pills */}
        <div className="px-4 py-2.5 bg-slate-100/90 border-t border-slate-200">
          <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
            Quick Official Questions:
          </p>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {sampleQuestions.slice(0, 4).map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="whitespace-nowrap text-xs bg-white hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about admissions, scholarships, fees, exams, documents..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm text-slate-900 bg-slate-50/50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-semibold transition-colors flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Send</span>
            </button>
          </form>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            The AI assistant answers solely from verified official IMSciences sources. In case of discrepancies, the official university notice prevails.
          </p>
        </div>
      </div>
    </div>
  );
};

function userMsgText(messages: AIChatMessage[]): string {
  const lastUser = [...messages].reverse().find(m => m.sender === 'user');
  return lastUser ? lastUser.text : 'General inquiry';
}
