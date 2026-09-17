import React, { useState } from 'react';
import { 
  Bot, 
  Search, 
  GraduationCap, 
  Award, 
  CreditCard, 
  BookOpen, 
  FileText, 
  Calendar, 
  MessageSquareWarning, 
  Bell, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MapPin,
  FileBadge
} from 'lucide-react';
import { NoticeItem, DeadlineItem } from '../types';

interface HomeHeroProps {
  onNavigate: (tab: string) => void;
  onOpenAIChatWithQuery: (query: string) => void;
  latestNotices: NoticeItem[];
  upcomingDeadlines: DeadlineItem[];
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onNavigate,
  onOpenAIChatWithQuery,
  latestNotices,
  upcomingDeadlines,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onOpenAIChatWithQuery(searchInput.trim());
    }
  };

  const quickActions = [
    {
      id: 'admissions',
      title: 'Admissions & Test',
      subtitle: 'Apply online, entrance test slip & merit',
      icon: GraduationCap,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:border-emerald-400',
      badge: 'Fall 2026 Open'
    },
    {
      id: 'programs',
      title: 'Degree Programs',
      subtitle: 'BSCS, BBA, MS Data Science & PhDs',
      icon: BookOpen,
      color: 'bg-teal-50 text-teal-800 border-teal-200 hover:border-teal-400',
      badge: '18+ Programs'
    },
    {
      id: 'scholarships',
      title: 'Grants & Scholarships',
      subtitle: 'HEC Need-based, CMEEF & Merit Aid',
      icon: Award,
      color: 'bg-amber-50 text-amber-900 border-amber-200 hover:border-amber-400',
      badge: 'Active Calls'
    },
    {
      id: 'finance',
      title: 'Fees & Challan',
      subtitle: 'Bank vouchers, deposit proof & rules',
      icon: CreditCard,
      color: 'bg-indigo-50 text-indigo-800 border-indigo-200 hover:border-indigo-400',
      badge: 'ABL & BoK'
    },
    {
      id: 'academic',
      title: 'Academics & Exams',
      subtitle: 'Courses, timetable, datesheet & 75% rule',
      icon: Calendar,
      color: 'bg-blue-50 text-blue-800 border-blue-200 hover:border-blue-400',
      badge: 'Date Sheets'
    },
    {
      id: 'documents',
      title: 'Student Documents',
      subtitle: 'Transcripts, provisional & certificates',
      icon: FileBadge,
      color: 'bg-violet-50 text-violet-800 border-violet-200 hover:border-violet-400',
      badge: 'Fast Tracking'
    },
    {
      id: 'services',
      title: 'Hostel & Transport',
      subtitle: 'Accommodations, bus routes & library',
      icon: Building2,
      color: 'bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-400',
      badge: 'Hayatabad'
    },
    {
      id: 'notices',
      title: 'Notice Board',
      subtitle: 'Official circulars, tenders & schedules',
      icon: Bell,
      color: 'bg-rose-50 text-rose-800 border-rose-200 hover:border-rose-400',
      badge: 'Live Updates'
    },
    {
      id: 'offices',
      title: 'Offices Directory',
      subtitle: '20 official campus offices & contacts',
      icon: MapPin,
      color: 'bg-cyan-50 text-cyan-800 border-cyan-200 hover:border-cyan-400',
      badge: 'Extensions'
    },
    {
      id: 'tickets',
      title: 'Complaints & Tickets',
      subtitle: 'File support tickets to offices with SLA',
      icon: MessageSquareWarning,
      color: 'bg-orange-50 text-orange-900 border-orange-200 hover:border-orange-400',
      badge: 'Track Status'
    }
  ];

  const suggestedSearches = [
    'How do I apply for BS Computer Science?',
    'When will entrance test slips be generated?',
    'What scholarships can I apply for?',
    'Where to deposit semester fee challan?',
    'How to request official transcript?',
    'Contact Admissions Office'
  ];

  return (
    <div className="space-y-10 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white shadow-xl px-6 py-12 sm:px-12 sm:py-16 border border-emerald-900/60">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Official AI Helpdesk · Institute of Management Sciences Peshawar</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif] leading-tight text-white">
            How can we help you today?
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Ask anything about IMSciences admissions, scholarships, fees, academics, exams, documents or student services. Source-grounded answers strictly verified against official university records.
          </p>

          {/* AI Search / Query Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="relative max-w-2xl mx-auto mt-6"
          >
            <div className="relative flex items-center shadow-lg rounded-2xl bg-white text-slate-900 p-1.5 border border-slate-200 focus-within:ring-4 focus-within:ring-emerald-500/30 transition-all">
              <div className="pl-3.5 pr-2 text-slate-400">
                <Bot className="h-6 w-6 text-emerald-700" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Ask: 'What are the requirements for BSCS?' or 'When is test slip issued?'"
                className="flex-1 py-3 px-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer shadow-sm"
              >
                <span>Ask AI</span>
                <Sparkles className="h-4 w-4 text-amber-300" />
              </button>
            </div>
          </form>

          {/* Suggested queries */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs text-slate-400 font-medium">Popular questions:</span>
            {suggestedSearches.slice(0, 4).map((q, idx) => (
              <button
                key={idx}
                onClick={() => onOpenAIChatWithQuery(q)}
                className="text-xs text-slate-300 hover:text-emerald-300 bg-white/10 hover:bg-white/15 px-3 py-1 rounded-full border border-white/10 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

        </div>

        {/* Live Status Bar at bottom of hero */}
        <div className="mt-12 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Admissions Cycle</p>
            <p className="text-base font-bold text-emerald-300 mt-0.5">Fall 2026 Open</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Test Slip Window</p>
            <p className="text-base font-bold text-white mt-0.5">2–3 Days Prior</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Official Offices</p>
            <p className="text-base font-bold text-emerald-300 mt-0.5">20 Represented</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Information Mode</p>
            <p className="text-base font-bold text-white mt-0.5">Verified Grounded</p>
          </div>
        </div>
      </section>

      {/* Urgent Announcements & Notice Banner */}
      {latestNotices.length > 0 && (
        <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between gap-4 mb-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <Bell className="h-4 w-4 animate-swing" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Latest Official IMSciences Notices</h3>
                <p className="text-xs text-slate-500">Grounded circulars issued by Admissions, Examinations & Grants</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('notices')}
              className="text-xs text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>View All Notices</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {latestNotices.slice(0, 2).map((notice) => (
              <div 
                key={notice.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-colors flex items-start gap-3"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-600 mt-1.5 shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                      {notice.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{notice.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">{notice.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">{notice.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Action Navigation Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif] tracking-tight">
              University Services & Centers
            </h2>
            <p className="text-xs text-slate-500">Access official services, applications, fees, and guidelines</p>
          </div>
          <button
            onClick={() => onOpenAIChatWithQuery('')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 cursor-pointer bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
          >
            <Bot className="h-3.5 w-3.5 text-emerald-700" />
            <span>Ask AI Assistant</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className={`text-left p-4 rounded-2xl border transition-all duration-150 hover:shadow-md cursor-pointer flex flex-col justify-between h-36 bg-white border-slate-200 hover:border-emerald-600/60 group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2.5 rounded-xl ${action.color} border`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {action.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                    {action.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Open Center</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Two-Column Section: Deadlines Engine + Verified Offices Quick Contact */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Verified Deadlines Engine */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-700" />
                <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                  Upcoming Verified Deadlines
                </h3>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                Official Dates Only
              </span>
            </div>

            <div className="space-y-3">
              {upcomingDeadlines.slice(0, 3).map((dl) => (
                <div 
                  key={dl.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300 transition-all flex items-start justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-indigo-900">
                        {dl.category}
                      </span>
                      {dl.programOrTarget && (
                        <span className="text-xs text-slate-500 font-medium truncate max-w-[200px]">
                          {dl.programOrTarget}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mt-1">{dl.title}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">{dl.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-rose-700 block bg-rose-50 px-2 py-1 rounded-md border border-rose-200">
                      {new Date(dl.targetDate).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {dl.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Official policy: The AI will never invent deadlines.</span>
            <button 
              onClick={() => onNavigate('notices')} 
              className="text-emerald-800 font-bold hover:underline cursor-pointer"
            >
              All Deadlines →
            </button>
          </div>
        </div>

        {/* Official IMSciences Key Offices Contact Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-emerald-800" />
                <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                  Key University Offices
                </h3>
              </div>
              <button 
                onClick={() => onNavigate('offices')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <span>Directory (20)</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">Admissions Office</span>
                  <span className="text-[11px] font-mono text-emerald-800 font-semibold">Ext. 102 / 103</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">Ground Floor, Academic Block A (admissions@imsciences.edu.pk)</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">Grants & Scholarship Office</span>
                  <span className="text-[11px] font-mono text-emerald-800 font-semibold">Ext. 125</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">First Floor, Central Admin Block (scholarships@imsciences.edu.pk)</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">Finance & Accounts Office</span>
                  <span className="text-[11px] font-mono text-emerald-800 font-semibold">Ext. 110 / 111</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">Ground Floor, Room G-08 (finance@imsciences.edu.pk)</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Peshawar UAN: +92-91-9217451-2</span>
            <button 
              onClick={() => onNavigate('tickets')}
              className="text-emerald-800 font-bold hover:underline cursor-pointer"
            >
              Submit Office Ticket →
            </button>
          </div>
        </div>

      </section>

    </div>
  );
};
