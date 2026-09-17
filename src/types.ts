export type UserRole = 
  | 'applicant' 
  | 'student' 
  | 'faculty' 
  | 'staff' 
  | 'administrator';

export type StaffDepartment =
  | 'Admissions Officer'
  | 'Finance Officer'
  | 'Grants/Scholarship Officer'
  | 'Examination Officer'
  | 'Program Office Staff'
  | 'Student Support Staff'
  | 'Hostel Staff'
  | 'Library Staff'
  | 'IT/System Staff'
  | 'Helpdesk Agent';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  staffRole?: StaffDepartment;
  studentId?: string;
  applicantId?: string;
  department?: string;
  semester?: number;
  avatar?: string;
}

export type IntentType =
  | 'ADMISSION'
  | 'PROGRAM'
  | 'ELIGIBILITY'
  | 'APPLICATION'
  | 'APPLICATION_STATUS'
  | 'ADMISSION_TEST'
  | 'TEST_SLIP'
  | 'MERIT'
  | 'SCHOLARSHIP'
  | 'FINANCIAL_AID'
  | 'FEE'
  | 'FEE_VOUCHER'
  | 'PAYMENT'
  | 'REFUND'
  | 'ACADEMIC'
  | 'COURSE'
  | 'REGISTRATION'
  | 'TIMETABLE'
  | 'EXAM'
  | 'RESULT'
  | 'ATTENDANCE'
  | 'DOCUMENT'
  | 'TRANSCRIPT'
  | 'CERTIFICATE'
  | 'HOSTEL'
  | 'TRANSPORT'
  | 'LIBRARY'
  | 'COMPLAINT'
  | 'IT_SUPPORT'
  | 'ANNOUNCEMENT'
  | 'DEADLINE'
  | 'OFFICE_CONTACT'
  | 'GENERAL_FAQ';

export interface OfficeContact {
  id: string;
  name: string;
  category: string;
  incharge: string;
  designation: string;
  phone: string;
  extension: string;
  email: string;
  location: string;
  officeHours: string;
  services: string[];
  officialSource: string;
  lastUpdated: string;
}

export interface DegreeProgram {
  id: string;
  name: string;
  code: string;
  degreeLevel: 'Undergraduate' | 'Graduate' | 'MS / MPhil' | 'PhD';
  department: string;
  specializations?: string[];
  durationYears: number;
  totalSemesters: number;
  creditHours: number;
  eligibility: string;
  minPercentage: number;
  admissionCycle: 'Fall 2026' | 'Spring 2027';
  isOpenForAdmission: boolean;
  semesterFee: number;
  admissionFee: number;
  totalSeats: number;
  officialSource: string;
  lastUpdated: string;
  description: string;
  testRequirement?: string;
  careerProspects?: string;
}

export type ApplicationStatus =
  | 'Draft'
  | 'Submitted'
  | 'Pending Verification'
  | 'Documents Required'
  | 'Verified'
  | 'Rejected'
  | 'Test Required'
  | 'Test Scheduled'
  | 'Selected'
  | 'Waiting'
  | 'Not Selected'
  | 'Admission Confirmed'
  | 'Enrolled';

export interface UploadedDoc {
  id: string;
  name: string;
  type: string;
  required: boolean;
  status: 'pending' | 'uploaded' | 'verified' | 'action_required' | 'Verified' | 'Action Required';
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  rejectionReason?: string;
  uploadedAt?: string;
}

export interface AdmissionApplication {
  id: string;
  applicationNo?: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  cnic: string;
  phone: string;
  domicile: string;
  selectedProgramId: string;
  selectedProgramName: string;
  programName?: string;
  secondaryChoiceProgramId?: string;
  status: ApplicationStatus;
  submissionDate?: string;
  matricMarks: { obtained: number; total: number; board: string; year: number; percentage?: number };
  interMarks: { obtained: number; total: number; board: string; year: number; percentage?: number };
  documents: UploadedDoc[];
  challanNumber?: string;
  challanAmount?: number;
  isChallanPaid: boolean;
  feeChallanPaid?: boolean;
  paymentBank?: string;
  depositSlipUrl?: string;
  depositDate?: string;
  testRollNo?: string;
  testDate?: string;
  testTime?: string;
  testCenter?: string;
  testScore?: number;
  meritRank?: number;
  isTestSlipGenerated?: boolean;
  actionRequiredMessage?: string;
  actionRequiredReason?: string;
  testSchedule?: {
    date: string;
    time: string;
    venue: string;
    reportingTime?: string;
    rollNumber?: string;
  };
  lastUpdated: string;
}

