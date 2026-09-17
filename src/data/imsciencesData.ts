import { 
  OfficeContact, 
  DegreeProgram, 
  ScholarshipItem, 
  FeeStructureItem, 
  CourseItem, 
  TimetableSlot, 
  ExamDateSheetItem, 
  StudentResult, 
  AttendanceRecord, 
  DocumentRequest, 
  NoticeItem, 
  DeadlineItem, 
  SupportTicket, 
  TicketItem,
  KnowledgeItem,
  AdmissionApplication
} from '../types';

export const UNIVERSITY_INFO = {
  name: 'Institute of Management Sciences (IMSciences)',
  shortName: 'IMSciences Peshawar',
  tagline: 'Excellence in Management & Computer Science Education',
  location: '1-A, Sector E-5, Phase VII, Hayatabad, Peshawar, Khyber Pakhtunkhwa, Pakistan',
  phone: '+92-91-9217451, +92-91-9217452, +92-91-5861024',
  fax: '+92-91-9217407',
  admissionEmail: 'admissions@imsciences.edu.pk',
  infoEmail: 'info@imsciences.edu.pk',
  officialWebsite: 'https://imsciences.edu.pk/',
  admissionPortal: 'https://admissions.imsciences.edu.pk/',
  status: 'Public Sector Chartered Degree Awarding Higher Education Institution',
  currentSession: 'Fall 2026',
};

