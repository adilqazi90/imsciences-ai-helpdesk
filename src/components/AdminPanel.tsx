import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  RefreshCw, 
  Server,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { KnowledgeItem, ProgramItem, AuditLogItem } from '../types';

interface AdminPanelProps {
  knowledgeBase: KnowledgeItem[];
  onAddKnowledgeItem: (item: KnowledgeItem) => void;
  programs: ProgramItem[];
  onUpdateProgram: (program: ProgramItem) => void;
  brandingTitle: string;
  setBrandingTitle: (t: string) => void;
  brandingSubtitle: string;
  setBrandingSubtitle: (s: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  knowledgeBase,
  onAddKnowledgeItem,
  programs,
  onUpdateProgram,
  brandingTitle,
  setBrandingTitle,
  brandingSubtitle,
  setBrandingSubtitle,
}) => {
  const [subTab, setSubTab] = useState<'kb' | 'programs' | 'branding' | 'audit'>('kb');
  const [showAddKbModal, setShowAddKbModal] = useState(false);

  // New KB Item state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('ADMISSION');
  const [newContent, setNewContent] = useState('');
  const [newSourceName, setNewSourceName] = useState('IMSciences Official Circular');
  const [newSourceUrl, setNewSourceUrl] = useState('https://imsciences.edu.pk/notices/');

  const [auditLogs] = useState<AuditLogItem[]>([
    {
      id: 'log-1',
      action: 'FALL_2026_ADMISSION_CYCLE_OPENED',
      performedBy: 'Prof. Dr. Usman Ghani (Director)',
      timestamp: '2026-08-15 09:30',
      details: 'Opened online applications for 18 undergraduate & graduate degree programs'
    },
    {
      id: 'log-2',
      action: 'CMEEF_SCHOLARSHIP_CRITERIA_VERIFIED',
      performedBy: 'Syed Zulfiqar Ali (Grants Officer)',
      timestamp: '2026-08-14 14:15',
      details: 'Updated full tuition waiver & stipend policy from KP Higher Education Directorate'
    },
    {
      id: 'log-3',
      action: 'FEE_SCHEDULE_UPDATED',
      performedBy: 'Mr. Tariq Mehmood (Finance Officer)',
      timestamp: '2026-08-12 11:00',
      details: 'Configured BoK and ABL branch billing codes for 1Link invoice integration'
    },
    {
      id: 'log-4',
      action: 'ENTRANCE_TEST_SLIP_POLICY_CONFIRMED',
      performedBy: 'Admissions Directorate',
      timestamp: '2026-08-10 16:45',
      details: 'Set 2-3 days prior issuance rule for applicant portal download'
    }
  ]);

  const handleAddKbSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newItem: KnowledgeItem = {
      id: 'kb-' + Date.now(),
      title: newTitle.trim(),
      category: newCategory as any,
      content: newContent.trim(),
      sourceName: newSourceName.trim(),
      sourceUrl: newSourceUrl.trim(),
      publicationDate: new Date().toISOString().split('T')[0],
      effectiveDate: new Date().toISOString().split('T')[0],
      academicSession: 'Fall 2026',
      verificationStatus: 'VERIFIED',
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      priorityOrder: 1
    };

    onAddKnowledgeItem(newItem);
    setShowAddKbModal(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-5 border border-slate-700 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0 border border-slate-700">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg font-['Outfit',sans-serif]">System Administration & Knowledge Engine</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                Super Admin Access
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
              Control verified university knowledge base passages, toggle degree program admission cycles, configure AI branding, and inspect audit logs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
          <Server className="h-3.5 w-3.5" />
          <span>RAG Knowledge Synced</span>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSubTab('kb')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'kb'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Knowledge Base ({knowledgeBase.length})
        </button>
        <button
          onClick={() => setSubTab('programs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'programs'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Program Admissions & Fees
        </button>
        <button
          onClick={() => setSubTab('branding')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'branding'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Branding & AI Parameters
        </button>
        <button
          onClick={() => setSubTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'audit'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Audit Logs
        </button>
      </div>

      {/* Tab 1: Knowledge Base Manager */}
      {subTab === 'kb' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                Verified IMSciences Grounding Documents
              </h3>
              <p className="text-xs text-slate-500">
                The AI helpdesk retrieves these exact official passages to answer student inquiries without hallucinations.
              </p>
            </div>
            <button
              onClick={() => setShowAddKbModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Verified Document</span>
            </button>
          </div>

          <div className="space-y-3">
            {knowledgeBase.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-all space-y-2 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border text-emerald-800">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Verified: {item.lastVerifiedDate}
                  </span>
                </div>

                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap line-clamp-3">
                  {item.content}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px] text-slate-500">
                  <span className="truncate max-w-sm">Source: <strong>{item.sourceName}</strong> ({item.sourceUrl})</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Grounded
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Program Admissions & Fees */}
      {subTab === 'programs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                Academic Programs & Admission Toggle
              </h3>
              <p className="text-xs text-slate-500">
                Update semester fee amounts or open/close admission cycles for each degree offering.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Program</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Level</th>
                  <th className="p-3">Semester Fee</th>
                  <th className="p-3">Admission Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {programs.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">
                      {p.name} <span className="font-mono text-slate-400">({p.code})</span>
                    </td>
                    <td className="p-3 text-slate-600">{p.department}</td>
                    <td className="p-3 text-slate-600">{p.degreeLevel}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">
                      PKR {p.semesterFee.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        p.isOpenForAdmission ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {p.isOpenForAdmission ? 'Open (Fall 2026)' : 'Closed'}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          onUpdateProgram({ ...p, isOpenForAdmission: !p.isOpenForAdmission });
                        }}
                        className="text-xs text-emerald-800 hover:text-emerald-950 font-bold underline cursor-pointer"
                      >
                        {p.isOpenForAdmission ? 'Close Cycle' : 'Open Cycle'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Branding & Parameters */}
      {subTab === 'branding' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 max-w-2xl text-xs">
          <div>
            <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
              Branding & AI Guardrail Parameters
            </h3>
            <p className="text-slate-500 mt-0.5">
              Customize the system branding title, subtitle, and anti-hallucination fallback rules.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Application Branding Title</label>
              <input
                type="text"
                value={brandingTitle}
                onChange={(e) => setBrandingTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Application Subtitle</label>
              <input
                type="text"
                value={brandingSubtitle}
                onChange={(e) => setBrandingSubtitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block">Strict Anti-Hallucination Fallback Rule:</span>
              <p className="text-slate-600 italic bg-white p-3 rounded-lg border border-slate-200 leading-relaxed font-mono text-[11px]">
                "I could not verify this information from the available official IMSciences sources. Please check the relevant official notice or contact the concerned office."
              </p>
              <p className="text-[10px] text-slate-400">
                This rule is locked into the system prompt and cannot be bypassed. The AI will never speculate on admission dates, fees, or policy criteria.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Audit Logs */}
      {subTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
              System & Administrative Audit Trail
            </h3>
            <span className="text-xs text-slate-500 font-mono">Real-time Log</span>
          </div>

          <div className="space-y-2 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-800">{log.action}</span>
                  <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                </div>
                <p className="text-slate-700">{log.details}</p>
                <p className="text-[10px] text-slate-500">Authorized: <strong>{log.performedBy}</strong></p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Document Modal */}
      {showAddKbModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">Add Verified Knowledge Document</h3>
              <button onClick={() => setShowAddKbModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleAddKbSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Fall 2026 Merit List Calculation Criteria"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="ADMISSION">Admission</option>
                  <option value="ADMISSION_TEST">Admission Test</option>
                  <option value="SCHOLARSHIP">Scholarship</option>
                  <option value="FEE">Fee</option>
                  <option value="ATTENDANCE">Attendance</option>
                  <option value="DOCUMENT">Document</option>
                  <option value="HOSTEL">Hostel</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Source Name</label>
                <input
                  type="text"
                  required
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Source URL</label>
                <input
                  type="url"
                  required
                  value={newSourceUrl}
                  onChange={(e) => setNewSourceUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Verified Content Body</label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Paste the exact verified text from official circular or notice..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                ></textarea>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddKbModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold"
                >
                  Add to RAG Engine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
