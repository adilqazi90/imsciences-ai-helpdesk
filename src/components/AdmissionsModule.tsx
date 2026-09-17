import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Printer, 
  Download, 
  Upload, 
  Building2, 
  UserCheck, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  X,
  CreditCard,
  QrCode
} from 'lucide-react';
import { ProgramItem, ApplicationRecord, UserProfile } from '../types';

interface AdmissionsModuleProps {
  programs: ProgramItem[];
  currentUser: UserProfile;
  applications: ApplicationRecord[];
  onUpdateApplication: (app: ApplicationRecord) => void;
  onOpenAIChatWithQuery: (query: string) => void;
}

export const AdmissionsModule: React.FC<AdmissionsModuleProps> = ({
  programs,
  currentUser,
  applications,
  onUpdateApplication,
  onOpenAIChatWithQuery
}) => {
  const [activeTab, setActiveTab] = useState<'programs' | 'tracker' | 'testslip' | 'challan'>('programs');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  // Selected application to track/inspect
  const [currentAppId, setCurrentAppId] = useState<string>(applications[0]?.id || 'app-001');
  const activeApp = applications.find(a => a.id === currentAppId) || applications[0];

  // Test slip modal view
  const [showSlipModal, setShowSlipModal] = useState<boolean>(false);
  // Challan modal view
  const [showChallanModal, setShowChallanModal] = useState<boolean>(false);

  // Filter programs
  const filteredPrograms = programs.filter(p => {
    const matchesLevel = selectedLevel === 'All' || p.degreeLevel === selectedLevel;
    const matchesDept = selectedDept === 'All' || p.department === selectedDept;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.eligibility.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesDept && matchesSearch;
  });

  const departments = ['All', ...Array.from(new Set(programs.map(p => p.department)))];
  const levels = ['All', 'Undergraduate', 'MS / MPhil', 'PhD'];

  // 10 Status pipeline stages
  const statusPipeline = [
    'Draft',
    'Submitted',
    'Pending Verification',
    'Documents Required',
    'Verified',
    'Test Required',
    'Test Scheduled',
    'Selected',
    'Admission Confirmed',
    'Enrolled'
  ];

  const currentStageIndex = statusPipeline.indexOf(activeApp?.status || 'Pending Verification');

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner with Official Notice about Entrance Test Slips */}
      <div className="bg-emerald-900 text-white rounded-2xl p-4 sm:p-5 border border-emerald-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-800 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-700">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg font-['Outfit',sans-serif]">Admissions Center · Fall 2026</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-700/60 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-600">
                Official Portal
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-0.5 max-w-2xl">
              <strong>Official Entrance Test Slip Policy:</strong> Entrance-test slips are generated through the online admission portal approximately <strong>2 to 3 days prior to the entrance test date</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <a
            href="https://admissions.imsciences.edu.pk/"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-white text-emerald-950 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-50 transition-colors shadow-xs"
          >
            <span>Live Admission Portal</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Admissions Navigation Sub-tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('programs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'programs'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Programs & Eligibility Criteria ({filteredPrograms.length})
        </button>
        <button
          onClick={() => setActiveTab('tracker')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'tracker'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Application Status Tracker (10 Stages)
        </button>
        <button
          onClick={() => setActiveTab('testslip')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'testslip'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Entrance Test Slip Generator
        </button>
        <button
          onClick={() => setActiveTab('challan')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'challan'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Admission Fee Challan (PKR 2,000)
        </button>
      </div>

      {/* Tab 1: Programs Explorer */}
      {activeTab === 'programs' && (
        <div className="space-y-6">
          
          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 justify-between items-center">
            
            <div className="relative w-full md:w-80">
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search program by name, code, or eligibility..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mr-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Level:</span>
              </div>
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-slate-500 font-semibold">Department:</span>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Program Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-500/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                      {program.code}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {program.durationYears} Years ({program.totalSemesters} Semesters)
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                    {program.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{program.department}</p>

                  {program.specializations && (
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {program.specializations.map((s: string, idx: number) => (
                        <span 
                          key={idx}
                          className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                    <div>
                      <span className="font-bold text-slate-700 block">Eligibility:</span>
                      <p className="text-slate-600 text-[11px] leading-relaxed mt-0.5">{program.eligibility}</p>
                    </div>
                    {program.testRequirement && (
                      <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-600">Test Required:</span>
                        <span className="font-mono text-emerald-800 font-bold">{program.testRequirement}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Semester Fee</span>
                      <span className="font-bold text-slate-900 font-mono">PKR {program.semesterFee.toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block">Admission Status</span>
                      <span className="text-emerald-700 font-bold text-[11px]">
                        {program.isOpenForAdmission ? 'Open · Fall 2026' : 'Closed'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onOpenAIChatWithQuery(`What are the admission requirements, test syllabus, and fee structure for ${program.name} at IMSciences?`)}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors text-center cursor-pointer"
                    >
                      Ask AI Details
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProgram(program);
                        setActiveTab('challan');
                      }}
                      className="py-1.5 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Apply Challan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Tab 2: 10-Stage Application Status Tracker */}
      {activeTab === 'tracker' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
                Application Tracking & Document Verification
              </h3>
              <p className="text-xs text-slate-500">
                Tracking Application: <strong className="text-slate-800">{activeApp.applicantName}</strong> ({activeApp.applicationNo || activeApp.id})
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Sample Records:</span>
              <div className="flex gap-1">
                {applications.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setCurrentAppId(app.id)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-colors cursor-pointer ${
                      currentAppId === app.id
                        ? 'bg-emerald-800 text-white border-emerald-800 font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {app.applicationNo || app.id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visual 10-Stage Pipeline */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Current Stage ({currentStageIndex + 1} of 10):
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {activeApp.status}
              </span>
            </div>

            <div className="overflow-x-auto pb-4 pt-2">
              <div className="flex items-center min-w-[800px] justify-between relative">
                <div className="absolute left-4 right-4 top-4 h-1 bg-slate-200 -z-0"></div>
                <div 
                  className="absolute left-4 h-1 bg-emerald-600 -z-0 transition-all duration-300"
                  style={{ width: `${(Math.max(0, currentStageIndex) / (statusPipeline.length - 1)) * 100}%` }}
                ></div>

                {statusPipeline.map((stage, idx) => {
                  const isDone = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div key={stage} className="flex flex-col items-center relative z-10 w-20 text-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                        isCurrent
                          ? 'bg-emerald-700 text-white ring-4 ring-emerald-100 shadow-md'
                          : isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}>
                        {isDone ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                      </div>
                      <span className={`text-[10px] mt-2 font-medium leading-tight ${
                        isCurrent ? 'font-bold text-emerald-900' : isDone ? 'text-slate-700' : 'text-slate-400'
                      }`}>
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Application Details & Document Checklist */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-200">
            
            {/* Left: Applicant Information */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900">Application Bio & Marks</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant Name:</span>
                  <span className="font-bold text-slate-900">{activeApp.applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Program Applied:</span>
                  <span className="font-bold text-emerald-800">{activeApp.selectedProgramName || activeApp.programName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CNIC / B-Form:</span>
                  <span className="font-mono text-slate-800">{activeApp.cnic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Matric (SSC):</span>
                  <span className="font-semibold text-slate-800">
                    {activeApp.matricMarks.obtained}/{activeApp.matricMarks.total} ({activeApp.matricMarks.percentage || ((activeApp.matricMarks.obtained / activeApp.matricMarks.total) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">F.Sc / Inter (HSSC):</span>
                  <span className="font-semibold text-slate-800">
                    {activeApp.interMarks.obtained}/{activeApp.interMarks.total} ({activeApp.interMarks.percentage || ((activeApp.interMarks.obtained / activeApp.interMarks.total) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fee Challan:</span>
                  <span className={`font-bold ${activeApp.isChallanPaid || activeApp.feeChallanPaid ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {activeApp.isChallanPaid || activeApp.feeChallanPaid ? 'Paid & Verified' : 'Pending Verification'}
                  </span>
                </div>
              </div>

              {(activeApp.actionRequiredReason || activeApp.actionRequiredMessage) && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Admissions Office Notice:</span>
                      <p className="mt-0.5">{activeApp.actionRequiredReason || activeApp.actionRequiredMessage}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Middle: Uploaded Document Verification Status */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">Mandatory Document Verification</h4>
                <span className="text-xs text-slate-500">Total: {activeApp.documents.length} Files</span>
              </div>

              <div className="space-y-2">
                {activeApp.documents.map((doc: any) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="font-bold text-slate-900">{doc.name}</p>
                        <p className="text-[10px] text-slate-400">
                          {doc.fileName ? `${doc.fileName} (${doc.fileSize})` : 'Uploaded'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        doc.status === 'verified' || doc.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : doc.status === 'action_required'
                          ? 'bg-rose-100 text-rose-800 font-semibold'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {doc.status}
                      </span>

                      {/* Document actions */}
                      <button 
                        onClick={() => {
                          const updatedDocs = activeApp.documents.map((d: any) => 
                            d.id === doc.id ? { ...d, status: 'verified' as const } : d
                          );
                          onUpdateApplication({ ...activeApp, documents: updatedDocs, status: 'Verified' });
                        }}
                        className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold cursor-pointer underline"
                      >
                        Verify (Staff)
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => setShowSlipModal(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>View Entrance Test Slip</span>
                </button>
                <button
                  onClick={() => setShowChallanModal(true)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>Print Application Challan</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Tab 3: Entrance Test Slip Generator */}
      {activeTab === 'testslip' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
                IMSciences Entrance Test Slip Generator
              </h3>
              <p className="text-xs text-slate-500">
                Official Entrance Test Roll Number & Reporting Voucher (Fall 2026)
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Test Slip</span>
            </button>
          </div>

          {/* Official Printable Test Slip Card */}
          <div className="max-w-3xl mx-auto border-2 border-slate-800 rounded-2xl p-6 bg-white space-y-6 shadow-md print:border-black">
            
            {/* Header with University Emblem info */}
            <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl border border-emerald-600">
                  IMS
                </div>
                <div>
                  <h2 className="font-extrabold text-xl text-slate-900 font-['Outfit',sans-serif] tracking-tight">
                    INSTITUTE OF MANAGEMENT SCIENCES, PESHAWAR
                  </h2>
                  <p className="text-xs text-slate-600 font-medium">
                    1-A, Sector E-5, Phase VII, Hayatabad, Peshawar · Khyber Pakhtunkhwa
                  </p>
                  <p className="text-xs font-bold text-emerald-800 mt-0.5">
                    OFFICIAL ENTRANCE TEST ROLL NUMBER SLIP · SESSION FALL 2026
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="h-16 w-16 bg-slate-100 border border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-[10px] text-center p-1 font-mono">
                  [Photograph Verified]
                </div>
              </div>
            </div>

            {/* Candidate & Test Schedule Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Candidate Name:</span>
                  <span className="font-bold text-slate-900">{activeApp.applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Father Name:</span>
                  <span className="font-semibold text-slate-800">Bilal Ahmad</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">CNIC / Form-B:</span>
                  <span className="font-mono font-bold text-slate-900">{activeApp.cnic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Application No:</span>
                  <span className="font-mono text-slate-900">{activeApp.applicationNo || activeApp.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Applied Program:</span>
                  <span className="font-bold text-emerald-800">{activeApp.selectedProgramName || activeApp.programName}</span>
                </div>
              </div>

              <div className="space-y-2 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200">
                <div className="flex justify-between">
                  <span className="text-emerald-900 font-medium">Test Roll Number:</span>
                  <span className="font-mono font-black text-sm text-emerald-950">
                    {activeApp.testRollNo || activeApp.testSchedule?.rollNumber || 'ET-2026-CS-0419'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-900 font-medium">Test Date:</span>
                  <span className="font-bold text-slate-900">
                    {activeApp.testDate || activeApp.testSchedule?.date || 'Sunday, August 23, 2026'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-900 font-medium">Reporting Time:</span>
                  <span className="font-bold text-slate-900">
                    {activeApp.testTime || activeApp.testSchedule?.reportingTime || '09:00 AM (Sharp)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-900 font-medium">Examination Hall:</span>
                  <span className="font-bold text-slate-900">
                    {activeApp.testCenter || activeApp.testSchedule?.venue || 'Academic Hall A (Main Campus)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-900 font-medium">Campus Location:</span>
                  <span className="font-semibold text-slate-800">Hayatabad, Peshawar</span>
                </div>
              </div>
            </div>

            {/* Test Instructions */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 text-xs space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                <span>Mandatory Instructions for Entrance Test:</span>
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 text-[11px] leading-relaxed">
                <li>Candidates <strong>MUST</strong> bring a printed copy of this Test Slip along with their Original CNIC, B-Form, or Original Matric Certificate.</li>
                <li>Mobile phones, smartwatches, calculators, or any electronic recording devices are <strong>strictly prohibited</strong> inside the examination center.</li>
                <li>Bring two blue or black ballpoint pens and a clear writing clipboard. Pencils and erasable pens are not allowed.</li>
                <li>No candidate will be admitted into the test hall 30 minutes after the commencement of the test.</li>
                <li>The test syllabus includes English (30%), Mathematics/Analytical Reasoning (40%), and General Knowledge/Subject basics (30%).</li>
              </ol>
            </div>

            {/* Barcode / Verification footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
              <div className="font-mono text-[10px] text-slate-500">
                BARCODE: *IMS-{activeApp.applicationNo || activeApp.id}-VERIFIED*
              </div>
              <div className="text-[10px] text-slate-400">
                Generated via IMSciences Official Admission Portal
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Tab 4: Official Admission Fee Challan Generator */}
      {activeTab === 'challan' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
                Official Admission Application Fee Voucher
              </h3>
              <p className="text-xs text-slate-500">
                Payable at Allied Bank Limited (ABL) & The Bank of Khyber (BoK)
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print 3-Part Challan</span>
            </button>
          </div>

          {/* 3-Part Bank Challan Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 print:grid-cols-3">
            {['1. BANK COPY', '2. IMSCIENCES ACCOUNTS COPY', '3. APPLICANT COPY'].map((copyTitle, i) => (
              <div 
                key={i} 
                className="border-2 border-slate-700 rounded-xl p-3.5 bg-white text-xs space-y-3 font-mono"
              >
                <div className="text-center border-b border-slate-300 pb-2">
                  <span className="text-[10px] font-bold text-slate-700 block">{copyTitle}</span>
                  <h4 className="font-black text-xs text-slate-900 mt-0.5">IMSciences Peshawar</h4>
                  <p className="text-[9px] text-slate-500">A/C: BoK 0012-0020038841 / ABL 0010-02948102</p>
                </div>

                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span>Challan No:</span>
                    <span className="font-bold">CH-2026-8841</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date Issued:</span>
                    <span>15-Jul-2026</span>
                  </div>
                  <div className="flex justify-between text-rose-700 font-bold">
                    <span>Due Date:</span>
                    <span>15-Aug-2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Applicant:</span>
                    <span className="font-bold">{activeApp.applicantName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Program:</span>
                    <span>{selectedProgram ? selectedProgram.code : (activeApp.selectedProgramName || activeApp.programName)}</span>
                  </div>
                </div>

                <div className="border-t border-b border-slate-300 py-1.5 space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span>Application Processing Fee:</span>
                    <span>PKR 2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bank Charges:</span>
                    <span>PKR 0</span>
                  </div>
                  <div className="flex justify-between font-bold text-xs pt-1 border-t border-slate-200">
                    <span>Total Payable:</span>
                    <span>PKR 2,000</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-between text-[8px] text-slate-400">
                  <span>Authorized Bank Signature</span>
                  <span>Cashier Stamp</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-800">Once deposited at any BoK or ABL online branch:</p>
              <p className="text-[11px] mt-0.5">
                Upload the stamped bank receipt image/PDF in your applicant portal. Verification reflects within 24 to 48 banking hours.
              </p>
            </div>
            <button
              onClick={() => {
                onUpdateApplication({ ...activeApp, isChallanPaid: true, feeChallanPaid: true, status: 'Submitted' });
                alert('Fee deposit recorded! Status updated to Submitted.');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-800 text-white font-bold text-xs cursor-pointer hover:bg-emerald-900"
            >
              Simulate Bank Deposit
            </button>
          </div>

        </div>
      )}

      {/* Modal for Quick Slip Preview */}
      {showSlipModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-bold text-sm text-slate-900">Entrance Test Slip Preview</h4>
              <button onClick={() => setShowSlipModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="text-xs space-y-2 bg-slate-50 p-4 rounded-xl border font-mono">
              <p><strong>Roll No:</strong> ET-2026-CS-0419</p>
              <p><strong>Candidate:</strong> {activeApp.applicantName}</p>
              <p><strong>Program:</strong> {activeApp.selectedProgramName || activeApp.programName}</p>
              <p><strong>Date & Time:</strong> Sunday, Aug 23, 2026 at 09:30 AM</p>
              <p><strong>Hall:</strong> Academic Hall A, IMSciences Peshawar</p>
            </div>
            <button
              onClick={() => {
                setShowSlipModal(false);
                setActiveTab('testslip');
              }}
              className="w-full py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs cursor-pointer"
            >
              Open Full Printable Slip View
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
