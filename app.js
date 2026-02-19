const APP_KEY = "tn_incubator_charter_app_v1";
const AUTH_KEY = "tn_incubator_auth_v1";

const config = window.SURVEY_CONFIG || {};

const SECTION_RUBRICS = {
  "Executive Summary": [
    "Response is clear, compelling, and fully aligned to the question.",
    "Narrative connects mission, vision, and outcomes to a defined student population.",
    "Evidence and rationale meet Tennessee charter application expectations."
  ],
  "Founding Team and Capacity": [
    "Roles, qualifications, and responsibilities are explicit and credible.",
    "Execution plan includes ownership, timeline, and accountability structures.",
    "Capacity plan demonstrates readiness to open and operate successfully."
  ],
  "Community Need and Engagement": [
    "Need statement uses recent, local, and relevant data.",
    "Plan identifies specific student and family needs with measurable targets.",
    "Engagement strategy is concrete, sustained, and two-way."
  ],
  "Academic Plan": [
    "Academic design is coherent, standards-aligned, and evidence-based.",
    "Implementation details include staffing, schedule, and data-driven decision points.",
    "Plan includes measurable goals, interventions, and progress-monitoring cycles."
  ],
  "School Culture and Climate": [
    "Culture systems are proactive, consistent, and mission-aligned.",
    "Behavior, attendance, and family engagement plans include clear routines and ownership.",
    "Student support structures are equitable and measurable."
  ],
  "Special Populations": [
    "Services for special populations are compliant, specific, and adequately staffed.",
    "Instructional supports and interventions are clearly defined and data-informed.",
    "Family communication and progress monitoring processes are actionable."
  ],
  Operations: [
    "Operational systems are realistic, compliant, and aligned to enrollment growth.",
    "Plans include clear staffing, processes, and contingency actions.",
    "Execution details include timeline, owners, and quality controls."
  ],
  "Financial Plan": [
    "Financial assumptions are transparent, realistic, and tied to program design.",
    "Budget narrative explains key drivers, controls, and sustainability approach.",
    "Plan demonstrates fiscal health, risk management, and long-term viability."
  ],
  Governance: [
    "Governance structure is clear, compliant, and role-appropriate.",
    "Board oversight includes academic, financial, and legal accountability.",
    "Policies and reporting mechanisms support effective stewardship."
  ]
};