export const INITIAL_OFFICES: OfficeContact[] = [
  {
    id: 'off-admissions',
    name: 'Admissions Office',
    category: 'Admissions & Enrollment',
    incharge: 'Mr. Asad Khan',
    designation: 'Manager Admissions & Student Affairs',
    phone: '+92-91-9217451',
    extension: 'Ext. 102 / 103',
    email: 'admissions@imsciences.edu.pk',
    location: 'Ground Floor, Academic Block A, Room G-04',
    officeHours: 'Monday – Friday: 08:30 AM – 04:30 PM (Lunch break: 01:00 PM – 02:00 PM)',
    services: [
      'Undergraduate & Graduate Admission Inquiries',
      'Application Verification & Eligibility Checks',
      'Entrance Test Guidance & Test Slip Queries',
      'Merit Lists & Selection Offer Letters',
      'Document Attestation & Verification'
    ],
    officialSource: 'https://imsciences.edu.pk/admissions/',
    lastUpdated: '2026-09-15'
  },
  {
    id: 'off-grants',
    name: 'Grants & Scholarship Office',
    category: 'Financial Aid',
    incharge: 'Syed Zulfiqar Ali',
    designation: 'Senior Manager Grants & Scholarships',
    phone: '+92-91-9217451',
    extension: 'Ext. 125',
    email: 'scholarships@imsciences.edu.pk',
    location: 'First Floor, Central Administrative Block, Room F-12',
    officeHours: 'Monday – Friday: 09:00 AM – 04:00 PM',
    services: [
      'HEC Need Based Scholarships Processing',
      'Prime Minister National Financial Aid Programs',
      'Chief Minister Education Endowment Fund (CMEEF KP)',
      'IMSciences Institutional Need & Merit Scholarships',
      'FATA / Merged Districts Special Quota Grants',
      'Sibling Fee Rebate Applications'
    ],
    officialSource: 'https://imsciences.edu.pk/scholarships/',
    lastUpdated: '2026-09-12'
  },
  {
    id: 'off-finance',
    name: 'Finance & Accounts Office',
    category: 'Fees & Finance',
    incharge: 'Mr. Tariq Mehmood',
    designation: 'Treasurer / Chief Financial Officer',
    phone: '+92-91-9217451',
    extension: 'Ext. 110 / 111',
    email: 'finance@imsciences.edu.pk',
    location: 'Ground Floor, Administration Block, Room G-08',
    officeHours: 'Monday – Friday: 09:00 AM – 03:30 PM (Cash Counter: 09:30 AM – 02:30 PM)',
    services: [
      'Semester Fee Challan Issuance & Re-issuance',
      'Bank Deposit Verification (Allied Bank & Bank of Khyber)',
      'Refund & Security Deposit Clearance',
      'Installment Requests & Fee Installment Sanctions',
      'Hostel & Transport Fee Clearance'
    ],
    officialSource: 'https://imsciences.edu.pk/finance/',
    lastUpdated: '2026-09-10'
  },
  {
    id: 'off-exam',
    name: 'Examination Office',
    category: 'Examinations & Grading',
    incharge: 'Dr. Mohammad Naeem',
    designation: 'Controller of Examinations',
    phone: '+92-91-9217451',
    extension: 'Ext. 118 / 119',
    email: 'controller.exam@imsciences.edu.pk',
    location: 'Second Floor, Examination Wing, Room S-22',
    officeHours: 'Monday – Friday: 08:30 AM – 04:00 PM',
    services: [
      'Midterm & Final Examination Date Sheets',
      'Roll Number Slips & Seating Plans',
      'Official Academic Transcripts (DMC)',
      'Degree Verification & Convocation Services',
      'Paper Rechecking & Grade Review Applications'
    ],
    officialSource: 'https://imsciences.edu.pk/examination/',
    lastUpdated: '2026-09-14'
  },
  {
    id: 'off-student-support',
    name: 'Students Support & Program Offices',
    category: 'Student Affairs',
    incharge: 'Ms. Rabia Shah',
    designation: 'Head of Student Services & Program Coordinator',
    phone: '+92-91-9217451',
    extension: 'Ext. 114 / 115',
    email: 'student.support@imsciences.edu.pk',
    location: 'Student Facilitation Center, Academic Block B',
    officeHours: 'Monday – Friday: 09:00 AM – 04:30 PM',
    services: [
      'Course Registration & Add/Drop Requests',
      'Bonafide, Character & Migration Certificates',
      'Student Identity Cards & Duplicate Cards',
      'Academic Advising & Timetable Inquiries',
      'Student Grievance Redressal & Counselling'
    ],
    officialSource: 'https://imsciences.edu.pk/student-affairs/',
    lastUpdated: '2026-09-15'
  },
  {
    id: 'off-registrar',
    name: 'Registrar Office',
    category: 'Governance & Records',
    incharge: 'Mr. M. Shahzad',
    designation: 'Registrar',
    phone: '+92-91-9217408',
    extension: 'Ext. 101',
    email: 'registrar@imsciences.edu.pk',
    location: 'First Floor, Executive Directorate Wing',
    officeHours: 'Monday – Friday: 08:30 AM – 04:30 PM',
    services: [
      'Institutional Governance & Statutory Bodies',
      'Faculty & Academic Staff Regulations',
      'Official Institute Affiliations & HEC Accreditation',
      'Disciplinary Proceedings & Academic Council Decisions'
    ],
    officialSource: 'https://imsciences.edu.pk/governance/registrar/',
    lastUpdated: '2026-09-01'
  },
  {
    id: 'off-director-sec',
    name: "Director's Secretariat",
    category: 'Executive Office',
    incharge: 'Prof. Dr. Usman Ghani',
    designation: 'Director, IMSciences Peshawar',
    phone: '+92-91-9217405',
    extension: 'Ext. 100',
    email: 'director@imsciences.edu.pk',
    location: 'Directorate Wing, Top Floor',
    officeHours: 'By appointment only',
    services: [
      'Strategic University Leadership',
      'High-level Policy Decisions',
      'National & International Memorandums of Understanding (MoUs)'
    ],
    officialSource: 'https://imsciences.edu.pk/',
    lastUpdated: '2026-09-01'
  },
  {
    id: 'off-joint-director',
    name: 'Joint Director Office',
    category: 'Executive Office',
    incharge: 'Dr. Atta Ur Rahman',
    designation: 'Joint Director',
    phone: '+92-91-9217406',
    extension: 'Ext. 105',
    email: 'jointdirector@imsciences.edu.pk',
    location: 'Executive Wing, First Floor',
    officeHours: 'Monday – Friday: 09:00 AM – 04:00 PM',
    services: [
      'Academic Operations Management',
      'Faculty Coordination & Curriculum Oversight',
      'Institutional Development Committees'
    ],
    officialSource: 'https://imsciences.edu.pk/',
    lastUpdated: '2026-09-01'
  },
  {
    id: 'off-it-erp',
    name: 'System & ERP Office',
    category: 'Information Technology',
    incharge: 'Engr. Fawad Ahmad',
    designation: 'Head of IT & Systems Infrastructure',
    phone: '+92-91-9217451',
    extension: 'Ext. 130 / 131',
    email: 'erp.support@imsciences.edu.pk',
    location: 'Computer Center Wing, 2nd Floor, Server Room S-10',
    officeHours: 'Monday – Friday: 08:30 AM – 05:00 PM',
    services: [
      'Student Campus ERP & Portal Access Support',
      'Institutional Email Account Issuance (@imsciences.edu.pk)',
      'Campus Wi-Fi & Network Access Authentication',
      'Lab Computing Facilities & Software Access',
      'Cybersecurity & Portal Account Password Resets'
    ],
    officialSource: 'https://imsciences.edu.pk/it-services/',
    lastUpdated: '2026-09-16'
  },
  {
    id: 'off-library',
    name: 'Central Library',
    category: 'Learning Resources',
    incharge: 'Mr. Arshad Jamal',
    designation: 'Chief Librarian',
    phone: '+92-91-9217451',
    extension: 'Ext. 140 / 141',
    email: 'library@imsciences.edu.pk',
    location: 'Independent Library Building (Opposite Academic Block A)',
    officeHours: 'Monday – Saturday: 08:00 AM – 08:00 PM',
    services: [
      'Book Borrowing, Renewals & Reservations',
      'HEC National Digital Library & IEEE / ACM Access',
      'Plagiarism Check (Turnitin) Services',
      'Silent Research Cubicles & Discussion Rooms',
      'E-book & Research Journal Retrieval Assistance'
    ],
    officialSource: 'https://imsciences.edu.pk/library/',
    lastUpdated: '2026-09-12'
  },
  {
    id: 'off-hostel',
    name: 'Hostel Administration Office',
    category: 'Student Accommodation',
    incharge: 'Dr. Shafi Ullah',
    designation: 'Provost / Chief Warden',
    phone: '+92-91-9217451',
    extension: 'Ext. 145',
    email: 'hostel@imsciences.edu.pk',
    location: 'On-Campus Boys & Girls Hostel Complex',
    officeHours: 'Monday – Friday: 08:30 AM – 04:30 PM (Emergency Warden: 24/7)',
    services: [
      'Hostel Room Allocation & Waiting List Management',
      'Mess Management & Hostel Fee Clearance',
      'Hostel Rules, Gates Security & Gate Passes',
      'Medical First-aid Facilitation for Residents'
    ],
    officialSource: 'https://imsciences.edu.pk/hostels/',
    lastUpdated: '2026-09-14'
  },
  {
    id: 'off-transport',
    name: 'Transport Office',
    category: 'Commuter Services',
    incharge: 'Mr. Gulzar Muhammad',
    designation: 'Transport Supervisor',
    phone: '+92-91-9217451',
    extension: 'Ext. 148',
    email: 'transport@imsciences.edu.pk',
    location: 'Transport Depot, Near Gate 2',
    officeHours: 'Monday – Friday: 07:30 AM – 05:00 PM',
    services: [
      'Peshawar City Bus Route Timetables & Stop Allocations',
      'Semester Transport Card Issuance & Renewals',
      'Bus Route Expansion & Feedback Management'
    ],
    officialSource: 'https://imsciences.edu.pk/transport/',
    lastUpdated: '2026-09-11'
  },
  {
    id: 'off-cdc',
    name: 'Career Development Center (CDC)',
    category: 'Placement & Careers',
    incharge: 'Ms. Mehreen Malik',
    designation: 'Manager CDC & Corporate Relations',
    phone: '+92-91-9217451',
    extension: 'Ext. 128',
    email: 'cdc@imsciences.edu.pk',
    location: 'Ground Floor, Student Facilitation Wing, Room G-15',
    officeHours: 'Monday – Friday: 09:00 AM – 04:30 PM',
    services: [
      'Internship Placements & Corporate Recruitment Drives',
      'Resume / CV Review Clinics & Mock Interviews',
      'Annual IMSciences Job Fair & Industry Networking',
      'Alumni Career Tracking & Mentorship Programs'
    ],
    officialSource: 'https://imsciences.edu.pk/cdc/',
    lastUpdated: '2026-09-15'
  },
  {
    id: 'off-qec',
    name: 'Quality Enhancement Cell (QEC)',
    category: 'Quality Assurance',
    incharge: 'Dr. Shahzad Khan',
    designation: 'Director QEC',
    phone: '+92-91-9217451',
    extension: 'Ext. 135',
    email: 'qec@imsciences.edu.pk',
    location: 'Block C, Room 204',
    officeHours: 'Monday – Friday: 09:00 AM – 04:00 PM',
    services: [
      'Teacher & Course Student Feedback Evaluations',
      'HEC Institutional Performance Evaluation (IPE)',
      'Program Self-Assessment Reports (SAR)',
      'National & International Quality Accreditations'
    ],
    officialSource: 'https://imsciences.edu.pk/qec/',
    lastUpdated: '2026-09-08'
  },
  {
    id: 'off-oric',
    name: 'ORIC (Office of Research, Innovation & Commercialization)',
    category: 'Research & Innovation',
    incharge: 'Dr. Zahoor Khan',
    designation: 'Director ORIC',
    phone: '+92-91-9217451',
    extension: 'Ext. 138',
    email: 'oric@imsciences.edu.pk',
    location: 'Research Complex, 1st Floor',
    officeHours: 'Monday – Friday: 09:00 AM – 04:00 PM',
    services: [
      'Faculty & Student Research Grant Proposals (NRPU / HEC)',
      'Technology Transfer & Commercialization',
      'Incubation & Startup Mentorship (Business Incubation Center)',
      'IMSciences Journal of Management & Computing Sciences'
    ],
    officialSource: 'https://imsciences.edu.pk/oric/',
    lastUpdated: '2026-09-05'
  },
  {
    id: 'off-hrdc',
    name: 'Human Resource Development Center (HRDC)',
    category: 'Training & Development',
    incharge: 'Mr. Farooq Afridi',
    designation: 'Coordinator HRDC',
    phone: '+92-91-9217451',
    extension: 'Ext. 150',
    email: 'hrdc@imsciences.edu.pk',
    location: 'HRDC Training Hall, Block B',
    officeHours: 'Monday – Friday: 09:00 AM – 04:30 PM',
    services: [
      'Executive Professional Trainings & Short Courses',
      'Government & Development Sector Capacity Building',
      'Corporate Certifications & Workshops'
    ],
    officialSource: 'https://imsciences.edu.pk/hrdc/',
    lastUpdated: '2026-09-05'
  },
  {
    id: 'off-medical',
    name: 'Medical Center',
    category: 'Health Services',
    incharge: 'Dr. Ayesha Mir',
    designation: 'Resident Medical Officer',
    phone: '+92-91-9217451',
    extension: 'Ext. 160',
    email: 'medical@imsciences.edu.pk',
    location: 'Health Clinic, Adjacent to Sports Ground',
    officeHours: 'Monday – Saturday: 08:30 AM – 06:00 PM (Emergency First Aid On-Call)',
    services: [
      'Outpatient Consultation & Emergency First Aid',
      'Free Basic Medications for Students and Staff',
      'Medical Fitness Certificates for Admissions and Hostels',
      'Emergency Ambulance Coordination'
    ],
    officialSource: 'https://imsciences.edu.pk/medical/',
    lastUpdated: '2026-09-10'
  },
  {
    id: 'off-internal-audit',
    name: 'Internal Audit Office',
    category: 'Compliance & Audit',
    incharge: 'Mr. Nisar Khan',
    designation: 'Head of Internal Audit',
    phone: '+92-91-9217451',
    extension: 'Ext. 112',
    email: 'audit@imsciences.edu.pk',
    location: 'Administrative Block, Room G-11',
    officeHours: 'Monday – Friday: 09:00 AM – 04:00 PM',
    services: [
      'Financial Compliance & Transparency Inquiries',
      'Internal Pre-audit of Institute Accounts'
    ],
    officialSource: 'https://imsciences.edu.pk/',
    lastUpdated: '2026-09-01'
  },
  {
    id: 'off-planning',
    name: 'Planning & Development Office',
    category: 'Infrastructure & Projects',
    incharge: 'Engr. Junaid Iqbal',
    designation: 'Director Planning & Development',
    phone: '+92-91-9217451',
    extension: 'Ext. 155',
    email: 'planning@imsciences.edu.pk',
    location: 'Works Directorate, Ground Floor',
    officeHours: 'Monday – Friday: 08:30 AM – 04:30 PM',
    services: [
      'Campus Physical Master Plan & Expansion Projects',
      'HEC Funded Civil Infrastructure Projects',
      'Smart Campus Infrastructure Upgrades'
    ],
    officialSource: 'https://imsciences.edu.pk/',
    lastUpdated: '2026-09-01'
  },
  {
    id: 'off-admin-general',
    name: 'General Administration Office',
    category: 'Campus Operations',
    incharge: 'Mr. Riaz Ahmad',
    designation: 'Deputy Director Administration',
    phone: '+92-91-9217451',
    extension: 'Ext. 104',
    email: 'admin@imsciences.edu.pk',
    location: 'Administration Block, Room G-01',
    officeHours: 'Monday – Friday: 08:30 AM – 04:30 PM',
    services: [
      'Campus Security & Visitor Gate Passes',
      'Classroom & Seminar Hall Booking Permissions',
      'Campus Maintenance & Logistics Support',
      'Lost & Found Items Repository'
    ],
    officialSource: 'https://imsciences.edu.pk/',
    lastUpdated: '2026-09-12'
  }
];

