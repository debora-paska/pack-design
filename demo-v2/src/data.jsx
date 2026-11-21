// Sample data for Intelligent Skills Engine — Module B
// All numbers are illustrative; dimensions based on MIT Iceberg methodology
// Status labels: Stable, Growing, Embedded, New, Declining

const ROLE_HRBP = {
  id: 'hrbp',
  title: 'HR Business Partner',
  family: 'People & Culture',
  familyOccupations: [
    'HR Business Partner', 'Talent Acquisition Partner', 'L&D Specialist',
    'Compensation Analyst', 'People Operations Lead',
  ],
  onetCode: '13-1071.00',
  description: 'Strategic partner to business leaders; translates business goals into people strategy, advises on organization design, coaching, and workforce planning.',
  accent: '#3E8B6A',
};

const ROLE_FA = {
  id: 'fa',
  title: 'Financial Analyst',
  family: 'Finance & Strategy',
  familyOccupations: ['Financial Analyst','FP&A Manager','Treasury Analyst','Controller'],
  onetCode: '13-2051.00',
  description: 'Builds forecasts, variance analyses, and investment cases; translates numbers into narrative for leadership.',
  accent: '#0F6FA8',
};

const ROLE_CS = {
  id: 'cs',
  title: 'Customer Service Representative',
  family: 'Customer Operations',
  familyOccupations: ['CS Representative','CS Team Lead','CX Specialist','Complaints Specialist'],
  onetCode: '43-4051.00',
  description: 'Front-line interaction with customers via voice, chat, and email; resolves issues and escalates where needed.',
  accent: '#B6731A',
};

