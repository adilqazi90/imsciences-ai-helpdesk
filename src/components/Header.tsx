import React from 'react';
import { 
  Building2, 
  GraduationCap, 
  Bot, 
  Search, 
  UserCheck, 
  ShieldCheck, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  MapPin,
  PhoneCall
} from 'lucide-react';
import { UserRole, StaffDepartment, UserProfile } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  onOpenAIChat: (prefilledQuery?: string) => void;
  brandingTitle: string;
  brandingSubtitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  setCurrentUser,
  onOpenAIChat,
  brandingTitle,
  brandingSubtitle,
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);

  const personas: UserProfile[] = [
    {
      id: 'usr-applicant-1',
      name: 'Ahmed Bilal',
      email: 'ahmed.applicant@gmail.com',
      role: 'applicant',
      applicantId: 'APP-2026-8841',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'usr-student-1',
      name: 'Zubair Jan',
      email: 'zubair.cs24@imsciences.edu.pk',
      role: 'student',
      studentId: 'IMS-CS-2024-042',
      department: 'Computer Science',
      semester: 6,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'usr-faculty-1',
      name: 'Dr. Shahzad Ali',
      email: 'shahzad.ali@imsciences.edu.pk',
      role: 'faculty',
      department: 'Department of Computer Science',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'usr-staff-adm',
      name: 'Mr. Asad Khan',
      email: 'admissions@imsciences.edu.pk',
      role: 'staff',
      staffRole: 'Admissions Officer',
      department: 'Admissions Office',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'usr-staff-fin',
      name: 'Mr. Tariq Mehmood',
      email: 'finance@imsciences.edu.pk',
      role: 'staff',
      staffRole: 'Finance Officer',
      department: 'Finance & Accounts',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'usr-staff-grants',
      name: 'Syed Zulfiqar Ali',
      email: 'scholarships@imsciences.edu.pk',
      role: 'staff',
      staffRole: 'Grants/Scholarship Officer',
      department: 'Grants & Scholarships',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'usr-admin-1',
      name: 'Prof. Dr. Usman Ghani',
      email: 'admin.director@imsciences.edu.pk',
      role: 'administrator',
      department: 'Directorate / Systems',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80'
    }
  ];

  const handleSelectRole = (persona: UserProfile) => {
    setCurrentUser(persona);
    setRoleMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'admissions', label: 'Admissions & Test' },
    { id: 'programs', label: 'Programs' },
    { id: 'scholarships', label: 'Grants & Scholarships' },
    { id: 'finance', label: 'Fees & Challan' },
    { id: 'academic', label: 'Academics & Exams' },
    { id: 'documents', label: 'Student Documents' },
    { id: 'services', label: 'Hostel & Campus' },
    { id: 'notices', label: 'Notice Board' },
    { id: 'offices', label: 'Offices Directory' },
    { id: 'tickets', label: 'Support Tickets' },
    ...(currentUser.role === 'administrator' ? [{ id: 'admin', label: 'Admin Panel' }] : [])
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner with Official Source info & Campus helpline */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
            Official IMSciences Grounded AI System
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden md:flex items-center gap-1 text-slate-400">
            <MapPin className="h-3 w-3 text-slate-400" />
            1-A, Sector E-5, Phase VII, Hayatabad, Peshawar
          </span>
          <span className="hidden lg:flex items-center gap-1 text-slate-400">
            <PhoneCall className="h-3 w-3 text-slate-400" />
            UAN: +92-91-9217451-2
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href="https://imsciences.edu.pk/" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            imsciences.edu.pk
            <ExternalLink className="h-3 w-3" />
          </a>
          <span className="text-slate-600">·</span>
          <a 
            href="https://admissions.imsciences.edu.pk/" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-emerald-300 text-emerald-400 transition-colors flex items-center gap-1"
          >
            Admission Portal
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Main Header bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Institute Branding */}
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => setActiveTab('home')}
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm border border-emerald-700/50 group-hover:scale-105 transition-transform">
              <div className="flex flex-col items-center leading-none">
                <span className="text-xs font-black tracking-widest text-emerald-300">IMS</span>
                <span className="text-[10px] font-semibold text-slate-300">1999</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors font-['Outfit',sans-serif]">
                  {brandingTitle}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Official
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium line-clamp-1 max-w-md hidden sm:block">
                {brandingSubtitle}
              </p>
            </div>
          </div>

          {/* Center / Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Ask AI Trigger Button */}
            <button
              onClick={() => onOpenAIChat()}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-sm font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Bot className="h-4 w-4 text-emerald-200 animate-bounce" />
              <span className="hidden sm:inline">Ask AI Assistant</span>
              <span className="sm:hidden">Ask AI</span>
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            </button>

            {/* Role Switcher (Persona Simulation for easy testing) */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
                title="Switch view to test different user roles"
              >
                <div className="h-6 w-6 rounded-full overflow-hidden bg-slate-200 border border-slate-300 flex items-center justify-center">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="h-full w-full object-cover" />
                  ) : (
                    <UserCheck className="h-3.5 w-3.5 text-slate-600" />
                  )}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-500 capitalize leading-none">
                    {currentUser.staffRole || currentUser.role}
                  </div>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">Switch User Persona</p>
                    <p className="text-[11px] text-slate-500">Test workflows as applicant, student, staff, or admin</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto py-1">
                    {personas.map((p) => {
                      const isSelected = currentUser.id === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => handleSelectRole(p)}
                          className={`w-full text-left px-3.5 py-2 flex items-center gap-2.5 text-xs hover:bg-slate-50 transition-colors ${
                            isSelected ? 'bg-emerald-50/70 text-emerald-900 font-semibold' : 'text-slate-700'
                          }`}
                        >
                          <div className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                            {p.avatar ? (
                              <img src={p.avatar} alt={p.name} className="h-full w-full object-cover" />
                            ) : (
                              <UserCheck className="h-4 w-4 m-1 text-slate-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate font-medium">{p.name}</p>
                            <p className="text-[10px] text-slate-500 capitalize truncate">
                              {p.staffRole || `${p.role} ${p.department ? `· ${p.department}` : ''}`}
                            </p>
                          </div>
                          {isSelected && (
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Navigation Tabs bar */}
        <nav className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-100 text-xs font-semibold">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
