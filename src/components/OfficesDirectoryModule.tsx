import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Ticket, 
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { OfficeItem } from '../types';

interface OfficesDirectoryModuleProps {
  offices: OfficeItem[];
  onCreateTicketForOffice: (officeName: string) => void;
  onOpenAIChatWithQuery: (query: string) => void;
}

export const OfficesDirectoryModule: React.FC<OfficesDirectoryModuleProps> = ({
  offices,
  onCreateTicketForOffice,
  onOpenAIChatWithQuery
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Admissions', 'Finance', 'Academic', 'Student Affairs', 'Support', 'Executive'];

  const filteredOffices = offices.filter(o => {
    const matchesCat = selectedCategory === 'All' || o.category === selectedCategory;
    const matchesSearch = o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.incharge.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.services.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 text-white rounded-2xl p-5 border border-cyan-900/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-cyan-800 text-cyan-300 flex items-center justify-center shrink-0 border border-cyan-700">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg font-['Outfit',sans-serif]">Official University Offices Directory</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-400/30">
                20 Campus Offices
              </span>
            </div>
            <p className="text-xs text-cyan-200 mt-0.5 max-w-2xl">
              Direct contact details, internal PBX extensions, office locations across Academic and Administrative blocks, and assigned services.
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenAIChatWithQuery('Where is the Admissions Office and Finance Office located at IMSciences, and what are their phone numbers?')}
          className="px-3.5 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs self-end sm:self-center shrink-0"
        >
          <span>Ask AI Campus Navigation</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search office, staff, extension, or service..."
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
                  ? 'bg-cyan-100 text-cyan-950 border-cyan-300 font-bold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Offices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOffices.map((office) => (
          <div
            key={office.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-cyan-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-900 border border-cyan-200">
                  {office.category}
                </span>
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {office.extension}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                {office.name}
              </h3>
              
              <p className="text-xs text-slate-600 mt-1 font-medium flex items-center gap-1">
                <UserCheck className="h-3.5 w-3.5 text-slate-400" />
                <span>{office.incharge}</span>
                <span className="text-slate-400 text-[10px]">({office.designation})</span>
              </p>

              <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono">{office.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{office.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{office.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{office.officeHours}</span>
                </div>
              </div>

              {/* Handled Services Tags */}
              <div className="mt-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Key Services:
                </span>
                <div className="flex flex-wrap gap-1">
                  {office.services.map((svc: string, i: number) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => onCreateTicketForOffice(office.name)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Ticket className="h-3.5 w-3.5" />
                <span>Submit Ticket</span>
              </button>
              <button
                onClick={() => onOpenAIChatWithQuery(`Tell me about the ${office.name} at IMSciences, where is it and what do they handle?`)}
                className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Ask AI
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
