import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { 
  INITIAL_KNOWLEDGE_BASE, 
  INITIAL_OFFICES, 
  INITIAL_PROGRAMS, 
  INITIAL_SCHOLARSHIPS, 
  UNIVERSITY_INFO 
} from './src/data/imsciencesData.ts';
import { IntentType } from './src/types.ts';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with safe lazy checking
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return genAIClient;
}

// In-memory runtime data stores (can be updated dynamically via admin panel)
let dynamicKnowledgeBase = [...INITIAL_KNOWLEDGE_BASE];
let dynamicOffices = [...INITIAL_OFFICES];
let dynamicPrograms = [...INITIAL_PROGRAMS];
let dynamicScholarships = [...INITIAL_SCHOLARSHIPS];

// 1. Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    institution: UNIVERSITY_INFO.name,
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// 2. Data Endpoints
app.get('/api/knowledge', (req, res) => {
  res.json(dynamicKnowledgeBase);
});

app.post('/api/knowledge', (req, res) => {
  const newItem = req.body;
  if (!newItem.id) {
    newItem.id = 'kb-' + Date.now();
  }
  dynamicKnowledgeBase.unshift(newItem);
  res.json({ success: true, item: newItem });
});

app.get('/api/offices', (req, res) => {
  res.json(dynamicOffices);
});

app.get('/api/programs', (req, res) => {
  res.json(dynamicPrograms);
});

app.get('/api/scholarships', (req, res) => {
  res.json(dynamicScholarships);
});

// Intent classification helper
function detectIntent(query: string): { intent: IntentType; confidence: number } {
  const q = query.toLowerCase();

  if (q.includes('test slip') || q.includes('admit card') || q.includes('roll number slip') || q.includes('when test slip')) {
    return { intent: 'TEST_SLIP', confidence: 0.95 };
  }
  if (q.includes('test') || q.includes('entry test') || q.includes('entrance') || q.includes('syllabus') || q.includes('model paper')) {
    return { intent: 'ADMISSION_TEST', confidence: 0.92 };
  }
  if (q.includes('merit') || q.includes('aggregate') || q.includes('closing merit') || q.includes('selection list')) {
    return { intent: 'MERIT', confidence: 0.90 };
  }
  if (q.includes('scholarship') || q.includes('financial aid') || q.includes('hec need') || q.includes('cmeef') || q.includes('stipend')) {
    return { intent: 'SCHOLARSHIP', confidence: 0.95 };
  }
  if (q.includes('fee') || q.includes('challan') || q.includes('voucher') || q.includes('tuition') || q.includes('installments')) {
    return { intent: 'FEE', confidence: 0.92 };
  }
  if (q.includes('refund') || q.includes('security deposit return')) {
    return { intent: 'REFUND', confidence: 0.91 };
  }
  if (q.includes('apply') || q.includes('how to apply') || q.includes('admission portal') || q.includes('register account')) {
    return { intent: 'ADMISSION', confidence: 0.95 };
  }
  if (q.includes('eligibility') || q.includes('criteria') || q.includes('percentage required') || q.includes('fsc pre medical')) {
    return { intent: 'ELIGIBILITY', confidence: 0.92 };
  }
  if (q.includes('bs program') || q.includes('ms program') || q.includes('phd') || q.includes('mba') || q.includes('computer science') || q.includes('bba') || q.includes('specialization')) {
    return { intent: 'PROGRAM', confidence: 0.90 };
  }
  if (q.includes('hostel') || q.includes('room allocation') || q.includes('boarding') || q.includes('mess')) {
    return { intent: 'HOSTEL', confidence: 0.96 };
  }
  if (q.includes('bus') || q.includes('transport') || q.includes('route') || q.includes('pickup')) {
    return { intent: 'TRANSPORT', confidence: 0.95 };
  }
  if (q.includes('library') || q.includes('book') || q.includes('hec digital') || q.includes('turnitin') || q.includes('borrow')) {
    return { intent: 'LIBRARY', confidence: 0.94 };
  }
  if (q.includes('transcript') || q.includes('degree') || q.includes('provisional') || q.includes('bonafide') || q.includes('dmc') || q.includes('character certificate')) {
    return { intent: 'DOCUMENT', confidence: 0.95 };
  }
  if (q.includes('attendance') || q.includes('75%') || q.includes('short attendance') || q.includes('barred')) {
    return { intent: 'ATTENDANCE', confidence: 0.96 };
  }
  if (q.includes('exam') || q.includes('datesheet') || q.includes('date sheet') || q.includes('midterm') || q.includes('final exam')) {
    return { intent: 'EXAM', confidence: 0.94 };
  }
  if (q.includes('result') || q.includes('gpa') || q.includes('cgpa') || q.includes('grading scale')) {
    return { intent: 'RESULT', confidence: 0.93 };
  }
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('extension') || q.includes('office location') || q.includes('where is')) {
    return { intent: 'OFFICE_CONTACT', confidence: 0.93 };
  }
  if (q.includes('deadline') || q.includes('last date') || q.includes('due date')) {
    return { intent: 'DEADLINE', confidence: 0.92 };
  }
  if (q.includes('complaint') || q.includes('grievance') || q.includes('issue') || q.includes('not working')) {
    return { intent: 'COMPLAINT', confidence: 0.88 };
  }

  return { intent: 'GENERAL_FAQ', confidence: 0.75 };
}