export interface ScholarshipItem {
  id: string;
  name: string;
  provider: string;
  category: 
    | 'Fully Funded' 
    | 'Need-based' 
    | 'Merit-based' 
    | 'IMSciences Institutional' 
    | 'Government & HEC' 
    | 'Donor-funded' 
    | 'Special Quota & Rebates';
  degreeLevel: ('Undergraduate' | 'Graduate' | 'MS / MPhil' | 'PhD')[];
  eligiblePrograms: string[];
  eligibility: string;
  academicRequirements: string;
  financialRequirements: string;
  domicileRequirements: string;
  coverage: string;
  stipend?: string;
  deadline: string;
  session: string;
  approvalStatus: 'Active & Verified' | 'Pending Donor Approval' | 'Closed for Current Cycle';
  officialSource: string;
  applicationProcedure: string;
  lastUpdated: string;
}

export interface ScholarshipApplication {
  id: string;
  scholarshipId: string;
  scholarshipName: string;
  studentId: string;
  studentName: string;
  program: string;
  cgpa: number;
  monthlyHouseholdIncome: number;
  status: 'Applied' | 'Under Review' | 'Interview Scheduled' | 'Pending Donor Approval' | 'Approved' | 'Rejected' | 'Waitlisted';
  appliedDate: string;
  notes?: string;
}

export interface FeeStructureItem {
  id: string;
  programId: string;
  programName: string;
  degreeLevel: string;
  session: string;
  tuitionFee: number;
  admissionFee: number;
  registrationFee: number;
  examFee: number;
  librarySecurity: number;
  labCharges: number;
  totalFirstSemester: number;
  subsequentSemesterFee: number;
  officialSource: string;
  lastUpdated: string;
}

export interface FeeVoucher {
  id: string;
  voucherNo: string;
  studentId: string;
  studentName: string;
  program: string;
  semester: number;
  dueDate: string;
  amount: number;
  lateFee: number;
  totalWithLateFee: number;
  status: 'Pending' | 'Challan Generated' | 'Submitted' | 'Verification Pending' | 'Paid' | 'Failed' | 'Refunded';
  paidDate?: string;
  bankName?: string;
  transactionId?: string;
  depositSlipUploaded?: boolean;
}

export interface CourseItem {
  id: string;
  code: string;
  title: string;
  creditHours: number;
  program: string;
  semester: number;
  instructor: string;
  prerequisites: string[];
  description: string;
}

export interface TimetableSlot {
  id: string;
  courseCode: string;
  courseTitle: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string;
  room: string;
  instructor: string;
  program: string;
  section: string;
}

export interface ExamDateSheetItem {
  id: string;
  courseCode: string;
  courseTitle: string;
  examType: 'Midterm Exam' | 'Final Exam';
  date: string;
  time: string;
  venue: string;
  seatingPlanRow: string;
  program: string;
  semester: number;
  instructions: string;
}

export interface StudentResult {
  studentId: string;
  studentName: string;
  program: string;
  currentSemester: number;
  cgpa: number;
  semesters: {
    semesterNumber: number;
    gpa: number;
    totalCredits: number;
    courses: {
      code: string;
      title: string;
      grade: string;
      gradePoints: number;
      creditHours: number;
    }[];
  }[];
}

export interface AttendanceRecord {
  courseCode: string;
  courseTitle: string;
  instructor: string;
  totalClasses: number;
  attendedClasses: number;
  absentClasses: number;
  percentage: number;
  status: 'Good' | 'Satisfactory' | 'Warning (<75% - Exam Barred)';
}

