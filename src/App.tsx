import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomeHero } from './components/HomeHero';
import { AIChatModal } from './components/AIChatModal';
import { AdmissionsModule } from './components/AdmissionsModule';
import { ScholarshipsModule } from './components/ScholarshipsModule';
import { FinanceModule } from './components/FinanceModule';
import { AcademicModule } from './components/AcademicModule';
import { DocumentsModule } from './components/DocumentsModule';
import { CampusServicesModule } from './components/CampusServicesModule';
import { NoticesDeadlinesModule } from './components/NoticesDeadlinesModule';
import { OfficesDirectoryModule } from './components/OfficesDirectoryModule';
import { TicketsModule } from './components/TicketsModule';
import { AdminPanel } from './components/AdminPanel';

import { 
  INITIAL_OFFICES, 
  INITIAL_PROGRAMS, 
  INITIAL_SCHOLARSHIPS, 
  INITIAL_KNOWLEDGE_BASE, 
  INITIAL_NOTICES, 
  INITIAL_DEADLINES, 
  SAMPLE_APPLICATIONS, 
  SAMPLE_COURSES, 
  SAMPLE_TIMETABLE, 
  SAMPLE_EXAMS, 
  SAMPLE_RESULT, 
  SAMPLE_ATTENDANCE, 
  SAMPLE_TICKETS,
  UNIVERSITY_INFO 
} from './data/imsciencesData';
import { UserProfile, ApplicationRecord, KnowledgeItem, ProgramItem, TicketItem } from './types';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  Bot, 
  Sparkles,
  ChevronUp
} from 'lucide-react';

