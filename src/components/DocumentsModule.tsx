import React, { useState } from 'react';
import { 
  FileBadge, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Download, 
  Printer, 
  Plus, 
  Building2, 
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { DocumentRequestItem, UserProfile } from '../types';

interface DocumentsModuleProps {
  currentUser: UserProfile;
  onOpenAIChatWithQuery: (query: string) => void;
}

export const DocumentsModule: React.FC<DocumentsModuleProps> = ({
  currentUser,
  onOpenAIChatWithQuery
}) => {
  const [requests, setRequests] = useState<DocumentRequestItem[]>([
    {
      id: 'doc-001',
      studentId: 'IMS-CS-2024-042',
      studentName: 'Zubair Jan',
      docType: 'Official Detailed Marks Certificate (Transcript)',
      urgency: 'Normal',
      fee: 1500,
      feePaid: true,
      status: 'Ready for Collection',
      trackingNumber: 'TRK-IMS-99201',
      requestedDate: '2026-08-10',
      expectedCompletionDate: '2026-08-17',
      clearanceStatus: {
        libraryClear: true,
        accountsClear: true,
        examClear: true
      }
    },
    {
      id: 'doc-002',
      studentId: 'IMS-CS-2024-042',
      studentName: 'Zubair Jan',
      docType: 'English Proficiency Certificate',
      urgency: 'Urgent',
      fee: 1000,
      feePaid: true,
      status: 'Under Processing',
      trackingNumber: 'TRK-IMS-99202',
      requestedDate: '2026-08-15',
      expectedCompletionDate: '2026-08-18',
      clearanceStatus: {
        libraryClear: true,
        accountsClear: true,
        examClear: true
      }
    }
  ]);

  const [showNewModal, setShowNewModal] = useState(false);
  const [newDocType, setNewDocType] = useState('Official Detailed Marks Certificate (Transcript)');
  const [newUrgency, setNewUrgency] = useState<'Normal' | 'Urgent'>('Normal');
  const [newPurpose, setNewPurpose] = useState('');

  const docTypesList = [
    { title: 'Official Detailed Marks Certificate (Transcript)', normalFee: 1500, urgentFee: 3000, normalDays: 7, urgentDays: 2 },
    { title: 'Provisional Certificate', normalFee: 2000, urgentFee: 4000, normalDays: 7, urgentDays: 3 },
    { title: 'Degree Certificate', normalFee: 5000, urgentFee: 10000, normalDays: 30, urgentDays: 10 },
    { title: 'Bonafide / Student Status Certificate', normalFee: 500, urgentFee: 1000, normalDays: 3, urgentDays: 1 },
    { title: 'English Proficiency Certificate', normalFee: 500, urgentFee: 1000, normalDays: 3, urgentDays: 1 },
    { title: 'Character Certificate', normalFee: 500, urgentFee: 1000, normalDays: 3, urgentDays: 1 },
    { title: 'Migration Certificate / NOC', normalFee: 2000, urgentFee: 4000, normalDays: 10, urgentDays: 4 },
    { title: 'Duplicate Student ID Card', normalFee: 1000, urgentFee: 1500, normalDays: 5, urgentDays: 2 }
  ];

  const currentSelection = docTypesList.find(d => d.title === newDocType) || docTypesList[0];
  const computedFee = newUrgency === 'Urgent' ? currentSelection.urgentFee : currentSelection.normalFee;

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: DocumentRequestItem = {
      id: 'doc-' + Date.now(),
      studentId: currentUser.studentId || 'IMS-CS-2024-042',
      studentName: currentUser.name,
      docType: newDocType,
      urgency: newUrgency,
      fee: computedFee,
      feePaid: false,
      status: 'Requested',
      trackingNumber: `TRK-IMS-${Math.floor(10000 + Math.random() * 90000)}`,
      requestedDate: new Date().toISOString().split('T')[0],
      expectedCompletionDate: new Date(Date.now() + (newUrgency === 'Urgent' ? currentSelection.urgentDays : currentSelection.normalDays) * 86400000).toISOString().split('T')[0],
      clearanceStatus: {
        libraryClear: true,
        accountsClear: true,
        examClear: true
      }
    };

    setRequests([newReq, ...requests]);
    setShowNewModal(false);
    setNewPurpose('');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-violet-950 via-slate-900 to-slate-900 text-white rounded-2xl p-5 border border-violet-900/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-violet-800 text-violet-300 flex items-center justify-center shrink-0 border border-violet-700">
            <FileBadge className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg font-['Outfit',sans-serif]">Official Student Documents Portal</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-400/30">
                Examination Section
              </span>
            </div>
            <p className="text-xs text-violet-200 mt-0.5 max-w-2xl">
              Request official transcripts, degrees, provisional certificates, bonafide letters, and NOCs with real-time clearance and collection tracking.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={() => setShowNewModal(true)}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Request New Document</span>
          </button>
        </div>
      </div>

      {/* Existing Requests Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
              Active Document Requests & Clearance Status
            </h3>
            <p className="text-xs text-slate-500">
              Track processing pipeline and collection token for your official papers
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600">{requests.length} Requests</span>
        </div>

        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <FileText className="h-5 w-5 text-emerald-800 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{req.docType}</h4>
                    <p className="text-[11px] text-slate-500">
                      Tracking No: <span className="font-mono font-bold text-slate-700">{req.trackingNumber}</span> · Requested on {req.requestedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    req.urgency === 'Urgent' 
                      ? 'bg-rose-100 text-rose-800' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {req.urgency}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    req.status === 'Ready for Collection'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    {req.status}
                  </span>
                </div>
              </div>

              {/* Clearance checklist */}
              <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 font-medium">Departmental Clearance:</span>
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Library
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Accounts
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Examinations
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-[11px]">
                    Estimated Ready: <strong>{req.expectedCompletionDate}</strong>
                  </span>
                  {req.status === 'Ready for Collection' && (
                    <button
                      onClick={() => alert(`Collection Token: ${req.trackingNumber}. Please collect your document from the Examination Counter with original Student ID card.`)}
                      className="px-3 py-1 rounded-lg bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors cursor-pointer"
                    >
                      View Collection Pass
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Fee & Processing Times Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
          Official Fee Schedule & Turnaround Times (Examination Regulations)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Document Title</th>
                <th className="p-3">Normal Fee</th>
                <th className="p-3">Normal Time</th>
                <th className="p-3">Urgent Fee</th>
                <th className="p-3">Urgent Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {docTypesList.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">{d.title}</td>
                  <td className="p-3 font-mono">PKR {d.normalFee.toLocaleString()}</td>
                  <td className="p-3 text-slate-600">{d.normalDays} working days</td>
                  <td className="p-3 font-mono font-bold text-rose-700">PKR {d.urgentFee.toLocaleString()}</td>
                  <td className="p-3 text-slate-800 font-medium">{d.urgentDays} working days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Request Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">Request Official Student Document</h3>
              <button onClick={() => setShowNewModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Document</label>
                <select
                  value={newDocType}
                  onChange={(e) => setNewDocType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  {docTypesList.map(d => (
                    <option key={d.title} value={d.title}>{d.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Urgency</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNewUrgency('Normal')}
                    className={`flex-1 py-2 rounded-xl border font-semibold ${
                      newUrgency === 'Normal' ? 'bg-emerald-50 text-emerald-900 border-emerald-400 font-bold' : 'border-slate-200'
                    }`}
                  >
                    Normal ({currentSelection.normalDays} Days)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewUrgency('Urgent')}
                    className={`flex-1 py-2 rounded-xl border font-semibold ${
                      newUrgency === 'Urgent' ? 'bg-rose-50 text-rose-900 border-rose-400 font-bold' : 'border-slate-200'
                    }`}
                  >
                    Urgent ({currentSelection.urgentDays} Days)
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Reason / Purpose of Document</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Higher education abroad, employment, internship..."
                  value={newPurpose}
                  onChange={(e) => setNewPurpose(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Payable Processing Fee:</span>
                  <span className="font-mono text-emerald-800">PKR {computedFee.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-slate-500">Payable at ABL or BoK branch. Clearance is auto-verified with Library and Accounts.</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold"
                >
                  Generate Request & Challan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