// Check if question asks for personal status or private actions that require human office handoff
function checkHandoffNeeded(query: string, intent: IntentType): { needed: boolean; officeId: string; reason: string } {
  const q = query.toLowerCase();
  
  if (q.includes('my application status') || q.includes('check my application') || q.includes('why is my form rejected') || q.includes('action required on my')) {
    return {
      needed: true,
      officeId: 'off-admissions',
      reason: 'Application document verification and individual applicant status tracking requires the Admissions Office.'
    };
  }
  if (q.includes('my fee status') || q.includes('my paid challan not showing') || q.includes('installment request') || q.includes('refund request')) {
    return {
      needed: true,
      officeId: 'off-finance',
      reason: 'Fee reconciliation, bank scroll verification, and installment requests are managed by the Finance & Accounts Office.'
    };
  }
  if (q.includes('my attendance dispute') || q.includes('teacher marked absent') || q.includes('medical leave application')) {
    return {
      needed: true,
      officeId: 'off-student-support',
      reason: 'Attendance grievances and medical certificate validations must be reviewed by the Students Support Office.'
    };
  }
  if (q.includes('rechecking') || q.includes('paper review') || q.includes('transcript urgent collection')) {
    return {
      needed: true,
      officeId: 'off-exam',
      reason: 'Examination paper rechecking and urgent document dispatch is processed by the Examination Office.'
    };
  }
  if (q.includes('erp login') || q.includes('password reset') || q.includes('portal error') || q.includes('wifi')) {
    return {
      needed: true,
      officeId: 'off-it-erp',
      reason: 'Student portal credential resets and network access issues require System & ERP staff assistance.'
    };
  }

  return { needed: false, officeId: '', reason: '' };
}

// RAG Knowledge Retriever & Ranker
function retrieveKnowledgeContext(query: string, intent: IntentType) {
  const q = query.toLowerCase();
  const keywords = q.replace(/[^a-z0-9\s]/gi, '').split(/\s+/).filter(w => w.length > 2);

  // Score knowledge base items
  const scoredKB = dynamicKnowledgeBase.map(item => {
    let score = 0;
    if (item.category === intent) score += 30;
    
    // Priority order boost (1 is highest priority)
    score += (10 - (item.priorityOrder || 5));

    for (const kw of keywords) {
      if (item.title.toLowerCase().includes(kw)) score += 15;
      if (item.content.toLowerCase().includes(kw)) score += 5;
    }

    return { item, score };
  });

  scoredKB.sort((a, b) => b.score - a.score);
  const topKB = scoredKB.filter(k => k.score > 0).slice(0, 4).map(k => k.item);

  // Match programs if related
  const matchedPrograms = dynamicPrograms.filter(p => 
    q.includes(p.name.toLowerCase()) || 
    q.includes(p.code.toLowerCase()) || 
    (p.specializations && p.specializations.some(s => q.includes(s.toLowerCase()))) ||
    (intent === 'PROGRAM' && (q.includes('bs') ? p.degreeLevel === 'Undergraduate' : q.includes('ms') ? p.degreeLevel === 'MS / MPhil' : true))
  ).slice(0, 3);

  // Match scholarships if related
  const matchedScholarships = dynamicScholarships.filter(s =>
    q.includes(s.name.toLowerCase()) ||
    q.includes(s.category.toLowerCase()) ||
    (intent === 'SCHOLARSHIP' && s.approvalStatus === 'Active & Verified')
  ).slice(0, 3);

  // Match office if contact related
  const matchedOffices = dynamicOffices.filter(o =>
    q.includes(o.name.toLowerCase()) ||
    q.includes(o.category.toLowerCase()) ||
    o.services.some(s => keywords.some(k => s.toLowerCase().includes(k)))
  ).slice(0, 2);

  return {
    topKB,
    matchedPrograms,
    matchedScholarships,
    matchedOffices
  };
}