const QUESTION_BLUEPRINTS = [
  { id: "q01", section: "Executive Summary", title: "Mission Statement", prompt: "State the school's mission and the intended long-term impact on students.", intake: ["What is your mission statement?", "What student outcomes are central to this mission?", "How will this mission guide daily decisions?"] },
  { id: "q02", section: "Executive Summary", title: "Vision and Model Overview", prompt: "Describe the school's vision and summarize the educational model.", intake: ["What does success look like in 5 years?", "What makes your model distinct?", "How does the model serve your target families?"] },
  { id: "q03", section: "Executive Summary", title: "Target Population", prompt: "Identify the target student population and explain why this school is needed for them.", intake: ["Who are your priority students?", "What barriers do these students face now?", "How will your school address those barriers?"] },
  { id: "q04", section: "Executive Summary", title: "Opening Readiness", prompt: "Summarize why the applicant team is ready to open and operate a high-quality school.", intake: ["What are your top readiness strengths?", "What are your remaining gaps?", "How will gaps be closed before launch?"] },
  { id: "q05", section: "Founding Team and Capacity", title: "Founding Team Experience", prompt: "Describe the founding team's qualifications and relevant experience.", intake: ["Who are the core team members?", "What experience aligns to this work?", "What track record demonstrates capacity?"] },
  { id: "q06", section: "Founding Team and Capacity", title: "Leadership Roles and Responsibilities", prompt: "Define leadership roles, responsibilities, and reporting lines for pre-opening and Year 1.", intake: ["What are the key leadership roles?", "Who is accountable for each area?", "How will roles shift from planning to operation?"] },
  { id: "q07", section: "Founding Team and Capacity", title: "Capacity Gaps and Mitigation", prompt: "Identify known capacity gaps and provide a mitigation plan.", intake: ["What gaps exist today?", "What external supports will be used?", "What is the timeline to close each gap?"] },
  { id: "q08", section: "Founding Team and Capacity", title: "Pre-Opening Work Plan", prompt: "Present a pre-opening work plan with milestones, owners, and deadlines.", intake: ["What are top pre-opening milestones?", "Who owns each milestone?", "How will completion be monitored?"] },
  { id: "q09", section: "Community Need and Engagement", title: "Academic Need Analysis", prompt: "Use data to explain academic need in the proposed service area.", intake: ["Which academic indicators show need?", "What student groups are most impacted?", "What data sources are you using?"] },
  { id: "q10", section: "Community Need and Engagement", title: "Demographic and Enrollment Context", prompt: "Describe local demographic trends and enrollment context relevant to the proposal.", intake: ["What demographic trends matter most?", "How do enrollment trends shape your plan?", "What assumptions are based on this context?"] },
  { id: "q11", section: "Community Need and Engagement", title: "Family Demand Evidence", prompt: "Provide evidence of family demand for the proposed school.", intake: ["What demand signals have you collected?", "How many families expressed interest?", "How representative is the outreach sample?"] },
  { id: "q12", section: "Community Need and Engagement", title: "Community Engagement Plan", prompt: "Explain how families and community members were engaged and how engagement will continue.", intake: ["How have you engaged community to date?", "What feedback shaped the design?", "How will engagement continue post-opening?"] },
  { id: "q13", section: "Community Need and Engagement", title: "Partnership Strategy", prompt: "Describe external partners and how each partnership advances student outcomes.", intake: ["Who are your core partners?", "What does each partner provide?", "How will partner effectiveness be monitored?"] },
  { id: "q14", section: "Community Need and Engagement", title: "Equity Commitments", prompt: "Explain how the proposal advances equitable access and outcomes.", intake: ["What equity goals are explicit?", "How will barriers to access be removed?", "Which metrics will track equitable outcomes?"] },
  { id: "q15", section: "Academic Plan", title: "Educational Philosophy", prompt: "Describe the educational philosophy and instructional principles that anchor the school model.", intake: ["What instructional beliefs define your model?", "How do these beliefs translate into classroom practice?", "How will consistency be ensured across classrooms?"] },
  { id: "q16", section: "Academic Plan", title: "Curriculum Selection", prompt: "Explain curriculum selection criteria and adopted curricular resources.", intake: ["Which curricula will you adopt?", "Why were these selected?", "How will curriculum quality be monitored?"] },
  { id: "q17", section: "Academic Plan", title: "Standards Alignment", prompt: "Describe how curriculum and instruction align to Tennessee standards.", intake: ["How is standards alignment verified?", "How will teachers unpack standards?", "How will gaps in alignment be addressed?"] },
  { id: "q18", section: "Academic Plan", title: "Instructional Model", prompt: "Describe daily instructional practices and structures across grade levels.", intake: ["What does a strong lesson look like?", "How is instructional time structured?", "How will instructional quality be observed?"] },
  { id: "q19", section: "Academic Plan", title: "Instructional Time and Calendar", prompt: "Provide instructional calendar, daily schedule, and rationale for allocated time.", intake: ["How many instructional days and minutes are planned?", "How is time divided by subject?", "Why is this schedule appropriate for target students?"] },
  { id: "q20", section: "Academic Plan", title: "Assessment System", prompt: "Explain the assessment framework, including interim and formative assessments.", intake: ["What assessments will be used?", "How often will data be collected?", "How will validity and reliability be addressed?"] },
  { id: "q21", section: "Academic Plan", title: "Data-Driven Instruction", prompt: "Explain data-analysis routines and instructional response cycles.", intake: ["When do data meetings occur?", "Who attends and decides actions?", "How are reteach/intervention decisions made?"] },
  { id: "q22", section: "Academic Plan", title: "Academic Goals", prompt: "Set measurable annual and multi-year academic goals.", intake: ["What are Year 1 goals by subject?", "What subgroup goals are set?", "How will progress be reported?"] },
  { id: "q23", section: "Academic Plan", title: "Intervention Framework", prompt: "Describe tiered interventions for students below grade level.", intake: ["What are Tier 1/2/3 supports?", "What triggers movement between tiers?", "How is intervention impact measured?"] },
  { id: "q24", section: "Academic Plan", title: "Acceleration for Advanced Learners", prompt: "Describe supports for students needing advanced instruction and acceleration.", intake: ["How are advanced learners identified?", "What acceleration options are offered?", "How is growth tracked for these students?"] },
  { id: "q25", section: "Academic Plan", title: "Literacy Strategy", prompt: "Detail literacy instruction and supports across grade levels.", intake: ["What is your literacy approach?", "How will struggling readers be supported?", "How will literacy growth be benchmarked?"] },
  { id: "q26", section: "Academic Plan", title: "Math Strategy", prompt: "Detail mathematics instruction, conceptual development, and intervention supports.", intake: ["What are core math priorities?", "How will misconceptions be addressed?", "How will math proficiency be monitored?"] },
  { id: "q27", section: "Academic Plan", title: "Science and Social Studies Plan", prompt: "Describe science and social studies instructional approach and integration.", intake: ["How are science/social studies sequenced?", "How will inquiry and content rigor be ensured?", "How are assessments embedded in these subjects?"] },
  { id: "q28", section: "Academic Plan", title: "College and Career Readiness", prompt: "Explain how the model prepares students for postsecondary success.", intake: ["What readiness outcomes are expected?", "What experiences support readiness?", "How will readiness indicators be tracked?"] },
  { id: "q29", section: "Academic Plan", title: "Technology Integration", prompt: "Describe the role of instructional technology in teaching and learning.", intake: ["How is technology used in instruction?", "How will equitable access be ensured?", "How is digital impact on learning measured?"] },
  { id: "q30", section: "Academic Plan", title: "Teacher Coaching and Observation", prompt: "Explain teacher observation, coaching cadence, and instructional improvement systems.", intake: ["How often are teachers observed?", "What coaching model is used?", "How are coaching outcomes measured?"] },
  { id: "q31", section: "Academic Plan", title: "Academic Accountability", prompt: "Describe internal accountability systems for academic performance.", intake: ["Who owns academic performance at each level?", "What meetings review progress?", "What actions are triggered when goals are missed?"] },
  { id: "q32", section: "School Culture and Climate", title: "Culture Vision", prompt: "Describe the school's culture vision and expected student experience.", intake: ["What culture commitments define the school?", "How are expectations taught to students?", "How is culture consistency maintained?"] },
  { id: "q33", section: "School Culture and Climate", title: "Behavior Framework", prompt: "Describe behavior expectations, routines, and restorative/disciplinary responses.", intake: ["What are schoolwide behavior systems?", "How will behavior incidents be addressed?", "How will fairness and consistency be ensured?"] },
  { id: "q34", section: "School Culture and Climate", title: "Attendance and Persistence", prompt: "Explain attendance, chronic absenteeism prevention, and persistence strategies.", intake: ["How will attendance be monitored daily?", "What interventions target chronic absence?", "How will family outreach support attendance?"] },
  { id: "q35", section: "School Culture and Climate", title: "Student Wellness and SEL", prompt: "Describe social-emotional learning, wellness supports, and crisis response.", intake: ["What SEL framework will be used?", "What wellness supports are available?", "How are high-need students triaged?"] },
  { id: "q36", section: "School Culture and Climate", title: "Family Communication", prompt: "Describe family communication systems and response expectations.", intake: ["Which communication channels are used?", "How quickly are concerns addressed?", "How do families provide feedback?"] },
  { id: "q37", section: "School Culture and Climate", title: "Student Safety Plan", prompt: "Provide an overview of physical and emotional safety policies and procedures.", intake: ["What are key safety protocols?", "How are staff trained on safety?", "How are incidents documented and reviewed?"] },
  { id: "q38", section: "School Culture and Climate", title: "Culture Monitoring", prompt: "Explain how climate and culture data are collected and used.", intake: ["What culture indicators are tracked?", "How often are surveys/data reviewed?", "What actions follow negative trend data?"] },
  { id: "q39", section: "Special Populations", title: "Students with Disabilities Service Model", prompt: "Describe identification, evaluation, and services for students with disabilities.", intake: ["How are students identified and evaluated?", "What service delivery model is planned?", "How are compliance and progress monitored?"] },
  { id: "q40", section: "Special Populations", title: "Multilingual Learner Program", prompt: "Describe the model for serving multilingual learners and monitoring language growth.", intake: ["Which ML instructional models will be used?", "How are proficiency levels assessed?", "How are teachers supported to serve ML students?"] },
  { id: "q41", section: "Special Populations", title: "MTSS Framework", prompt: "Describe the school's MTSS framework across academics, behavior, and attendance.", intake: ["How are students identified for support?", "What tiered supports are offered?", "How are students exited from support tiers?"] },
  { id: "q42", section: "Special Populations", title: "Staffing for Specialized Services", prompt: "Provide staffing plan and credentials for specialized service providers.", intake: ["What specialized roles are required?", "How are credentials and compliance ensured?", "How will caseloads remain manageable?"] },
  { id: "q43", section: "Special Populations", title: "Progress Monitoring for Special Populations", prompt: "Explain progress-monitoring tools and reporting routines for special populations.", intake: ["Which growth metrics will be tracked?", "How often is progress reviewed?", "How are families informed about progress?"] },
  { id: "q44", section: "Special Populations", title: "Inclusion and Access", prompt: "Describe how inclusive practices ensure access to rigorous instruction for all students.", intake: ["How will inclusive classrooms be structured?", "How are accommodations implemented?", "How is access to grade-level content verified?"] },
  { id: "q45", section: "Special Populations", title: "Compliance and Documentation", prompt: "Explain systems for legal compliance, documentation, and audit readiness.", intake: ["What systems track compliance deadlines?", "Who reviews documentation quality?", "How are compliance risks escalated?"] },
  { id: "q46", section: "Operations", title: "Enrollment and Recruitment Strategy", prompt: "Describe recruitment channels, enrollment projections, and outreach timeline.", intake: ["What are Year 1 and Year 2 targets?", "Which channels drive enrollment?", "Who owns recruitment execution?"] },
  { id: "q47", section: "Operations", title: "Lottery and Admissions Process", prompt: "Explain admissions process, lottery procedures, and enrollment compliance.", intake: ["How will lottery rules be implemented?", "How are records maintained?", "How is fairness and transparency communicated?"] },
  { id: "q48", section: "Operations", title: "Staffing Plan", prompt: "Provide role-based staffing plan aligned to enrollment and programming.", intake: ["What are projected FTEs by role?", "How does staffing scale with enrollment?", "What contingencies exist for hiring delays?"] },
  { id: "q49", section: "Operations", title: "Professional Development Plan", prompt: "Describe annual professional development scope, cadence, and impact goals.", intake: ["What are major PD strands?", "How often is PD delivered?", "How is PD effectiveness measured?"] },
  { id: "q50", section: "Operations", title: "Facilities Plan", prompt: "Describe facility strategy, readiness timeline, and contingency planning.", intake: ["What facility is planned for opening?", "What approvals or work remain?", "What backup facility options exist?"] },
  { id: "q51", section: "Operations", title: "Transportation and Food Services", prompt: "Explain transportation and nutrition plans for equitable student access.", intake: ["How will transportation be provided?", "How will meal service be managed?", "What risks are anticipated and mitigated?"] },
  { id: "q52", section: "Operations", title: "Operational Compliance and Risk Management", prompt: "Describe systems for compliance, procurement, records, and risk management.", intake: ["What are top compliance obligations?", "How are operational controls documented?", "How are risks monitored and reported?"] },
  { id: "q53", section: "Financial Plan", title: "Revenue Assumptions", prompt: "Detail major revenue assumptions and sensitivity considerations.", intake: ["What are enrollment-based assumptions?", "What non-state revenue is expected?", "How are downside cases modeled?"] },
  { id: "q54", section: "Financial Plan", title: "Expense Assumptions", prompt: "Explain major expense assumptions and cost drivers.", intake: ["What are largest cost categories?", "How were projections developed?", "Which costs are variable vs fixed?"] },
  { id: "q55", section: "Financial Plan", title: "Multi-Year Budget Narrative", prompt: "Provide narrative that explains 5-year budget trends and sustainability.", intake: ["What trends are most significant over 5 years?", "Where are key pressure points?", "How will sustainability be protected?"] },
  { id: "q56", section: "Financial Plan", title: "Cash Flow Management", prompt: "Describe cash flow planning, monitoring, and contingency actions.", intake: ["How is cash monitored monthly?", "What triggers intervention?", "What liquidity safeguards are in place?"] },
  { id: "q57", section: "Financial Plan", title: "Financial Controls and Internal Oversight", prompt: "Explain internal controls, segregation of duties, and fiscal oversight processes.", intake: ["What controls exist for spending approvals?", "How are reconciliations and audits handled?", "Who reviews financial reports and cadence?"] },
  { id: "q58", section: "Financial Plan", title: "Budget Risk Mitigation", prompt: "Identify key financial risks and describe mitigation strategies.", intake: ["What are the top budget risks?", "What is the mitigation plan for each?", "How are risk thresholds monitored?"] },
  { id: "q59", section: "Governance", title: "Board Composition and Expertise", prompt: "Describe board member expertise and how composition supports mission execution.", intake: ["What competencies are represented on the board?", "What gaps remain in board expertise?", "How will board recruitment address gaps?"] },
  { id: "q60", section: "Governance", title: "Board Responsibilities and Committees", prompt: "Explain board duties, committee structures, and decision authority.", intake: ["What committees will operate?", "What decisions are reserved for board action?", "How does committee work inform full-board oversight?"] },
  { id: "q61", section: "Governance", title: "Board-School Leader Relationship", prompt: "Describe boundaries between governance and management responsibilities.", intake: ["How are roles separated in practice?", "How is school leader evaluated?", "How are governance conflicts resolved?"] },
  { id: "q62", section: "Governance", title: "Governance Accountability and Reporting", prompt: "Explain board reporting systems for academics, finances, compliance, and performance.", intake: ["What recurring reports are reviewed?", "What performance dashboard is used?", "How are corrective actions documented and tracked?"] }
];

