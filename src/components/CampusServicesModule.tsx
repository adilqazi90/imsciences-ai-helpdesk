import React, { useState } from 'react';
import { 
  Building2, 
  Bus, 
  BookOpen, 
  Briefcase, 
  Activity, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Users
} from 'lucide-react';

interface CampusServicesModuleProps {
  onOpenAIChatWithQuery: (query: string) => void;
}

export const CampusServicesModule: React.FC<CampusServicesModuleProps> = ({
  onOpenAIChatWithQuery
}) => {
  const [activeTab, setActiveTab] = useState<'hostel' | 'transport' | 'library' | 'cdc' | 'societies'>('hostel');

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-900 text-white rounded-2xl p-5 border border-teal-900/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-teal-800 text-teal-300 flex items-center justify-center shrink-0 border border-teal-700">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg font-['Outfit',sans-serif]">Campus Life & Student Services</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-400/30">
                Hayatabad Campus
              </span>
            </div>
            <p className="text-xs text-teal-200 mt-0.5 max-w-2xl">
              Hostel accommodation, city-wide commuter transport, central research library, career center, and student societies.
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenAIChatWithQuery('Tell me about IMSciences hostel facilities, bus routes, and library timings')}
          className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs self-end sm:self-center shrink-0"
        >
          <span>Ask AI Campus Services</span>
        </button>
      </div>

      {/* Navigation Sub-tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('hostel')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'hostel'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="h-3.5 w-3.5" />
          <span>Hostel Accommodations</span>
        </button>
        <button
          onClick={() => setActiveTab('transport')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'transport'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bus className="h-3.5 w-3.5" />
          <span>Transport Routes & Timings</span>
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'library'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Central Library & Turnitin</span>
        </button>
        <button
          onClick={() => setActiveTab('cdc')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'cdc'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="h-3.5 w-3.5" />
          <span>Career Center (CDC)</span>
        </button>
        <button
          onClick={() => setActiveTab('societies')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'societies'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="h-3.5 w-3.5" />
          <span>Clubs & Societies</span>
        </button>
      </div>

      {/* Tab 1: Hostel */}
      {activeTab === 'hostel' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
                On-Campus Student Hostels (Boys & Girls)
              </h3>
              <p className="text-xs text-slate-500">
                Safe, air-conditioned and high-speed fiber-connected residential living in Hayatabad.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
              Allotments Open · Fall 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Fee Structure & Dues</h4>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-slate-600">Semester Accommodation Fee:</span>
                  <span className="font-bold font-mono text-slate-900">PKR 38,000 / semester</span>
                </div>
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-slate-600">Hostel Security Deposit (Refundable):</span>
                  <span className="font-bold font-mono text-slate-900">PKR 10,000 (one-time)</span>
                </div>
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-slate-600">Mess Charges (Actual monthly):</span>
                  <span className="font-bold font-mono text-slate-900">PKR 9,500 – 11,000 / month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Wi-Fi, Water & Generator Backup:</span>
                  <span className="font-bold text-emerald-800">Included</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Eligibility & Allotment Policy</h4>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600 leading-relaxed text-[11px]">
                <li>Priority is strictly given to outstation students coming from distant districts of KP, FATA/Merged Districts, Balochistan, Sindh, and Gilgit-Baltistan.</li>
                <li>Peshawar city residents are generally not eligible unless approved by the Provost on exceptional circumstances.</li>
                <li>Curfew & Gate Closure: 10:00 PM for Boys Hostel, 08:30 PM for Girls Hostel.</li>
                <li>Hostel Warden: Mr. Muhammad Tariq (Ext. 132 | provost@imsciences.edu.pk).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Transport */}
      {activeTab === 'transport' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
                Commuter Bus Network Across Peshawar
              </h3>
              <p className="text-xs text-slate-500">
                Transport Fee: <strong>PKR 24,000 per semester</strong> · 4 Dedicated Fleet Routes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">Route 1: Chamkani & GT Road</span>
                <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border text-emerald-800 font-bold">Departure 07:15 AM</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Stops: Chamkani Terminal → Taru Jabba → Ring Road Junction → Hashtnagri → Bacha Khan Chowk → Saddar Road → University Road → IMSciences Campus.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">Route 2: Charsadda Road</span>
                <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border text-emerald-800 font-bold">Departure 07:20 AM</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Stops: Charsadda Road Phatak → Eidgah → Shahi Bagh → Khyber Bazaar → Railway Station → Aman Chowk → Abdara Road → Hayatabad Phase VII.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">Route 3: Warsak Road</span>
                <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border text-emerald-800 font-bold">Departure 07:30 AM</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Stops: Warsak Road Ring Road Chowk → Babu Garhi → Michni Post → Saddar Cantt → Canal Road → Board Bazaar → Jamrud Road → IMSciences.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">Route 4: Kohat Road</span>
                <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border text-emerald-800 font-bold">Departure 07:15 AM</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Stops: Kohat Road Bridge → Pishtakhara Chowk → Landi Sarak → Industrial Estate → Hayatabad Phase 3 Chowk → Tatara Park → Phase 7.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Library */}
      {activeTab === 'library' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
                IMSciences Central Library & Research Databases
              </h3>
              <p className="text-xs text-slate-500">
                Ground & First Floor, Academic Block A · 60,000+ Volumes & HEC National Digital Access
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">Operating Hours</h4>
              <p className="text-slate-600">
                • <strong>Monday – Friday:</strong> 08:00 AM – 09:00 PM<br/>
                • <strong>Saturday:</strong> 09:00 AM – 04:00 PM<br/>
                • <strong>Sunday & Public Holidays:</strong> Closed
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">Borrowing Rules</h4>
              <p className="text-slate-600">
                • <strong>Undergraduate students:</strong> 4 books for 14 days.<br/>
                • <strong>Graduate / MS / PhD:</strong> 6 books for 30 days.<br/>
                • Reference copies & journals strictly for in-library reading.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">Turnitin Anti-Plagiarism</h4>
              <p className="text-slate-600">
                • Mandatory clearance for all final year projects, theses, and research papers.<br/>
                • Maximum allowable similarity index: <strong>≤ 19%</strong> under HEC guidelines.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: CDC */}
      {activeTab === 'cdc' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
            Career Development Center (CDC)
          </h3>
          <p className="text-slate-600 leading-relaxed">
            The Career Development Center at IMSciences bridges academia with industry leaders across Pakistan and multinational firms. Services include annual corporate job fairs, on-campus interview drives, CV review clinics, mock technical interviews, and internship placements with leading banks, software houses, and development agencies.
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
            <span>CDC Office: First Floor, Management Block (Ext. 128 | cdc@imsciences.edu.pk)</span>
            <button
              onClick={() => onOpenAIChatWithQuery('How can the IMSciences Career Development Center help me with internships and job fairs?')}
              className="font-bold text-emerald-800 hover:underline cursor-pointer"
            >
              Ask AI CDC Details →
            </button>
          </div>
        </div>
      )}

      {/* Tab 5: Clubs & Societies */}
      {activeTab === 'societies' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
            Student Societies & Co-Curricular Clubs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">IMSciences Computing Society (ICS)</h4>
              <p className="text-slate-600 text-[11px]">Organizes annual hackathons, competitive programming, AI summits, and coding bootcamps.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">Literary & Debating Society</h4>
              <p className="text-slate-600 text-[11px]">Bilingual parliamentary debates, MUNs, poetry recitals, and public speaking competitions.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">IMSciences Blood Donor Society</h4>
              <p className="text-slate-600 text-[11px]">Emergency blood matching network for hospitals in Peshawar and annual thalassemia donation drives.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">Sports Society</h4>
              <p className="text-slate-600 text-[11px]">State of the art campus gymnasium, basketball & badminton courts, table tennis, and annual inter-departmental cricket league.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