// 3. AI Chat Endpoint with Full Server-side RAG Pipeline
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const { intent, confidence } = detectIntent(message);
    const handoff = checkHandoffNeeded(message, intent);
    const context = retrieveKnowledgeContext(message, intent);

    // Build citations list
    const citations: { title: string; url: string; sourceType: string; verifiedDate: string }[] = [];
    context.topKB.forEach(k => {
      citations.push({
        title: k.title,
        url: k.sourceUrl,
        sourceType: k.sourceName,
        verifiedDate: k.lastVerifiedDate
      });
    });
    context.matchedPrograms.forEach(p => {
      citations.push({
        title: `${p.name} (${p.code}) Official Specification`,
        url: p.officialSource,
        sourceType: 'Official Admission Portal',
        verifiedDate: p.lastUpdated
      });
    });
    context.matchedScholarships.forEach(s => {
      citations.push({
        title: `${s.name} Policy`,
        url: s.officialSource,
        sourceType: 'IMSciences Grants Office',
        verifiedDate: s.lastUpdated
      });
    });

    let assignedHandoffOffice = null;
    if (handoff.needed) {
      const office = dynamicOffices.find(o => o.id === handoff.officeId);
      if (office) {
        assignedHandoffOffice = {
          officeName: office.name,
          email: office.email,
          phone: `${office.phone} (${office.extension})`,
          location: office.location,
          reason: handoff.reason
        };
      }
    }

    const ai = getGenAI();

    // Context text for grounding
    const contextText = `
OFFICIAL UNIVERSITY GROUNDING CONTEXT:
Organization: ${UNIVERSITY_INFO.name}, ${UNIVERSITY_INFO.location}
Official Website: ${UNIVERSITY_INFO.officialWebsite}
Official Admission Portal: ${UNIVERSITY_INFO.admissionPortal}
Current Session: ${UNIVERSITY_INFO.currentSession}

VERIFIED KNOWLEDGE BASE PASSAGES:
${context.topKB.map((k, i) => `[Document ${i+1}] Title: ${k.title}\nCategory: ${k.category}\nSource: ${k.sourceName} (${k.sourceUrl})\nVerified: ${k.lastVerifiedDate}\nContent: ${k.content}`).join('\n\n')}

${context.matchedPrograms.length > 0 ? `VERIFIED PROGRAM OFFERINGS:\n` + context.matchedPrograms.map(p => `- ${p.name} (${p.code}) | Level: ${p.degreeLevel} | Duration: ${p.durationYears} Years (${p.totalSemesters} Semesters) | Eligibility: ${p.eligibility} | Semester Fee: PKR ${p.semesterFee.toLocaleString()} | Admission Fee: PKR ${p.admissionFee.toLocaleString()} | Open: ${p.isOpenForAdmission ? 'Yes' : 'No'} | Source: ${p.officialSource}`).join('\n') : ''}

${context.matchedScholarships.length > 0 ? `VERIFIED SCHOLARSHIPS:\n` + context.matchedScholarships.map(s => `- ${s.name} | Category: ${s.category} | Coverage: ${s.coverage} | Eligibility: ${s.eligibility} | Deadline: ${s.deadline} | Status: ${s.approvalStatus} | Source: ${s.officialSource}`).join('\n') : ''}

${context.matchedOffices.length > 0 ? `RELEVANT OFFICIAL OFFICES:\n` + context.matchedOffices.map(o => `- ${o.name} (${o.category}) | Head: ${o.incharge} (${o.designation}) | Phone: ${o.phone} ${o.extension} | Email: ${o.email} | Location: ${o.location} | Hours: ${o.officeHours}`).join('\n') : ''}
`;

    const systemPrompt = `You are the official IMSciences Peshawar AI University Helpdesk Assistant.
Organization: Institute of Management Sciences (IMSciences), Peshawar.
Campus Address: 1-A, Sector E-5, Phase VII, Hayatabad, Peshawar, Khyber Pakhtunkhwa.

CRITICAL INSTRUCTIONS & ANTI-HALLUCINATION RULES:
1. ONLY provide verified information present in the OFFICIAL UNIVERSITY GROUNDING CONTEXT or verified official IMSciences knowledge.
2. NEVER invent or hallucinate admission deadlines, fee amounts, scholarship amounts, eligibility criteria, merit requirements, test dates, exam dates, office timings, contact numbers, policies, or seat counts.
3. If the answer cannot be verified from the provided official sources, you MUST answer:
"I could not verify this information from the available official IMSciences sources. Please check the relevant official notice or contact the concerned office."
4. Source Priority Order:
   (1) Current official IMSciences announcements
   (2) Current official policies
   (3) Current admission portal
   (4) Current official fee structure
   (5) Current scholarship announcements
   (6) Official website
5. For entrance test slip queries, note official IMSciences policy: Test slips are generated through the online admission portal approximately 2–3 days prior to the entrance test date.
6. For scholarship queries, remind the applicant: "Based on the information provided, you appear to meet the listed criteria for this opportunity. Final eligibility and award decisions are made by IMSciences/the relevant donor or authority."
7. Format answers clearly with bullet points, structured headings, and polite academic tone.`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              role: 'user',
              parts: [
                { text: `${systemPrompt}\n\n${contextText}\n\nUser Question: ${message}` }
              ]
            }
          ],
          config: {
            temperature: 0.2, // low temperature to adhere strictly to verified sources
          }
        });

        const generatedText = response.text || '';
        return res.json({
          reply: generatedText,
          intent,
          confidence,
          citations,
          handoffOffice: assignedHandoffOffice,
          isGrounded: true
        });
      } catch (geminiError) {
        console.error('Gemini API call failed, falling back to grounded knowledge engine:', geminiError);
        // Fall through to deterministic grounded engine below
      }
    }

    // Deterministic source-grounded response engine (fallback when Gemini key is not set or network issue occurs)
    let fallbackReply = '';

    if (intent === 'TEST_SLIP') {
      fallbackReply = `**IMSciences Entrance Test Slip Official Policy:**\n\n` +
        `Entrance-test slips are generated through the official online admission portal (https://admissions.imsciences.edu.pk/) approximately **2 to 3 days before the scheduled test date**.\n\n` +
        `• **How to access:** Log in to your admission portal account using your registered email and password, navigate to 'Application Status', and click 'Download Test Slip'.\n` +
        `• **What it contains:** Your Roll Number, Examination Hall, Reporting Time, and mandatory instructions.\n` +
        `• **Required on Test Day:** Printed Test Slip, Original CNIC / B-Form or Original Matric Certificate, and blue/black ballpoint.\n` +
        `• **Location:** IMSciences Campus, 1-A Sector E-5 Phase VII Hayatabad Peshawar.`;
    } else if (intent === 'ADMISSION' || intent === 'APPLICATION') {
      fallbackReply = `**How to Apply for Admissions at IMSciences Peshawar:**\n\n` +
        `Applications are submitted online via the official portal: **https://admissions.imsciences.edu.pk/**\n\n` +
        `1. **Create Account:** Register with your email and mobile number.\n` +
        `2. **Profile & Academics:** Enter your SSC (Matric) and HSSC (Intermediate) marks.\n` +
        `3. **Program Choice:** Select your desired program (e.g. BS Computer Science, BBA).\n` +
        `4. **Document Upload:** Upload photograph, CNIC/B-Form, and DMCs.\n` +
        `5. **Bank Challan:** Generate the official PKR 2,000 application fee challan payable at Allied Bank (ABL), Bank of Khyber (BoK), or Meezan Bank.\n` +
        `6. **Submit & Verify:** Upload bank deposit receipt and submit for Admissions Office verification.\n\n` +
        `*Admissions Office Contact:* Phone: +92-91-9217451 (Ext. 102/103) | admissions@imsciences.edu.pk`;
    } else if (intent === 'PROGRAM' || intent === 'ELIGIBILITY') {
      if (context.matchedPrograms.length > 0) {
        fallbackReply = `**Verified IMSciences Program Information:**\n\n` +
          context.matchedPrograms.map(p => 
            `### ${p.name} (${p.code})\n` +
            `• **Level & Duration:** ${p.degreeLevel} (${p.durationYears} Years, ${p.totalSemesters} Semesters)\n` +
            `• **Department:** ${p.department}\n` +
            (p.specializations ? `• **Specializations:** ${p.specializations.join(', ')}\n` : '') +
            `• **Eligibility:** ${p.eligibility}\n` +
            `• **Semester Fee:** PKR ${p.semesterFee.toLocaleString()} (Admission Fee: PKR ${p.admissionFee.toLocaleString()})\n` +
            `• **Admission Status:** ${p.isOpenForAdmission ? 'Open for ' + p.admissionCycle : 'Closed for current session'}\n` +
            `• **Official Source:** ${p.officialSource}`
          ).join('\n\n');
      } else {
        fallbackReply = `IMSciences offers undergraduate (BSCS with specializations in AI, Data Science, Cyber Security, Software Engineering; BBA, BS Accounting & Finance, BS Business Analytics, BS Economics, BS English, BS Psychology), graduate (MBA, MS Data Science, MS BioMedicine, MSCS, MS Management), and PhD programs.\n\nPlease select a specific program or check the Program Directory on this portal.`;
      }
    } else if (intent === 'SCHOLARSHIP' || intent === 'FINANCIAL_AID') {
      if (context.matchedScholarships.length > 0) {
        fallbackReply = `**IMSciences Verified Grants & Scholarship Opportunities:**\n\n` +
          `IMSciences administers comprehensive financial assistance so no student is deprived of education:\n\n` +
          context.matchedScholarships.map(s =>
            `### ${s.name}\n` +
            `• **Category:** ${s.category}\n` +
            `• **Coverage:** ${s.coverage} ${s.stipend ? `(Stipend: ${s.stipend})` : ''}\n` +
            `• **Eligibility:** ${s.eligibility}\n` +
            `• **Deadline:** ${s.deadline} (Session ${s.session})\n` +
            `• **Application Procedure:** ${s.applicationProcedure}`
          ).join('\n\n') +
          `\n\n*Note:* "Based on the information provided, you appear to meet the listed criteria for this opportunity. Final eligibility and award decisions are made by IMSciences/the relevant donor or authority."`;
      } else {
        fallbackReply = `IMSciences offers HEC Need-Based Scholarships, Chief Minister Education Endowment Fund (CMEEF KP), Institutional Merit Scholarships (top 3 batch positions), FATA/Merged Districts Quota Grants, and Sibling Fee Rebates (25%). Check the Grants Center tab for deadlines and eligibility.`;
      }
    } else if (intent === 'FEE') {
      fallbackReply = `**IMSciences Fee Submission & Voucher Guidance:**\n\n` +
        `• **Challan Issuance:** Generate your semester fee challan directly from your Student/Applicant Portal.\n` +
        `• **Approved Banks:** Payable at all online branches of **The Bank of Khyber (BoK)** and **Allied Bank Limited (ABL)**, or via 1Link Bill Invoicing.\n` +
        `• **Verification:** Once deposited, upload the stamped bank receipt if required. Payments reflect within 24 to 48 banking hours.\n` +
        `• **Late Surcharge:** Deposits after the due date incur a fine of PKR 200 per day.\n` +
        `• **Accounts Office:** Room G-08, Administration Block (Ext. 110/111 | finance@imsciences.edu.pk).`;
    } else if (intent === 'ATTENDANCE') {
      fallbackReply = `**Official 75% Mandatory Attendance Regulation:**\n\n` +
        `Under IMSciences Academic Regulations:\n` +
        `• Every student must maintain at least **75% attendance** in lectures, tutorials, and practical laboratory sessions in each enrolled course.\n` +
        `• If attendance drops below 75%, the student is **barred from the Final Examination** in that course and receives a grade 'F'.\n` +
        `• Medical concessions (up to 10%) require documented hospital/physician certificates submitted to the Student Support Office within 7 days of absence.`;
    } else if (context.topKB.length > 0) {
      const top = context.topKB[0];
      fallbackReply = `**${top.title}**\n\n${top.content}\n\n*Official Source:* ${top.sourceName} (${top.sourceUrl})\n*Last Verified:* ${top.lastVerifiedDate}`;
    } else {
      fallbackReply = `I could not verify this information from the available official IMSciences sources. Please check the relevant official notice or contact the concerned office.`;
    }

    return res.json({
      reply: fallbackReply,
      intent,
      confidence,
      citations,
      handoffOffice: assignedHandoffOffice,
      isGrounded: true
    });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({
      error: 'An internal error occurred while processing your request.',
      reply: 'I could not verify this information from the available official IMSciences sources. Please check the relevant official notice or contact the concerned office.'
    });
  }
});

// Vite Middleware Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IMSciences AI Helpdesk server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