function rubricForSection(section) {
  return SECTION_RUBRICS[section] || SECTION_RUBRICS.Operations;
}

const QUESTION_BANK = QUESTION_BLUEPRINTS.map((question) => ({
  ...question,
  rubric: rubricForSection(question.section),
  financeTools: question.section === "Financial Plan"
}));

const STARTER_BUDGET = [
  ["Enrollment", 312, 356, 404],
  ["Per-Pupil Revenue", 11800, 12150, 12450],
  ["Total Revenue", 3681600, 4325400, 5029800],
  ["Personnel", 2390000, 2780000, 3160000],
  ["Benefits", 597500, 695000, 790000],
  ["Facilities", 390000, 420000, 455000],
  ["Instructional Materials", 155000, 165000, 180000],
  ["Student Services", 140000, 156000, 175000],
  ["Other Operating", 210000, 230000, 248000],
  ["Net Position", 189100, -102600, 216800]
];

let state = loadState();
let authSession = loadAuthSession();
let currentApplicationId = localStorage.getItem("tn_current_application_id") || "";
let currentDocs = [];
let currentIndex = 0;
let pendingImprovedText = "";

const els = {
  completionLabel: document.getElementById("completionLabel"),
  completionMeter: document.getElementById("completionMeter"),
  scoreGrid: document.getElementById("scoreGrid"),
  questionCount: document.getElementById("questionCount"),
  questionList: document.getElementById("questionList"),
  questionSection: document.getElementById("questionSection"),
  questionTitle: document.getElementById("questionTitle"),
  questionPrompt: document.getElementById("questionPrompt"),
  rubricList: document.getElementById("rubricList"),
  intakeFields: document.getElementById("intakeFields"),
  responseText: document.getElementById("responseText"),
  scorePanel: document.getElementById("scorePanel"),
  scoreBadge: document.getElementById("scoreBadge"),
  scoreReason: document.getElementById("scoreReason"),
  scoreFeedback: document.getElementById("scoreFeedback"),
  redlinePanel: document.getElementById("redlinePanel"),
  redlineDiff: document.getElementById("redlineDiff"),
  notifyStatus: document.getElementById("notifyStatus"),
  coachSelect: document.getElementById("coachSelect"),
  financePanel: document.getElementById("financePanel"),
  budgetTableBody: document.getElementById("budgetTableBody"),
  reviewQuestionSelect: document.getElementById("reviewQuestionSelect"),
  reviewScoreSelect: document.getElementById("reviewScoreSelect"),
  reviewComment: document.getElementById("reviewComment"),
  reviewStatus: document.getElementById("reviewStatus"),
  styleTone: document.getElementById("styleTone"),
  styleLength: document.getElementById("styleLength"),
  stylePov: document.getElementById("stylePov"),
  stylePhrases: document.getElementById("stylePhrases"),
  schoolName: document.getElementById("schoolName"),
  applicantName: document.getElementById("applicantName"),
  applicantEmail: document.getElementById("applicantEmail"),
  coachDialog: document.getElementById("coachDialog"),
  coachList: document.getElementById("coachList"),
  coachName: document.getElementById("coachName"),
  coachEmail: document.getElementById("coachEmail"),
  authShell: document.getElementById("authShell"),
  appShell: document.getElementById("appShell"),
  authStatus: document.getElementById("authStatus"),
  loginForm: document.getElementById("loginForm"),
  registerForm: document.getElementById("registerForm"),
  forgotForm: document.getElementById("forgotForm"),
  resetForm: document.getElementById("resetForm"),
  showLoginBtn: document.getElementById("showLoginBtn"),
  showRegisterBtn: document.getElementById("showRegisterBtn"),
  showForgotBtn: document.getElementById("showForgotBtn"),
  loginEmail: document.getElementById("loginEmail"),
  loginPassword: document.getElementById("loginPassword"),
  registerName: document.getElementById("registerName"),
  registerEmail: document.getElementById("registerEmail"),
  registerPassword: document.getElementById("registerPassword"),
  forgotEmail: document.getElementById("forgotEmail"),
  resetToken: document.getElementById("resetToken"),
  resetPassword: document.getElementById("resetPassword"),
  userBadge: document.getElementById("userBadge"),
  logoutBtn: document.getElementById("logoutBtn"),
  applicationSelect: document.getElementById("applicationSelect"),
  newApplicationBtn: document.getElementById("newApplicationBtn"),
  adminOverviewBtn: document.getElementById("adminOverviewBtn"),
  adminPanel: document.getElementById("adminPanel"),
  adminSummary: document.getElementById("adminSummary"),
  generatedDocsList: document.getElementById("generatedDocsList")
};

