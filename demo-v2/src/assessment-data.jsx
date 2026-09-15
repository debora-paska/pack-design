// Sara Bianchi — assessed HRBP. Demo subject linking Mapping → Assessment → Gap → Development.

const ASSESSED_PERSON = {
  id: 'sara-bianchi',
  name: 'Sara Bianchi',
  role: 'HR Business Partner',
  unit: 'EMEA · Professional Services',
  manager: 'Marco Riva',
  managerInitials: 'MR',
  initials: 'SB',
  tenure: '4 years 2 months',
  location: 'Milan, IT',
  joined: 'February 2022',
  email: 'sara.bianchi@client.com',
};

// Target levels come from the mapping (1–5 scale): high relevance = 4 (Advanced), med = 3, low = 2
function targetLevelFor(skill) {
  return skill.relevance === 'high' ? 4 : skill.relevance === 'med' ? 3 : 2;
}

// Assessment outcomes per skill, on the 1–5 scale, with self / manager / peer / aggregate.
// Confidence captures how aligned the raters were.
const ASSESSMENT_RESULTS = {
  coaching:        { self: 3.7, manager: 3.0, peer: 3.2, agg: 3.20, confidence: 'high',   raterCount: 6 },
  orgdesign:       { self: 3.0, manager: 2.3, peer: 2.5, agg: 2.55, confidence: 'high',   raterCount: 5 },
  workforce:       { self: 2.5, manager: 1.8, peer: 2.0, agg: 2.05, confidence: 'medium', raterCount: 5 },
  eradvisory:      { self: 4.3, manager: 4.0, peer: 4.0, agg: 4.05, confidence: 'high',   raterCount: 6 },
  compliance:      { self: 3.8, manager: 3.7, peer: 3.5, agg: 3.65, confidence: 'high',   raterCount: 6 },
  datastorytelling:{ self: 2.7, manager: 1.9, peer: 2.2, agg: 2.20, confidence: 'medium', raterCount: 5 },
  di:              { self: 4.0, manager: 3.8, peer: 3.7, agg: 3.80, confidence: 'high',   raterCount: 6 },
  perfsys:         { self: 4.2, manager: 4.0, peer: 4.1, agg: 4.10, confidence: 'high',   raterCount: 6 },
  benefitsadmin:   { self: 4.0, manager: 4.0, peer: 4.2, agg: 4.10, confidence: 'high',   raterCount: 6 },
  aifluency:       { self: 2.3, manager: 1.5, peer: 1.8, agg: 1.80, confidence: 'medium', raterCount: 5 },
  changecomms:     { self: 3.5, manager: 3.0, peer: 3.2, agg: 3.20, confidence: 'high',   raterCount: 6 },
  talentacq:       { self: 3.7, manager: 3.5, peer: 3.6, agg: 3.60, confidence: 'high',   raterCount: 6 },
};

// 5-level scale mirroring the Pack individual report
const LEVELS = [
  { n: 1, label: 'Novice',    desc: 'Understands the skill and its importance' },
  { n: 2, label: 'Beginner',  desc: 'Demonstrates this skill under supervision' },
  { n: 3, label: 'Competent', desc: 'Demonstrates independently, without supervision' },
  { n: 4, label: 'Advanced',  desc: 'Encourages or supervises others in this skill' },
  { n: 5, label: 'Expert',    desc: 'Develops new applications with impact beyond the org' },
];

// Compute gap and priority per skill — used by Gap Analysis and Dev Plan
function computeGap(skill) {
  const target = targetLevelFor(skill);
  const result = ASSESSMENT_RESULTS[skill.id];
  if (!result) return null;
  const gap = +(target - result.agg).toFixed(2);
  const direction = gap > 0 ? 'below' : gap < 0 ? 'above' : 'on';
  // Priority weights gap by relevance/urgency
  const relW = skill.relevance === 'high' ? 1.5 : skill.relevance === 'med' ? 1.0 : 0.6;
  const urgW = skill.urgency  === 'high' ? 1.5 : skill.urgency  === 'med' ? 1.0 : 0.6;
  const trajW = 1 + (skill.trajectory ?? 0) * 0.5;
  const priority = +(Math.max(0, gap) * relW * urgW * trajW).toFixed(2);
  return { target, result, gap, direction, priority };
}

function getAssessedSkills(skills) {
  return skills
    .map(s => ({ ...s, ...computeGap(s) }))
    .filter(s => s.result);
}

