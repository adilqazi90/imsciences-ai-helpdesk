import React, { useState } from 'react';
import { 
  Ticket, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  MessageSquare, 
  Building2, 
  UserCheck, 
  Paperclip,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { TicketItem, TicketStatus, UserProfile, TicketMessageItem } from '../types';

interface TicketsModuleProps {
  tickets: TicketItem[];
  currentUser: UserProfile;
  onCreateTicket: (ticket: TicketItem) => void;
  onUpdateTicket: (ticket: TicketItem) => void;
  prefilledOffice?: string;
  prefilledSubject?: string;
  prefilledDescription?: string;
}

export const TicketsModule: React.FC<TicketsModuleProps> = ({
  tickets,
  currentUser,
  onCreateTicket,
  onUpdateTicket,
  prefilledOffice,
  prefilledSubject,
  prefilledDescription
}) => {
  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.id || '');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(!!prefilledSubject);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // New Ticket Form State
  const [newSubject, setNewSubject] = useState(prefilledSubject || '');
  const [newOffice, setNewOffice] = useState(prefilledOffice || 'Admissions Office');
  const [newCategory, setNewCategory] = useState('Admissions');
  const [newPriority, setNewPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'>('MEDIUM');
  const [newDescription, setNewDescription] = useState(prefilledDescription || '');

  // Reply state
  const [replyText, setReplyText] = useState('');

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const officesList = [
    'Admissions Office',
    'Grants & Scholarships Office',
    'Finance & Accounts Office',
    'Controller of Examinations',
    'Students Support Office',
    'System & ERP IT Center',
    'Provost & Hostels Office',
    'Transport Section',
    'Registrar Office'
  ];

  const filteredTickets = tickets.filter(t => {
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.assignedOffice.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newDescription.trim()) return;

    const newTicket: TicketItem = {
      id: 'tkt-' + Date.now(),
      ticketNumber: `IMS-TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      creatorId: currentUser.id,
      creatorName: currentUser.name,
      creatorRole: currentUser.role,
      assignedOffice: newOffice,
      category: newCategory,
      priority: newPriority,
      status: 'OPEN',
      subject: newSubject.trim(),
      description: newDescription.trim(),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      messages: [
        {
          id: 'msg-' + Date.now(),
          senderName: currentUser.name,
          senderRole: currentUser.role,
          message: newDescription.trim(),
          timestamp: 'Just now'
        }
      ]
    };

    onCreateTicket(newTicket);
    setSelectedTicketId(newTicket.id);
    setShowCreateModal(false);
    setNewSubject('');
    setNewDescription('');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    const updatedMessages = [
      ...selectedTicket.messages,
      {
        id: 'msg-' + Date.now(),
        senderName: currentUser.name,
        senderRole: currentUser.role,
        message: replyText.trim(),
        timestamp: 'Just now'
      }
    ];

    // If staff responds, status might shift to WAITING_FOR_STUDENT or IN_PROGRESS
    const nextStatus: TicketStatus = currentUser.role === 'staff' || currentUser.role === 'administrator' 
      ? 'WAITING_FOR_STUDENT' 
      : 'IN_PROGRESS';

    const updatedTicket: TicketItem = {
      ...selectedTicket,
      status: nextStatus,
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      messages: updatedMessages
    };

    onUpdateTicket(updatedTicket);
    setReplyText('');
  };

  const handleResolveTicket = () => {
    if (!selectedTicket) return;
    const updatedTicket: TicketItem = {
      ...selectedTicket,
      status: 'RESOLVED',
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    onUpdateTicket(updatedTicket);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-950 via-slate-900 to-slate-900 text-white rounded-2xl p-5 border border-orange-900/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-orange-800 text-orange-300 flex items-center justify-center shrink-0 border border-orange-700">
            <Ticket className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg font-['Outfit',sans-serif]">Official Helpdesk Support Tickets</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full border border-orange-400/30">
                SLA Managed
              </span>
            </div>
            <p className="text-xs text-orange-200 mt-0.5 max-w-2xl">
              File official inquiries, fee reconciliation requests, attendance disputes, and document issues directly to concerned university offices.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs self-end sm:self-center shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Ticket</span>
        </button>
      </div>

      {/* Main 2-Column Split: Ticket List (Left) & Active Ticket Conversation (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Tickets List */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
          
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ticket # or subject..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-2 py-1.5 rounded-xl border border-slate-200 bg-white"
            >
              <option value="All">All Status</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="WAITING_FOR_STUDENT">Action Needed</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto no-scrollbar">
            {filteredTickets.map((t) => {
              const isSelected = selectedTicket?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs space-y-1.5 ${
                    isSelected
                      ? 'border-emerald-700 bg-emerald-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900">{t.ticketNumber}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      t.status === 'RESOLVED' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : t.status === 'WAITING_FOR_STUDENT'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {t.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 line-clamp-1">{t.subject}</h4>
                  
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="truncate max-w-[150px]">{t.assignedOffice}</span>
                    <span>{t.updatedAt.split(' ')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Ticket Conversation Thread */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          {selectedTicket ? (
            <div className="space-y-6">
              
              {/* Ticket Meta Header */}
              <div className="pb-4 border-b border-slate-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 text-base">
                      {selectedTicket.ticketNumber}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {selectedTicket.category}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200">
                      Priority: {selectedTicket.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedTicket.status !== 'RESOLVED' && (
                      <button
                        onClick={handleResolveTicket}
                        className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 hover:bg-emerald-200 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                        <span>Mark as Resolved</span>
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
                  {selectedTicket.subject}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span>Assigned Office: <strong className="text-slate-800">{selectedTicket.assignedOffice}</strong></span>
                  <span>Requester: <strong className="text-slate-800">{selectedTicket.creatorName}</strong> ({selectedTicket.creatorRole})</span>
                  <span>Created: {selectedTicket.createdAt}</span>
                </div>
              </div>

              {/* Messages Thread */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                {selectedTicket.messages.map((m: TicketMessageItem) => {
                  const isStaff = m.senderRole === 'staff' || m.senderRole === 'administrator';
                  return (
                    <div
                      key={m.id}
                      className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                        isStaff 
                          ? 'bg-emerald-50/50 border-emerald-200' 
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{m.senderName}</span>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.2 rounded bg-white border text-slate-600">
                            {m.senderRole}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{m.timestamp}</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{m.message}</p>
                    </div>
                  );
                })}
              </div>

              {/* Reply Box */}
              <form onSubmit={handleSendReply} className="pt-2 border-t border-slate-200 space-y-2">
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply as ${currentUser.name} (${currentUser.staffRole || currentUser.role})...`}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                ></textarea>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-400">
                    Official replies are logged into university records.
                  </span>
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Reply</span>
                  </button>
                </div>
              </form>

            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 text-xs">
              Select a ticket on the left or create a new support ticket.
            </div>
          )}
        </div>

      </div>

      {/* New Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">Create Official Support Ticket</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateTicketSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target University Office</label>
                <select
                  value={newOffice}
                  onChange={(e) => setNewOffice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  {officesList.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Fee & Accounts">Fee & Accounts</option>
                    <option value="Scholarships">Scholarships</option>
                    <option value="Attendance Dispute">Attendance Dispute</option>
                    <option value="Examinations">Examinations</option>
                    <option value="Documents">Documents</option>
                    <option value="IT & ERP">IT & ERP</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Challan verification pending after 48 hours"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Provide all relevant details, roll numbers, or challan numbers..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                ></textarea>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold"
                >
                  Submit Official Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
