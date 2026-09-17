import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  DollarSign, 
  Building2, 
  FileText, 
  ExternalLink,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
  UserCheck
} from 'lucide-react';
import { ScholarshipItem } from '../types';

interface ScholarshipsModuleProps {
  scholarships: ScholarshipItem[];
  onOpenAIChatWithQuery: (query: string) => void;
}

export const ScholarshipsModule: React.FC<ScholarshipsModuleProps> = ({
  scholarships,
  onOpenAIChatWithQuery
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'directory' | 'matcher'>('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Interactive Matcher Form State
  const [calcLevel, setCalcLevel] = useState('Undergraduate');
  const [calcIncome, setCalcIncome] = useState<number>(45000);
  const [calcPercentage, setCalcPercentage] = useState<number>(75);
  const [calcDomicile, setCalcDomicile] = useState<string>('Khyber Pakhtunkhwa');
  const [calcSiblingsEnrolled, setCalcSiblingsEnrolled] = useState<boolean>(false);
  const [matchedResults, setMatchedResults] = useState<ScholarshipItem[] | null>(null);

  const categories = ['All', 'Need-Based', 'Merit-Based', 'Government / Provincial', 'Institutional / Rebates'];

  const filteredScholarships = scholarships.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.eligibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || s.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  const handleRunMatcher = (e: React.FormEvent) => {
    e.preventDefault();
    const results = scholarships.filter(s => {
      // Need-based matches if household income is under criteria
      if (s.category.includes('Need-Based')) {
        return calcIncome <= 65000;
      }
      // CMEEF matches if KP domicile and high academic percentage
      if (s.name.includes('CMEEF')) {
        return (calcDomicile === 'Khyber Pakhtunkhwa' || calcDomicile === 'Merged Districts (FATA)') && calcPercentage >= 70;
      }
      // Merit matches if percentage >= 80
      if (s.category.includes('Merit')) {
        return calcPercentage >= 80;
      }
      // Merged districts matches
      if (s.name.includes('Merged Districts') || s.name.includes('FATA')) {
        return calcDomicile === 'Merged Districts (FATA)';
      }
      // Sibling rebate matches
      if (s.name.includes('Sibling') && calcSiblingsEnrolled) {
        return true;
      }
      return false;
    });

    setMatchedResults(results);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 text-white rounded-2xl p-5 border border-amber-900/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-800/80 text-amber-300 flex items-center justify-center shrink-0 border border-amber-700">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg font-['Outfit',sans-serif]">Grants & Financial Assistance Office</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                Central Admin Block
              </span>
            </div>
            <p className="text-xs text-amber-200/90 mt-0.5 max-w-2xl">
              IMSciences ensures that no deserving candidate is deprived of higher education due to financial hardship. Over 30% of enrolled students receive financial assistance.
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenAIChatWithQuery('What scholarships and financial assistance programs are available at IMSciences Peshawar and how to apply?')}
          className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs self-end sm:self-center shrink-0"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Ask AI Scholarship Advice</span>
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('directory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'directory'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Scholarship Directory ({filteredScholarships.length})
        </button>
        <button
          onClick={() => setActiveSubTab('matcher')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'matcher'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Interactive Eligibility Matcher
        </button>
      </div>

      {/* Tab 1: Scholarship Directory */}
      {activeSubTab === 'directory' && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 justify-between items-center">
            <div className="relative w-full md:w-80">
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scholarships by name or donor..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <span className="text-xs text-slate-500 font-semibold mr-1 flex items-center gap-1">
                <Filter className="h-3 w-3" />
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredScholarships.map((sch) => (
              <div
                key={sch.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                      {sch.category}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      Deadline: {sch.deadline}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                    {sch.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">Provider / Authority: {sch.provider}</p>

                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                    <div>
                      <span className="font-bold text-slate-700 block">Coverage & Benefits:</span>
                      <p className="text-slate-800 text-xs font-semibold mt-0.5 text-emerald-800">
                        {sch.coverage} {sch.stipend ? `+ ${sch.stipend}` : ''}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block">Eligibility Criteria:</span>
                      <p className="text-slate-600 text-[11px] leading-relaxed mt-0.5">{sch.eligibility}</p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block">Application Procedure:</span>
                      <p className="text-slate-600 text-[11px] leading-relaxed mt-0.5">{sch.applicationProcedure}</p>
                    </div>

                    {sch.financialRequirements && (
                      <div className="pt-2 border-t border-slate-200">
                        <span className="font-bold text-slate-700 block text-[11px] mb-0.5">Financial & Academic Requirements:</span>
                        <p className="text-[10px] text-slate-600 leading-relaxed">{sch.financialRequirements} · {sch.academicRequirements}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Session: {sch.session}</span>
                  <button
                    onClick={() => onOpenAIChatWithQuery(`How can I apply for the ${sch.name} at IMSciences? What are the documents and deadlines?`)}
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ask AI How to Apply</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Tab 2: Interactive Eligibility Matcher */}
      {activeSubTab === 'matcher' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
              Scholarship Eligibility Calculator & Matcher
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your academic and household criteria to calculate which official IMSciences financial aid opportunities you may qualify for.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRunMatcher} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Degree Level</label>
              <select
                value={calcLevel}
                onChange={(e) => setCalcLevel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Undergraduate">Undergraduate (BS / BBA)</option>
                <option value="MS / MPhil">MS / MPhil / MBA</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Domicile Region</label>
              <select
                value={calcDomicile}
                onChange={(e) => setCalcDomicile(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa (Settled Districts)</option>
                <option value="Merged Districts (FATA)">Merged Districts (FATA / Tribal)</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="Balochistan">Balochistan</option>
                <option value="Gilgit-Baltistan">Gilgit-Baltistan / AJK</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Previous Academic Percentage / Marks: ({calcPercentage}%)
              </label>
              <input
                type="range"
                min="50"
                max="98"
                value={calcPercentage}
                onChange={(e) => setCalcPercentage(Number(e.target.value))}
                className="w-full accent-emerald-800"
              />
              <span className="text-[10px] text-slate-400">Higher percentages unlock Merit & CMEEF.</span>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Total Monthly Family Income: (PKR {calcIncome.toLocaleString()})
              </label>
              <input
                type="range"
                min="20000"
                max="150000"
                step="5000"
                value={calcIncome}
                onChange={(e) => setCalcIncome(Number(e.target.value))}
                className="w-full accent-emerald-800"
              />
              <span className="text-[10px] text-slate-400">Need-based criteria requires ≤ PKR 60,000/month.</span>
            </div>

            <div className="md:col-span-2 flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="siblingsCheck"
                checked={calcSiblingsEnrolled}
                onChange={(e) => setCalcSiblingsEnrolled(e.target.checked)}
                className="h-4 w-4 rounded-md accent-emerald-800"
              />
              <label htmlFor="siblingsCheck" className="text-slate-700 font-medium">
                I have a real brother or sister already enrolled and paying full fee at IMSciences (Qualifies for 25% Sibling Rebate).
              </label>
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Evaluate Matching Opportunities
              </button>
            </div>
          </form>

          {/* Results Display */}
          {matchedResults && (
            <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">
                  Potential Matching Opportunities ({matchedResults.length})
                </h4>
              </div>

              {/* Mandatory Official Disclaimer */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <p className="font-medium italic leading-relaxed">
                  "Based on the information provided, you appear to meet the listed criteria for this opportunity. Final eligibility and award decisions are made by IMSciences/the relevant donor or authority."
                </p>
              </div>

              {matchedResults.length === 0 ? (
                <p className="text-xs text-slate-500 py-4">
                  No direct automatic match based on the entered parameters. Contact the Grants Office (Ext. 125) for discretionary and emergency hardship assistance.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {matchedResults.map((s) => (
                    <div key={s.id} className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900 text-sm">{s.name}</span>
                        <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded-md border text-emerald-800 font-bold">
                          {s.category}
                        </span>
                      </div>
                      <p className="text-emerald-800 font-semibold">{s.coverage}</p>
                      <p className="text-slate-600 text-[11px]">{s.eligibility}</p>
                      <div className="pt-2 flex justify-between items-center text-[10px] text-slate-500">
                        <span>Deadline: {s.deadline}</span>
                        <button
                          onClick={() => onOpenAIChatWithQuery(`Tell me about applying for ${s.name} at IMSciences`)}
                          className="font-bold text-emerald-800 hover:underline cursor-pointer"
                        >
                          Details & Forms →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