export const INITIAL_PROGRAMS: DegreeProgram[] = [
  {
    id: 'prog-bscs',
    name: 'BS Computer Science',
    code: 'BSCS',
    degreeLevel: 'Undergraduate',
    department: 'Department of Computer Science',
    specializations: [
      'Artificial Intelligence',
      'Cyber Security',
      'Data Science',
      'Software Engineering'
    ],
    durationYears: 4,
    totalSemesters: 8,
    creditHours: 132,
    eligibility: 'At least 50% marks in Intermediate (F.Sc Pre-Engineering, Pre-Medical with additional Math, General Science with Math/Stats/CS) or equivalent A-Levels with Mathematics.',
    minPercentage: 50,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 85500,
    admissionFee: 25000,
    totalSeats: 120,
    officialSource: 'https://admissions.imsciences.edu.pk/programs/bscs',
    lastUpdated: '2026-09-15',
    description: 'Premier HEC and NCEAC accredited four-year degree program providing rigorous training in algorithms, systems, AI, software engineering, and data science.'
  },
  {
    id: 'prog-bba',
    name: 'Bachelor of Business Administration',
    code: 'BBA',
    degreeLevel: 'Undergraduate',
    department: 'Department of Management Sciences',
    specializations: ['Finance', 'Marketing', 'Human Resource Management', 'Supply Chain Management'],
    durationYears: 4,
    totalSemesters: 8,
    creditHours: 130,
    eligibility: 'Intermediate (FA/FSc/I.Com/ICS) or equivalent with minimum 45% marks from a recognized board.',
    minPercentage: 45,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 82000,
    admissionFee: 25000,
    totalSeats: 100,
    officialSource: 'https://admissions.imsciences.edu.pk/programs/bba',
    lastUpdated: '2026-09-15',
    description: 'Flagship business leadership program fostering analytical decision-making, strategic marketing, entrepreneurship, and global enterprise management.'
  },
  {
    id: 'prog-bsaf',
    name: 'BS Accounting & Finance',
    code: 'BSAF',
    degreeLevel: 'Undergraduate',
    department: 'Department of Management Sciences',
    specializations: ['Financial Analysis', 'Auditing & Taxation', 'FinTech'],
    durationYears: 4,
    totalSemesters: 8,
    creditHours: 130,
    eligibility: 'Intermediate (FA/FSc/I.Com/ICS) or equivalent with minimum 45% marks.',
    minPercentage: 45,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 79000,
    admissionFee: 25000,
    totalSeats: 60,
    officialSource: 'https://admissions.imsciences.edu.pk/programs/bs-af',
    lastUpdated: '2026-09-15',
    description: 'Designed in collaboration with professional accounting bodies (ACCA, ICAP, CIMA exemptions applicable) for high-caliber financial careers.'
  },
  {
    id: 'prog-bsba',
    name: 'BS Business Analytics',
    code: 'BSBA',
    degreeLevel: 'Undergraduate',
    department: 'Department of Management Sciences & Computer Science',
    specializations: ['Data-driven Marketing', 'Predictive Financial Analytics', 'Operations Modeling'],
    durationYears: 4,
    totalSemesters: 8,
    creditHours: 130,
    eligibility: 'Intermediate (F.Sc / ICS / General Science / F.A with Math or Stats) with at least 50% marks.',
    minPercentage: 50,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 84000,
    admissionFee: 25000,
    totalSeats: 50,
    officialSource: 'https://admissions.imsciences.edu.pk/programs/bs-analytics',
    lastUpdated: '2026-09-15',
    description: 'Bridges modern business management with machine learning, data engineering, visualization, and strategic executive intelligence.'
  },
  {
    id: 'prog-bsecon',
    name: 'BS Economics',
    code: 'BSECON',
    degreeLevel: 'Undergraduate',
    department: 'Department of Economics',
    specializations: ['Development Economics', 'Financial Economics', 'Public Policy'],
    durationYears: 4,
    totalSemesters: 8,
    creditHours: 126,
    eligibility: 'Intermediate (FA/FSc/I.Com/ICS) or equivalent with minimum 45% marks.',
    minPercentage: 45,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 68000,
    admissionFee: 25000,
    totalSeats: 50,
    officialSource: 'https://admissions.imsciences.edu.pk/programs/bs-economics',
    lastUpdated: '2026-09-15',
    description: 'Rigorous quantitative and macroeconomic foundation preparing students for international policy institutions, central banking, and research think-tanks.'
  },
  {
    id: 'prog-bseng',
    name: 'BS English',
    code: 'BSENG',
    degreeLevel: 'Undergraduate',
    department: 'Department of Humanities & Social Sciences',
    specializations: ['Linguistics', 'Literature & Creative Writing', 'Professional Communication'],
    durationYears: 4,
    totalSemesters: 8,
    creditHours: 128,
    eligibility: 'Intermediate (FA/FSc or equivalent) with minimum 45% marks.',
    minPercentage: 45,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 65000,
    admissionFee: 25000,
    totalSeats: 45,
    officialSource: 'https://admissions.imsciences.edu.pk/programs/bs-english',
    lastUpdated: '2026-09-15',
    description: 'Contemporary linguistics, literary theory, digital media discourses, and academic writing mastery.'
  },
  {
    id: 'prog-bspsych',
    name: 'BS Psychology',
    code: 'BSPSYCH',
    degreeLevel: 'Undergraduate',
    department: 'Department of Social Sciences',
    specializations: ['Clinical Psychology', 'Organizational Psychology', 'Educational Psychology'],
    durationYears: 4,
    totalSemesters: 8,
    creditHours: 130,
    eligibility: 'Intermediate (FA/FSc or equivalent) with minimum 45% marks.',
    minPercentage: 45,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 72000,
    admissionFee: 25000,
    totalSeats: 50,
    officialSource: 'https://admissions.imsciences.edu.pk/programs/bs-psychology',
    lastUpdated: '2026-09-15',
    description: 'Explores human behavior, psychometric diagnostics, clinical therapy principles, and organizational wellness.'
  },
  {
    id: 'prog-bs-socsci',
    name: 'BS Social Sciences',
    code: 'BSSS',
    degreeLevel: 'Undergraduate',
    department: 'Department of Social Sciences',
    specializations: ['Political Science', 'Sociology', 'International Relations'],
    durationYears: 4,
    totalSemesters: 8,
    creditHours: 126,
    eligibility: 'Intermediate in any discipline with minimum 45% marks.',
    minPercentage: 45,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 65000,
    admissionFee: 25000,
    totalSeats: 40,
    officialSource: 'https://admissions.imsciences.edu.pk/',
    lastUpdated: '2026-09-15',
    description: 'Multidisciplinary study of statecraft, sociological transformations, geopolitics, and civil society institutions.'
  },
  {
    id: 'prog-bs-tour',
    name: 'BS Hospitality and Tourism',
    code: 'BSHT',
    degreeLevel: 'Undergraduate',
    department: 'Department of Management Sciences',
    specializations: ['Hospitality Management', 'Ecotourism & Heritage Planning'],
    durationYears: 4,
    totalSemesters: 8,
    creditHours: 128,
    eligibility: 'Intermediate (FA/FSc/I.Com/ICS) with minimum 45% marks.',
    minPercentage: 45,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 69000,
    admissionFee: 25000,
    totalSeats: 35,
    officialSource: 'https://admissions.imsciences.edu.pk/',
    lastUpdated: '2026-09-15',
    description: 'Equips students with high-level competencies in luxury hotel operations, destination branding, and sustainable eco-tourism in Northern Pakistan.'
  },
  {
    id: 'prog-mba',
    name: 'Master of Business Administration (MBA)',
    code: 'MBA',
    degreeLevel: 'Graduate',
    department: 'Department of Management Sciences',
    specializations: ['Finance', 'Marketing', 'Strategic Leadership', 'Supply Chain'],
    durationYears: 1.5,
    totalSemesters: 3,
    creditHours: 36,
    eligibility: '16 years of education (BBA 4 years or equivalent in business) with minimum 2.50/4.00 CGPA or 60% marks in annual system.',
    minPercentage: 60,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 88000,
    admissionFee: 25000,
    totalSeats: 60,
    officialSource: 'https://admissions.imsciences.edu.pk/programs/mba',
    lastUpdated: '2026-09-15',
    description: 'Executive-level management degree recognized across corporate and multinational sectors in Pakistan and abroad.'
  },
  {
    id: 'prog-msds',
    name: 'MS Data Science',
    code: 'MSDS',
    degreeLevel: 'MS / MPhil',
    department: 'Department of Computer Science',
    specializations: ['Machine Learning Engineering', 'Big Data Systems', 'Natural Language Processing'],
    durationYears: 2,
    totalSemesters: 4,
    creditHours: 30,
    eligibility: 'BS in Computer Science / Software Engineering / IT / Data Science or relevant 16-year STEM degree with min 2.5/4.00 CGPA. GAT-General / IMSciences Entry Test required (50% marks).',
    minPercentage: 60,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 78000,
    admissionFee: 25000,
    totalSeats: 35,
    officialSource: 'https://admissions.imsciences.edu.pk/programs/ms-data-science',
    lastUpdated: '2026-09-15',
    description: 'Advanced graduate program in statistical modeling, neural networks, distributed computational frameworks, and ethical AI.'
  },
  {
    id: 'prog-msds-bio',
    name: 'MS Data Science BioMedicine',
    code: 'MSDS-BIO',
    degreeLevel: 'MS / MPhil',
    department: 'Department of Computer Science',
    specializations: ['Computational Genomics', 'Clinical Informatics', 'Medical Image Analytics'],
    durationYears: 2,
    totalSemesters: 4,
    creditHours: 30,
    eligibility: '16 years education in CS, Software Engineering, Bioinformatics, Biotechnology, or MBBS/BDS with computing deficiency courses; min 2.50 CGPA.',
    minPercentage: 60,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 80000,
    admissionFee: 25000,
    totalSeats: 25,
    officialSource: 'https://admissions.imsciences.edu.pk/',
    lastUpdated: '2026-09-15',
    description: 'Pioneering interdisciplinary graduate specialization applying data science and AI algorithms to precision healthcare, epidemiology, and molecular biology.'
  },
  {
    id: 'prog-mscs',
    name: 'MS Computer Science',
    code: 'MSCS',
    degreeLevel: 'MS / MPhil',
    department: 'Department of Computer Science',
    specializations: ['Distributed Systems', 'Computer Vision & Deep Learning', 'Information Security'],
    durationYears: 2,
    totalSemesters: 4,
    creditHours: 30,
    eligibility: 'BS CS / BS SE / BS IT (4 years) or MSc CS (min 130 credit hours) with min 2.50 CGPA. GAT General or IMSciences test required.',
    minPercentage: 60,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 78000,
    admissionFee: 25000,
    totalSeats: 40,
    officialSource: 'https://admissions.imsciences.edu.pk/programs/mscs',
    lastUpdated: '2026-09-15',
    description: 'Research-focused computing degree with state-of-the-art laboratory facilities and publications in high-impact journals.'
  },
  {
    id: 'prog-msmgmt',
    name: 'MS Management',
    code: 'MSMGMT',
    degreeLevel: 'MS / MPhil',
    department: 'Department of Management Sciences',
    specializations: ['Organizational Behavior', 'Strategic Management', 'Human Resources'],
    durationYears: 2,
    totalSemesters: 4,
    creditHours: 30,
    eligibility: '16 years of education in Business/Commerce/Economics with min 2.50 CGPA + GAT General.',
    minPercentage: 60,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 75000,
    admissionFee: 25000,
    totalSeats: 30,
    officialSource: 'https://admissions.imsciences.edu.pk/',
    lastUpdated: '2026-09-15',
    description: 'Rigorous training in quantitative/qualitative research methods for aspiring faculty members and organizational consultants.'
  },
  {
    id: 'prog-phdcs',
    name: 'PhD Computer Science',
    code: 'PHDCS',
    degreeLevel: 'PhD',
    department: 'Department of Computer Science',
    specializations: ['Machine Learning', 'Cyber Security', 'Cloud Computing', 'Computer Networks'],
    durationYears: 3,
    totalSemesters: 6,
    creditHours: 48,
    eligibility: 'MS/MPhil in Computer Science / Software Engineering with minimum 3.00/4.00 CGPA. GAT Subject / University Test with min 60% marks + Statement of Purpose & Interview.',
    minPercentage: 70,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 65000,
    admissionFee: 30000,
    totalSeats: 15,
    officialSource: 'https://admissions.imsciences.edu.pk/programs/phdcs',
    lastUpdated: '2026-09-15',
    description: 'Doctoral research program producing scholars who contribute original, peer-reviewed scientific breakthroughs.'
  },
  {
    id: 'prog-phdecon',
    name: 'PhD Economics',
    code: 'PHDECON',
    degreeLevel: 'PhD',
    department: 'Department of Economics',
    specializations: ['Empirical Macroeconomics', 'Applied Microeconomics', 'International Trade'],
    durationYears: 3,
    totalSemesters: 6,
    creditHours: 48,
    eligibility: 'MS/MPhil in Economics or related field with min 3.00 CGPA. Subject test (min 60%) + Interview.',
    minPercentage: 70,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 62000,
    admissionFee: 30000,
    totalSeats: 10,
    officialSource: 'https://admissions.imsciences.edu.pk/',
    lastUpdated: '2026-09-15',
    description: 'Premier doctoral training in economic modeling, econometric software, and national fiscal policy.'
  },
  {
    id: 'prog-phdmgmt',
    name: 'PhD Management',
    code: 'PHDMGMT',
    degreeLevel: 'PhD',
    department: 'Department of Management Sciences',
    specializations: ['Finance', 'Marketing', 'Organizational Management'],
    durationYears: 3,
    totalSemesters: 6,
    creditHours: 48,
    eligibility: 'MS/MPhil in Business Administration/Management with min 3.00 CGPA + GAT Subject + Defense of Research Proposal.',
    minPercentage: 70,
    admissionCycle: 'Fall 2026',
    isOpenForAdmission: true,
    semesterFee: 65000,
    admissionFee: 30000,
    totalSeats: 12,
    officialSource: 'https://admissions.imsciences.edu.pk/',
    lastUpdated: '2026-09-15',
    description: 'Prepares thought leaders and senior university professors in enterprise strategy and behavioral finance.'
  }
];