init();

async function init() {
  bindAuthEvents();

  if (!authSession?.token) {
    showAuthMode("login");
    showAuthShell();
    return;
  }

  const me = await loadMe();
  if (!me) {
    clearAuthSession();
    showAuthMode("login");
    showAuthShell();
    return;
  }

  authSession.user = me;
  if (!state.responses) state.responses = {};
  if (!state.coaches) state.coaches = [];
  if (!state.style) {
    state.style = {
      tone: "formal",
      length: "mixed",
      pov: "first-person plural",
      phrases: "",
      schoolName: "",
      applicantName: "",
      applicantEmail: ""
    };
  }

  bindEvents();
  hydrateStyle();
  renderBudget();
  await loadOrCreateApplication();
  renderHeaderUser();
  renderAll();
  showAppShell();
}

function bindEvents() {
  document.getElementById("saveStyleBtn").addEventListener("click", () => {
    state.style.tone = els.styleTone.value;
    state.style.length = els.styleLength.value;
    state.style.pov = els.stylePov.value;
    state.style.phrases = els.stylePhrases.value.trim();
    state.style.schoolName = els.schoolName.value.trim();
    state.style.applicantName = els.applicantName.value.trim();
    state.style.applicantEmail = els.applicantEmail.value.trim();
    persist();
  });

  document.getElementById("saveIntakeBtn").addEventListener("click", saveIntakeForCurrent);

  document.getElementById("generateBtn").addEventListener("click", async () => {
    const question = QUESTION_BANK[currentIndex];
    const response = getResponse(question.id);
    const mode = getDraftMode();

    if (mode === "own" && !els.responseText.value.trim()) {
      els.responseText.focus();
      return;
    }

    if (mode === "assist") {
      const draft = await generateDraft(question, response);
      response.draftText = draft;
      els.responseText.value = draft;
      persist();
    }
  });

  document.getElementById("scoreBtn").addEventListener("click", async () => {
    const question = QUESTION_BANK[currentIndex];
    const response = getResponse(question.id);
    response.draftText = els.responseText.value.trim();
    if (!response.draftText) return;

    const score = await scoreDraft(question, response.draftText);
    response.score = score;
    response.lastUpdated = new Date().toISOString();
    persist();
    renderAll();
    renderCurrentQuestion();
  });

  document.getElementById("improveBtn").addEventListener("click", async () => {
    const question = QUESTION_BANK[currentIndex];
    const response = getResponse(question.id);
    const currentText = els.responseText.value.trim();
    if (!currentText) return;

    const improved = await improveDraft(question, currentText, response.score || null);
    pendingImprovedText = improved;
    els.redlineDiff.innerHTML = renderDiffHtml(currentText, improved);
    els.redlinePanel.classList.remove("hidden");
  });

  document.getElementById("acceptRedlineBtn").addEventListener("click", () => {
    if (!pendingImprovedText) return;
    const question = QUESTION_BANK[currentIndex];
    const response = getResponse(question.id);
    response.draftText = pendingImprovedText;
    els.responseText.value = pendingImprovedText;
    pendingImprovedText = "";
    els.redlinePanel.classList.add("hidden");
    persist();
  });

  document.getElementById("completeBtn").addEventListener("click", async () => {
    const question = QUESTION_BANK[currentIndex];
    const response = getResponse(question.id);
    response.draftText = els.responseText.value.trim();
    if (!response.draftText) return;

    if (!response.score) {
      response.score = await scoreDraft(question, response.draftText);
    }

    response.completed = true;
    response.readyForCoach = false;
    response.lastUpdated = new Date().toISOString();
    persist();
    renderAll();
  });

  document.getElementById("notifyCoachBtn").addEventListener("click", async () => {
    const coachId = els.coachSelect.value;
    const coach = state.coaches.find((c) => c.id === coachId);
    if (!coach) {
      els.notifyStatus.textContent = "Add a coach first.";
      return;
    }

    const question = QUESTION_BANK[currentIndex];
    const response = getResponse(question.id);
    if (!response.draftText) {
      els.notifyStatus.textContent = "Save a draft before sending to coach.";
      return;
    }

    response.readyForCoach = true;
    persist();

    const sent = await sendNotification("question_ready_for_review", {
      coach,
      question,
      response,
      applicant: {
        name: state.style.applicantName,
        email: state.style.applicantEmail
      }
    });

    els.notifyStatus.textContent = sent
      ? `Coach notification sent to ${coach.email}.`
      : "Coach marked for review. Configure NOTIFICATION_WEBHOOK_URL to send emails.";

    renderAll();
  });

  document.getElementById("submitReviewBtn").addEventListener("click", async () => {
    const qid = els.reviewQuestionSelect.value;
    const score = els.reviewScoreSelect.value;
    const comment = els.reviewComment.value.trim();
    const question = QUESTION_BANK.find((q) => q.id === qid);
    if (!question) return;

    const response = getResponse(qid);
    response.coachReview = {
      score,
      comment,
      reviewedAt: new Date().toISOString()
    };
    response.readyForCoach = false;
    response.score = {
      level: score,
      reason: "Coach review score applied.",
      feedback: comment || "Coach did not include comments."
    };

    persist();
    renderAll();

    const sent = await sendNotification("coach_review_completed", {
      question,
      review: response.coachReview,
      applicant: {
        name: state.style.applicantName,
        email: state.style.applicantEmail
      }
    });

    els.reviewStatus.textContent = sent
      ? "Review submitted and applicant notified by email."
      : "Review submitted. Configure NOTIFICATION_WEBHOOK_URL to email applicant.";
  });

  document.getElementById("manageCoachesBtn").addEventListener("click", () => {
    els.coachDialog.showModal();
  });

  document.getElementById("addCoachBtn").addEventListener("click", async () => {
    if (state.coaches.length >= 8) return;
    const name = els.coachName.value.trim();
    const email = els.coachEmail.value.trim();
    if (!name || !email) return;

    try {
      const result = await apiFetch(`/applications/${currentApplicationId}/coaches`, {
        method: "POST",
        body: JSON.stringify({ name, email })
      });
      state.coaches = result.application.coaches || [];
      els.coachName.value = "";
      els.coachEmail.value = "";
      persist();
      renderCoaches();
      renderCoachSelects();
    } catch (error) {
      els.notifyStatus.textContent = error.message;
    }
  });

  document.getElementById("exportDocBtn").addEventListener("click", exportApplication);

  document.getElementById("downloadBudgetBtn").addEventListener("click", downloadBudgetCsv);

  document.getElementById("openBudgetSheetBtn").addEventListener("click", () => {
    if (config.BUDGET_SHEET_URL) {
      window.open(config.BUDGET_SHEET_URL, "_blank", "noopener,noreferrer");
      return;
    }

    alert("Set BUDGET_SHEET_URL in config.js to open a Google Sheet template.");
  });

  els.logoutBtn.addEventListener("click", () => {
    clearAuthSession();
    showAuthMode("login");
    showAuthShell();
  });

  els.newApplicationBtn.addEventListener("click", async () => {
    const schoolName = prompt("Name of the school for this new application:");
    if (!schoolName) return;

    try {
      const created = await apiFetch("/applications", {
        method: "POST",
        body: JSON.stringify({ schoolName })
      });
      currentApplicationId = created.application.id;
      localStorage.setItem("tn_current_application_id", currentApplicationId);
      state = freshState(schoolName);
      persist();
      await loadApplicationsIntoSelect();
      renderAll();
    } catch (error) {
      els.notifyStatus.textContent = error.message;
    }
  });

  els.applicationSelect.addEventListener("change", async () => {
    const nextId = els.applicationSelect.value;
    if (!nextId) return;
    currentApplicationId = nextId;
    localStorage.setItem("tn_current_application_id", currentApplicationId);
    await loadApplicationState(currentApplicationId);
    renderAll();
  });

  els.adminOverviewBtn.addEventListener("click", async () => {
    if (els.adminPanel.classList.contains("hidden")) {
      await loadAdminOverview();
      els.adminPanel.classList.remove("hidden");
    } else {
      els.adminPanel.classList.add("hidden");
    }
  });
}

