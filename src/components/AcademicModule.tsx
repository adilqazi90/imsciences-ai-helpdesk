import React, { useState } from 'react';
import { 
  Calendar, 
  BookOpen, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  Printer, 
  UserCheck, 
  ShieldAlert, 
  HelpCircle,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { CourseItem, TimetableSlot, ExamScheduleItem, StudentResultRecord, AttendanceRecord } from '../types';

interface AcademicModuleProps {
  courses: CourseItem[];
  timetable: TimetableSlot[];
  exams: ExamScheduleItem[];
  result: StudentResultRecord;
  attendance: AttendanceRecord[];
  onOpenAIChatWithQuery: (query: string) => void;
}

export const AcademicModule: React.FC<AcademicModuleProps> = ({
  courses,
  timetable,
  exams,
  result,
  attendance,
  onOpenAIChatWithQuery
}) => {
  const [subTab, setSubTab] = useState<'attendance' | 'timetable' | 'exams' | 'results'>('attendance');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredTimetable = timetable.filter(t => t.day === selectedDay);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner with 75% Attendance Warning Policy */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 text-white rounded-2xl p-5 border border-blue-900/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-800 text-blue-300 flex items-center justify-center shrink-0 border border-blue-700">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg font-['Outfit',sans-serif]">Academics & Examination Division</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-400/30">
                75% Rule Enforced
              </span>
            </div>
            <p className="text-xs text-blue-200/90 mt-0.5 max-w-2xl">
              Official University Regulations: Students must maintain at least <strong>75% mandatory attendance</strong> in every course to qualify for final examination appearance.
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenAIChatWithQuery('What are the official attendance rules, grading scale, and exam policies at IMSciences?')}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs self-end sm:self-center shrink-0"
        >
          <span>Ask AI Academic Rules</span>
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSubTab('attendance')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'attendance'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Attendance Tracker (75% Rule)
        </button>
        <button
          onClick={() => setSubTab('timetable')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'timetable'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Weekly Timetable & Schedule
        </button>
        <button
          onClick={() => setSubTab('exams')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'exams'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Examination Date Sheets & Seating
        </button>
        <button
          onClick={() => setSubTab('results')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'results'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Semester Results & CGPA Transcript
        </button>
      </div>

      {/* Tab 1: Attendance Tracker (75% rule) */}
      {subTab === 'attendance' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
                Course Attendance Tracker (Fall 2026)
              </h3>
              <p className="text-xs text-slate-500">
                Minimum required threshold: <strong>75%</strong> to be eligible for final examinations.
              </p>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-700 font-semibold">Eligible (≥75%)</span>
              <span className="h-2 w-2 rounded-full bg-rose-500 ml-2"></span>
              <span className="text-rose-700 font-semibold">Short Attendance Barred (&lt;75%)</span>
            </div>
          </div>

          {/* Attendance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {attendance.map((rec) => {
              const isWarning = rec.percentage < 75;
              return (
                <div
                  key={rec.courseCode}
                  className={`p-4 rounded-2xl border transition-all ${
                    isWarning 
                      ? 'border-rose-300 bg-rose-50/40' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {rec.courseCode}
                    </span>
                    <span className={`text-xs font-black font-mono ${isWarning ? 'text-rose-700' : 'text-emerald-700'}`}>
                      {rec.percentage}%
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900">{rec.courseTitle}</h4>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isWarning ? 'bg-rose-600' : 'bg-emerald-600'
                        }`}
                        style={{ width: `${Math.min(100, rec.percentage)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                    <span>Classes Attended: <strong>{rec.attendedClasses} / {rec.totalClasses}</strong></span>
                    <span>Missed: <strong>{rec.totalClasses - rec.attendedClasses}</strong></span>
                  </div>

                  {isWarning ? (
                    <div className="mt-3 pt-2 border-t border-rose-200 text-rose-800 text-xs flex items-center gap-1.5 font-semibold">
                      <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600" />
                      <span>Warning: Less than 75%. Barred from Final Exam unless medical leave verified!</span>
                    </div>
                  ) : (
                    <div className="mt-3 pt-2 border-t border-slate-100 text-emerald-800 text-xs flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span>Eligible for Final Examination appearance.</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Regulations footnote */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <h5 className="font-bold text-slate-800">Medical Absence Concession:</h5>
            <p className="leading-relaxed">
              Medical certificates from recognized government or civil hospital physicians must be submitted to the Student Support Office within 7 calendar days of absence to obtain up to 10% attendance relaxation.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Timetable */}
      {subTab === 'timetable' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
                Section Timetable (BS Computer Science - Sem 6)
              </h3>
              <p className="text-xs text-slate-500">
                Official lecture schedule & designated laboratory allocations.
              </p>
            </div>

            {/* Day Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    selectedDay === day
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Slots List */}
          <div className="space-y-3">
            {filteredTimetable.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No scheduled lectures on {selectedDay}.</p>
            ) : (
              filteredTimetable.map((slot) => (
                <div
                  key={slot.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 font-mono font-bold">
                      <Clock className="h-5 w-5 text-emerald-800" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 text-sm">
                          {slot.time}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border text-slate-700">
                          {slot.courseCode}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mt-0.5">{slot.courseTitle}</h4>
                      <p className="text-slate-500 text-[11px] mt-0.5">Instructor: {slot.instructor}</p>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <span className="font-bold text-slate-900 block flex items-center sm:justify-end gap-1 text-xs">
                      <MapPin className="h-3.5 w-3.5 text-emerald-700" />
                      {slot.room}
                    </span>
                    <span className="text-[10px] text-slate-500">{slot.section}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Exam Schedules */}
      {subTab === 'exams' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
                Examination Date Sheets & Seating Allocation
              </h3>
              <p className="text-xs text-slate-500">
                Official Examination Office Date Sheet · Fall 2026 Midterm Exams
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Date Sheet</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Course Code & Title</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Exam Hall</th>
                  <th className="p-3">Seating Row</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {exams.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <span className="font-mono font-bold text-emerald-800 mr-2">{ex.courseCode}</span>
                      <span className="font-semibold text-slate-900">{ex.courseTitle}</span>
                    </td>
                    <td className="p-3 font-semibold text-slate-800">{ex.date}</td>
                    <td className="p-3 font-mono text-slate-600">{ex.time}</td>
                    <td className="p-3 font-medium text-slate-800">{ex.venue}</td>
                    <td className="p-3 font-mono font-bold text-indigo-900">{ex.seatingPlanRow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
            <h5 className="font-bold">Exam Center Rules:</h5>
            <p>1. Students must bring their official IMSciences Student ID Card and Examination Slip.</p>
            <p>2. No mobile phones, digital smartwatches, or programmable devices are allowed inside the hall.</p>
            <p>3. Candidates arriving 30 minutes after commencement will not be allowed entry.</p>
          </div>
        </div>
      )}

      {/* Tab 4: Results & CGPA Transcript */}
      {subTab === 'results' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
                Academic Result Record & Grade Breakdown
              </h3>
              <p className="text-xs text-slate-500">
                Student: <strong>{result.studentName}</strong> ({result.studentId}) · {result.program}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">Latest Semester GPA</span>
                <span className="font-mono font-black text-lg text-emerald-950">
                  {result.semesters[result.semesters.length - 1]?.gpa?.toFixed(2) || '3.72'}
                </span>
              </div>
              <div className="bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-200 text-center">
                <span className="text-[10px] uppercase font-bold text-indigo-700 block">Cumulative CGPA</span>
                <span className="font-mono font-black text-lg text-indigo-950">{result.cgpa.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Course Grades Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Code</th>
                  <th className="p-3">Course Title</th>
                  <th className="p-3">Credit Hours</th>
                  <th className="p-3">Grade</th>
                  <th className="p-3">Grade Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(result.semesters[result.semesters.length - 1]?.courses || []).map((c) => (
                  <tr key={c.code} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-700">{c.code}</td>
                    <td className="p-3 font-semibold text-slate-900">{c.title}</td>
                    <td className="p-3 text-slate-600">{c.creditHours}</td>
                    <td className="p-3">
                      <span className="font-bold text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                        {c.grade}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-emerald-800">{c.gradePoints.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Official HEC 4.0 Grading Scheme */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <h5 className="font-bold text-slate-800">IMSciences Official Grading System (HEC Scale):</h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600">
              <div>A: 85% & Above (4.00 GP)</div>
              <div>A-: 80% – 84% (3.67 GP)</div>
              <div>B+: 75% – 79% (3.33 GP)</div>
              <div>B: 71% – 74% (3.00 GP)</div>
              <div>B-: 68% – 70% (2.67 GP)</div>
              <div>C+: 64% – 67% (2.33 GP)</div>
              <div>C: 60% – 63% (2.00 GP)</div>
              <div>F: Below 50% (0.00 GP / Fail)</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
