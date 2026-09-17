import React, { useState } from 'react';
import { 
  Bell, 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  ExternalLink, 
  FileText, 
  AlertCircle, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { NoticeItem, DeadlineItem } from '../types';

interface NoticesDeadlinesModuleProps {
  notices: NoticeItem[];
  deadlines: DeadlineItem[];
  onOpenAIChatWithQuery: (query: string) => void;
}

export const NoticesDeadlinesModule: React.FC<NoticesDeadlinesModuleProps> = ({
  notices,
  deadlines,
  onOpenAIChatWithQuery
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'notices' | 'deadlines'>('notices');
  const [selectedNoticeCat, setSelectedNoticeCat] = useState('All');
  const [searchNotice, setSearchNotice] = useState('');

  const categories = ['All', 'Admissions', 'Scholarships', 'Exams', 'Academic', 'Fee', 'Events', 'Important'];

  const filteredNotices = notices.filter(n => {
    const matchesCat = selectedNoticeCat === 'All' || n.category === selectedNoticeCat;
    const matchesSearch = n.title.toLowerCase().includes(searchNotice.toLowerCase()) ||
                          n.description.toLowerCase().includes(searchNotice.toLowerCase()) ||
                          n.targetAudience.toLowerCase().includes(searchNotice.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white rounded-2xl p-5 border border-rose-900/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-rose-800 text-rose-300 flex items-center justify-center shrink-0 border border-rose-700">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg font-['Outfit',sans-serif]">Official Notice Board & Deadlines Center</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-400/30">
                Verified Circulars
              </span>
            </div>
            <p className="text-xs text-rose-200 mt-0.5 max-w-2xl">
              Strictly published by official university authorities: Registrar Office, Admissions Office, Examinations Controller, and Finance Directorate.
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenAIChatWithQuery('What are the latest announcements, upcoming deadlines, and examination dates at IMSciences?')}
          className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs self-end sm:self-center shrink-0"
        >
          <span>Ask AI About Announcements</span>
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('notices')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'notices'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Official Circulars & Notices ({filteredNotices.length})
        </button>
        <button
          onClick={() => setActiveSubTab('deadlines')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'deadlines'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          University Calendar & Deadlines ({deadlines.length})
        </button>
      </div>

      {/* Tab 1: Notices */}
      {activeSubTab === 'notices' && (
        <div className="space-y-6">
          
          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 justify-between items-center">
            <div className="relative w-full md:w-80">
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchNotice}
                onChange={(e) => setSearchNotice(e.target.value)}
                placeholder="Search notices by title, keywords, or office..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <span className="text-xs text-slate-500 font-semibold mr-1 flex items-center gap-1">
                <Filter className="h-3 w-3" />
                Category:
              </span>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedNoticeCat(c)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                    selectedNoticeCat === c
                      ? 'bg-rose-100 text-rose-950 border-rose-300 font-bold'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Notices Feed */}
          <div className="space-y-3">
            {filteredNotices.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-rose-300 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-50 text-rose-900 border border-rose-200">
                      {n.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Audience: {n.targetAudience}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-400">{n.date}</span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 font-['Outfit',sans-serif]">
                    {n.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {n.description}
                  </p>
                </div>

                <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <a
                    href={n.officialSource}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 cursor-pointer bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
                  >
                    <span>View Circular</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  <button
                    onClick={() => onOpenAIChatWithQuery(`Can you explain the official notice regarding "${n.title}" at IMSciences?`)}
                    className="text-[11px] text-slate-500 hover:text-slate-900 underline cursor-pointer"
                  >
                    Ask AI Details
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Tab 2: Calendar & Deadlines */}
      {activeSubTab === 'deadlines' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
                Verified Deadlines Calendar (Fall 2026)
              </h3>
              <p className="text-xs text-slate-500">
                Official institutional calendar deadlines for admissions, fee submission, and scholarship applications.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deadlines.map((dl) => (
              <div
                key={dl.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border text-indigo-900">
                      {dl.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      {new Date(dl.targetDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 mt-1">{dl.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{dl.description}</p>
                  
                  {dl.programOrTarget && (
                    <p className="text-[11px] text-slate-500 font-medium mt-1">Target: {dl.programOrTarget}</p>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">{dl.status}</span>
                  <button
                    onClick={() => onOpenAIChatWithQuery(`What is the deadline for ${dl.title} at IMSciences?`)}
                    className="text-emerald-800 font-bold hover:underline cursor-pointer"
                  >
                    Ask AI Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