function bindAuthEvents() {
  els.showLoginBtn.addEventListener("click", () => showAuthMode("login"));
  els.showRegisterBtn.addEventListener("click", () => showAuthMode("register"));
  els.showForgotBtn.addEventListener("click", () => showAuthMode("forgot"));

  els.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    els.authStatus.textContent = "Logging in...";
    try {
      const result = await rawFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: els.loginEmail.value.trim(),
          password: els.loginPassword.value
        })
      });
      setAuthSession(result);
      window.location.reload();
    } catch (error) {
      els.authStatus.textContent = error.message;
    }
  });

  els.registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    els.authStatus.textContent = "Creating account...";
    try {
      const result = await rawFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: els.registerName.value.trim(),
          email: els.registerEmail.value.trim(),
          password: els.registerPassword.value
        })
      });
      setAuthSession(result);
      window.location.reload();
    } catch (error) {
      els.authStatus.textContent = error.message;
    }
  });

  els.forgotForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    els.authStatus.textContent = "Sending reset request...";
    try {
      const result = await rawFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: els.forgotEmail.value.trim() })
      });
      els.authStatus.textContent = result.devResetToken
        ? `Reset token (dev): ${result.devResetToken}. Use it below.`
        : "If the email exists, reset instructions were sent.";
      showAuthMode("reset");
    } catch (error) {
      els.authStatus.textContent = error.message;
    }
  });

  els.resetForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    els.authStatus.textContent = "Resetting password...";
    try {
      await rawFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          token: els.resetToken.value.trim(),
          newPassword: els.resetPassword.value
        })
      });
      els.authStatus.textContent = "Password reset successful. Please log in.";
      showAuthMode("login");
    } catch (error) {
      els.authStatus.textContent = error.message;
    }
  });
}

function showAuthMode(mode) {
  els.loginForm.classList.toggle("hidden", mode !== "login");
  els.registerForm.classList.toggle("hidden", mode !== "register");
  els.forgotForm.classList.toggle("hidden", mode !== "forgot");
  els.resetForm.classList.toggle("hidden", mode !== "reset");
}

function showAuthShell() {
  els.authShell.classList.remove("hidden");
  els.appShell.classList.add("hidden");
}

function showAppShell() {
  els.authShell.classList.add("hidden");
  els.appShell.classList.remove("hidden");
}

function renderAll() {
  renderGeneratedDocs();
  renderProgress();
  renderQuestionList();
  renderCurrentQuestion();
  renderCoaches();
  renderCoachSelects();
  renderReviewQueue();
}

function renderProgress() {
  const total = QUESTION_BANK.length;
  const responses = QUESTION_BANK.map((q) => getResponse(q.id));
  const completed = responses.filter((r) => r.completed).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const distribution = responses.reduce(
    (acc, r) => {
      const level = r.score?.level;
      if (level === "meet") acc.meet += 1;
      if (level === "partial") acc.partial += 1;
      if (level === "no") acc.no += 1;
      return acc;
    },
    { meet: 0, partial: 0, no: 0 }
  );

  els.completionLabel.textContent = `${pct}% complete (${completed}/${total})`;
  els.completionMeter.style.width = `${pct}%`;

  els.scoreGrid.innerHTML = `
    <div class="score-chip"><strong>${distribution.meet}</strong><div class="badge-meet">Meet Standard</div></div>
    <div class="score-chip"><strong>${distribution.partial}</strong><div class="badge-partial">Partially Meet</div></div>
    <div class="score-chip"><strong>${distribution.no}</strong><div class="badge-no">Do Not Meet</div></div>
  `;
}

function renderGeneratedDocs() {
  if (!currentDocs.length) {
    els.generatedDocsList.textContent = "No Google Docs created yet for this application.";
    return;
  }

  els.generatedDocsList.innerHTML = [
    "<strong>Generated Google Docs</strong>",
    ...currentDocs.map((doc) => {
      const label = `${doc.title || "Untitled"} (${new Date(doc.createdAt).toLocaleString()})`;
      return `<div><a href="${escapeHtml(doc.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a></div>`;
    })
  ].join("");
}