// Development plan — mentor + content library + AI practice per priority gap
const MENTORS = {
  m1: {
    id: 'm1', name: 'Silvia Foglia', initials: 'SF',
    company: 'Silvia Foglia',
    title: 'Coach and Trainer',
    bio: 'Senior coach with 14 years in leadership development for transformation programmes. Pragmatic, narrative-driven, sharp on workforce conversations and de-layering.',
    rating: 4.71, sessions: 142,
    focus: ['workforce', 'orgdesign', 'changecomms'],
    languages: ['Italiano', 'English'],
    rate: '€180 / session',
    nextSlot: 'Tue 26 May · 14:00',
    expertises: ['Workforce strategy', 'Organisation design', 'Change leadership'],
    fields: ['Professional services', 'Industrial', 'Retail'],
    certificate: 'ICF — Professional Certified Coach',
    experience: '14 years',
    timezone: 'Europe/Rome',
    paths: ['Strategic Workforce', 'Change Leadership', 'Coaching the Coach'],
    breakdown: { Communication: 4.78, Punctuality: 4.94, Insight: 4.65, 'Insight Applicability': 4.6 },
  },
  m2: {
    id: 'm2', name: 'Daniel Schmidt', initials: 'DS',
    company: 'Brixton People Analytics',
    title: 'People Analytics Mentor',
    bio: 'Built people-analytics functions at three Fortune 500s. Specialises in turning HR data into board-level decisions. Crisp on visualisation and narrative.',
    rating: 4.85, sessions: 87,
    focus: ['datastorytelling', 'aifluency', 'workforce'],
    languages: ['English', 'Deutsch'],
    rate: '€160 / session',
    nextSlot: 'Wed 27 May · 10:30',
    expertises: ['People analytics', 'Data storytelling', 'AI for HR'],
    fields: ['Technology', 'Financial services', 'Industrial'],
    certificate: 'IHRP — Senior Practitioner',
    experience: '11 years',
    timezone: 'Europe/Berlin',
    paths: ['Data Storytelling', 'AI Fluency', 'Strategic Workforce'],
    breakdown: { Communication: 4.92, Punctuality: 4.88, Insight: 4.81, 'Insight Applicability': 4.79 },
  },
  m3: {
    id: 'm3', name: 'Priya Nair', initials: 'PN',
    company: 'PN Coaching',
    title: 'AI for People Decisions',
    bio: 'Designed GenAI workflows for HR teams at scale. Pragmatic mentor for the AI-fluency basics. Ex-McKinsey, now independent coach.',
    rating: 4.92, sessions: 64,
    focus: ['aifluency', 'datastorytelling', 'orgdesign'],
    languages: ['English'],
    rate: '€170 / session',
    nextSlot: 'Thu 28 May · 16:00',
    expertises: ['AI fluency for HR', 'Prompting playbooks', 'Ethics in people AI'],
    fields: ['Technology', 'Healthcare', 'Public sector'],
    certificate: 'ICF — Associate Certified Coach',
    experience: '9 years',
    timezone: 'Europe/London',
    paths: ['AI Fluency', 'Data Storytelling', 'Inclusion Leadership'],
    breakdown: { Communication: 4.86, Punctuality: 4.95, Insight: 4.91, 'Insight Applicability': 4.88 },
  },
  m4: {
    id: 'm4', name: 'Antonella Salvatore', initials: 'AS',
    company: 'Ateneo privato',
    title: 'Dirigente, direzione',
    bio: 'Former HR Director with deep experience in coaching directors through difficult conversations and team reshaping. Empathetic but direct.',
    rating: 4.58, sessions: 218,
    focus: ['coaching', 'eradvisory', 'changecomms'],
    languages: ['Italiano', 'English', 'Français'],
    rate: '€200 / session',
    nextSlot: 'Mon 25 May · 09:00',
    expertises: ['Coaching for performance', 'Employee relations', 'Crisis communication'],
    fields: ['Education', 'Public sector', 'Non-profit'],
    certificate: 'EMCC — Senior Practitioner',
    experience: '22 years',
    timezone: 'Europe/Rome',
    paths: ['Performance Coaching', 'Change Communication', 'Inclusion Leadership'],
    breakdown: { Communication: 4.62, Punctuality: 4.40, Insight: 4.78, 'Insight Applicability': 4.55 },
  },
  m5: {
    id: 'm5', name: 'Cinzia Sgarlata', initials: 'CS',
    company: 'MissioneFIL',
    title: 'Professional Coach & Soft Skills Trainer',
    bio: 'ICF coach with a strong soft-skills focus. Workshop-style group coaching as well as 1:1. Known for high engagement and crisp follow-ups.',
    rating: 4.85, sessions: 173,
    focus: ['coaching', 'changecomms', 'di'],
    languages: ['Italiano', 'English'],
    rate: '€150 / session',
    nextSlot: 'Tue 26 May · 11:00',
    expertises: ['Soft skills', 'Group coaching', 'Inclusion'],
    fields: ['Retail', 'Services', 'Non-profit'],
    certificate: 'ICF — Master Certified Coach',
    experience: '17 years',
    timezone: 'Europe/Rome',
    paths: ['Soft Skills', 'Inclusion Leadership', 'Performance Coaching'],
    breakdown: { Communication: 4.88, Punctuality: 4.79, Insight: 4.81, 'Insight Applicability': 4.84 },
  },
};