export const INITIAL_SCHOLARSHIPS: ScholarshipItem[] = [
  {
    id: 'sch-hec-need',
    name: 'HEC Need Based Scholarship',
    provider: 'Higher Education Commission (HEC), Government of Pakistan',
    category: 'Need-based',
    degreeLevel: ['Undergraduate', 'Graduate'],
    eligiblePrograms: ['All Undergraduate & Graduate regular programs'],
    eligibility: 'Financially disadvantaged students enrolled in regular degree programs whose family income cannot support educational expenses.',
    academicRequirements: 'Satisfactory academic standing (CGPA ≥ 2.50 or min 50% in intermediate for freshmen).',
    financialRequirements: 'Monthly gross family income does not exceed PKR 45,000 to 60,000 (verified via utility bills & income slips).',
    domicileRequirements: 'All Pakistan citizens with valid CNIC/B-Form.',
    coverage: '100% Tuition Fee waiver + Monthly living stipend of PKR 6,000 for entire degree duration.',
    stipend: 'PKR 6,000 / month',
    deadline: '2026-10-15',
    session: '2026-2027',
    approvalStatus: 'Active & Verified',
    officialSource: 'https://imsciences.edu.pk/scholarships/hec-need-based/',
    applicationProcedure: 'Submit official HEC Need Based Form online at IMSciences Scholarship portal, attach salary certificate, FBR return / affidavit, utility bills, and appear before Institutional Scholarship Award Committee (ISAC).',
    lastUpdated: '2026-09-14'
  },
  {
    id: 'sch-cmeef-kp',
    name: 'Chief Minister Education Endowment Fund (CMEEF) KP',
    provider: 'Higher Education Department, Government of Khyber Pakhtunkhwa',
    category: 'Government & HEC',
    degreeLevel: ['Undergraduate', 'Graduate', 'MS / MPhil'],
    eligiblePrograms: ['BS Computer Science', 'BS Business Analytics', 'BBA', 'MSCS', 'MS Data Science'],
    eligibility: 'Meritorious and needy students who possess Khyber Pakhtunkhwa / Merged Districts domicile.',
    academicRequirements: 'Minimum 75% marks in Intermediate for undergraduate or min 3.00/4.00 CGPA for graduate level.',
    financialRequirements: 'Father/Guardian gross monthly income ≤ PKR 100,000.',
    domicileRequirements: 'Strictly Khyber Pakhtunkhwa (KP) including Merged Tribal Districts.',
    coverage: '100% Tuition Fee + Boarding/Hostel Expenses + Books allowance (PKR 5,000/semester) + Monthly stipend of PKR 5,000.',
    stipend: 'PKR 5,000 / month',
    deadline: '2026-10-30',
    session: '2026-2027',
    approvalStatus: 'Active & Verified',
    officialSource: 'https://imsciences.edu.pk/scholarships/cmeef/',
    applicationProcedure: 'Download CMEEF form from IMSciences website, submit along with KP domicile certificate, verified DMC, and land ownership/income proofs to Grants Office.',
    lastUpdated: '2026-09-12'
  },
  {
    id: 'sch-imsciences-merit',
    name: 'IMSciences Institutional Merit Scholarship',
    provider: 'Institute of Management Sciences Peshawar',
    category: 'Merit-based',
    degreeLevel: ['Undergraduate', 'Graduate'],
    eligiblePrograms: ['All registered Undergraduate and Graduate programs'],
    eligibility: 'Awarded automatically to the top 3 semester position holders in every degree batch after official result declaration.',
    academicRequirements: '1st Position: SGPA ≥ 3.70; 2nd Position: SGPA ≥ 3.50; 3rd Position: SGPA ≥ 3.30 with no repeat courses or disciplinary record.',
    financialRequirements: 'Purely merit-driven; no financial threshold.',
    domicileRequirements: 'Open to all enrolled students irrespective of domicile.',
    coverage: '1st Position: 100% Tuition Fee waiver for the upcoming semester. 2nd Position: 50% Tuition Fee waiver. 3rd Position: 25% Tuition Fee waiver.',
    deadline: 'Automatic per semester result cycle',
    session: 'Fall 2026',
    approvalStatus: 'Active & Verified',
    officialSource: 'https://imsciences.edu.pk/scholarships/institutional-merit/',
    applicationProcedure: 'No separate application required. The Controller of Examinations coordinates directly with Finance and Grants Office to adjust the fee challan.',
    lastUpdated: '2026-09-10'
  },
  {
    id: 'sch-imsciences-financial-aid',
    name: 'IMSciences Need-Based Financial Assistance',
    provider: 'IMSciences Student Financial Support Trust',
    category: 'IMSciences Institutional',
    degreeLevel: ['Undergraduate', 'Graduate'],
    eligiblePrograms: ['All undergraduate & graduate regular programs'],
    eligibility: 'Enrolled students experiencing sudden financial distress, deceased breadwinner, or low socio-economic background.',
    academicRequirements: 'Minimum CGPA 2.20; passing all registered subjects.',
    financialRequirements: 'Proven inability to afford semester tuition fees.',
    domicileRequirements: 'Open to all students.',
    coverage: 'Partial fee waiver ranging from 25% to 75% tuition fee reduction.',
    deadline: '2026-10-20',
    session: '2026-2027',
    approvalStatus: 'Active & Verified',
    officialSource: 'https://imsciences.edu.pk/scholarships/',
    applicationProcedure: 'Apply through Student Facilitation Center with family income verification and utility bills.',
    lastUpdated: '2026-09-14'
  },
  {
    id: 'sch-sibling-rebate',
    name: 'IMSciences Sibling Fee Concession',
    provider: 'IMSciences Institutional Policy',
    category: 'Special Quota & Rebates',
    degreeLevel: ['Undergraduate', 'Graduate'],
    eligiblePrograms: ['All programs where two or more real siblings are concurrently enrolled'],
    eligibility: 'Real brothers/sisters studying simultaneously at IMSciences in regular degree programs.',
    academicRequirements: 'Good academic standing and regular attendance.',
    financialRequirements: 'Applicable to the second (junior) sibling.',
    domicileRequirements: 'Open to all.',
    coverage: '25% Tuition Fee concession for the sibling who joined later.',
    deadline: 'Within 2 weeks of semester commencement',
    session: 'Fall 2026',
    approvalStatus: 'Active & Verified',
    officialSource: 'https://imsciences.edu.pk/scholarships/fee-concessions/',
    applicationProcedure: 'Submit Sibling Concession Form along with CNIC/B-Forms showing identical parentage and latest paid challans of both students to the Accounts Office.',
    lastUpdated: '2026-09-10'
  },
  {
    id: 'sch-merged-areas',
    name: 'Merged Areas (FATA) Special Education Scholarship',
    provider: 'Federal Ministry of States and Frontier Regions (SAFRON) & HEC',
    category: 'Government & HEC',
    degreeLevel: ['Undergraduate'],
    eligiblePrograms: ['BSCS', 'BBA', 'BS Accounting & Finance', 'BS Economics'],
    eligibility: 'Students belonging to Merged Tribal Districts (Bajaur, Mohmand, Khyber, Orakzai, Kurram, North Waziristan, South Waziristan and FR regions).',
    academicRequirements: 'Minimum 50% marks in Intermediate.',
    financialRequirements: 'Priority to economically marginalized tribal families.',
    domicileRequirements: 'Permanent resident & domicile of Merged Districts.',
    coverage: '100% Tuition Fee + Hostel Accommodation + Book allowance of PKR 10,000/year.',
    deadline: '2026-11-05',
    session: '2026-2027',
    approvalStatus: 'Active & Verified',
    officialSource: 'https://imsciences.edu.pk/scholarships/fata-quota/',
    applicationProcedure: 'Submit form via HEC online portal, choose IMSciences Peshawar, and provide certified copy of FATA domicile.',
    lastUpdated: '2026-09-12'
  },
  {
    id: 'sch-worker-welfare',
    name: 'Workers Welfare Board (WWB) KP Educational Grant',
    provider: 'Workers Welfare Fund (WWF) KP',
    category: 'Donor-funded',
    degreeLevel: ['Undergraduate', 'Graduate'],
    eligiblePrograms: ['All programs'],
    eligibility: 'Children of registered industrial workers with minimum 3 years of service registered with EOBI / Social Security.',
    academicRequirements: 'Admission secured on open merit.',
    financialRequirements: 'Valid Factory Card & EOBI contribution certificate of parent.',
    domicileRequirements: 'Khyber Pakhtunkhwa.',
    coverage: '100% Tuition Fee + Transport + Hostel + Stipend as per WWF policy.',
    deadline: '2026-11-15',
    session: '2026-2027',
    approvalStatus: 'Active & Verified',
    officialSource: 'https://imsciences.edu.pk/scholarships/wwb/',
    applicationProcedure: 'Attested WWF application form stamped by factory management and Assistant Director Labour.',
    lastUpdated: '2026-09-08'
  }
];