export default function App() {
  // App navigation state
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Active User Persona (defaults to Applicant for testing first-time admission/portal flow)
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'usr-applicant-1',
    name: 'Ahmed Bilal',
    email: 'ahmed.applicant@gmail.com',
    role: 'applicant',
    applicantId: 'APP-2026-8841',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  });

  // AI Chat modal state
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);
  const [aiChatPrefill, setAiChatPrefill] = useState<string>('');

  // Branding configuration
  const [brandingTitle, setBrandingTitle] = useState<string>('IMSciences AI Helpdesk');
  const [brandingSubtitle, setBrandingSubtitle] = useState<string>(
    'Your AI Assistant for Admissions, Academics, Scholarships, Fees & Student Services'
  );

  // Dynamic state stores
  const [programs, setPrograms] = useState<ProgramItem[]>(INITIAL_PROGRAMS);
  const [scholarships] = useState(INITIAL_SCHOLARSHIPS);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>(INITIAL_KNOWLEDGE_BASE);
  const [offices] = useState(INITIAL_OFFICES);
  const [notices] = useState(INITIAL_NOTICES);
  const [deadlines] = useState(INITIAL_DEADLINES);
  const [applications, setApplications] = useState<ApplicationRecord[]>(SAMPLE_APPLICATIONS);
  const [courses] = useState(SAMPLE_COURSES);
  const [timetable] = useState(SAMPLE_TIMETABLE);
  const [exams] = useState(SAMPLE_EXAMS);
  const [result] = useState(SAMPLE_RESULT);
  const [attendance] = useState(SAMPLE_ATTENDANCE);
  const [tickets, setTickets] = useState<TicketItem[]>(SAMPLE_TICKETS);

  // Prefill state for ticket creation from handoff
  const [ticketPrefillOffice, setTicketPrefillOffice] = useState<string>('');
  const [ticketPrefillSubject, setTicketPrefillSubject] = useState<string>('');
  const [ticketPrefillDescription, setTicketPrefillDescription] = useState<string>('');

  // Handlers
  const handleOpenAIChatWithQuery = (query: string = '') => {
    setAiChatPrefill(query);
    setIsAIChatOpen(true);
  };

  const handleOpenTicketFromHandoff = (subject: string, description: string, office: string) => {
    setTicketPrefillSubject(subject);
    setTicketPrefillDescription(description);
    setTicketPrefillOffice(office);
    setActiveTab('tickets');
  };

  const handleCreateTicketForOffice = (officeName: string) => {
    setTicketPrefillOffice(officeName);
    setTicketPrefillSubject(`Inquiry for ${officeName}`);
    setTicketPrefillDescription('');
    setActiveTab('tickets');
  };

  const handleUpdateApplication = (updatedApp: ApplicationRecord) => {
    setApplications(prev => prev.map(a => a.id === updatedApp.id ? updatedApp : a));
  };

  const handleAddKnowledgeItem = (newItem: KnowledgeItem) => {
    setKnowledgeBase(prev => [newItem, ...prev]);
    // Also notify backend
    fetch('/api/knowledge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    }).catch(err => console.error('Error adding KB item to backend:', err));
  };

  const handleUpdateProgram = (updatedProgram: ProgramItem) => {
    setPrograms(prev => prev.map(p => p.id === updatedProgram.id ? updatedProgram : p));
  };

  const handleCreateTicket = (newTicket: TicketItem) => {
    setTickets(prev => [newTicket, ...prev]);
  };

  const handleUpdateTicket = (updatedTicket: TicketItem) => {
    setTickets(prev => prev.map(t => t.id === updatedTicket.id ? updatedTicket : t));
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onOpenAIChat={() => handleOpenAIChatWithQuery('')}
        brandingTitle={brandingTitle}
        brandingSubtitle={brandingSubtitle}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <HomeHero
            onNavigate={setActiveTab}
            onOpenAIChatWithQuery={handleOpenAIChatWithQuery}
            latestNotices={notices}
            upcomingDeadlines={deadlines}
          />
        )}

        {(activeTab === 'admissions' || activeTab === 'programs') && (
          <AdmissionsModule
            programs={programs}
            currentUser={currentUser}
            applications={applications}
            onUpdateApplication={handleUpdateApplication}
            onOpenAIChatWithQuery={handleOpenAIChatWithQuery}
          />
        )}

        {activeTab === 'scholarships' && (
          <ScholarshipsModule
            scholarships={scholarships}
            onOpenAIChatWithQuery={handleOpenAIChatWithQuery}
          />
        )}

        {activeTab === 'finance' && (
          <FinanceModule
            programs={programs}
            currentUser={currentUser}
            onOpenAIChatWithQuery={handleOpenAIChatWithQuery}
          />
        )}

        {activeTab === 'academic' && (
          <AcademicModule
            courses={courses}
            timetable={timetable}
            exams={exams}
            result={result}
            attendance={attendance}
            onOpenAIChatWithQuery={handleOpenAIChatWithQuery}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentsModule
            currentUser={currentUser}
            onOpenAIChatWithQuery={handleOpenAIChatWithQuery}
          />
        )}

        {activeTab === 'services' && (
          <CampusServicesModule
            onOpenAIChatWithQuery={handleOpenAIChatWithQuery}
          />
        )}

        {activeTab === 'notices' && (
          <NoticesDeadlinesModule
            notices={notices}
            deadlines={deadlines}
            onOpenAIChatWithQuery={handleOpenAIChatWithQuery}
          />
        )}

        {activeTab === 'offices' && (
          <OfficesDirectoryModule
            offices={offices}
            onCreateTicketForOffice={handleCreateTicketForOffice}
            onOpenAIChatWithQuery={handleOpenAIChatWithQuery}
          />
        )}

        {activeTab === 'tickets' && (
          <TicketsModule
            tickets={tickets}
            currentUser={currentUser}
            onCreateTicket={handleCreateTicket}
            onUpdateTicket={handleUpdateTicket}
            prefilledOffice={ticketPrefillOffice}
            prefilledSubject={ticketPrefillSubject}
            prefilledDescription={ticketPrefillDescription}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            knowledgeBase={knowledgeBase}
            onAddKnowledgeItem={handleAddKnowledgeItem}
            programs={programs}
            onUpdateProgram={handleUpdateProgram}
            brandingTitle={brandingTitle}
            setBrandingTitle={setBrandingTitle}
            brandingSubtitle={brandingSubtitle}
            setBrandingSubtitle={setBrandingSubtitle}
          />
        )}
      </main>

      {/* Floating AI Action Button (Always Accessible) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => handleOpenAIChatWithQuery('')}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white shadow-xl hover:shadow-2xl border border-emerald-600 transition-all duration-200 cursor-pointer"
        >
          <div className="h-7 w-7 rounded-lg bg-emerald-700 flex items-center justify-center text-emerald-200 group-hover:rotate-12 transition-transform">
            <Bot className="h-4 w-4" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold leading-tight flex items-center gap-1">
              Ask IMSciences AI
              <Sparkles className="h-3 w-3 text-amber-300" />
            </p>
            <p className="text-[10px] text-emerald-200 leading-none">
              Source-Grounded Answers
            </p>
          </div>
        </button>
      </div>

      {/* AI Chat Modal Drawer */}
      <AIChatModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        prefilledPrompt={aiChatPrefill}
        onOpenTicketFromHandoff={handleOpenTicketFromHandoff}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: Institute Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                  IMS
                </div>
                <span className="text-sm font-bold text-white tracking-tight">
                  IMSciences Peshawar
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Institute of Management Sciences (IMSciences) is a premier public-sector higher education institution chartered by the Government of Khyber Pakhtunkhwa.
              </p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>HEC, NBEAC & NCEAC Accredited</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Key Portals
              </h4>
              <ul className="space-y-1.5 text-[11px]">
                <li>
                  <a href="https://admissions.imsciences.edu.pk/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    Online Admission Portal <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </li>
                <li>
                  <a href="https://imsciences.edu.pk/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    Official University Website <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </li>
                <li>
                  <button onClick={() => setActiveTab('scholarships')} className="hover:text-white transition-colors">
                    Grants & Financial Assistance
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('finance')} className="hover:text-white transition-colors">
                    Semester Fee Structures & ABL/BoK Challan
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Campus Coordinates */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Campus Location
              </h4>
              <p className="text-[11px] leading-relaxed flex items-start gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>1-A, Sector E-5, Phase VII, Hayatabad, Peshawar, Khyber Pakhtunkhwa, Pakistan.</span>
              </p>
              <p className="text-[11px] mt-2 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>UAN: +92-91-9217451-2</span>
              </p>
              <p className="text-[11px] mt-1 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>info@imsciences.edu.pk</span>
              </p>
            </div>

            {/* Col 4: AI Helpdesk Grounding Guarantee */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                AI Source Grounding
              </h4>
              <p className="text-[11px] leading-relaxed">
                This AI Helpdesk adheres strictly to verified official university sources. It will never hallucinate or guess deadlines, fees, or merit thresholds.
              </p>
              <p className="text-[10px] text-slate-500 pt-1">
                In case of discrepancies, the signed circular issued by the Registrar or concerned Office Director prevails.
              </p>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <p>© {new Date().getFullYear()} Institute of Management Sciences, Peshawar. All rights reserved.</p>
            <p className="text-slate-500">IMSciences AI Helpdesk System v1.0 · Fall 2026 Session</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