function renderQuestionList() {
  els.questionCount.textContent = `${QUESTION_BANK.length} total`;
  els.questionList.innerHTML = QUESTION_BANK.map((q, idx) => {
    const r = getResponse(q.id);
    const scoreLabel = scoreLabelText(r.score?.level);
    const completeLabel = r.completed ? "Complete" : "In progress";
    const ready = r.readyForCoach ? " | Coach review pending" : "";

    return `
      <li>
        <button class="q-item ${idx === currentIndex ? "active" : ""}" data-q-index="${idx}">
          <div><strong>${idx + 1}. ${escapeHtml(q.title)}</strong></div>
          <div class="q-meta">${escapeHtml(completeLabel)} | ${escapeHtml(scoreLabel)}${escapeHtml(ready)}</div>
        </button>
      </li>
    `;
  }).join("");

  [...els.questionList.querySelectorAll(".q-item")].forEach((btn) => {
    btn.addEventListener("click", () => {
      currentIndex = Number(btn.dataset.qIndex);
      renderCurrentQuestion();
      renderQuestionList();
    });
  });
}

function renderCurrentQuestion() {
  const q = QUESTION_BANK[currentIndex];
  const response = getResponse(q.id);

  els.questionSection.textContent = q.section;
  els.questionTitle.textContent = q.title;
  els.questionPrompt.textContent = q.prompt;
  els.rubricList.innerHTML = q.rubric.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  els.responseText.value = response.draftText || "";

  els.intakeFields.innerHTML = q.intake.map((prompt, i) => `
    <label>
      ${escapeHtml(prompt)}
      <input type="text" data-intake-index="${i}" value="${escapeHtml(response.intake?.[i] || "")}" />
    </label>
  `).join("");

  if (response.score) {
    els.scorePanel.classList.remove("hidden");
    const level = response.score.level;
    els.scoreBadge.textContent = scoreLabelText(level);
    els.scoreBadge.className = level === "meet" ? "badge-meet" : level === "partial" ? "badge-partial" : "badge-no";
    els.scoreReason.textContent = response.score.reason || "";
    els.scoreFeedback.textContent = response.score.feedback || "";
  } else {
    els.scorePanel.classList.add("hidden");
  }

  els.redlinePanel.classList.add("hidden");
  els.financePanel.style.display = q.financeTools ? "block" : "none";
}

function renderBudget() {
  els.budgetTableBody.innerHTML = STARTER_BUDGET.map((row) => {
    return `<tr><td>${escapeHtml(row[0])}</td><td>${formatMoney(row[1])}</td><td>${formatMoney(row[2])}</td><td>${formatMoney(row[3])}</td></tr>`;
  }).join("");
}

function renderCoaches() {
  els.coachList.innerHTML = state.coaches.map((coach) => `
    <li class="coach-row">
      <span>${escapeHtml(coach.name)} (${escapeHtml(coach.email)})</span>
      <button type="button" class="btn btn-soft" data-remove-coach="${coach.id}">Remove</button>
    </li>
  `).join("");

  [...els.coachList.querySelectorAll("[data-remove-coach]")].forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.removeCoach;
      try {
        const result = await apiFetch(`/applications/${currentApplicationId}/coaches/${id}`, {
          method: "DELETE"
        });
        state.coaches = result.application.coaches || [];
        persist();
        renderCoaches();
        renderCoachSelects();
      } catch (error) {
        els.notifyStatus.textContent = error.message;
      }
    });
  });
}

function renderCoachSelects() {
  const opts = state.coaches.length
    ? state.coaches.map((c) => `<option value="${c.id}">${escapeHtml(c.name)} (${escapeHtml(c.email)})</option>`).join("")
    : '<option value="">No coaches yet</option>';

  els.coachSelect.innerHTML = opts;
}

function renderReviewQueue() {
  const options = QUESTION_BANK
    .filter((q) => {
      const r = getResponse(q.id);
      return r.readyForCoach || r.completed;
    })
    .map((q) => `<option value="${q.id}">${escapeHtml(q.title)}</option>`)
    .join("");

  els.reviewQuestionSelect.innerHTML = options || '<option value="">No completed questions</option>';
}

function hydrateStyle() {
  els.styleTone.value = state.style.tone || "formal";
  els.styleLength.value = state.style.length || "mixed";
  els.stylePov.value = state.style.pov || "first-person plural";
  els.stylePhrases.value = state.style.phrases || "";
  els.schoolName.value = state.style.schoolName || "";
  els.applicantName.value = state.style.applicantName || "";
  els.applicantEmail.value = state.style.applicantEmail || "";
}

function getDraftMode() {
  const selected = document.querySelector('input[name="draftMode"]:checked');
  return selected ? selected.value : "assist";
}

function saveIntakeForCurrent() {
  const q = QUESTION_BANK[currentIndex];
  const r = getResponse(q.id);
  const values = [...els.intakeFields.querySelectorAll("input[data-intake-index]")].map((input) => input.value.trim());
  r.intake = values;
  persist();
}

function getResponse(questionId) {
  if (!state.responses[questionId]) {
    state.responses[questionId] = {
      intake: [],
      draftText: "",
      score: null,
      completed: false,
      readyForCoach: false,
      coachReview: null
    };
  }
  return state.responses[questionId];
}

async function generateDraft(question, response) {
  const payload = {
    task: "generate",
    question,
    intake: response.intake || [],
    style: state.style
  };

  const aiText = await callAI(payload);
  if (aiText) return aiText;

  const intakeLines = (response.intake || []).filter(Boolean).map((v) => `- ${v}`).join("\n");
  const schoolName = state.style.schoolName || "The proposed school";
  const styleLine = `Tone: ${state.style.tone}; Length: ${state.style.length}; POV: ${state.style.pov}.`;

  return [
    `### ${question.title}`,
    "",
    `${schoolName} proposes a focused approach to ${question.section.toLowerCase()} that is aligned to the Tennessee charter application standards.`,
    styleLine,
    "",
    "Key points from intake:",
    intakeLines || "- Add intake details for a stronger draft.",
    "",
    "Rubric alignment:",
    ...question.rubric.map((item) => `- ${item}`),
    "",
    "Implementation details, timelines, and accountability metrics will be finalized in the full application narrative."
  ].join("\n");
}

async function scoreDraft(question, draftText) {
  const payload = {
    task: "score",
    question,
    draftText,
    rubric: question.rubric
  };

  const aiRaw = await callAI(payload);
  if (aiRaw) {
    const parsed = safeJson(aiRaw);
    if (parsed && ["meet", "partial", "no"].includes(parsed.level)) {
      return {
        level: parsed.level,
        reason: parsed.reason || "AI score generated.",
        feedback: parsed.feedback || ""
      };
    }
  }

  const lower = draftText.toLowerCase();
  let hits = 0;
  question.rubric.forEach((criterion) => {
    const words = criterion.toLowerCase().split(/\W+/).filter((w) => w.length > 4);
    if (words.some((w) => lower.includes(w))) hits += 1;
  });

  const hasNumbers = /\d/.test(draftText);
  const wordCount = draftText.split(/\s+/).filter(Boolean).length;
  if (hasNumbers) hits += 1;
  if (wordCount > 220) hits += 1;

  const level = hits >= 4 ? "meet" : hits >= 2 ? "partial" : "no";
  return {
    level,
    reason: `Heuristic score based on rubric coverage (${hits} signals).`,
    feedback:
      level === "meet"
        ? "Response addresses major rubric elements. Add specific implementation metrics where possible."
        : level === "partial"
          ? "Add clearer evidence, specific data points, and named owners/timelines for execution."
          : "Response is too broad. Address each rubric criterion directly with evidence and implementation detail."
  };
}