export const INITIAL_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'kb-admission-process',
    title: 'IMSciences Official Admission Application Process & Portal Workflow',
    category: 'ADMISSION',
    content: `To apply for admission at IMSciences Peshawar:
1. Visit the official online admission portal: https://admissions.imsciences.edu.pk/
2. Register an applicant account using your valid email address and mobile number.
3. Fill in Personal Information, Domicile details, and Guardian details.
4. Input Academic Qualifications: Matric/O-Level marks and Intermediate/F.Sc/A-Level marks.
5. Select your desired Program of study (e.g. BS Computer Science, BBA) and optional second priority.
6. Upload scanned legible documents: Photograph (white/blue background), CNIC or B-Form, SSC DMC/Certificate, and HSSC/Inter DMC.
7. Generate the official Bank Deposit Challan (PKR 2,000 application fee).
8. Deposit fee at any online branch of Allied Bank Limited (ABL), Bank of Khyber (BoK), or Meezan Bank across Pakistan.
9. Upload clear picture/PDF of stamped bank deposit receipt onto the portal and click 'Submit Application'.
10. Once verified by Admissions Office, the status turns to 'Verified', and your Entrance Test Slip is generated 2 to 3 days before the scheduled test date.`,
    sourceUrl: 'https://admissions.imsciences.edu.pk/guidelines',
    sourceName: 'Official IMSciences Admission Portal',
    publicationDate: '2026-08-01',
    effectiveDate: '2026-08-01',
    expiryDate: '2026-10-31',
    academicSession: 'Fall 2026',
    verificationStatus: 'VERIFIED',
    lastVerifiedDate: '2026-09-15',
    priorityOrder: 2
  },
  {
    id: 'kb-test-slip-policy',
    title: 'IMSciences Entrance Test & Test Slip Issuance Policy',
    category: 'TEST_SLIP',
    content: `Official Test Slip Policy:
Entrance-test slips are generated through the official online admission portal approximately 2–3 days prior to the entrance test date.
- The test slip contains the candidate's Roll Number, Test Date, Reporting Time, Center Location (IMSciences Campus, Hayatabad Peshawar), and Seating Hall.
- Candidates must download and print the Test Slip.
- Mandatory items on test day: Printed Test Slip, Original CNIC or B-Form / Original Matric Certificate with photograph, and a blue/black ballpoint.
- Calculators, smartwatches, and mobile phones are strictly prohibited inside examination halls.
- Model papers and sample questions for English, Mathematics, and Analytical Reasoning are available on https://admissions.imsciences.edu.pk/downloads.`,
    sourceUrl: 'https://admissions.imsciences.edu.pk/faq',
    sourceName: 'Official IMSciences Admission FAQ',
    publicationDate: '2026-08-01',
    effectiveDate: '2026-08-01',
    expiryDate: '2026-10-31',
    academicSession: 'Fall 2026',
    verificationStatus: 'VERIFIED',
    lastVerifiedDate: '2026-09-15',
    priorityOrder: 1
  },
  {
    id: 'kb-fee-submission-policy',
    title: 'Semester Fee Payment, Challan Generation & Deadlines',
    category: 'FEE',
    content: `Official Fee Submission Workflow:
1. Students log in to the Student Portal (or Applicant Portal upon selection) and generate the Semester Fee Challan.
2. Challans are pre-printed with unique student ID, barcode, and fee breakdown (Tuition, Admission, Exam, Labs).
3. Approved Payment Methods:
   - Cash/Deposit at any branch of Allied Bank (ABL) or Bank of Khyber (BoK) using institutional fee challan.
   - 1Link / Kuickpay online banking using 1Link Bill Invoicing number printed on voucher.
4. After depositing, upload bank stamp proof or transaction ID if required on portal.
5. Fee Status updates from 'Challan Generated' to 'Verification Pending' to 'Paid' within 24–48 banking hours.
6. Late Fee Policy: Deposits made after the official due date incur a fine of PKR 200 per day up to 10 days, after which admission/registration may be suspended until reviewed by Director.`,
    sourceUrl: 'https://imsciences.edu.pk/finance/fee-rules',
    sourceName: 'Official IMSciences Finance Rules',
    publicationDate: '2026-08-15',
    effectiveDate: '2026-08-15',
    expiryDate: '2026-12-31',
    academicSession: 'Fall 2026',
    verificationStatus: 'VERIFIED',
    lastVerifiedDate: '2026-09-14',
    priorityOrder: 3
  },
  {
    id: 'kb-attendance-rule',
    title: 'Mandatory 75% Attendance Requirement for Exams',
    category: 'ATTENDANCE',
    content: `Under official IMSciences Academic Regulations:
- A student must maintain a minimum of 75% attendance in lectures, tutorials, and practical laboratory sessions in each registered course to be eligible to appear in the Final Examination.
- If attendance falls below 75% in any course, the student is barred from appearing in the final exam for that course and receives a grade 'F' (Fail).
- Genuine medical cases or institutional sports representation must be submitted to the Head of Student Support / Joint Director within 7 working days of absence for statutory review. Medical concessions cannot reduce attendance below 65%.`,
    sourceUrl: 'https://imsciences.edu.pk/academics/regulations',
    sourceName: 'IMSciences Academic Regulations Handbook',
    publicationDate: '2026-01-10',
    effectiveDate: '2026-01-10',
    academicSession: '2026-2027',
    verificationStatus: 'VERIFIED',
    lastVerifiedDate: '2026-09-10',
    priorityOrder: 2
  },
  {
    id: 'kb-document-services',
    title: 'Student Document Request Procedures (Transcripts, Certificates, Degrees)',
    category: 'DOCUMENT',
    content: `Document Request Workflow:
Students and alumni can request official university documents through the Student Document Center:
1. Official Transcript (DMC): Normal processing (PKR 1,500 - 5 working days); Urgent (PKR 3,000 - 24 hours).
2. Provisional Certificate: PKR 1,000 (3 working days). Requires clearance from Library, Hostels, and Accounts.
3. Bonafide / Student Status Certificate: Free for 1st copy; subsequent copies PKR 200 (1 working day).
4. Character Certificate: PKR 500 (2 working days). Issued by Student Support Office.
5. Migration Certificate / NOC: PKR 2,000 (5 working days). Requires final transcript and institutional clearance.
6. Duplicate Student ID Card: PKR 500. Requires police diary report of lost card.
Collection: Physical collection from Examination Counter or verified registered courier to domestic address.`,
    sourceUrl: 'https://imsciences.edu.pk/examination/documents/',
    sourceName: 'IMSciences Examination Office Notice',
    publicationDate: '2026-05-10',
    effectiveDate: '2026-05-10',
    academicSession: '2026-2027',
    verificationStatus: 'VERIFIED',
    lastVerifiedDate: '2026-09-14',
    priorityOrder: 3
  },
  {
    id: 'kb-hostel-info',
    title: 'IMSciences On-Campus Hostel Accommodation Facilities & Rules',
    category: 'HOSTEL',
    content: `Verified Hostel Information:
- Location: Within university premises, 1-A Sector E-5 Phase VII Hayatabad Peshawar.
- Separate dedicated wings for Male and Female students with 24/7 armed security and CCTV surveillance.
- Allocation Criteria: Purely merit and distance based. Preference is given to students from remote areas of KP, Merged Tribal Districts, Balochistan, Gilgit-Baltistan, and Azad Kashmir. Students residing in Peshawar district are not eligible.
- Facilities: Furnished rooms (double & triple occupancy), high-speed Wi-Fi, dining hall, backup electric generator, study room, common room with TV, and indoor games.
- Hostel Charges: Approx. PKR 38,000 per semester + PKR 10,000 refundable security deposit. Mess charges are paid separately on a monthly actual-cost basis.
- Application: Apply to the Hostel Administration Office via Student Portal immediately upon admission confirmation.`,
    sourceUrl: 'https://imsciences.edu.pk/hostels/',
    sourceName: 'IMSciences Hostel Administration',
    publicationDate: '2026-07-20',
    effectiveDate: '2026-08-01',
    academicSession: 'Fall 2026',
    verificationStatus: 'VERIFIED',
    lastVerifiedDate: '2026-09-12',
    priorityOrder: 4
  },
  {
    id: 'kb-transport-routes',
    title: 'University Commuter Transport Routes & Bus Passes',
    category: 'TRANSPORT',
    content: `Verified Transport Details:
- Fleet of university buses operating across major Peshawar metropolitan corridors.
- Major Routes:
  * Route 1: Peshawar Saddar -> Cantt -> University Road -> Phase 3 Chowk -> IMSciences.
  * Route 2: Charsadda Road -> Bacha Khan Chowk -> Ring Road -> Hayatabad Phase 7.
  * Route 3: Kohat Road / Scheme Chowk -> Ring Road -> Industrial Estate -> IMSciences.
  * Route 4: Warsak Road -> Michni Gate -> Jamrud Road -> Karkhano -> Phase 7.
- Timings: Morning pick-up arrives campus by 08:15 AM. Departure in afternoon at 04:45 PM.
- Transport Fee: PKR 24,000 per semester.
- Pass Issuance: Obtained from Transport Office upon presenting fee challan paid at bank.`,
    sourceUrl: 'https://imsciences.edu.pk/transport/',
    sourceName: 'IMSciences Transport Office Notice',
    publicationDate: '2026-08-20',
    effectiveDate: '2026-08-20',
    academicSession: 'Fall 2026',
    verificationStatus: 'VERIFIED',
    lastVerifiedDate: '2026-09-11',
    priorityOrder: 4
  },
  {
    id: 'kb-library-resources',
    title: 'IMSciences Central Library Hours, Digital Databases & Borrowing Rules',
    category: 'LIBRARY',
    content: `Central Library Services:
- Opening Hours: Monday to Friday (08:00 AM – 08:00 PM), Saturday (09:00 AM – 04:00 PM).
- Resources: Over 40,000 physical volumes in Management, CS, Economics, Law, and Social Sciences.
- Digital Library: Full campus access to HEC National Digital Library, IEEE Xplore, ACM Digital Library, ScienceDirect, and JSTOR.
- Borrowing Limits: Undergraduate students (3 books for 14 days); Graduate/MS (5 books for 21 days); Faculty (10 books for a semester).
- Turnitin Plagiarism Check: Dedicated research cubicle provides Turnitin similarity reports for theses and term papers under HEC guidelines (similarity must be ≤ 19%).`,
    sourceUrl: 'https://imsciences.edu.pk/library/',
    sourceName: 'IMSciences Central Library Guide',
    publicationDate: '2026-02-15',
    effectiveDate: '2026-02-15',
    academicSession: '2026-2027',
    verificationStatus: 'VERIFIED',
    lastVerifiedDate: '2026-09-12',
    priorityOrder: 5
  },
  {
    id: 'kb-scholarship-overview',
    title: 'Overview of IMSciences Grants & Scholarships Opportunities',
    category: 'SCHOLARSHIP',
    content: `Grants & Scholarships at IMSciences Peshawar:
The Institute of Management Sciences ensures that no deserving or talented student is denied education due to financial hardship. Over 30% of enrolled students receive financial assistance.
Categories of Assistance:
1. Fully Funded Scholarships: HEC Need Based, Chief Minister Education Endowment Fund (CMEEF KP).
2. Institutional Merit Scholarships: Cash/tuition waiver awarded to top 3 position holders in every semester batch.
3. Need-Based Financial Aid: Up to 75% tuition fee concession for economically challenged students.
4. Quota Scholarships: Special grants for Merged Districts (FATA), Balochistan students, and persons with disabilities.
5. Sibling Concession: 25% tuition fee rebate for concurrently enrolled brothers/sisters.
6. Worker Welfare Board (WWB): Full coverage for children of registered industrial workers.
Note: Scholarship announcements are subject to donor approval and annual fund allocation. Students must maintain required GPA for renewal.`,
    sourceUrl: 'https://imsciences.edu.pk/scholarships/',
    sourceName: 'IMSciences Grants & Scholarships Office',
    publicationDate: '2026-08-10',
    effectiveDate: '2026-08-10',
    expiryDate: '2026-11-30',
    academicSession: '2026-2027',
    verificationStatus: 'VERIFIED',
    lastVerifiedDate: '2026-09-14',
    priorityOrder: 1
  }
];