// Skills for HRBP — the hero dataset
// dims: automation, judgment, empathy, physical, compliance  (each 0–100)
// owner: human | hybrid | ai | robot
// status: stable | growing | embedded | new | declining
// rel/urg: 'high' | 'med' | 'low'
// trajectory: delta over horizon (-1..+1)
const HRBP_SKILLS = [
  {
    id: 'coaching',
    name: 'Coaching & Developmental Conversations',
    category: 'soft',
    onetMatch: 'Coaching and Developing Others',
    onetImportance: 87,
    mitExposure: 22,
    status: 'growing',
    trajectory: 0.42,
    relevance: 'high', urgency: 'high',
    owner: 'human',
    dims: { automation: 18, judgment: 88, empathy: 94, physical: 4, compliance: 46 },
    today: 'Core lever for performance improvement and retention; most valuable in 1:1 and team reshaping conversations.',
    future: 'AI copilots draft prep notes and surface patterns, but the conversation stays human. Value grows as managers delegate admin.',
    why: 'MIT Iceberg flags conversations requiring empathy and context as among the least exposed. Rated 87 importance for HR Business Partners.',
    compare: {
      owner:    { t: 'HRBP-led',             f: 'HRBP-led, AI-assisted' },
      time:     { t: '6–8 hrs / week',       f: '9–11 hrs / week' },
      mode:     { t: 'Live conversations',   f: 'Live, with AI-prepared briefs' },
      output:   { t: 'Development plans',    f: 'Development plans + pattern insights' },
      risk:     { t: 'Inconsistent quality', f: 'Over-reliance on AI suggestions' },
    },
  },
  {
    id: 'orgdesign',
    name: 'Organization Design',
    category: 'hard',
    onetMatch: 'Judgment and Decision Making',
    onetImportance: 82,
    mitExposure: 34,
    status: 'growing',
    trajectory: 0.35,
    relevance: 'high', urgency: 'med',
    owner: 'hybrid',
    dims: { automation: 34, judgment: 91, empathy: 58, physical: 2, compliance: 62 },
    today: 'Reshaping teams around capabilities rather than headcount — a recurring 2026 ask from CPOs.',
    future: 'Scenario tooling accelerates modelling; the judgement call on de-layering remains human.',
    why: 'Importance 82; high judgment need correlates with low automation exposure in the MIT dataset.',
    compare: {
      owner:    { t: 'HRBP + CoE',           f: 'HRBP owns, AI models scenarios' },
      time:     { t: '4–6 hrs / week',       f: '3–4 hrs / week' },
      mode:     { t: 'Spreadsheet modelling',f: 'AI scenario generation + review' },
      output:   { t: 'Re-org proposal',      f: 'Re-org proposal + trade-off map' },
      risk:     { t: 'Slow iteration cycles',f: 'Model bias in role definitions' },
    },
  },
  {
    id: 'workforce',
    name: 'Strategic Workforce Planning',
    category: 'hard',
    onetMatch: 'Strategic Planning',
    onetImportance: 78,
    mitExposure: 46,
    status: 'new',
    trajectory: 0.61,
    relevance: 'high', urgency: 'high',
    owner: 'hybrid',
    dims: { automation: 54, judgment: 82, empathy: 36, physical: 2, compliance: 58 },
    today: 'Emerging as a named responsibility — formerly split between Finance and HR.',
    future: 'AI does scenario modelling and skill-gap projection; the HRBP owns the narrative and trade-offs.',
    why: 'Rising task frequency year-over-year; MIT Iceberg places planning at 46% exposure — hybrid territory.',
    compare: {
      owner:    { t: 'Split with Finance',   f: 'HRBP-owned, AI-modeled' },
      time:     { t: '2–3 hrs / week',       f: '5–7 hrs / week' },
      mode:     { t: 'Annual headcount plan',f: 'Continuous skill-gap projection' },
      output:   { t: 'Headcount budget',     f: 'Skills-based capacity plan' },
      risk:     { t: 'Disconnected from strategy', f: 'Misreading model outputs' },
    },
  },
  {
    id: 'eradvisory',
    name: 'Employee Relations & Advisory',
    category: 'soft',
    onetMatch: 'Advising Others',
    onetImportance: 84,
    mitExposure: 18,
    status: 'stable',
    trajectory: 0.04,
    relevance: 'high', urgency: 'med',
    owner: 'human',
    dims: { automation: 14, judgment: 86, empathy: 88, physical: 4, compliance: 92 },
    today: 'Day-to-day bedrock — grievances, terminations, conflict resolution.',
    future: 'Remains almost entirely human; compliance and empathy needs dominate.',
    why: 'Compliance criticality scored 92; lowest-exposure quartile in MIT Iceberg.',
    compare: {
      owner:    { t: 'HRBP-led',             f: 'HRBP-led' },
      time:     { t: '10–12 hrs / week',     f: '8–10 hrs / week' },
      mode:     { t: 'Live cases, written records', f: 'Live cases, AI-drafted records' },
      output:   { t: 'Case resolutions',     f: 'Case resolutions + pattern signals' },
      risk:     { t: 'Burnout, escalations', f: 'Compliance drift if AI unchecked' },
    },
  },
  {
    id: 'compliance',
    name: 'Employment Law & Regulatory Compliance',
    category: 'hard',
    onetMatch: 'Law and Government',
    onetImportance: 74,
    mitExposure: 52,
    status: 'embedded',
    trajectory: 0.12,
    relevance: 'high', urgency: 'med',
    owner: 'hybrid',
    dims: { automation: 58, judgment: 72, empathy: 18, physical: 2, compliance: 96 },
    today: 'Must-have baseline; varies by jurisdiction and often handled with legal.',
    future: 'AI assistants answer interpretive questions from policy corpora; HRBP still signs off.',
    why: 'High compliance criticality keeps the human in the loop despite 58% automation potential.',
    compare: {
      owner:    { t: 'HRBP + Legal',         f: 'AI-drafted, HRBP signs off' },
      time:     { t: '3–4 hrs / week',       f: '1–2 hrs / week' },
      mode:     { t: 'Memo drafting + review', f: 'AI interprets, HRBP reviews' },
      output:   { t: 'Policy interpretations', f: 'Verified interpretations' },
      risk:     { t: 'Jurisdictional gaps',  f: 'Hallucinated precedent' },
    },
  },
  {
    id: 'datastorytelling',
    name: 'People Data Storytelling',
    category: 'hard',
    onetMatch: 'Communicating With Others',
    onetImportance: 68,
    mitExposure: 62,
    status: 'new',
    trajectory: 0.74,
    relevance: 'high', urgency: 'high',
    owner: 'hybrid',
    dims: { automation: 62, judgment: 70, empathy: 44, physical: 4, compliance: 30 },
    today: 'Fastest-growing sub-skill in HRBP postings — ability to translate analytics into action.',
    future: 'Gen-AI generates the charts; HRBP curates the narrative and the ask.',
    why: 'Postings mentioning "people analytics" up 3.1× since 2023; MIT Iceberg places generative outputs at 62% exposure.',
    compare: {
      owner:    { t: 'Analyst + HRBP',       f: 'HRBP-led, AI-generated visuals' },
      time:     { t: '1–2 hrs / week',       f: '3–5 hrs / week' },
      mode:     { t: 'Static dashboards',    f: 'Generated narratives on demand' },
      output:   { t: 'Quarterly reports',    f: 'Weekly narrative briefings' },
      risk:     { t: 'Data literacy gap',    f: 'Misleading AI summaries' },
    },
  },
  {
    id: 'di',
    name: 'Inclusion & Belonging Program Design',
    category: 'soft',
    onetMatch: 'Management of Personnel Resources',
    onetImportance: 71,
    mitExposure: 28,
    status: 'growing',
    trajectory: 0.33,
    relevance: 'med', urgency: 'med',
    owner: 'human',
    dims: { automation: 26, judgment: 78, empathy: 92, physical: 6, compliance: 54 },
    today: 'From initiatives to embedded behaviours; measured outcomes now expected.',
    future: 'Tooling supports measurement; design and advocacy remain human-led.',
    why: 'Empathy dimension 92; low exposure in MIT Iceberg cognitive-empathy quartile.',
    compare: {
      owner:    { t: 'HRBP + D&I lead',      f: 'HRBP-led, AI measures outcomes' },
      time:     { t: '2–3 hrs / week',       f: '2–3 hrs / week' },
      mode:     { t: 'Programs + training',  f: 'Embedded behaviours + sensing' },
      output:   { t: 'Initiative plans',     f: 'Behavioural outcome reports' },
      risk:     { t: 'Box-ticking perception', f: 'Over-measurement fatigue' },
    },
  },
  {
    id: 'perfsys',
    name: 'Performance Management System Admin',
    category: 'hard',
    onetMatch: 'Performance of General Physical Activities',
    onetImportance: 54,
    mitExposure: 84,
    status: 'declining',
    trajectory: -0.62,
    relevance: 'med', urgency: 'low',
    owner: 'ai',
    dims: { automation: 88, judgment: 30, empathy: 10, physical: 6, compliance: 48 },
    today: 'Chasing managers for reviews, running the calibration meeting cadence, exporting reports.',
    future: 'Workflow automations and HRIS agents absorb this work end-to-end.',
    why: 'Highest-exposure quartile in MIT Iceberg; repetitive admin with clear inputs and outputs.',
    compare: {
      owner:    { t: 'HRBP-led',             f: 'AI agent-led' },
      time:     { t: '4–6 hrs / week',       f: '<1 hr / week' },
      mode:     { t: 'Manual chase + export',f: 'Automated workflows' },
      output:   { t: 'Calibration packs',    f: 'Calibration packs (auto-generated)' },
      risk:     { t: 'Cycle slippage',       f: 'Silent automation failures' },
    },
  },
  {
    id: 'benefitsadmin',
    name: 'Benefits & Payroll Query Handling',
    category: 'hard',
    onetMatch: 'Processing Information',
    onetImportance: 48,
    mitExposure: 79,
    status: 'declining',
    trajectory: -0.48,
    relevance: 'low', urgency: 'low',
    owner: 'ai',
    dims: { automation: 82, judgment: 28, empathy: 26, physical: 4, compliance: 72 },
    today: 'Majority of Tier-1 queries still land in HRBP inboxes.',
    future: 'Conversational AI resolves >70% of Tier-1; HRBP only sees edge cases.',
    why: 'Structured, high-volume, well-governed — matches the MIT Iceberg "fully automatable" profile.',
    compare: {
      owner:    { t: 'HRBP-led',             f: 'AI agent-led' },
      time:     { t: '3–5 hrs / week',       f: '<0.5 hr / week' },
      mode:     { t: 'Inbox triage',         f: 'Conversational AI + edge-case escalation' },
      output:   { t: 'Answered queries',     f: 'Resolved + logged' },
      risk:     { t: 'Tier-1 backlog',       f: 'Poor escalation routing' },
    },
  },
  {
    id: 'aifluency',
    name: 'AI Fluency for People Decisions',
    category: 'hard',
    onetMatch: 'Systems Analysis',
    onetImportance: null,
    mitExposure: null,
    status: 'new',
    trajectory: 0.88,
    relevance: 'high', urgency: 'high',
    owner: 'hybrid',
    dims: { automation: 40, judgment: 74, empathy: 36, physical: 2, compliance: 64 },
    today: 'Not yet in the taxonomy; extracted as an emerging skill by the pipeline.',
    future: 'Expected to become a baseline competency for HR generalists within 24 months.',
    why: 'Flagged emerging from 412 job postings Q1–Q3 2026 (pipeline enrichment layer).',
    compare: {
      owner:    { t: 'Few specialists',      f: 'Baseline for all HRBPs' },
      time:     { t: '<1 hr / week',         f: '3–5 hrs / week' },
      mode:     { t: 'Ad-hoc exploration',   f: 'Structured AI partnership' },
      output:   { t: 'Prompt experiments',   f: 'Decisions with AI co-input' },
      risk:     { t: 'Skill gap widens',     f: 'Uncritical AI trust' },
    },
  },
  {
    id: 'changecomms',
    name: 'Change Communication',
    category: 'soft',
    onetMatch: 'Communicating With Others',
    onetImportance: 72,
    mitExposure: 42,
    status: 'growing',
    trajectory: 0.28,
    relevance: 'high', urgency: 'med',
    owner: 'hybrid',
    dims: { automation: 44, judgment: 76, empathy: 82, physical: 4, compliance: 38 },
    today: 'Constant companion of restructurings and transformations.',
    future: 'AI drafts first versions; HRBP edits for tone and political nuance.',
    why: 'Empathy 82, judgment 76 — middle band of exposure where hybrid delivery wins.',
    compare: {
      owner:    { t: 'HRBP + Comms',         f: 'AI drafts, HRBP edits' },
      time:     { t: '2–4 hrs / week',       f: '1–2 hrs / week' },
      mode:     { t: 'Draft from scratch',   f: 'Edit AI drafts for nuance' },
      output:   { t: 'Comms packs',          f: 'Comms packs, faster turn' },
      risk:     { t: 'Slow in crisis',       f: 'Generic tone if unchecked' },
    },
  },
  {
    id: 'talentacq',
    name: 'Sourcing & Interview Screening',
    category: 'hard',
    onetMatch: 'Recruiting',
    onetImportance: 62,
    mitExposure: 68,
    status: 'declining',
    trajectory: -0.32,
    relevance: 'med', urgency: 'low',
    owner: 'ai',
    dims: { automation: 72, judgment: 52, empathy: 44, physical: 4, compliance: 46 },
    today: 'Part of HRBP scope in mid-sized orgs; often shared with Talent Acquisition.',
    future: 'Agentic sourcing absorbs pipeline building; HRBP stays on final rounds.',
    why: 'Pattern-matching and ranking fit generative-AI strengths per MIT Iceberg.',
    compare: {
      owner:    { t: 'HRBP + TA',            f: 'AI agent-led, HRBP on finals' },
      time:     { t: '3–5 hrs / week',       f: '1–2 hrs / week' },
      mode:     { t: 'Manual sourcing + screens', f: 'Agentic sourcing + final rounds' },
      output:   { t: 'Shortlists',           f: 'Shortlists + finalist decisions' },
      risk:     { t: 'Slow time-to-hire',    f: 'Bias in agent ranking' },
    },
  },
];