async function improveDraft(question, draftText, currentScore) {
  const payload = {
    task: "improve",
    question,
    draftText,
    currentScore,
    style: state.style
  };

  const aiText = await callAI(payload);
  if (aiText) return aiText;

  const additions = question.rubric
    .map((item, idx) => `${idx + 1}. ${item} Include a concrete metric, owner, and timeline.`)
    .join("\n");

  return `${draftText}\n\nRevisions to meet standard:\n${additions}`;
}

async function callAI(payload) {
  try {
    const aiEndpoint = endpointUrl(config.AI_ENDPOINT, "/ai");
    const json = await apiFetchUrl(aiEndpoint, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    return json.output || "";
  } catch {
    // fall through to optional direct-browser OpenAI fallback
  }

  if (config.OPENAI_API_KEY) {
    try {
      const messages = buildOpenAiMessages(payload);
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: config.OPENAI_MODEL || "gpt-4o-mini",
          temperature: payload.task === "score" ? 0.1 : 0.4,
          messages
        })
      });

      if (!res.ok) return "";
      const data = await res.json();
      return data.choices?.[0]?.message?.content?.trim() || "";
    } catch {
      return "";
    }
  }

  return "";
}

function buildOpenAiMessages(payload) {
  const system = [
    "You are an expert Tennessee charter application coach.",
    "Use clear, specific language aligned to rubric-based scoring.",
    "When scoring, return JSON only with keys: level, reason, feedback.",
    "Valid level values: meet, partial, no."
  ].join(" ");

  return [
    { role: "system", content: system },
    { role: "user", content: JSON.stringify(payload) }
  ];
}

async function sendNotification(event, payload) {
  try {
    const notifyEndpoint = endpointUrl(config.NOTIFICATION_WEBHOOK_URL, "/notify");
    await apiFetchUrl(notifyEndpoint, {
      method: "POST",
      body: JSON.stringify({
        event,
        payload: { ...payload, applicationId: currentApplicationId },
        timestamp: new Date().toISOString()
      })
    });
    return true;
  } catch {
    return false;
  }
}

async function exportApplication() {
  const schoolHeading = state.style.schoolName
    ? `# ${state.style.schoolName}\n\n`
    : "";

  const compiled = QUESTION_BANK.map((q, idx) => {
    const r = getResponse(q.id);
    return [
      `## ${idx + 1}. ${q.title}`,
      `Section: ${q.section}`,
      `Prompt: ${q.prompt}`,
      `Rubric Score: ${scoreLabelText(r.score?.level)}`,
      "",
      r.draftText || "[No response yet]",
      ""
    ].join("\n");
  }).join("\n");

  const fullCompiled = `${schoolHeading}${compiled}`;

  try {
    const sections = QUESTION_BANK.map((q, idx) => ({
      index: idx + 1,
      questionId: q.id,
      title: q.title,
      score: getResponse(q.id).score?.level || "not_scored"
    }));

    const json = await apiFetch(`/applications/${currentApplicationId}/google-doc`, {
      method: "POST",
      body: JSON.stringify({
        title: `${state.style.schoolName || "TN Charter School"} Application Draft - ${new Date().toLocaleDateString()}`,
        body: fullCompiled,
        sections
      })
    });
    if (json.url) {
      currentDocs.unshift({
        title: `${state.style.schoolName || "TN Charter School"} Application Draft - ${new Date().toLocaleDateString()}`,
        url: json.url,
        createdAt: new Date().toISOString()
      });
      renderGeneratedDocs();
      window.open(json.url, "_blank", "noopener,noreferrer");
      return;
    }
  } catch {
    // continue to fallback
  }

  try {
    await navigator.clipboard.writeText(fullCompiled);
    window.open("https://docs.new", "_blank", "noopener,noreferrer");
    alert("Application text copied to clipboard. Paste into the new Google Doc.");
  } catch {
    downloadTextFile("tn-charter-application-draft.txt", fullCompiled);
  }
}

function downloadBudgetCsv() {
  const lines = ["Category,Year 1,Year 2,Year 3"];
  STARTER_BUDGET.forEach((row) => lines.push(`${csvEscape(row[0])},${row[1]},${row[2]},${row[3]}`));
  downloadTextFile("tn-generic-budget.csv", lines.join("\n"));
}

function renderDiffHtml(oldText, newText) {
  const oldWords = oldText.split(/\s+/).filter(Boolean);
  const newWords = newText.split(/\s+/).filter(Boolean);
  const diff = diffWords(oldWords, newWords);

  return diff.map((part) => {
    const text = escapeHtml(part.text);
    if (part.type === "add") return `<span class="red-add">${text} </span>`;
    if (part.type === "del") return `<span class="red-del">${text} </span>`;
    return `${text} `;
  }).join("");
}

function diffWords(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = m - 1; i >= 0; i -= 1) {
    for (let j = n - 1; j >= 0; j -= 1) {
      if (a[i] === b[j]) dp[i][j] = dp[i + 1][j + 1] + 1;
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const out = [];
  let i = 0;
  let j = 0;

  while (i < m && j < n) {
    if (a[i] === b[j]) {
      out.push({ type: "same", text: a[i] });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ type: "del", text: a[i] });
      i += 1;
    } else {
      out.push({ type: "add", text: b[j] });
      j += 1;
    }
  }

  while (i < m) {
    out.push({ type: "del", text: a[i] });
    i += 1;
  }

  while (j < n) {
    out.push({ type: "add", text: b[j] });
    j += 1;
  }

  return out;
}

async function loadMe() {
  try {
    const result = await apiFetch("/auth/me");
    return result.user;
  } catch {
    return null;
  }
}

async function loadOrCreateApplication() {
  const list = await apiFetch("/applications");
  const apps = list.applications || [];

  if (!apps.length) {
    const schoolName = state?.style?.schoolName || "Untitled School";
    const created = await apiFetch("/applications", {
      method: "POST",
      body: JSON.stringify({ schoolName })
    });
    currentApplicationId = created.application.id;
    localStorage.setItem("tn_current_application_id", currentApplicationId);
    await loadApplicationsIntoSelect();
    await loadApplicationState(currentApplicationId);
    return;
  }

  if (!currentApplicationId || !apps.some((a) => a.id === currentApplicationId)) {
    currentApplicationId = apps[0].id;
    localStorage.setItem("tn_current_application_id", currentApplicationId);
  }

  await loadApplicationsIntoSelect();
  await loadApplicationState(currentApplicationId);
}

async function loadApplicationsIntoSelect() {
  const list = await apiFetch("/applications");
  const apps = list.applications || [];
  els.applicationSelect.innerHTML = apps
    .map((a) => `<option value="${a.id}">${escapeHtml(a.schoolName || "Untitled School")} (${new Date(a.updatedAt).toLocaleDateString()})</option>`)
    .join("");

  if (currentApplicationId) {
    els.applicationSelect.value = currentApplicationId;
  }
}