export const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: 'not-01',
    title: 'Fall 2026 Entrance Test Schedule for BS Computer Science & BBA',
    description: 'The Entrance Test for undergraduate admissions Fall 2026 will be conducted on Saturday, October 10, 2026 at IMSciences Campus Hayatabad. Candidates can generate their Test Slips from the admission portal starting October 07, 2026.',
    date: '2026-09-15',
    category: 'Admissions',
    targetAudience: 'Applicants',
    officialSource: 'https://admissions.imsciences.edu.pk/notices/fall2026-test',
    isUrgent: true
  },
  {
    id: 'not-02',
    title: 'Announcement: HEC Need-Based Scholarships Applications Open (2026–2027)',
    description: 'Applications are invited from newly admitted and enrolled undergraduate and graduate students for HEC Need-Based Scholarships. Prescribed forms must be submitted to the Grants Office by October 15, 2026.',
    date: '2026-09-12',
    category: 'Scholarships',
    targetAudience: 'Students',
    officialSource: 'https://imsciences.edu.pk/scholarships/announcements',
    isUrgent: true
  },
  {
    id: 'not-03',
    title: 'Midterm Examination Date Sheet Announcement - Fall 2026',
    description: 'The Controller of Examinations has published the tentative Midterm Date Sheet for all undergraduate and graduate batches. Exams commence from November 16, 2026.',
    date: '2026-09-10',
    category: 'Exams',
    targetAudience: 'Students',
    officialSource: 'https://imsciences.edu.pk/examination/datesheet'
  },
  {
    id: 'not-04',
    title: 'Mandatory Clearance for Course Registration Add/Drop Window',
    description: 'Course registration add/drop window will close on September 25, 2026. All students must finalize their course load and ensure prerequisites are fulfilled.',
    date: '2026-09-08',
    category: 'Academic',
    targetAudience: 'Students',
    officialSource: 'https://imsciences.edu.pk/academics/registration'
  },
  {
    id: 'not-05',
    title: 'Annual Tech & Innovation Summit by Computing Society',
    description: 'IMSciences Computing Society is hosting the Annual TechFest & Hackathon on November 28-29, 2026. Cash prizes and industry internships for winning teams.',
    date: '2026-09-05',
    category: 'Events',
    targetAudience: 'All',
    officialSource: 'https://imsciences.edu.pk/events/techfest-2026'
  }
];

