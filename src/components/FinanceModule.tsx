import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Printer, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Building2, 
  Calendar, 
  DollarSign, 
  Clock, 
  ShieldCheck,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ProgramItem, UserProfile } from '../types';

interface FinanceModuleProps {
  programs: ProgramItem[];
  currentUser: UserProfile;
  onOpenAIChatWithQuery: (query: string) => void;
}

export const FinanceModule: React.FC<FinanceModuleProps> = ({
  programs,
  currentUser,
  onOpenAIChatWithQuery
}) => {
  const [activeTab, setActiveTab] = useState<'programs' | 'voucher' | 'policies'>('programs');
  const [selectedProgramId, setSelectedProgramId] = useState<string>(programs[0]?.id || 'prog-01');
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [voucherPaid, setVoucherPaid] = useState<boolean>(false);

  const activeProgram = programs.find(p => p.id === selectedProgramId) || programs[0];

  // Fee calculation
  const isFirstSemester = selectedSemester === 1;
  const tuitionFee = activeProgram.semesterFee;
  const admissionFee = isFirstSemester ? activeProgram.admissionFee : 0;
  const librarySecurity = isFirstSemester ? 5000 : 0; // refundable
  const registrationFee = isFirstSemester ? 4000 : 0;
  const examFee = 3500;
  const studentActivityFund = 1500;
  const totalAmount = tuitionFee + admissionFee + librarySecurity + registrationFee + examFee + studentActivityFund;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 border border-indigo-900/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-800/80 text-indigo-300 flex items-center justify-center shrink-0 border border-indigo-700">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg font-['Outfit',sans-serif]">Finance & Accounts Division</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-400/30">
                Official Fee Portal
              </span>
            </div>
            <p className="text-xs text-indigo-200 mt-0.5 max-w-2xl">
              Payable at all online branches of <strong>The Bank of Khyber (BoK)</strong> and <strong>Allied Bank Limited (ABL)</strong>, or via 1Link invoice bill payment.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={() => onOpenAIChatWithQuery('What is the fee payment process, approved banks, and installment policy at IMSciences?')}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <span>Ask AI Fee Rules</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('programs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'programs'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Fee Structure by Program
        </button>
        <button
          onClick={() => setActiveTab('voucher')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'voucher'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Semester Fee Challan Generator
        </button>
        <button
          onClick={() => setActiveTab('policies')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'policies'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Refund & Installment Regulations
        </button>
      </div>

      {/* Tab 1: Program Fee Structures */}
      {activeTab === 'programs' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-indigo-400 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-900 border border-indigo-200">
                      {prog.code}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {prog.totalSemesters} Semesters
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                    {prog.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{prog.department}</p>

                  <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Tuition Fee / Sem:</span>
                      <span className="font-mono font-bold text-slate-900">
                        PKR {prog.semesterFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Admission Fee (1st Sem only):</span>
                      <span className="font-mono text-slate-700">
                        PKR {prog.admissionFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Total 1st Semester:</span>
                      <span className="font-mono font-bold text-emerald-800">
                        PKR {(prog.semesterFee + prog.admissionFee + 14000).toLocaleString()}*
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                      *Includes registration, exam & refundable library security.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedProgramId(prog.id);
                      setActiveTab('voucher');
                    }}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors cursor-pointer text-center"
                  >
                    Generate Fee Voucher
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Semester Fee Challan Generator */}
      {activeTab === 'voucher' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
                Semester Fee Voucher Generator
              </h3>
              <p className="text-xs text-slate-500">
                Official 3-Part Bank Challan · Session Fall 2026
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedProgramId}
                onChange={(e) => setSelectedProgramId(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-medium"
              >
                {programs.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
                ))}
              </select>

              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(Number(e.target.value))}
                className="text-xs px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-medium"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-emerald-900 shadow-xs"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Voucher</span>
              </button>
            </div>
          </div>

          {/* 3-Part Bank Challan Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {['1. BANK COPY', '2. IMSCIENCES ACCOUNTS COPY', '3. STUDENT COPY'].map((partTitle, idx) => (
              <div 
                key={idx}
                className="border-2 border-slate-800 rounded-xl p-4 bg-white text-xs space-y-2.5 font-mono shadow-xs"
              >
                <div className="text-center border-b border-slate-300 pb-2">
                  <span className="text-[10px] font-bold text-indigo-900 block">{partTitle}</span>
                  <h4 className="font-black text-xs text-slate-900 mt-0.5">IMSciences Peshawar</h4>
                  <p className="text-[9px] text-slate-500">BoK A/C: 0012-0020038841 | ABL A/C: 0010-02948102</p>
                </div>

                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span>Voucher No:</span>
                    <span className="font-bold">VCH-2026-{selectedSemester}0{activeProgram.code.substring(0, 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Due Date:</span>
                    <span className="font-bold text-rose-700">31-Aug-2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Student / Roll:</span>
                    <span className="font-bold truncate max-w-[120px]">{currentUser.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Program:</span>
                    <span className="font-bold">{activeProgram.code} (Sem {selectedSemester})</span>
                  </div>
                </div>

                <div className="border-t border-b border-slate-300 py-1.5 space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span>Tuition Fee:</span>
                    <span>PKR {tuitionFee.toLocaleString()}</span>
                  </div>
                  {admissionFee > 0 && (
                    <div className="flex justify-between">
                      <span>Admission Fee:</span>
                      <span>PKR {admissionFee.toLocaleString()}</span>
                    </div>
                  )}
                  {librarySecurity > 0 && (
                    <div className="flex justify-between">
                      <span>Library Security (Refundable):</span>
                      <span>PKR {librarySecurity.toLocaleString()}</span>
                    </div>
                  )}
                  {registrationFee > 0 && (
                    <div className="flex justify-between">
                      <span>University Registration:</span>
                      <span>PKR {registrationFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Examination Charges:</span>
                    <span>PKR {examFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Student Activities Fund:</span>
                    <span>PKR {studentActivityFund.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-black text-xs pt-1.5 border-t border-slate-300 text-slate-900">
                    <span>TOTAL AMOUNT:</span>
                    <span>PKR {totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between text-[8px] text-slate-400">
                  <span>Bank Officer Signature</span>
                  <span>Branch Cashier Stamp</span>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Simulation & Receipt Upload */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-slate-800">Bank Deposit & Online Verification:</p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Deposit fee at any Allied Bank (ABL) or Bank of Khyber (BoK) online branch. Status updates within 24–48 banking hours.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setVoucherPaid(!voucherPaid);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs ${
                  voucherPaid 
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                }`}
              >
                {voucherPaid ? '✓ Paid & Reconciled' : 'Simulate Bank Deposit'}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: Refund & Installment Regulations */}
      {activeTab === 'policies' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
            Official Fee Regulations & Refund Schedule
          </h3>

          {/* HEC / IMSciences Refund Grid */}
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Timeline of Withdrawal Request</th>
                  <th className="p-3">Percentage of Tuition Fee Refund</th>
                  <th className="p-3">Admission & Registration Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-800">Up to 7th day of convening of classes</td>
                  <td className="p-3 font-bold text-emerald-700">100% Full Refund</td>
                  <td className="p-3 text-slate-500">Non-refundable</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-800">8th to 15th day of convening of classes</td>
                  <td className="p-3 font-bold text-amber-700">50% Half Refund</td>
                  <td className="p-3 text-slate-500">Non-refundable</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-800">From 16th day of convening of classes</td>
                  <td className="p-3 font-bold text-rose-700">0% No Refund</td>
                  <td className="p-3 text-slate-500">Non-refundable</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">Late Payment Surcharge Policy:</h4>
              <p className="text-slate-600 leading-relaxed">
                • If the semester fee is not deposited by the announced deadline, a late fine of <strong>PKR 200 per day</strong> applies up to 14 days.
              </p>
              <p className="text-slate-600 leading-relaxed">
                • Beyond 14 days, student registration is temporarily frozen and a re-admission surcharge of PKR 5,000 is required upon approval of the Director.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">Installment Request Rules:</h4>
              <p className="text-slate-600 leading-relaxed">
                • Needy students can request two equal installments by submitting an official application to the Finance Office before the original due date.
              </p>
              <p className="text-slate-600 leading-relaxed">
                • First installment (50%) must be deposited prior to course registration; second installment must be deposited prior to midterm examinations.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