const ROLES = { hrbp: { ...ROLE_HRBP, skills: HRBP_SKILLS } };

// Projection — tweaked by scenario horizon
function projectSkills(skills, years) {
  const k = years / 3; // reference horizon
  return skills.map(s => ({
    ...s,
    projectedRelevance: clamp( (s.relevance === 'high' ? 85 : s.relevance === 'med' ? 55 : 30) + s.trajectory * 20 * k, 5, 100),
  }));
}
function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

// Status meta
const STATUS_META = {
  growing: { label: 'Growing', icon: '↗', tone: 'pos' },
  stable: { label: 'Stable', icon: '●', tone: 'neu' },
  embedded: { label: 'Embedded', icon: '◇', tone: 'neu' },
  new: { label: 'New', icon: '✦', tone: 'new' },
  declining: { label: 'Declining', icon: '↘', tone: 'neg' },
};
const OWNER_META = {
  human:  { label: 'Human-led', short: 'Human', glyph: '◐' },
  hybrid: { label: 'Hybrid Human + AI', short: 'Hybrid', glyph: '◑' },
  ai:     { label: 'AI Agent-led', short: 'AI Agent', glyph: '●' },
  robot:  { label: 'Robot-led', short: 'Robot', glyph: '■' },
};
const DIMS = [
  { key: 'automation', label: 'Automation' },
  { key: 'judgment',   label: 'Judgment' },
  { key: 'empathy',    label: 'Empathy' },
  { key: 'physical',   label: 'Physical' },
  { key: 'compliance', label: 'Compliance' },
];