export const INITIAL_DEADLINES: DeadlineItem[] = [
  {
    id: 'dl-01',
    title: 'Online Admission Application Deadline (Fall 2026)',
    category: 'Admissions',
    targetDate: '2026-10-02T23:59:59',
    programOrTarget: 'All Undergraduate & Graduate Programs',
    description: 'Final date for submission of online admission applications and uploading bank challans.',
    officialSource: 'https://admissions.imsciences.edu.pk/',
    status: 'Upcoming'
  },
  {
    id: 'dl-02',
    title: 'HEC Need Based Scholarship Application Deadline',
    category: 'Scholarships',
    targetDate: '2026-10-15T16:30:00',
    programOrTarget: 'All Regular Enrolled Students',
    description: 'Submission of hardcopy application package with income proofs to Grants Office.',
    officialSource: 'https://imsciences.edu.pk/scholarships/',
    status: 'Upcoming'
  },
  {
    id: 'dl-03',
    title: 'Semester Fee Deposit without Late Surcharge',
    category: 'Fees',
    targetDate: '2026-09-28T17:00:00',
    programOrTarget: 'Enrolled Students (Semesters 2 to 8)',
    description: 'Deposit fee at Bank of Khyber or Allied Bank to avoid PKR 200/day fine.',
    officialSource: 'https://imsciences.edu.pk/finance/',
    status: 'Upcoming'
  },
  {
    id: 'dl-04',
    title: 'Course Add / Drop Final Clearance',
    category: 'Academics',
    targetDate: '2026-09-25T16:00:00',
    programOrTarget: 'All Departments',
    description: 'Last date to adjust enrolled courses through the Program Coordinator.',
    officialSource: 'https://imsciences.edu.pk/academics/',
    status: 'Upcoming'
  },
  {
    id: 'dl-05',
    title: 'Undergraduate Entrance Test Date',
    category: 'Admissions',
    targetDate: '2026-10-10T09:00:00',
    programOrTarget: 'BSCS, BBA, BSAF Applicants',
    description: 'Entrance test conducted at IMSciences Hayatabad Campus.',
    officialSource: 'https://admissions.imsciences.edu.pk/',
    status: 'Upcoming'
  }
];

export const SAMPLE_APPLICATION: AdmissionApplication = {
  id: 'APP-2026-8841',
  applicantId: 'usr-applicant-1',
  applicantName: 'Ahmed Bilal',
  applicantEmail: 'ahmed.bilal.applicant@gmail.com',
  cnic: '17301-4498123-5',
  phone: '+92-333-9182736',
  domicile: 'Khyber Pakhtunkhwa (Peshawar)',
  selectedProgramId: 'prog-bscs',
  selectedProgramName: 'BS Computer Science (AI Specialization)',
  secondaryChoiceProgramId: 'prog-bsba',
  status: 'Test Scheduled',
  submissionDate: '2026-09-05',
  matricMarks: { obtained: 980, total: 1100, board: 'BISE Peshawar', year: 2024 },
  interMarks: { obtained: 920, total: 1100, board: 'BISE Peshawar', year: 2026 },
  documents: [
    { id: 'doc-1', name: 'Passport Size Photograph', type: 'image/jpeg', required: true, status: 'verified', fileUrl: 'verified-photo.jpg' },
    { id: 'doc-2', name: 'CNIC / Form-B Scanned Copy', type: 'application/pdf', required: true, status: 'verified', fileUrl: 'cnic-scanned.pdf' },
    { id: 'doc-3', name: 'SSC / Matric DMC & Certificate', type: 'application/pdf', required: true, status: 'verified', fileUrl: 'matric-dmc.pdf' },
    { id: 'doc-4', name: 'HSSC / Inter Part-II DMC', type: 'application/pdf', required: true, status: 'verified', fileUrl: 'inter-dmc.pdf' },
    { id: 'doc-5', name: 'Domicile Certificate (KP)', type: 'application/pdf', required: true, status: 'verified', fileUrl: 'kp-domicile.pdf' },
    { id: 'doc-6', name: 'Paid Bank Challan Receipt', type: 'image/jpeg', required: true, status: 'verified', fileUrl: 'bank-challan-paid.jpg' }
  ],
  challanNumber: 'BOK-CHL-2026-9812',
  challanAmount: 2000,
  isChallanPaid: true,
  paymentBank: 'The Bank of Khyber (Hayatabad Branch)',
  depositDate: '2026-09-06',
  testRollNo: 'CS-2026-0482',
  testDate: 'Saturday, October 10, 2026',
  testTime: '09:30 AM (Reporting: 08:30 AM)',
  testCenter: 'Examination Hall 1, Academic Block A, IMSciences Peshawar',
  isTestSlipGenerated: true,
  lastUpdated: '2026-09-14'
};

export const SAMPLE_STUDENT_RESULT: StudentResult = {
  studentId: 'IMS-CS-2024-042',
  studentName: 'Zubair Jan',
  program: 'BS Computer Science (6th Semester)',
  currentSemester: 6,
  cgpa: 3.64,
  semesters: [
    {
      semesterNumber: 1,
      gpa: 3.55,
      totalCredits: 17,
      courses: [
        { code: 'CS101', title: 'Programming Fundamentals', grade: 'A', gradePoints: 4.0, creditHours: 4 },
        { code: 'CS102', title: 'Introduction to ICT', grade: 'A-', gradePoints: 3.67, creditHours: 3 },
        { code: 'MT101', title: 'Calculus & Analytical Geometry', grade: 'B+', gradePoints: 3.33, creditHours: 3 },
        { code: 'EG101', title: 'English Composition & Comprehension', grade: 'A', gradePoints: 4.0, creditHours: 3 },
        { code: 'PK101', title: 'Pakistan Studies', grade: 'A', gradePoints: 4.0, creditHours: 2 }
      ]
    },
    {
      semesterNumber: 2,
      gpa: 3.68,
      totalCredits: 17,
      courses: [
        { code: 'CS201', title: 'Object Oriented Programming', grade: 'A', gradePoints: 4.0, creditHours: 4 },
        { code: 'CS202', title: 'Discrete Structures', grade: 'A-', gradePoints: 3.67, creditHours: 3 },
        { code: 'MT201', title: 'Linear Algebra', grade: 'A', gradePoints: 4.0, creditHours: 3 },
        { code: 'EG201', title: 'Communication Skills', grade: 'B+', gradePoints: 3.33, creditHours: 3 },
        { code: 'IS101', title: 'Islamic Studies / Ethics', grade: 'A', gradePoints: 4.0, creditHours: 2 }
      ]
    },
    {
      semesterNumber: 3,
      gpa: 3.72,
      totalCredits: 18,
      courses: [
        { code: 'CS301', title: 'Data Structures & Algorithms', grade: 'A', gradePoints: 4.0, creditHours: 4 },
        { code: 'CS302', title: 'Computer Organization & Assembly Language', grade: 'B+', gradePoints: 3.33, creditHours: 4 },
        { code: 'CS303', title: 'Database Systems', grade: 'A', gradePoints: 4.0, creditHours: 4 },
        { code: 'MT301', title: 'Probability & Statistics', grade: 'A', gradePoints: 4.0, creditHours: 3 },
        { code: 'MG101', title: 'Principles of Management', grade: 'A-', gradePoints: 3.67, creditHours: 3 }
      ]
    }
  ]
};

export const SAMPLE_ATTENDANCE: AttendanceRecord[] = [
  {
    courseCode: 'CS401',
    courseTitle: 'Design & Analysis of Algorithms',
    instructor: 'Dr. Shahzad Ali',
    totalClasses: 32,
    attendedClasses: 29,
    absentClasses: 3,
    percentage: 90.6,
    status: 'Good'
  },
  {
    courseCode: 'CS402',
    courseTitle: 'Artificial Intelligence & Machine Learning',
    instructor: 'Dr. Usman Ghani',
    totalClasses: 30,
    attendedClasses: 26,
    absentClasses: 4,
    percentage: 86.7,
    status: 'Good'
  },
  {
    courseCode: 'CS403',
    courseTitle: 'Computer Networks & Distributed Systems',
    instructor: 'Engr. Fawad Ahmad',
    totalClasses: 28,
    attendedClasses: 22,
    absentClasses: 6,
    percentage: 78.5,
    status: 'Satisfactory'
  },
  {
    courseCode: 'CS404',
    courseTitle: 'Software Engineering Fundamentals',
    instructor: 'Ms. Sadia Begum',
    totalClasses: 28,
    attendedClasses: 19,
    absentClasses: 9,
    percentage: 67.8,
    status: 'Warning (<75% - Exam Barred)'
  }
];