const CONTENT_LIBRARY = {
  workforce: [
    { id: 'c-wf1', title: 'Strategic Workforce Planning Foundations', kind: 'Course', duration: '4h 20m', provider: 'Pack L&D', match: 96 },
    { id: 'c-wf2', title: 'From Headcount to Capability Plans', kind: 'Playbook', duration: '40m read', provider: 'McKinsey HR review', match: 88 },
    { id: 'c-wf3', title: 'Scenario Modelling in HR', kind: 'Workshop', duration: '3h live', provider: 'Pack Workshops', match: 84 },
  ],
  datastorytelling: [
    { id: 'c-ds1', title: 'People Analytics for HRBPs', kind: 'Course', duration: '6h', provider: 'Pack L&D', match: 94 },
    { id: 'c-ds2', title: 'Turning HR Data into Decisions', kind: 'Video series', duration: '1h 30m', provider: 'HBR Learning', match: 89 },
    { id: 'c-ds3', title: 'Boardroom Storytelling Lab', kind: 'Workshop', duration: '4h live', provider: 'Pack Workshops', match: 82 },
  ],
  aifluency: [
    { id: 'c-ai1', title: 'AI Fluency for People Leaders', kind: 'Course', duration: '5h', provider: 'Pack L&D', match: 97 },
    { id: 'c-ai2', title: 'Prompting for HR Workflows', kind: 'Playbook', duration: '50m read', provider: 'Pack L&D', match: 91 },
    { id: 'c-ai3', title: 'Ethics & Bias in People AI', kind: 'Article series', duration: '1h read', provider: 'MIT Sloan', match: 85 },
  ],
  orgdesign: [
    { id: 'c-od1', title: 'Org Design Patterns 2026', kind: 'Course', duration: '3h 40m', provider: 'Pack L&D', match: 92 },
    { id: 'c-od2', title: 'De-Layering Without Disruption', kind: 'Playbook', duration: '35m read', provider: 'BCG insights', match: 87 },
  ],
  coaching: [
    { id: 'c-co1', title: 'Coaching for Performance Conversations', kind: 'Course', duration: '4h', provider: 'Pack L&D', match: 90 },
  ],
};

const AI_PRACTICE = {
  workforce: { scenario: 'Quarterly workforce planning review with CFO', avatar: 'Ludo', duration: '20–30 min' },
  datastorytelling: { scenario: 'Present a quarterly people-data narrative to the leadership team', avatar: 'Nova', duration: '15–20 min' },
  aifluency: { scenario: 'Choose tooling and policy for a GenAI rollout in HR', avatar: 'Ludo', duration: '20 min' },
  orgdesign: { scenario: 'Defend an org redesign proposal to a sceptical leader', avatar: 'Ludo', duration: '25–30 min' },
  coaching: { scenario: 'Coach a manager through a difficult performance conversation', avatar: 'Ludo', duration: '30 min' },
};

// Skill-based compatibility for the "Pick a Mentor" experience.
// Weights focus skills against the assessee's priority gaps to produce 0–100 compatibility.
function mentorCompatibility(mentor, priorityGaps) {
  if (!priorityGaps?.length) return 80;
  const focusSet = new Set(mentor.focus || []);
  let score = 0; let total = 0;
  priorityGaps.forEach((g, i) => {
    const weight = priorityGaps.length - i;
    total += weight;
    if (focusSet.has(g.id)) score += weight;
  });
  const focusFit = total === 0 ? 0 : (score / total);
  return Math.round((focusFit * 70 + (mentor.rating / 5) * 30));
}

Object.assign(window, {
  ASSESSED_PERSON, ASSESSMENT_RESULTS, LEVELS, MENTORS, CONTENT_LIBRARY, AI_PRACTICE,
  targetLevelFor, computeGap, getAssessedSkills, mentorCompatibility,
});