export interface DocumentRequest {
  id: string;
  studentId: string;
  studentName: string;
  documentType: 
    | 'Official Transcript' 
    | 'Degree Certificate' 
    | 'Provisional Certificate' 
    | 'Bonafide / Student Certificate' 
    | 'Character Certificate' 
    | 'Migration Certificate / NOC' 
    | 'Enrollment Verification' 
    | 'Duplicate Student ID Card';
  reason: string;
  feeAmount: number;
  isFeePaid: boolean;
  status: 'Request' | 'Verification' | 'Processing' | 'Ready for Collection' | 'Delivered';
  requestDate: string;
  completionDate?: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'Admissions' | 'Scholarships' | 'Exams' | 'Academic' | 'Fee' | 'Events' | 'Student Affairs' | 'Important';
  expiryDate?: string;
  targetAudience: 'All' | 'Applicants' | 'Students' | 'Faculty';
  officialSource: string;
  isUrgent?: boolean;
}

export interface DeadlineItem {
  id: string;
  title: string;
  category: 'Admissions' | 'Scholarships' | 'Fees' | 'Academics' | 'Exams' | 'Documents';
  targetDate: string;
  programOrTarget?: string;
  description: string;
  officialSource: string;
  status: 'Upcoming' | 'Today' | 'Expired';
}

export interface TicketMessage {
  id: string;
  sender: string;
  senderRole: string;
  timestamp: string;
  text: string;
  attachmentName?: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  category: 
    | 'Admissions'
    | 'Finance'
    | 'Scholarships'
    | 'Academics'
    | 'Examination'
    | 'Hostel'
    | 'Transport'
    | 'Library'
    | 'IT'
    | 'Student Support'
    | 'Other';
  subject: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignedOffice: string;
  assignedStaff?: string;
  status: 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'WAITING_FOR_STUDENT' | 'RESOLVED' | 'CLOSED';
  createdDate: string;
  updatedDate: string;
  conversation: TicketMessage[];
}

export interface KnowledgeItem {
  id: string;
  title: string;
  category: IntentType | 'GENERAL';
  content: string;
  sourceUrl: string;
  sourceName: string;
  publicationDate: string;
  effectiveDate: string;
  expiryDate?: string;
  academicSession: string;
  verificationStatus: 'VERIFIED' | 'PENDING_REVIEW' | 'EXPIRED';
  lastVerifiedDate: string;
  priorityOrder: number; // 1 (highest: current announcement) to 7 (older docs)
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  intent?: IntentType;
  confidence?: number;
  sources?: {
    title: string;
    url: string;
    sourceType: string;
    verifiedDate: string;
  }[];
  handoffOffice?: {
    officeName: string;
    email: string;
    phone: string;
    location: string;
    reason: string;
  };
}

// Aliases for unified component compatibility
export type ProgramItem = DegreeProgram;
export type ApplicationRecord = AdmissionApplication;
export type OfficeItem = OfficeContact;
export type ExamScheduleItem = ExamDateSheetItem;
export type StudentResultRecord = StudentResult;
export type TicketStatus = SupportTicket['status'];

export interface AuditLogItem {
  id: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: string;
}

export interface DocumentRequestItem {
  id: string;
  studentId: string;
  studentName: string;
  docType: string;
  urgency: 'Normal' | 'Urgent';
  fee: number;
  feePaid: boolean;
  status: 'Requested' | 'Under Processing' | 'Ready for Collection' | 'Dispatched';
  trackingNumber: string;
  requestedDate: string;
  expectedCompletionDate: string;
  clearanceStatus: {
    libraryClear: boolean;
    accountsClear: boolean;
    examClear: boolean;
  };
}

export interface TicketMessageItem {
  id: string;
  senderName: string;
  senderRole: string;
  message: string;
  timestamp: string;
}

export interface TicketItem {
  id: string;
  ticketNumber: string;
  creatorId: string;
  creatorName: string;
  creatorRole: string;
  assignedOffice: string;
  category: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: TicketStatus;
  subject: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessageItem[];
}