export const SAMPLE_TICKETS: TicketItem[] = [
  {
    id: 'tkt-01',
    ticketNumber: 'IMS-TKT-2026-1049',
    creatorId: 'IMS-CS-2024-042',
    creatorName: 'Zubair Jan',
    creatorRole: 'student',
    category: 'Finance',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    assignedOffice: 'Finance & Accounts Office',
    subject: 'Semester 6 Challan Payment Verification Delay',
    description: 'I deposited the semester 6 fee voucher via Bank of Khyber Hayatabad branch 3 days ago. The portal still reflects Challan Generated instead of Paid.',
    createdAt: '2026-09-14 10:15',
    updatedAt: '2026-09-15 11:30',
    messages: [
      {
        id: 'msg-1',
        senderName: 'Zubair Jan',
        senderRole: 'student',
        timestamp: '2026-09-14 10:15',
        message: 'Deposited fee challan No BOK-2026-9014 at BOK branch. Please update my status.'
      },
      {
        id: 'msg-2',
        senderName: 'Mr. Tariq Mehmood',
        senderRole: 'staff',
        timestamp: '2026-09-15 11:30',
        message: 'We have fetched the bank scroll from Bank of Khyber main branch. Your payment is being verified in batch reconciliation and will update within 2 hours.'
      }
    ]
  },
  {
    id: 'tkt-02',
    ticketNumber: 'IMS-TKT-2026-1033',
    creatorId: 'APP-2026-8841',
    creatorName: 'Ahmed Bilal',
    creatorRole: 'applicant',
    category: 'Admissions',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    assignedOffice: 'Admissions Office',
    subject: 'Inquiry regarding BS Computer Science test syllabus',
    description: 'Could you please confirm if the entrance test includes chemistry or only physics and mathematics?',
    createdAt: '2026-09-11 14:20',
    updatedAt: '2026-09-12 09:40',
    messages: [
      {
        id: 'msg-3',
        senderName: 'Ahmed Bilal',
        senderRole: 'applicant',
        timestamp: '2026-09-11 14:20',
        message: 'I completed F.Sc Pre-Engineering. Does the test have chemistry questions?'
      },
      {
        id: 'msg-4',
        senderName: 'Mr. Asad Khan',
        senderRole: 'staff',
        timestamp: '2026-09-12 09:40',
        message: 'Dear Applicant, as per official IMSciences policy, the undergraduate computing entrance test consists of English (30%), Mathematics (40%), and General Analytical Reasoning (30%). No Chemistry questions are included.'
      }
    ]
  }
];

export const SAMPLE_APPLICATIONS: AdmissionApplication[] = [
  SAMPLE_APPLICATION,
  {
    id: 'APP-2026-8842',
    applicantId: 'usr-applicant-2',
    applicantName: 'Khadija Rehman',
    applicantEmail: 'khadija.rehman@gmail.com',
    cnic: '17301-8899221-4',
    phone: '+92-300-8899112',
    domicile: 'Khyber Pakhtunkhwa (Mardan)',
    selectedProgramId: 'prog-bba',
    selectedProgramName: 'Bachelor of Business Administration',
    secondaryChoiceProgramId: 'prog-bs-accounting',
    status: 'Verified',
    submissionDate: '2026-09-08',
    matricMarks: { obtained: 950, total: 1100, board: 'BISE Mardan', year: 2024 },
    interMarks: { obtained: 890, total: 1100, board: 'BISE Mardan', year: 2026 },
    documents: [
      { id: 'doc-1', name: 'Passport Size Photograph', type: 'image/jpeg', required: true, status: 'verified', fileUrl: 'photo.jpg' },
      { id: 'doc-2', name: 'CNIC / Form-B Scanned Copy', type: 'application/pdf', required: true, status: 'verified', fileUrl: 'cnic.pdf' },
      { id: 'doc-3', name: 'SSC / Matric DMC & Certificate', type: 'application/pdf', required: true, status: 'verified', fileUrl: 'matric.pdf' },
      { id: 'doc-4', name: 'HSSC / Inter Part-II DMC', type: 'application/pdf', required: true, status: 'verified', fileUrl: 'inter.pdf' },
      { id: 'doc-5', name: 'Domicile Certificate (KP)', type: 'application/pdf', required: true, status: 'verified', fileUrl: 'domicile.pdf' },
      { id: 'doc-6', name: 'Paid Bank Challan Receipt', type: 'image/jpeg', required: true, status: 'verified', fileUrl: 'challan.jpg' }
    ],
    challanNumber: 'BOK-CHL-2026-9815',
    challanAmount: 2000,
    isChallanPaid: true,
    paymentBank: 'The Bank of Khyber',
    depositDate: '2026-09-09',
    testRollNo: 'BBA-2026-0199',
    testDate: 'Saturday, October 10, 2026',
    testTime: '01:30 PM (Reporting: 12:30 PM)',
    testCenter: 'Main Auditorium, IMSciences Peshawar',
    isTestSlipGenerated: true,
    lastUpdated: '2026-09-14'
  }
];

export const SAMPLE_COURSES: CourseItem[] = [
  {
    id: 'crs-1',
    code: 'CS401',
    title: 'Design & Analysis of Algorithms',
    creditHours: 4,
    program: 'BS Computer Science',
    semester: 6,
    instructor: 'Dr. Shahzad Ali',
    prerequisites: ['Data Structures (CS301)'],
    description: 'Advanced algorithm design paradigms, divide-and-conquer, dynamic programming, greedy methods, and graph theory.'
  },
  {
    id: 'crs-2',
    code: 'CS402',
    title: 'Artificial Intelligence & Machine Learning',
    creditHours: 4,
    program: 'BS Computer Science',
    semester: 6,
    instructor: 'Dr. Usman Ghani',
    prerequisites: ['Probability & Statistics (MT301)', 'Data Structures (CS301)'],
    description: 'Heuristic search, neural networks, supervised/unsupervised learning, natural language processing, and deep models.'
  },
  {
    id: 'crs-3',
    code: 'CS403',
    title: 'Computer Networks & Distributed Systems',
    creditHours: 4,
    program: 'BS Computer Science',
    semester: 6,
    instructor: 'Engr. Fawad Ahmad',
    prerequisites: ['Operating Systems (CS304)'],
    description: 'ISO/OSI model, TCP/IP protocol suite, socket programming, routing algorithms, wireless networks, and distributed consensus.'
  },
  {
    id: 'crs-4',
    code: 'CS404',
    title: 'Software Engineering Fundamentals',
    creditHours: 3,
    program: 'BS Computer Science',
    semester: 6,
    instructor: 'Ms. Sadia Begum',
    prerequisites: ['Object Oriented Programming (CS201)'],
    description: 'SDLC, Agile Scrum, requirements analysis, architectural design, verification, testing, and CI/CD pipelines.'
  }
];

export const SAMPLE_TIMETABLE: TimetableSlot[] = [
  {
    id: 'tt-1',
    courseCode: 'CS401',
    courseTitle: 'Design & Analysis of Algorithms',
    day: 'Monday',
    time: '08:30 AM – 10:00 AM',
    room: 'Lab 4 (Computer Block)',
    instructor: 'Dr. Shahzad Ali',
    program: 'BSCS',
    section: '6A'
  },
  {
    id: 'tt-2',
    courseCode: 'CS402',
    courseTitle: 'Artificial Intelligence & Machine Learning',
    day: 'Monday',
    time: '10:15 AM – 11:45 AM',
    room: 'Room 204 (Academic Block A)',
    instructor: 'Dr. Usman Ghani',
    program: 'BSCS',
    section: '6A'
  },
  {
    id: 'tt-3',
    courseCode: 'CS403',
    courseTitle: 'Computer Networks',
    day: 'Tuesday',
    time: '09:00 AM – 10:30 AM',
    room: 'Networks Lab 1',
    instructor: 'Engr. Fawad Ahmad',
    program: 'BSCS',
    section: '6A'
  },
  {
    id: 'tt-4',
    courseCode: 'CS404',
    courseTitle: 'Software Engineering Fundamentals',
    day: 'Wednesday',
    time: '11:45 AM – 01:15 PM',
    room: 'Room 106 (Academic Block A)',
    instructor: 'Ms. Sadia Begum',
    program: 'BSCS',
    section: '6A'
  }
];

export const SAMPLE_EXAMS: ExamDateSheetItem[] = [
  {
    id: 'ex-1',
    courseCode: 'CS401',
    courseTitle: 'Design & Analysis of Algorithms',
    examType: 'Midterm Exam',
    date: '2026-11-16',
    time: '09:30 AM – 11:30 AM',
    venue: 'Exam Hall 2, Block A',
    seatingPlanRow: 'Row C (Seats 21-40)',
    program: 'BS Computer Science',
    semester: 6,
    instructions: 'Original student ID card and examination admit slip mandatory. Calculators allowed.'
  },
  {
    id: 'ex-2',
    courseCode: 'CS402',
    courseTitle: 'Artificial Intelligence & Machine Learning',
    examType: 'Midterm Exam',
    date: '2026-11-18',
    time: '09:30 AM – 11:30 AM',
    venue: 'Main Auditorium',
    seatingPlanRow: 'Row A (Seats 01-30)',
    program: 'BS Computer Science',
    semester: 6,
    instructions: 'Mobile phones and smart watches strictly prohibited.'
  },
  {
    id: 'ex-3',
    courseCode: 'CS403',
    courseTitle: 'Computer Networks & Distributed Systems',
    examType: 'Midterm Exam',
    date: '2026-11-20',
    time: '01:30 PM – 03:30 PM',
    venue: 'Exam Hall 1, Block A',
    seatingPlanRow: 'Row B (Seats 15-35)',
    program: 'BS Computer Science',
    semester: 6,
    instructions: 'Please bring blue or black ballpoint pens only.'
  }
];

export const SAMPLE_RESULT = SAMPLE_STUDENT_RESULT;