async function loadApplicationState(applicationId) {
  const payload = await apiFetch(`/applications/${applicationId}`);
  const app = payload.application;
  currentDocs = payload.docs || [];
  const remoteState = app?.state;

  if (remoteState && typeof remoteState === "object") {
    state = remoteState;
  } else {
    state = freshState(app?.schoolName || state?.style?.schoolName || "");
  }

  if (!state.responses) state.responses = {};
  state.coaches = app?.coaches || state.coaches || [];
  if (!state.style) state.style = {};
  state.style.schoolName = state.style.schoolName || app?.schoolName || "";
  state.style.applicantEmail = state.style.applicantEmail || authSession?.user?.email || "";
  state.style.applicantName = state.style.applicantName || authSession?.user?.name || "";
  persistLocalOnly();
  hydrateStyle();
}

function freshState(schoolName) {
  return {
    responses: {},
    coaches: [],
    style: {
      tone: "formal",
      length: "mixed",
      pov: "first-person plural",
      phrases: "",
      schoolName: schoolName || "",
      applicantName: authSession?.user?.name || "",
      applicantEmail: authSession?.user?.email || ""
    }
  };
}

function renderHeaderUser() {
  els.userBadge.textContent = `${authSession.user.name} (${authSession.user.email})`;
  els.adminOverviewBtn.classList.toggle("hidden", authSession.user.role !== "admin");
}

async function loadAdminOverview() {
  const data = await apiFetch("/admin/overview");
  const summary = [
    `<p><strong>Users:</strong> ${data.users.length}</p>`,
    `<p><strong>Applications:</strong> ${data.applications.length}</p>`,
    `<p><strong>Google Docs:</strong> ${data.docs.length}</p>`,
    "<h3>User Login Info</h3>",
    `<div class="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Created</th><th>Last Login</th></tr></thead><tbody>${data.users.map((u) => `<tr><td>${escapeHtml(u.name)}</td><td>${escapeHtml(u.email)}</td><td>${escapeHtml(u.role)}</td><td>${escapeHtml(u.createdAt || "-")}</td><td>${escapeHtml(u.lastLoginAt || "-")}</td></tr>`).join("")}</tbody></table></div>`,
    "<h3>Applications</h3>",
    `<div class="table-wrap"><table><thead><tr><th>ID</th><th>School</th><th>Owner</th><th>Coaches</th><th>Updated</th></tr></thead><tbody>${data.applications.map((a) => `<tr><td>${escapeHtml(a.id)}</td><td>${escapeHtml(a.schoolName || "-")}</td><td>${escapeHtml(a.ownerUserId)}</td><td>${a.coachCount}</td><td>${escapeHtml(a.updatedAt || "-")}</td></tr>`).join("")}</tbody></table></div>`,
    "<h3>Google Doc Sections</h3>",
    `<div class="table-wrap"><table><thead><tr><th>Doc Title</th><th>Application</th><th>URL</th><th>Sections</th></tr></thead><tbody>${data.docs.map((d) => `<tr><td>${escapeHtml(d.title || "-")}</td><td>${escapeHtml(d.applicationId)}</td><td><a href="${escapeHtml(d.url || "#")}" target="_blank" rel="noopener noreferrer">${escapeHtml(d.documentId || "-")}</a></td><td>${(d.sections || []).length}</td></tr>`).join("")}</tbody></table></div>`
  ].join("");

  els.adminSummary.innerHTML = summary;
}

async function rawFetch(path, options = {}) {
  const base = backendBaseUrl();
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  let response;
  try {
    response = await fetch(`${base}${path}`, { ...options, headers });
  } catch {
    throw new Error(`Cannot reach backend at ${base}. Set BACKEND_BASE_URL to your deployed API URL and verify CORS.`);
  }
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(json.error || `Request failed (${response.status})`);
  }
  return json;
}

async function apiFetch(path, options = {}) {
  if (!authSession?.token) {
    throw new Error("Not authenticated");
  }
  const headers = { Authorization: `Bearer ${authSession.token}`, ...(options.headers || {}) };
  return rawFetch(path, { ...options, headers });
}

async function apiFetchUrl(url, options = {}) {
  if (!authSession?.token) {
    throw new Error("Not authenticated");
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authSession.token}`,
    ...(options.headers || {})
  };
  let response;
  try {
    response = await fetch(url, { ...options, headers });
  } catch {
    throw new Error(`Cannot reach backend endpoint ${url}.`);
  }
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(json.error || `Request failed (${response.status})`);
  }
  return json;
}

function backendBaseUrl() {
  if (config.BACKEND_BASE_URL) {
    return String(config.BACKEND_BASE_URL).replace(/\/$/, "");
  }

  const source = config.AI_ENDPOINT || config.NOTIFICATION_WEBHOOK_URL || config.GOOGLE_DOC_WEBHOOK_URL || "";
  if (source) {
    try {
      const parsed = new URL(source);
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts.length) {
        parts.pop();
      }
      const pathPrefix = parts.length ? `/${parts.join("/")}` : "";
      return `${parsed.protocol}//${parsed.host}${pathPrefix}`;
    } catch {
      // continue
    }
  }

  if (typeof window !== "undefined" && window.location?.origin?.startsWith("http")) {
    return `${window.location.origin}/api`;
  }

  return "http://localhost:8787";
}

function endpointUrl(configured, fallbackPath) {
  if (configured) return configured;
  return `${backendBaseUrl()}${fallbackPath}`;
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(APP_KEY)) || {};
  } catch {
    return {};
  }
}

function persist() {
  persistLocalOnly();
  saveApplicationState().catch(() => {});
}

function persistLocalOnly() {
  localStorage.setItem(APP_KEY, JSON.stringify(state));
}

let saveTimer = null;

function saveApplicationState() {
  return new Promise((resolve, reject) => {
    if (!currentApplicationId || !authSession?.token) {
      resolve();
      return;
    }

    if (saveTimer) {
      clearTimeout(saveTimer);
    }

    saveTimer = setTimeout(async () => {
      try {
        await apiFetch(`/applications/${currentApplicationId}/state`, {
          method: "PUT",
          body: JSON.stringify({ state })
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    }, 250);
  });
}

function loadAuthSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY)) || null;
  } catch {
    return null;
  }
}

function setAuthSession(session) {
  authSession = session;
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

function clearAuthSession() {
  authSession = null;
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem("tn_current_application_id");
  window.location.reload();
}

function scoreLabelText(level) {
  if (level === "meet") return "Meet Standard";
  if (level === "partial") return "Partially Meet Standard";
  if (level === "no") return "Do Not Meet Standard";
  return "Not scored";
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function csvEscape(value) {
  const v = String(value || "");
  if (v.includes(",") || v.includes('"') || v.includes("\n")) {
    return `"${v.replaceAll('"', '""')}"`;
  }
  return v;
}

function formatMoney(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(n);
}

function safeJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    if (jsonStart >= 0 && jsonEnd > jsonStart) {
      try {
        return JSON.parse(text.slice(jsonStart, jsonEnd + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