const STRATEGIC_SUMMARY = {
  outlook: "The HRBP role is moving from policy administrator to strategic coach. Over a three-year horizon, transactional skills (performance cycles, Tier-1 benefits queries) compress into agent workflows, freeing roughly 30–40% of weekly time. The role's centre of gravity shifts toward coaching, workforce planning, and AI-informed decision making.",
  critical: ['coaching','orgdesign','workforce','eradvisory','datastorytelling'],
  redistribute: {
    humanLed: 46,
    hybrid: 38,
    aiLed: 16,
  },
};

const TALENT_ACTIONS = {
  upskill: {
    label: 'Upskill',
    verb: 'Strengthen in current role',
    skills: ['datastorytelling','workforce','aifluency','changecomms'],
  },
  reskill: {
    label: 'Reskill',
    verb: 'Retrain from automatable work',
    skills: ['perfsys','benefitsadmin','talentacq'],
  },
  hire: {
    label: 'Hire',
    verb: 'Source externally — scarce in market',
    skills: ['workforce','datastorytelling'],
  },
  automate: {
    label: 'Automate',
    verb: 'Move to agent workflows',
    skills: ['perfsys','benefitsadmin'],
  },
};

Object.assign(window, {
  ROLES, HRBP_SKILLS, STATUS_META, OWNER_META, DIMS,
  STRATEGIC_SUMMARY, TALENT_ACTIONS, projectSkills, clamp,
});
