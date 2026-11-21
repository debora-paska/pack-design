(function(){
const { useState, useEffect, useMemo, useRef, useCallback, useLayoutEffect } = React;
const Ds = window.KigenDesignSystem_093b66 || {};
/* ===== data.jsx ===== */
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


/* ===== atoms.jsx ===== */
// Shared atoms: chips, icons, radar, meter


function StatusChip({ status, compact = false }) {
  const meta = STATUS_META[status];
  if (!meta) return null;
  const variant = { pos: 'secondary', neu: 'outline', neg: 'destructive', new: 'default' }[meta.tone] || 'outline';
  return (
    <Ds.Badge variant={variant} style={compact ? { height: 20, padding: '0 8px', fontSize: 11 } : undefined}>
      {meta.label}
    </Ds.Badge>
  );
}

function OwnerGlyph({ owner }) {
  const m = OWNER_META[owner];
  const color = owner === 'human' ? 'var(--ok)' :
                owner === 'hybrid' ? 'var(--accent)' :
                owner === 'ai' ? 'var(--new)' : 'var(--muted)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ink)' }}>
      <span style={{ color, fontSize: 11 }}>{m.glyph}</span>
      <span style={{ fontSize: 12 }}>{m.short}</span>
    </span>
  );
}

function Pill({ children, tone = 'neutral' }) {
  return (
    <Ds.Badge variant={tone === 'accent' ? 'default' : 'secondary'}>
      {children}
    </Ds.Badge>
  );
}

function Meter({ value, label }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
        <span>{label}</span>
        <span style={{ color: 'var(--foreground)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(v)}%</span>
      </div>
      <Ds.Progress value={v} />
    </div>
  );
}

// Small radar chart for 5 dims (0..100)
function Radar({ dims, size = 220, showLabels = true, palette }) {
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - (showLabels ? 34 : 12);
  const axes = DIMS; // 5 axes
  const angle = (i) => (Math.PI * 2 * i) / axes.length - Math.PI / 2;
  const point = (i, v) => {
    const rad = r * (v / 100);
    return [cx + Math.cos(angle(i)) * rad, cy + Math.sin(angle(i)) * rad];
  };
  const poly = axes.map((a, i) => point(i, dims[a.key])).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const gridLevels = [25, 50, 75, 100];

  const accent = palette?.accent || 'var(--accent)';
  const ring = palette?.ring || 'var(--rule)';
  const labelCol = palette?.label || 'var(--muted)';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      {/* rings */}
      {gridLevels.map((lv) => {
        const pts = axes.map((_, i) => point(i, lv)).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
        return <polygon key={lv} points={pts} fill="none" stroke={ring} strokeWidth={1} strokeDasharray={lv === 100 ? '' : '2,3'} />;
      })}
      {/* axes */}
      {axes.map((a, i) => {
        const [x, y] = point(i, 100);
        return <line key={a.key} x1={cx} y1={cy} x2={x} y2={y} stroke={ring} strokeWidth={1} />;
      })}
      {/* polygon */}
      <polygon points={poly} fill={accent} fillOpacity={0.18} stroke={accent} strokeWidth={1.5} />
      {axes.map((a, i) => {
        const [x, y] = point(i, dims[a.key]);
        return <circle key={a.key} cx={x} cy={y} r={3} fill={accent} />;
      })}
      {/* labels */}
      {showLabels && axes.map((a, i) => {
        const [lx, ly] = point(i, 122);
        const anchor = Math.abs(Math.cos(angle(i))) < 0.3 ? 'middle' : Math.cos(angle(i)) > 0 ? 'start' : 'end';
        return (
          <text key={a.key} x={lx} y={ly} fill={labelCol} fontSize={10}
            textAnchor={anchor} dominantBaseline="middle" fontFamily="var(--fam-mono)"
            style={{ letterSpacing: '.02em' }}
          >
            {a.label.toUpperCase()}
          </text>
        );
      })}
    </svg>
  );
}

function TinyRadar({ dims, size = 44 }) {
  return <Radar dims={dims} size={size} showLabels={false} />;
}

// Multi-series radar — axes generic, supports 2+ overlaid polygons.
// values per series are 0..100.
function RadarChart({ axes, series, size = 360, labelSize = 11 }) {
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - 64;
  const a = (i) => (Math.PI * 2 * i) / axes.length - Math.PI / 2;
  const pt = (i, v) => {
    const rad = r * (Math.max(0, Math.min(100, v)) / 100);
    return [cx + Math.cos(a(i)) * rad, cy + Math.sin(a(i)) * rad];
  };
  const rings = [25, 50, 75, 100];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible', display: 'block' }}>
      {/* Concentric rings */}
      {rings.map(lv => {
        const pts = axes.map((_, i) => pt(i, lv)).map(([x,y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
        return <polygon key={lv} points={pts} fill="none" stroke="var(--rule)" strokeWidth={1} strokeDasharray={lv === 100 ? '' : '2,3'} />;
      })}
      {/* Spokes */}
      {axes.map((ax, i) => {
        const [x, y] = pt(i, 100);
        return <line key={ax.key} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--rule)" strokeWidth={1} />;
      })}
      {/* Series polygons */}
      {series.map((s, si) => {
        const pts = axes.map((ax, i) => pt(i, s.values[ax.key] ?? 0)).map(([x,y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
        return (
          <g key={s.name}>
            <polygon points={pts} fill={s.color} fillOpacity={s.fillOpacity ?? 0.15} stroke={s.color} strokeWidth={s.strokeWidth ?? 2} strokeDasharray={s.dashed ? '5,4' : ''} />
            {axes.map((ax, i) => {
              const [x, y] = pt(i, s.values[ax.key] ?? 0);
              return <circle key={`${s.name}-${ax.key}`} cx={x} cy={y} r={3} fill={s.color} />;
            })}
          </g>
        );
      })}
      {/* Labels */}
      {axes.map((ax, i) => {
        const [lx, ly] = pt(i, 122);
        const cos = Math.cos(a(i));
        const anchor = Math.abs(cos) < 0.3 ? 'middle' : cos > 0 ? 'start' : 'end';
        return (
          <text key={ax.key} x={lx} y={ly} fill="var(--ink)" fontSize={labelSize}
            textAnchor={anchor} dominantBaseline="middle"
            fontFamily="var(--fam-body)" fontWeight={500} style={{ letterSpacing: '.01em' }}>
            <tspan>{ax.label}</tspan>
            {ax.sub && (
              <tspan x={lx} dy={labelSize + 2} fill="var(--muted)" fontSize={labelSize - 1} fontWeight={400}>{ax.sub}</tspan>
            )}
          </text>
        );
      })}
    </svg>
  );
}

function Tabs({ tabs, value, onChange }) {
  return (
    <Ds.ToggleGroup style={{ background: 'var(--color-gray-100, #f1f1f2)' }}>
      {tabs.map((tab) => {
        const on = value === tab.id;
        return (
          <Ds.Toggle
            key={tab.id}
            pressed={on}
            onPressedChange={() => onChange(tab.id)}
            size="sm"
            style={{
              padding: '0 16px',
              whiteSpace: 'nowrap',
              fontWeight: on ? 600 : 500,
              background: on ? 'var(--color-primary-600, #ff8133)' : 'transparent',
              color: on ? '#fff' : 'var(--color-gray-600, #646464)',
              boxShadow: on ? 'var(--shadow-xs)' : 'none',
            }}
          >
            {tab.label}
          </Ds.Toggle>
        );
      })}
    </Ds.ToggleGroup>
  );
}

function ChipGroup({ options, value, onChange }) {
  return (
    <Ds.ToggleGroup style={{ background: 'var(--color-gray-100, #f1f1f2)' }}>
      {options.map((opt) => {
        const on = value === opt.value;
        return (
          <Ds.Toggle
            key={opt.value}
            pressed={on}
            onPressedChange={() => onChange(opt.value)}
            size="sm"
            style={{
              padding: '0 14px',
              whiteSpace: 'nowrap',
              fontWeight: on ? 600 : 500,
              background: on ? 'var(--color-primary-600, #ff8133)' : 'transparent',
              color: on ? '#fff' : 'var(--color-gray-600, #646464)',
              boxShadow: on ? 'var(--shadow-xs)' : 'none',
            }}
          >
            {opt.label}
          </Ds.Toggle>
        );
      })}
    </Ds.ToggleGroup>
  );
}

function Kbd({ children }) {
  return <Ds.Kbd keys={children} />;
}

function SectionLabel({ n, children }) {
  return (
    <div style={{
      fontFamily: 'var(--fam-body)', fontSize: 14, fontWeight: 600,
      color: 'var(--ink)', marginBottom: 14,
    }}>
      {children}
    </div>
  );
}

Object.assign(window, {
  StatusChip, OwnerGlyph, Pill, Meter, Radar, TinyRadar, RadarChart,
  Tabs, ChipGroup, Kbd, SectionLabel,
});


/* ===== skill-table.jsx ===== */
// Skill table — client-facing variants. No MIT dims in any view.
// "list"    → clean row-per-skill, airy, with strong right-hand trajectory arrow
// "kanban"  → grouped by recommended action (upskill / reskill / hire / automate)
// "matrix"  → 2×2 urgency × trajectory quadrants with skill pills

function SkillTable({ rows, style: variant = 'list', onOpen }) {
  if (variant === 'kanban') return <KanbanBoard rows={rows} onOpen={onOpen} />;
  if (variant === 'matrix') return <UrgencyMatrix rows={rows} onOpen={onOpen} />;
  return <CleanList rows={rows} onOpen={onOpen} />;
}

// ============================================================================
// 1. CLEAN LIST — airy, scan-optimised row list
// ============================================================================
function CleanList({ rows, onOpen }) {
  return (
    <div style={{
      background: 'var(--panel)', border: '1px solid var(--rule)',
      borderBottomLeftRadius: 'var(--radius)', borderBottomRightRadius: 'var(--radius)',
      overflow: 'hidden', fontFamily: 'var(--fam-body)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 120px 140px 110px 140px 40px',
        padding: '11px 20px',
        background: 'var(--panel-2)',
        borderBottom: '1px solid var(--rule)',
        fontSize: 11, fontWeight: 600, color: 'var(--muted)',
        letterSpacing: '.06em', textTransform: 'uppercase',
      }}>
        <div>Skill</div>
        <div>Status</div>
        <div>Future owner</div>
        <div>Urgency</div>
        <div style={{ textAlign: 'right' }}>Change over horizon</div>
        <div />
      </div>
      {rows.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onOpen(s.id)}
          className="sm-row"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 120px 140px 110px 140px 40px',
            alignItems: 'center',
            padding: '14px 20px',
            background: 'var(--panel)',
            borderTop: i === 0 ? 0 : '1px solid var(--rule)',
            border: 0, cursor: 'pointer', textAlign: 'left', width: '100%',
            fontFamily: 'inherit', color: 'inherit',
          }}
        >
          <div>
            <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 14 }}>{s.name}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>
              {s.today?.slice(0, 80)}{s.today && s.today.length > 80 ? '…' : ''}
            </div>
          </div>
          <div><StatusChip status={s.status} /></div>
          <div><OwnerGlyph owner={s.owner} /></div>
          <div><UrgencyBadge level={s.urgency} /></div>
          <div style={{ textAlign: 'right' }}>
            <TrajectoryArrow value={s.trajectory} />
          </div>
          <div style={{ color: 'var(--muted)', fontSize: 18, textAlign: 'right' }}>›</div>
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// 2. KANBAN — columns by recommended action
// ============================================================================
function KanbanBoard({ rows, onOpen }) {
  const columns = [
    { key: 'upskill',  label: 'Upskill',  verb: 'Invest in existing people',       accent: '#3E8B6A' },
    { key: 'reskill',  label: 'Reskill',  verb: 'Shift people into new work',      accent: '#D97757' },
    { key: 'hire',     label: 'Hire',     verb: 'Bring in new capability',         accent: '#0F6FA8' },
    { key: 'automate', label: 'Automate', verb: 'Move to AI / systems',            accent: '#6a3ab0' },
  ];

  // bucket by action
  const buckets = {};
  columns.forEach(c => (buckets[c.key] = []));
  rows.forEach(s => {
    const a = actionFor(s);
    if (buckets[a]) buckets[a].push(s);
  });

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14,
    }}>
      {columns.map(c => (
        <div key={c.key} style={{
          background: 'var(--panel)', border: '1px solid var(--rule)',
          borderRadius: 'var(--radius)', display: 'flex', flexDirection: 'column',
          minHeight: 240,
        }}>
          <div style={{
            padding: '12px 14px',
            borderBottom: '1px solid var(--rule)',
            borderTop: `3px solid ${c.accent}`,
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{c.label}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{c.verb}</div>
            </div>
            <div style={{
              fontSize: 14, fontWeight: 600, color: 'var(--ink)',
              fontVariantNumeric: 'tabular-nums',
            }}>{buckets[c.key].length}</div>
          </div>
          <div style={{ padding: 10, display: 'grid', gap: 8 }}>
            {buckets[c.key].length === 0 && (
              <div style={{ padding: '18px 10px', fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
                No skills in this bucket at this horizon.
              </div>
            )}
            {buckets[c.key].map(s => (
              <button
                key={s.id}
                onClick={() => onOpen(s.id)}
                className="sm-row"
                style={{
                  display: 'grid', gap: 6,
                  textAlign: 'left', padding: '10px 12px',
                  background: 'var(--panel-2)', border: '1px solid var(--rule)',
                  borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{s.name}</span>
                  <TrajectoryArrow value={s.trajectory} compact />
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 11, color: 'var(--muted)',
                }}>
                  <StatusChip status={s.status} />
                  <span>·</span>
                  <OwnerGlyph owner={s.owner} />
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function actionFor(s) {
  // Trajectory positive + human/hybrid owner → upskill
  // Trajectory positive + hybrid → reskill when urgency high
  // Declining → automate
  // New / emerging + urgent → hire
  if (s.status === 'declining' || (s.owner === 'ai' && s.trajectory < 0)) return 'automate';
  if (s.status === 'new' && (s.urgency === 'high' || s.urgency === 'med')) return 'hire';
  if (s.owner === 'hybrid' && s.trajectory > 0.15) return 'reskill';
  return 'upskill';
}

// ============================================================================
// 3. MATRIX — urgency × trajectory, 2×2
// ============================================================================
function UrgencyMatrix({ rows, onOpen }) {
  // Bucket: urgent (high/med) × positive trajectory? → 4 quadrants
  const bucket = (s) => {
    const urgent = s.urgency === 'high';
    const growing = s.trajectory >= 0;
    if (urgent && growing)  return 'actNow';
    if (urgent && !growing) return 'defend';
    if (!urgent && growing) return 'watch';
    return 'sunset';
  };
  const groups = { actNow: [], watch: [], defend: [], sunset: [] };
  rows.forEach(s => groups[bucket(s)].push(s));

  const cells = [
    { key: 'actNow',  title: 'Act now',          sub: 'Urgent & growing — the strategic priority', accent: '#D97757', bg: '#fff4eb' },
    { key: 'watch',   title: 'Invest to stay ahead', sub: 'Growing but not yet urgent — build quietly', accent: '#3E8B6A', bg: '#eef7f1' },
    { key: 'defend',  title: 'Manage the transition', sub: 'Urgent but fading — redeploy people', accent: '#0F6FA8', bg: '#eaf3f8' },
    { key: 'sunset',  title: 'Automate or sunset', sub: 'Neither urgent nor growing — free capacity', accent: '#6a3ab0', bg: '#f2ecf8' },
  ];

  return (
    <div>
      <div style={{
        display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: 0,
      }}>
        {/* Empty corner */}
        <div />
        <div style={axisHeadStyle}>Growing <span style={{ opacity: .5 }}>↗</span></div>
        <div style={axisHeadStyle}>Fading <span style={{ opacity: .5 }}>↘</span></div>

        {/* Row: urgent */}
        <div style={{ ...axisSideStyle }}>Urgent<br/><span style={{ fontSize: 10, opacity: .7 }}>next 12m</span></div>
        <QuadCell cell={cells[0]} skills={groups.actNow} onOpen={onOpen} />
        <QuadCell cell={cells[2]} skills={groups.defend} onOpen={onOpen} />

        {/* Row: not urgent */}
        <div style={{ ...axisSideStyle }}>Watch<br/><span style={{ fontSize: 10, opacity: .7 }}>1–3 years</span></div>
        <QuadCell cell={cells[1]} skills={groups.watch} onOpen={onOpen} />
        <QuadCell cell={cells[3]} skills={groups.sunset} onOpen={onOpen} />
      </div>
    </div>
  );
}

const axisHeadStyle = {
  padding: '10px 14px', fontSize: 12, fontWeight: 600, color: 'var(--muted)',
  letterSpacing: '.06em', textTransform: 'uppercase',
  borderBottom: '1px solid var(--rule)',
};
const axisSideStyle = {
  padding: '14px 8px', fontSize: 12, fontWeight: 600, color: 'var(--muted)',
  letterSpacing: '.06em', textTransform: 'uppercase',
  borderRight: '1px solid var(--rule)',
  display: 'flex', flexDirection: 'column', justifyContent: 'center',
};

function QuadCell({ cell, skills, onOpen }) {
  return (
    <div style={{
      background: cell.bg, border: '1px solid var(--rule)', borderRadius: 10,
      margin: 4, padding: 14, minHeight: 180,
    }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10,
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{cell.title}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{cell.sub}</div>
        </div>
        <div style={{
          fontSize: 18, fontWeight: 600, color: cell.accent,
          fontVariantNumeric: 'tabular-nums',
        }}>{skills.length}</div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {skills.length === 0 && (
          <span style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>No skills here at this horizon.</span>
        )}
        {skills.map(s => (
          <button
            key={s.id}
            onClick={() => onOpen(s.id)}
            className="sm-row"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 10px', borderRadius: 999,
              background: 'var(--panel)', border: '1px solid var(--rule)',
              cursor: 'pointer', fontSize: 12, color: 'var(--ink)',
              fontFamily: 'inherit',
            }}
          >
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: ownerColor(s.owner), display: 'inline-block',
            }} />
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function ownerColor(o) {
  return o === 'human' ? '#3E8B6A' :
         o === 'hybrid' ? 'var(--accent)' :
         o === 'ai'    ? '#6a3ab0' : 'var(--muted)';
}

// ============================================================================
// shared atoms
// ============================================================================

function TrajectoryArrow({ value, compact = false }) {
  const up = value >= 0;
  const color = up ? 'var(--ok)' : 'var(--bad)';
  const pct = `${up ? '+' : ''}${(value * 100).toFixed(0)}%`;
  if (compact) {
    return (
      <span style={{
        fontFamily: 'var(--fam-mono)', fontSize: 11, color,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {up ? '↑' : '↓'} {pct}
      </span>
    );
  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end',
      fontFamily: 'var(--fam-mono)', fontSize: 13, color, fontWeight: 600,
      fontVariantNumeric: 'tabular-nums',
    }}>
      <span style={{ fontSize: 16 }}>{up ? '↑' : '↓'}</span>
      {pct}
    </span>
  );
}

function UrgencyBadge({ level }) {
  const map = {
    high: { label: 'High',   color: 'var(--bad)'   },
    med:  { label: 'Medium', color: 'var(--warn)'  },
    low:  { label: 'Low',    color: 'var(--muted)' },
  };
  const m = map[level] || map.low;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 12, fontWeight: 500, color: 'var(--ink)',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: m.color, display: 'inline-block',
      }} />
      {m.label}
    </span>
  );
}

Object.assign(window, { SkillTable, UrgencyBadge });


/* ===== input.jsx ===== */
// Input stage — Job Family / Role / Tasks / Upload

function InputStage({ onRun, dataset, setDataset }) {
  const [entry, setEntry] = useState('family');
  const [familyName, setFamilyName] = useState('People & Culture');
  const [roleName, setRoleName] = useState('HR Business Partner');
  const [tasks, setTasks] = useState(
    '• Coach managers through difficult performance conversations\n• Facilitate quarterly workforce planning with Finance\n• Investigate and resolve employee relations issues\n• Translate people analytics into leadership narratives\n• Design org restructures and lead change communication'
  );
  const [horizon, setHorizon] = useState(3);
  const [language, setLanguage] = useState('English');
  const [context, setContext] = useState('Mid-size EMEA professional services firm, 2,400 employees, entering a 3-year transformation programme.');

  const [files, setFiles] = useState([
    { name: 'HRBP_JD_v3.pdf', size: '218 KB' },
    { name: '2026_Strategy_Brief.pdf', size: '1.1 MB' },
  ]);

  // Sample-role presets — selecting one prefills the form below
  const SAMPLES = [
    {
      id: 'hrbp', label: 'HR Business Partner', fam: 'People & Culture',
      familyName: 'People & Culture', roleName: 'HR Business Partner',
      tasks: '• Coach managers through difficult performance conversations\n• Facilitate quarterly workforce planning with Finance\n• Investigate and resolve employee relations issues\n• Translate people analytics into leadership narratives\n• Design org restructures and lead change communication',
      context: 'Mid-size EMEA professional services firm, 2,400 employees, entering a 3-year transformation programme.',
    },
    {
      id: 'fa', label: 'Financial Analyst', fam: 'Finance & Strategy',
      familyName: 'Finance & Strategy', roleName: 'Financial Analyst',
      tasks: '• Build monthly variance analysis for business units\n• Lead the annual budgeting cycle with operations leaders\n• Produce cashflow forecasts and scenario models\n• Support M&A due diligence and synergy modelling\n• Prepare board-pack commentary and KPI narratives',
      context: 'Listed industrial group, 8,000 employees, executing a margin-expansion plan and a cost-reduction programme.',
    },
    {
      id: 'cs', label: 'CS Representative', fam: 'Customer Operations',
      familyName: 'Customer Operations', roleName: 'Customer Service Representative',
      tasks: '• Resolve inbound customer enquiries across phone, email and chat\n• Handle complaints and refund decisions within policy\n• Log interactions and root-cause recurring issues\n• Onboard new customers and coach on product usage\n• Escalate systemic issues to product and operations',
      context: 'Direct-to-consumer subscription business, 650 agents across 4 hubs, deploying generative AI co-pilots in 2026.',
    },
  ];

  const applySample = (s) => {
    setDataset(s.id);
    setFamilyName(s.familyName);
    setRoleName(s.roleName);
    setTasks(s.tasks);
    setContext(s.context);
  };

  const tabs = [
    { id: 'family', label: 'Job Family' },
    { id: 'role',   label: 'Role' },
    { id: 'tasks',  label: 'Tasks' },
  ];

  return (
    <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, padding: '32px 40px' }}>
      <div>
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: 'var(--muted)', maxWidth: 680, fontSize: 14, lineHeight: 1.55, marginTop: 6, marginBottom: 0 }}>
            See how any role in your organisation will change over the next few years
            — which skills will grow, which will fade, and where AI will reshape the work.
            Tell us the job, and we&rsquo;ll return a skill map, a forward view, and the
            talent actions to get ahead of it.
          </p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Tabs tabs={tabs} value={entry} onChange={setEntry} />
        </div>

        <div style={{
          background: 'var(--panel)', borderRadius: 'var(--radius)',
          border: '1px solid var(--rule)', overflow: 'hidden',
        }}>
          <div style={{ padding: 24 }}>
            <div style={{
              display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 20,
              background: 'var(--accent-50, #fff4ee)', border: '1px solid var(--accent-200, #ffd0b8)',
              borderRadius: 10, padding: '12px 14px',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-700, #c2410c)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="9"></circle><path d="M12 16v-5M12 8h.01"></path></svg>
              <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink)' }}>
                {entry === 'family' && 'Map a whole team or department at once. Once you name it, we will suggest the roles in it, and you get a picture of all of them side by side.'}
                {entry === 'role' && 'Map one job title. You add a few tasks if the title is ambiguous.'}
                {entry === 'tasks' && 'No clean job title? Just list what the person actually does, one per line.'}
              </div>
            </div>
            {entry === 'family' && (
              <FamilyInput familyName={familyName} setFamilyName={setFamilyName} />
            )}
            {entry === 'role' && (
              <RoleInput roleName={roleName} setRoleName={setRoleName} familyName={familyName} setFamilyName={setFamilyName} />
            )}
            {entry === 'tasks' && (
              <TasksInput tasks={tasks} setTasks={setTasks} />
            )}

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px dashed var(--rule)', display: 'grid', gap: 18 }}>
              <Field label="Scenario horizon" sub="When should the engine project the role to?">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <ChipGroup
                    options={[{value:1,label:'1 year'},{value:3,label:'3 years'},{value:5,label:'5 years'},{value:7,label:'Custom'}]}
                    value={horizon}
                    onChange={setHorizon}
                  />
                  {horizon === 7 && (
                    <input type="number" min="1" max="15" defaultValue="7" style={{
                      width: 70, padding: '6px 10px', border: '1px solid var(--rule-strong)',
                      borderRadius: 8, fontFamily: 'var(--fam-mono)', background: 'var(--panel)',
                      color: 'var(--ink)',
                    }} />
                  )}
                </div>
              </Field>

              <Field label="Deliverable language" sub="Multi-language output">
                <ChipGroup
                  options={[{value:'English',label:'English'},{value:'Italiano',label:'Italiano'},{value:'Français',label:'Français'},{value:'Español',label:'Español'}]}
                  value={language} onChange={setLanguage}
                />
              </Field>

              <Field label="Company context" sub="Feeds the trend analysis — industry, size, transformation posture">
                <textarea value={context} onChange={e=>setContext(e.target.value)} rows={3} style={{
                  width: '100%', padding: '10px 12px',
                  border: '1px solid var(--rule-strong)', borderRadius: 8,
                  background: 'var(--panel)', color: 'var(--ink)',
                  fontFamily: 'var(--fam-body)', fontSize: 14, resize: 'vertical',
                }} />
              </Field>

              <Field label="Supporting documents" sub="Optional — JDs, competency frameworks, strategy docs. Adds weight to extraction & trends.">
                <UploadInline files={files} setFiles={setFiles} />
              </Field>
            </div>
          </div>

          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--rule)', background: 'var(--panel-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              Pipeline: <span style={{ color: 'var(--ink)' }}>Extract → Match → Verify → Project → Compose</span>
            </div>
            <Ds.Button
              variant="primary"
              onClick={() => onRun({ entry, familyName, roleName, tasks, horizon, language, context })}
            >
              Run pipeline →
            </Ds.Button>
          </div>
        </div>
      </div>

      {/* Right rail */}
      <aside style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>
        <div style={{
          background: 'var(--panel)', border: '1px solid var(--rule)',
          borderRadius: 'var(--radius)', padding: 20,
        }}>
          <SectionLabel>Data foundation</SectionLabel>
          <Stat label="O*NET occupations" value="923" sub="with importance ratings" />
          <Stat label="Skills in taxonomy" value="32,412" sub="mapped with embeddings" />
          <Stat label="MIT Iceberg signals" value="5 dims" sub="per skill" />
          <Stat label="Last refresh" value="14 Apr 2026" sub="monthly cadence" />

          <div style={{ marginTop: 20 }}>
            <SectionLabel>Sample roles</SectionLabel>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: -8, marginBottom: 8 }}>Click to pre-fill the form</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {SAMPLES.map(s => (
                <button key={s.id} onClick={()=>applySample(s)} style={{
                  textAlign: 'left', padding: '8px 10px', borderRadius: 8,
                  border: `1px solid ${dataset === s.id ? 'var(--accent)' : 'var(--rule)'}`,
                  background: dataset === s.id ? 'var(--accent-soft)' : 'var(--panel)',
                  cursor: 'pointer', fontFamily: 'var(--fam-body)', fontSize: 13,
                  color: 'var(--ink)',
                }}>
                  <div style={{ fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{s.fam}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, sub, children }) {
  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{sub}</div>}
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div style={{ padding: '10px 0', borderBottom: '1px dashed var(--rule)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ fontFamily: 'var(--fam-body)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}

function FamilyInput({ familyName, setFamilyName }) {
  const rolesInFamily = ROLES.hrbp.familyOccupations;
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <Field label="Job family" sub="The engine will expand into all roles in the family">
        <Ds.Input value={familyName} onChange={e=>setFamilyName(e.target.value)} />
      </Field>
      <div style={{ padding: 14, background: 'var(--panel-2)', border: '1px dashed var(--rule)', borderRadius: 8 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, fontWeight: 500 }}>Expected expansion · 5 roles</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {rolesInFamily.map(r => (
            <span key={r} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: 'var(--panel)', border: '1px solid var(--rule)', color: 'var(--ink)' }}>{r}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoleInput({ roleName, setRoleName, familyName, setFamilyName }) {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <Field label="Role title"><Ds.Input value={roleName} onChange={e=>setRoleName(e.target.value)} /></Field>
      <Field label="Job family (optional)" sub="Scopes common skills across the family"><Ds.Input value={familyName} onChange={e=>setFamilyName(e.target.value)} /></Field>
    </div>
  );
}

function TasksInput({ tasks, setTasks }) {
  return (
    <Field label="Tasks" sub="One per line — the engine infers skills and runs trend analysis">
      <textarea value={tasks} onChange={e=>setTasks(e.target.value)} rows={9} style={{ ...inputStyle, fontFamily: 'var(--fam-mono)', fontSize: 13, lineHeight: 1.6 }} />
    </Field>
  );
}

function UploadInline({ files, setFiles }) {
  const fileInput = React.useRef(null);
  const [drag, setDrag] = useState(false);

  const onPick = () => fileInput.current?.click();
  const onFiles = (fileList) => {
    const arr = Array.from(fileList || []).map(f => ({
      name: f.name,
      size: (f.size/1024 < 1024) ? `${Math.round(f.size/1024)} KB` : `${(f.size/1024/1024).toFixed(1)} MB`,
    }));
    setFiles(prev => [...prev, ...arr]);
  };
  const remove = (idx) => setFiles(prev => prev.filter((_,i)=>i!==idx));

  return (
    <div>
      <div
        onDragOver={(e)=>{e.preventDefault(); setDrag(true);}}
        onDragLeave={()=>setDrag(false)}
        onDrop={(e)=>{e.preventDefault(); setDrag(false); onFiles(e.dataTransfer.files);}}
        style={{
          border: `1px dashed ${drag ? 'var(--accent)' : 'var(--rule-strong)'}`,
          background: drag ? 'var(--accent-soft)' : 'var(--panel-2)',
          borderRadius: 8, padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          transition: 'background .15s, border-color .15s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            width: 28, height: 28, borderRadius: 6,
            background: 'var(--panel)', border: '1px solid var(--rule)',
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            color: 'var(--muted)', fontSize: 14,
          }}>↑</span>
          <div>
            <div style={{ fontSize: 13, color: 'var(--ink)' }}>Drop files here or <button type="button" onClick={onPick} style={{ background: 'transparent', border: 0, padding: 0, color: 'var(--accent-700)', textDecoration: 'underline', cursor: 'pointer', font: 'inherit' }}>browse</button></div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>PDF, DOCX, XLSX, TXT — up to 25 MB each</div>
          </div>
        </div>
        <input ref={fileInput} type="file" multiple style={{ display: 'none' }} onChange={(e)=>onFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: 10, display: 'grid', gap: 6 }}>
          {files.map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 10px', borderRadius: 6,
              background: 'var(--panel)', border: '1px solid var(--rule)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <span style={{
                  fontFamily: 'var(--fam-mono)', fontSize: 10, letterSpacing: '.06em',
                  padding: '2px 6px', borderRadius: 3,
                  background: 'var(--panel-2)', color: 'var(--muted)',
                  border: '1px solid var(--rule)', textTransform: 'uppercase',
                }}>{(f.name.split('.').pop() || 'file').slice(0,4)}</span>
                <span style={{ fontSize: 13, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{f.size}</span>
                <button onClick={()=>remove(i)} style={{
                  background: 'transparent', border: 0, cursor: 'pointer',
                  color: 'var(--muted)', fontSize: 16, lineHeight: 1, padding: 2,
                }} title="Remove">×</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '10px 12px',
  border: '1px solid var(--rule-strong)', borderRadius: 8,
  background: 'var(--panel)', color: 'var(--ink)',
  fontFamily: 'var(--fam-body)', fontSize: 14,
};

Object.assign(window, { InputStage });


/* ===== pipeline.jsx ===== */
// Pipeline — async queue feel, runs in background, pauses for human review.

function PipelineStage({ onDone, onReady, params }) {
  // Stages, phases & the one that requires human-in-the-loop
  const stages = [
    { id: 1, label: 'Input structuring',        phase: 'extract',  detail: 'Normalizing input into canonical tasks and entities.',              est: 12 },
    { id: 2, label: 'Skill extraction',         phase: 'extract',  detail: 'Extracting candidate skills from tasks and context.',               est: 35 },
    { id: 3, label: 'Semantic match · O*NET',   phase: 'match',    detail: 'Embedding lookup against 32,412 skills across 923 occupations.',    est: 95 },
    { id: 4, label: 'Coverage verification',    phase: 'match',    detail: 'Second-pass LLM check for missing adjacent skills.',                est: 110 },
    { id: 5, label: 'MIT Iceberg overlay',      phase: 'project',  detail: 'Attaching automation exposure and execution-owner dimensions.',     est: 42 },
    { id: 6, label: 'Trend projection',         phase: 'project',  detail: '',                                                                  est: 130 },
    { id: 7, label: 'Composing output',         phase: 'compose',  detail: 'Building strategic summary and talent actions.',                    est: 28 },
    { id: 8, label: 'Human review & sign-off',  phase: 'review',   detail: 'A Pack analyst validates the mapping and narrative before it reaches the client.', humanHold: true, est: 0 },
  ];

  // Fill the dynamic detail
  stages[5].detail = `Projecting forward ${params?.horizon ?? 3} year${(params?.horizon??3)===1?'':'s'} with company context.`;

  const totalEst = stages.reduce((s, x) => s + x.est, 0); // sec of machine time

  const [active, setActive]   = useState(0);
  const [finished, setFinished] = useState(false);   // all stages done
  const [paused, setPaused]   = useState(false);     // waiting for human review
  const [closed, setClosed]   = useState(false);     // user minimised
  const [reviewStarted, setReviewStarted] = useState(false);
  const [log, setLog]         = useState([]);
  const [elapsed, setElapsed] = useState(0);         // fake seconds elapsed
  const mappingId = params && params.mappingId;
  const mappingPending = !!(params && params.mappingPending && !mappingId && !params.mappingError);
  const jobId = useMemo(() => mappingId ? ('JOB-' + mappingId) : ('JOB-' + Math.random().toString(36).slice(2,7).toUpperCase()), [mappingId]);
  const submittedAt = useMemo(() => new Date(), []);

  // Live poll when a mapping id exists; otherwise simulate so the demo is never stuck.
  useEffect(() => {
    if (mappingPending) return;
    let cancelled = false;
    const runSimulated = async () => {
      for (let i = 0; i < stages.length; i++) {
        if (cancelled) return;
        setActive(i);
        if (stages[i].humanHold) {
          setPaused(true);
          pushLog({ step: stages[i].id, label: stages[i].label, meta: 'queued for Pack reviewer · avg wait 2h 14m' });
          return;
        }
        await sleep(520 + Math.random()*220);
        pushLog({ step: stages[i].id, label: stages[i].label, meta: pipelineMeta(stages[i].id) });
        setElapsed(e => e + stages[i].est);
      }
      finish();
    };
    const runLive = async () => {
      const cfg = window.DemoApi ? window.DemoApi.readDemoCfg() : {};
      let lastStep = '';
      while (!cancelled) {
        try {
          const poll = await window.DemoApi.pollMapping(mappingId, cfg.lang || params.language);
          const completed = (poll.steps || []).filter((s) => s.status === 'completed').length;
          if (poll.status === 'running') setActive(Math.min(4, Math.max(0, completed)));
          if (poll.status === 'evolving') setActive(5);
          const newest = (poll.steps || []).slice(-1)[0];
          if (newest && newest.step !== lastStep) {
            lastStep = newest.step;
            pushLog({ step: completed + 1, label: newest.step.replace(/_/g, ' '), meta: newest.status });
          }
          if (poll.status === 'ready') {
            if (poll.role && onReady) onReady(poll.role);
            setPaused(false);
            setReviewStarted(true);
            pushLog({ step: 8, label: 'Human review & sign-off', meta: 'Signed off for demo playback' });
            finish();
            return;
          }
          if (poll.status === 'failed') {
            pushLog({ step: 0, label: 'Pipeline failed', meta: 'Falling back to sample mapping' });
            await runSimulated();
            return;
          }
        } catch (err) {
          pushLog({ step: 0, label: 'Live mapping unavailable', meta: (err && err.message) || 'Using sample mapping' });
          await runSimulated();
          return;
        }
        await sleep(2000);
      }
    };
    (mappingId && window.DemoApi ? runLive() : runSimulated());
    return () => { cancelled = true; };
  }, [mappingId, mappingPending]);

  // Continue when user resumes after review
  const resumeAfterReview = () => {
    setPaused(false);
    setReviewStarted(true);
    pushLog({ step: 8, label: 'Human review & sign-off', meta: 'Approved by Clara B. with 2 narrative edits' });
    setElapsed(e => e + 90);
    finish();
  };

  const finish = () => { setActive(stages.length); setFinished(true); };

  function pushLog(entry) {
    setLog(prev => [...prev, { ...entry, t: new Date() }]);
  }

  const phasePretty = {
    extract: 'Extract', match: 'Match', review: 'Review', project: 'Project', compose: 'Compose',
  };

  // ------------------------ render ------------------------
  if (closed) {
    return (
      <MinimisedJob
        jobId={jobId}
        stage={stages[active]}
        finished={finished}
        paused={paused}
        onOpen={() => setClosed(false)}
        onOpenDashboard={onDone}
      />
    );
  }

  return (
    <div className="fade-up" style={{ padding: '28px 40px', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 28 }}>
      <div>
        {/* Header — job meta, not a big headline */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 18,
        }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--fam-mono)', marginBottom: 4 }}>
              {jobId} · submitted {submittedAt.toLocaleTimeString('en-GB', {hour:'2-digit', minute:'2-digit'})}
            </div>
            <h2 style={{ margin: 0, fontFamily: 'var(--fam-body)', fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>
              {finished
                ? 'Mapping ready'
                : paused
                  ? 'Awaiting human review'
                  : 'Skills engine running'}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <StatusPill state={finished ? 'done' : paused ? 'paused' : 'running'} />
            {!finished && (
              <Ds.Button variant="ghost" onClick={()=>setClosed(true)}>
                Run in background
              </Ds.Button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <ProgressRow
          stages={stages}
          active={active}
          finished={finished}
          paused={paused}
          elapsed={elapsed}
          totalEst={totalEst}
        />

        {/* Human-in-the-loop callout */}
        {paused && !reviewStarted && (
          <ReviewCallout
            jobId={jobId}
            onStart={resumeAfterReview}
          />
        )}

        {/* Stage list */}
        <div style={{
          marginTop: 20, background: 'var(--panel)', border: '1px solid var(--rule)',
          borderRadius: 'var(--radius)', overflow: 'hidden',
        }}>
          {stages.map((s, i) => {
            const state =
              finished || i < active ? 'done' :
              i === active ? (paused ? 'waiting' : 'running') :
              'pending';
            return (
              <div key={s.id} style={{
                display: 'grid', gridTemplateColumns: '44px 1fr auto',
                alignItems: 'center', gap: 14,
                padding: '12px 18px',
                borderTop: i === 0 ? 0 : '1px solid var(--rule)',
                background: state === 'running' ? 'var(--accent-soft)' :
                           state === 'waiting' ? '#fff9ec' : 'transparent',
                transition: 'background .3s',
              }}>
                <StageDot state={state} n={s.id} humanHold={s.humanHold} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>{s.label}</span>
                    <PhaseTag phase={phasePretty[s.phase]} />
                    {s.humanHold && <HumanBadge />}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.detail}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'right' }}>
                  {state === 'done'
                    ? 'done'
                    : state === 'running'
                      ? `~${s.est}s`
                      : state === 'waiting'
                        ? 'waiting'
                        : `queued · ~${s.est}s`}
                </div>
              </div>
            );
          })}
        </div>

        {finished && (
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
            <Ds.Button variant="primary" onClick={onDone}>
              Open mapping →
            </Ds.Button>
          </div>
        )}
      </div>

      {/* Right rail: job meta + compact log */}
      <aside style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
        <JobCard
          params={params}
          stages={stages}
          active={active}
          paused={paused}
          finished={finished}
          totalEst={totalEst}
          elapsed={elapsed}
          submittedAt={submittedAt}
        />

        <div style={{
          background: 'var(--panel)', border: '1px solid var(--rule)',
          borderRadius: 'var(--radius)', overflow: 'hidden',
        }}>
          <div style={{
            padding: '10px 14px', borderBottom: '1px solid var(--rule)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: 'var(--panel-2)',
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>Activity</span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>
              {log.length} event{log.length===1?'':'s'}
            </span>
          </div>
          <div style={{
            padding: 14, fontSize: 13, lineHeight: 1.55,
            color: 'var(--muted)', display: 'grid', gap: 10, minHeight: 260,
          }}>
            {log.map((l, i) => (
              <div key={i} className="fade-up" style={{ display: 'grid', gridTemplateColumns: '54px 1fr', gap: 10 }}>
                <span style={{ fontFamily: 'var(--fam-mono)', fontSize: 11, color: 'var(--muted)' }}>
                  {l.t.toLocaleTimeString('en-GB', {hour:'2-digit', minute:'2-digit'})}
                </span>
                <div>
                  <div style={{ color: 'var(--ink)', fontWeight: 500 }}>{l.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{l.meta}</div>
                </div>
              </div>
            ))}
            {!finished && !paused && <div className="pulse-dot" style={{ color: 'var(--accent)' }}>▮</div>}
          </div>
        </div>
      </aside>
    </div>
  );
}

// ============================================================================
// sub-components
// ============================================================================

function StatusPill({ state }) {
  const map = {
    running: { bg: 'var(--accent-soft)', bd: 'var(--accent)', fg: 'var(--accent-700)', label: 'Running' },
    paused:  { bg: '#fff4d6',            bd: '#d89b1f',        fg: '#8a5a00',         label: 'Awaiting review' },
    done:    { bg: '#e8f5ea',            bd: '#2f9e44',        fg: '#166b2e',         label: 'Complete' },
  }[state];
  return (
    <span style={{
      fontSize: 12, padding: '4px 10px', borderRadius: 999,
      background: map.bg, border: `1px solid ${map.bd}`, color: map.fg, fontWeight: 600,
    }}>{map.label}</span>
  );
}

function ProgressRow({ stages, active, finished, paused, elapsed, totalEst }) {
  const pct = finished ? 100 : Math.min(98, (active / stages.length) * 100);
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
        <span>Step {Math.min(active+1, stages.length)} of {stages.length} · {stages[Math.min(active, stages.length-1)].label}</span>
        <span style={{ fontFamily: 'var(--fam-mono)' }}>
          {finished
            ? `${fmtDuration(totalEst)} total`
            : paused
              ? 'paused · queued for reviewer'
              : `${fmtDuration(elapsed)} / ~${fmtDuration(totalEst)}`}
        </span>
      </div>
      <div style={{ height: 6, background: 'var(--panel-2)', border: '1px solid var(--rule)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: paused ? '#d89b1f' : 'var(--accent)',
          transition: 'width .6s ease',
        }} />
      </div>
    </div>
  );
}

function StageDot({ state, n, humanHold }) {
  const color =
    state === 'done' ? 'var(--accent)' :
    state === 'running' ? 'var(--accent)' :
    state === 'waiting' ? '#d89b1f' :
    'var(--rule-strong)';
  return (
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      border: `1.5px solid ${color}`,
      background: state === 'done' ? 'var(--accent)' : state === 'waiting' ? '#d89b1f' : 'transparent',
      color: (state === 'done' || state === 'waiting') ? '#fff' : color,
      fontSize: 12, fontWeight: 600,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {state === 'done' ? '✓' : humanHold ? '✦' : n}
    </div>
  );
}

function PhaseTag({ phase }) {
  return (
    <span style={{
      fontSize: 10, padding: '2px 6px', borderRadius: 3,
      background: 'var(--panel-2)', color: 'var(--muted)', border: '1px solid var(--rule)',
      fontFamily: 'var(--fam-mono)', letterSpacing: '.04em', textTransform: 'uppercase',
    }}>{phase}</span>
  );
}

function HumanBadge() {
  return (
    <span style={{
      fontSize: 10, padding: '2px 6px', borderRadius: 3,
      background: '#fff4d6', color: '#8a5a00', border: '1px solid #d89b1f',
      fontWeight: 600, letterSpacing: '.02em',
    }}>HUMAN-IN-THE-LOOP</span>
  );
}

function ReviewCallout({ jobId, onStart }) {
  return (
    <div style={{
      marginTop: 18, padding: 18,
      background: '#fff8e4', border: '1px solid #e9c461',
      borderRadius: 'var(--radius)',
      display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 16,
    }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#8a5a00', marginBottom: 4, letterSpacing: '.04em', textTransform: 'uppercase' }}>
          Awaiting Pack reviewer sign-off
        </div>
        <div style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.5, maxWidth: 560 }}>
          The machine pipeline is complete. Before the mapping is released to the client,
          a Pack analyst validates the skills, MIT Iceberg overlay, and the narrative.
          Typical turnaround is <b>2–4 hours</b>. You can close this page and come back;
          we&rsquo;ll email you when the mapping is signed off.
        </div>
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        <Ds.Button variant="primary" onClick={onStart}>
          Simulate sign-off →
        </Ds.Button>
        <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', fontFamily: 'var(--fam-mono)' }}>
          demo · skips wait
        </div>
      </div>
    </div>
  );
}

function JobCard({ params, stages, active, paused, finished, totalEst, elapsed, submittedAt }) {
  const etaMin = finished ? 0 : paused ? 150 : Math.max(1, Math.round((totalEst - elapsed) / 60));
  return (
    <div style={{
      background: 'var(--panel)', border: '1px solid var(--rule)',
      borderRadius: 'var(--radius)', padding: 16,
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>
        This job
      </div>
      <Row k="Target role" v={params?.roleName ?? params?.familyName ?? '—'} />
      <Row k="Horizon" v={`${params?.horizon ?? 3} years`} />
      <Row k="Output language" v={params?.language ?? 'English'} />
      <Row k="Submitted" v={submittedAt.toLocaleString('en-GB', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })} />
      <Row
        k="ETA"
        v={finished ? 'Ready now' : paused ? '~2h 30m (review queue)' : `~${etaMin} min`}
      />
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px dashed var(--rule)', fontSize: 13 }}>
      <span style={{ color: 'var(--muted)' }}>{k}</span>
      <span style={{ color: 'var(--ink)', fontWeight: 500, textAlign: 'right' }}>{v}</span>
    </div>
  );
}

function MinimisedJob({ jobId, stage, finished, paused, onOpen, onOpenDashboard }) {
  return (
    <div className="fade-up" style={{ padding: '40px 40px' }}>
      <div style={{
        maxWidth: 640, margin: '40px auto 0',
        padding: 24, background: 'var(--panel)', border: '1px solid var(--rule)',
        borderRadius: 'var(--radius)',
      }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--fam-mono)', marginBottom: 6 }}>
          {jobId}
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
          {finished ? 'Your mapping is ready' : paused ? 'In Pack reviewer queue' : 'Running in the background'}
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 16 }}>
          {finished
            ? 'The skills engine finished. Open the dashboard to review.'
            : paused
              ? `Currently at "${stage.label}". We'll email you when a reviewer picks it up.`
              : `Currently running "${stage.label}". You can leave this page; the job will continue.`
          }
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {finished
            ? <Ds.Button variant="primary" onClick={onOpenDashboard}>Open mapping →</Ds.Button>
            : <Ds.Button variant="primary" onClick={onOpen}>Show progress</Ds.Button>}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// helpers + shared styles
// ============================================================================

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function fmtDuration(s) {
  if (s < 60) return `${Math.round(s)}s`;
  const m = Math.floor(s/60), sec = Math.round(s%60);
  return sec ? `${m}m ${sec}s` : `${m}m`;
}

const btnPrimary = {
  background: 'var(--accent)', color: '#fff', border: 0,
  padding: '9px 18px', borderRadius: 8, fontSize: 14, fontWeight: 600,
  cursor: 'pointer', fontFamily: 'var(--fam-body)',
};
const btnGhost = {
  background: 'transparent', color: 'var(--ink)',
  border: '1px solid var(--rule-strong)',
  padding: '7px 12px', borderRadius: 8, fontSize: 13, fontWeight: 500,
  cursor: 'pointer', fontFamily: 'var(--fam-body)',
};

function pipelineMeta(id) {
  switch (id) {
    case 1: return '12 tasks parsed from your input';
    case 2: return '29 candidate skills identified';
    case 3: return 'Matched against O*NET skills library';
    case 4: return 'Checked for missing adjacent skills';
    case 5: return 'Automation exposure applied';
    case 6: return 'Forward projection complete';
    case 7: return 'Summary and actions drafted';
    case 8: return 'Queued for analyst sign-off';
    default: return '';
  }
}

Object.assign(window, { PipelineStage });


/* ===== dashboard.jsx ===== */
// Dashboard — hero summary + filterable skill table

function NowVsFutureCard({ projected, horizon }) {
  // Pick the 8 most "moving" skills (largest absolute trajectory, with bias to relevance)
  const ranked = [...projected]
    .map(s => ({ ...s, _w: Math.abs(s.trajectory) + (s.relevance === 'high' ? 0.2 : 0) }))
    .sort((a,b) => b._w - a._w)
    .slice(0, 8);

  const relScore = (r) => r === 'high' ? 85 : r === 'med' ? 55 : 30;
  const nowVals    = Object.fromEntries(ranked.map(s => [s.id, relScore(s.relevance)]));
  const futureVals = Object.fromEntries(ranked.map(s => [s.id, s.projectedRelevance]));

  const axes = ranked.map(s => ({
    key: s.id,
    label: shortenSkill(s.name),
    sub: s.trajectory >= 0 ? `+${Math.round(s.trajectory*100)}%` : `${Math.round(s.trajectory*100)}%`,
  }));

  const growers = ranked.filter(s => s.trajectory > 0.1).length;
  const decliners = ranked.filter(s => s.trajectory < -0.1).length;

  return (
    <Ds.Card style={{ padding: 24, marginBottom: 22 }}>
      <SectionLabel>Now vs +{horizon}y · skill importance</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 32, alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <RadarChart
            axes={axes}
            series={[
              { name: 'Now',         color: 'var(--accent)',       values: nowVals,    fillOpacity: 0.12, strokeWidth: 1.5, dashed: true },
              { name: `In ${horizon}y`, color: 'var(--accent)', values: futureVals, fillOpacity: 0.22, strokeWidth: 2 },
            ]}
            size={420}
          />
        </div>
        <div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 18 }}>
            <Legend swatch="var(--accent)" dashed label="Now" />
            <Legend swatch="var(--accent)" label={`In ${horizon} years`} />
          </div>
          <p style={{ margin: 0, color: 'var(--ink)', fontSize: 14, lineHeight: 1.55 }}>
            Over a {horizon}-year horizon, <strong>{growers} skills grow</strong> in importance and <strong>{decliners} compress</strong>.
            The shape moves outward on strategic axes (workforce planning, data storytelling, AI fluency)
            and pulls inward on transactional ones (performance system admin, benefits queries).
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 18 }}>
            <ChangeCol title="Largest gain" items={ranked.filter(s => s.trajectory > 0).sort((a,b)=>b.trajectory-a.trajectory).slice(0,3)} positive />
            <ChangeCol title="Largest decline" items={ranked.filter(s => s.trajectory < 0).sort((a,b)=>a.trajectory-b.trajectory).slice(0,3)} />
          </div>
        </div>
      </div>
    </Ds.Card>
  );
}

function Legend({ swatch, label, dashed }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink)' }}>
      <span style={{
        width: 18, height: 3,
        background: dashed ? `repeating-linear-gradient(90deg, ${swatch} 0 5px, transparent 5px 9px)` : swatch,
      }} />
      <strong style={{ fontWeight: 600 }}>{label}</strong>
    </span>
  );
}

function ChangeCol({ title, items, positive }) {
  const color = positive ? 'var(--ok)' : 'var(--bad)';
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 8 }}>{title}</div>
      <div style={{ display: 'grid', gap: 6 }}>
        {items.map(s => (
          <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: 'var(--ink)' }}>{shortenSkill(s.name)}</span>
            <span style={{ color, fontWeight: 600, fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--fam-mono)', fontSize: 12 }}>
              {s.trajectory >= 0 ? '+' : ''}{Math.round(s.trajectory*100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function shortenSkill(name) {
  return name
    .replace(' Conversations', '')
    .replace(' & Developmental Conversations', '')
    .replace(' Communication', ' Comms')
    .replace('Strategic Workforce Planning', 'Workforce')
    .replace('People Data Storytelling', 'Data Storytelling')
    .replace('AI Fluency for People Decisions', 'AI Fluency')
    .replace('Performance Management System Admin', 'Perf System Admin')
    .replace('Benefits & Payroll Query Handling', 'Benefits Admin')
    .replace('Employment Law & Regulatory Compliance', 'Compliance')
    .replace('Inclusion & Belonging Program Design', 'Inclusion')
    .replace('Sourcing & Interview Screening', 'Sourcing')
    .replace('Organization Design', 'Org Design')
    .replace('Employee Relations & Advisory', 'ER & Advisory')
    .replace('Coaching & Developmental Conversations', 'Coaching');
}

function DashboardStage({ role, horizon, onOpen, onBack, onAssess, tableStyle = 'heat' }) {
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const projected = useMemo(() => projectSkills(role.skills, horizon), [role, horizon]);

  const filtered = useMemo(() => {
    let s = projected.slice();
    if (filter === 'hard') s = s.filter(x => x.category === 'hard');
    if (filter === 'soft') s = s.filter(x => x.category === 'soft');
    if (filter === 'human') s = s.filter(x => x.owner === 'human');
    if (filter === 'hybrid') s = s.filter(x => x.owner === 'hybrid');
    if (filter === 'ai') s = s.filter(x => x.owner === 'ai');
    if (filter === 'emerging') s = s.filter(x => x.status === 'new' || x.status === 'growing');
    if (q.trim()) { const r = q.toLowerCase(); s = s.filter(x => x.name.toLowerCase().includes(r)); }
    s.sort((a, b) => b.trajectory - a.trajectory);
    return s;
  }, [projected, filter, q]);

  const counts = useMemo(() => {
    const c = { human: 0, hybrid: 0, ai: 0, robot: 0 };
    projected.forEach(s => c[s.owner] = (c[s.owner]||0) + 1);
    return c;
  }, [projected]);

  const totalAutomation = Math.round(projected.reduce((a,s)=>a+s.dims.automation,0) / projected.length);
  const growingCount = projected.filter(s=>s.status==='growing' || s.status==='new').length;
  const decliningCount = projected.filter(s=>s.status==='declining').length;

  return (
    <div className="fade-up" style={{ padding: '24px 40px 60px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>

        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Ds.Button variant="outline" onClick={onBack}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 5v14M5 12h14"></path></svg>
            New mapping
          </Ds.Button>
          <Ds.Button variant="outline">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 3v12M7 10l5 5 5-5M5 21h14"></path></svg>
            Export
          </Ds.Button>
          {onAssess && (
            <Ds.Button variant="primary" onClick={onAssess}>
              Use mapping
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
            </Ds.Button>
          )}
        </div>
      </div>

      {/* Hero */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: 18, marginBottom: 22 }}>
        <Ds.Card style={{ padding: 24 }}>
          <SectionLabel>Transformation outlook</SectionLabel>
          <p style={{
            fontFamily: 'var(--fam-body)', fontSize: 15, lineHeight: 1.6,
            color: 'var(--ink)', margin: 0, maxWidth: 780, fontWeight: 400,
          }}>{STRATEGIC_SUMMARY.outlook}</p>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            <Kpi label="Skills mapped" value={String(projected.length)} sub="11 taxonomy · 1 emerging" />
            <Kpi label="Avg automation potential" value={`${totalAutomation}%`} sub="MIT Iceberg overlay" />
            <Kpi label="Growing vs declining" value={`${growingCount} / ${decliningCount}`} sub={`over ${horizon}y`} />
          </div>

          {/* Redistribution bar */}
          <div style={{ marginTop: 24 }}>
            <div style={{
              fontSize: 12, color: 'var(--muted)', marginBottom: 8, fontWeight: 500,
            }}>Future execution split · {horizon}y</div>
            <div style={{ display: 'flex', height: 14, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--rule)' }}>
              <div style={{ flex: STRATEGIC_SUMMARY.redistribute.humanLed, background: '#3E8B6A' }} />
              <div style={{ flex: STRATEGIC_SUMMARY.redistribute.hybrid, background: 'var(--accent)' }} />
              <div style={{ flex: STRATEGIC_SUMMARY.redistribute.aiLed, background: '#6a3ab0' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: 'var(--muted)' }}>
              <span><span style={{ color: '#3E8B6A' }}>●</span> Human-led {STRATEGIC_SUMMARY.redistribute.humanLed}%</span>
              <span><span style={{ color: 'var(--accent)' }}>●</span> Hybrid {STRATEGIC_SUMMARY.redistribute.hybrid}%</span>
              <span><span style={{ color: '#6a3ab0' }}>●</span> AI-led {STRATEGIC_SUMMARY.redistribute.aiLed}%</span>
            </div>
          </div>
        </Ds.Card>

        {/* Critical skills card */}
        <Ds.Card style={{ padding: 20 }}>
          <SectionLabel>Top critical skills</SectionLabel>
          <div style={{ display: 'grid', gap: 10 }}>
            {STRATEGIC_SUMMARY.critical.map(id => {
              const s = projected.find(x => x.id === id);
              if (!s) return null;
              return (
                <button key={id} onClick={()=>onOpen(s.id)} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto',
                  padding: '10px 12px', borderRadius: 8, gap: 10,
                  background: 'var(--panel-2)', border: '1px solid var(--rule)',
                  cursor: 'pointer', textAlign: 'left',
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                      <OwnerGlyph owner={s.owner} />
                    </div>
                  </div>
                  <StatusChip status={s.status} compact />
                </button>
              );
            })}
          </div>
        </Ds.Card>
      </div>

      <NowVsFutureCard projected={projected} horizon={horizon} />

      {/* Filter bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 18px', background: 'var(--panel)',
        border: '1px solid var(--rule)',
        borderTopLeftRadius: 'var(--radius)', borderTopRightRadius: 'var(--radius)',
        borderBottom: tableStyle === 'rows' ? '1px solid var(--rule)' : 0,
        borderBottomLeftRadius: tableStyle === 'rows' ? 'var(--radius)' : 0,
        borderBottomRightRadius: tableStyle === 'rows' ? 'var(--radius)' : 0,
        marginBottom: tableStyle === 'rows' ? 12 : 0,
      }}>
        <ChipGroup
          value={filter} onChange={setFilter}
          options={[
            {value:'all',label:`All skills · ${projected.length}`},
            {value:'hard',label:'Hard'},
            {value:'soft',label:'Soft'},
            {value:'human',label:`Human · ${counts.human}`},
            {value:'hybrid',label:`Hybrid · ${counts.hybrid}`},
            {value:'ai',label:`AI Agent · ${counts.ai||0}`},
            {value:'emerging',label:'Emerging'},
          ]}
        />
        <div style={{ flex: 1 }} />
        <Ds.Input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search skills…" style={{ width: 220 }} />
      </div>

      {/* Table (variant) */}
      <SkillTable rows={filtered} style={tableStyle} onOpen={onOpen} />

      {/* Talent actions */}
      <div style={{ marginTop: 28 }}>
        <SectionLabel>Recommended talent actions</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {Object.entries(TALENT_ACTIONS).map(([key, a]) => (
            <Ds.Card key={key} style={{ padding: 18, position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: actionColor(key),
              }}/>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{a.label}</div>
              <div style={{ fontFamily: 'var(--fam-body)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', marginTop: 2 }}>
                {a.skills.length} skill{a.skills.length===1?'':'s'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6, marginBottom: 12 }}>{a.verb}</div>
              <div style={{ display: 'grid', gap: 6 }}>
                {a.skills.map(id => {
                  const s = projected.find(x => x.id === id);
                  if (!s) return null;
                  return (
                    <Ds.Button key={id} variant="ghost" onClick={()=>onOpen(id)} style={{ justifyContent: 'flex-start', height: 'auto', padding: '6px 10px', fontSize: 12 }}>
                      {s.name}
                    </Ds.Button>
                  );
                })}
              </div>
            </Ds.Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value, sub }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{label}</div>
      <div style={{ fontFamily: 'var(--fam-body)', fontSize: 28, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{sub}</div>
    </div>
  );
}

function RelChip({ level, label }) {
  const color = level === 'high' ? 'var(--bad)' : level === 'med' ? 'var(--warn)' : 'var(--muted)';
  return (
    <span style={{
      fontSize: 10, fontFamily: 'var(--fam-mono)',
      letterSpacing: '.1em', textTransform: 'uppercase',
      padding: '2px 6px', borderRadius: 4,
      border: `1px solid ${color}`, color,
    }}>{label} {level.charAt(0).toUpperCase()}</span>
  );
}

function TrajectorySpark({ value }) {
  const up = value >= 0;
  const w = Math.abs(value) * 60;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
      <span style={{
        display:'inline-block', height: 4, width: Math.max(6, w),
        background: up ? 'var(--ok)' : 'var(--bad)', borderRadius: 4,
      }} />
      <span style={{
        fontFamily: 'var(--fam-mono)', fontSize: 12,
        color: up ? 'var(--ok)' : 'var(--bad)', fontVariantNumeric: 'tabular-nums',
      }}>{up ? '+' : ''}{(value*100).toFixed(0)}%</span>
    </span>
  );
}

function catColor(c) {
  return c === 'hard' ? 'var(--accent)' : '#5aa0c8';
}
function automationColor(v) {
  if (v < 30) return '#3E8B6A';
  if (v < 60) return '#b67411';
  return '#9c2b2b';
}
function actionColor(k) {
  return { upskill: '#3E8B6A', reskill: 'var(--accent)', hire: '#0F6FA8', automate: '#6a3ab0' }[k];
}

const Th = ({ children, style }) => (
  <th style={{
    textAlign: 'left', padding: '10px 14px', fontWeight: 600,
    fontSize: 12, fontFamily: 'var(--fam-body)', ...style,
  }}>{children}</th>
);
const Td = ({ children, style }) => (
  <td style={{ padding: '12px 14px', verticalAlign: 'middle', ...style }}>{children}</td>
);

const primBtn = {
  background: 'var(--accent)', color: '#fff', border: 0,
  padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
  cursor: 'pointer', fontFamily: 'var(--fam-body)',
};
const secBtn = {
  background: 'var(--panel)', color: 'var(--ink)', border: '1px solid var(--rule-strong)',
  padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500,
  cursor: 'pointer', fontFamily: 'var(--fam-body)',
};

Object.assign(window, { DashboardStage, TrajectorySpark });


/* ===== detail.jsx ===== */
// Skill detail drawer — full profile for one skill

function DetailStage({ role, horizon, skillId, onClose, onOpen }) {
  const skill = role.skills.find(s => s.id === skillId);
  if (!skill) return null;

  const projected = useMemo(() => projectSkills(role.skills, horizon), [role, horizon]);
  const peers = projected
    .filter(s => s.id !== skillId)
    .sort((a,b) => Math.abs(a.dims.automation - skill.dims.automation) - Math.abs(b.dims.automation - skill.dims.automation))
    .slice(0, 4);

  return (
    <div className="fade-up" style={{ padding: '24px 40px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
        <div>
          
          <div style={{ fontFamily: 'var(--fam-mono)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            {role.title} · Skill profile
          </div>
          <h1 style={{
            margin: '4px 0 0', fontFamily: 'var(--fam-head)',
            fontSize: 'clamp(30px, 3.4vw, 44px)', fontWeight: 500,
            letterSpacing: '-.01em', color: 'var(--ink)', maxWidth: 820,
          }}>{skill.name}</h1>
          <div style={{ marginTop: 14, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <StatusChip status={skill.status} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Owner</span>
              <OwnerGlyph owner={skill.owner} />
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Relevance</span>
              <UrgencyBadge level={skill.relevance} />
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Urgency</span>
              <UrgencyBadge level={skill.urgency} />
            </span>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
              {skill.category === 'hard' ? 'Hard skill' : 'Soft skill'}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Ds.Button variant="outline">Copy to brief</Ds.Button>
          <Ds.Button variant="primary">Add to talent plan</Ds.Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 20 }}>
        {/* Left: radar + dims */}
        <div style={{
          background: 'var(--panel)', border: '1px solid var(--rule)',
          borderRadius: 'var(--radius)', padding: 20,
        }}>
          <SectionLabel>Automation dimensions</SectionLabel>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Radar dims={skill.dims} size={240} />
          </div>
          <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
            {DIMS.map(d => (
              <Meter key={d.key} label={d.label} value={skill.dims[d.key]} />
            ))}
          </div>
          <div style={{
            marginTop: 18, padding: 12, borderRadius: 8,
            background: 'var(--panel-2)', border: '1px dashed var(--rule)',
          }}>
            <div style={{ fontFamily: 'var(--fam-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>O*NET anchor</div>
            <div style={{ marginTop: 4, fontSize: 13, color: 'var(--ink)' }}>{skill.onetMatch || '—'}</div>
            <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Mini label="Importance" value={skill.onetImportance != null ? skill.onetImportance + '/100' : '—'} />
              <Mini label="MIT exposure" value={skill.mitExposure != null ? skill.mitExposure + '%' : '—'} />
            </div>
          </div>
        </div>

        {/* Right: narrative + projection */}
        <div style={{ display: 'grid', gap: 18 }}>
          <div style={{
            background: 'var(--panel)', border: '1px solid var(--rule)',
            borderRadius: 'var(--radius)', padding: 0, overflow: 'hidden',
          }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '140px 1fr 1fr',
              background: 'var(--panel-2)', borderBottom: '1px solid var(--rule)',
            }}>
              <div style={cmpHeadCell}></div>
              <div style={cmpHeadCell}>
                <span style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Today</span>
              </div>
              <div style={{ ...cmpHeadCell, background: 'color-mix(in srgb, var(--accent) 8%, transparent)' }}>
                <span style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600 }}>In {horizon} years</span>
              </div>
            </div>
            {[
              { key: 'owner',  label: 'Who owns it' },
              { key: 'time',   label: 'Time spent' },
              { key: 'mode',   label: 'How it runs' },
              { key: 'output', label: 'Primary output' },
              { key: 'risk',   label: 'Key risk' },
            ].map((row, i) => {
              const c = skill.compare?.[row.key] || { t: '—', f: '—' };
              const changed = c.t !== c.f;
              return (
                <div key={row.key} style={{
                  display: 'grid', gridTemplateColumns: '140px 1fr 1fr',
                  borderTop: i === 0 ? 0 : '1px solid var(--rule)',
                }}>
                  <div style={{
                    padding: '14px 16px', fontSize: 11, color: 'var(--muted)',
                    letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 600,
                    background: 'var(--panel-2)', borderRight: '1px solid var(--rule)',
                    display: 'flex', alignItems: 'center',
                  }}>{row.label}</div>
                  <div style={{
                    padding: '14px 16px', fontSize: 14, color: 'var(--ink)',
                    borderRight: '1px solid var(--rule)',
                  }}>{c.t}</div>
                  <div style={{
                    padding: '14px 16px', fontSize: 14,
                    background: changed ? 'color-mix(in srgb, var(--accent) 6%, transparent)' : 'transparent',
                    color: 'var(--ink)', fontWeight: changed ? 600 : 400,
                  }}>{c.f}</div>
                </div>
              );
            })}
          </div>

          <div style={{
            background: 'var(--panel)', border: '1px solid var(--rule)',
            borderRadius: 'var(--radius)', padding: 20,
          }}>
            <SectionLabel n={8}>Projection</SectionLabel>
            <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              <Projection label="Trajectory" value={`${skill.trajectory >= 0 ? '+' : ''}${Math.round(skill.trajectory*100)}%`} tone={skill.trajectory >= 0 ? 'pos':'neg'} />
              <Projection label="Future owner" value={OWNER_META[skill.owner].short} />
              <Projection label="Confidence" value={skill.mitExposure != null ? 'High' : 'Medium'} sub={skill.mitExposure != null ? 'Taxonomy + MIT grounded' : 'pipeline-extracted'} />
            </div>
          </div>

          <div style={{
            background: 'var(--panel-2)', border: '1px solid var(--rule)',
            borderRadius: 'var(--radius)', padding: 20,
          }}>
            <SectionLabel>Why it matters</SectionLabel>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--ink)', maxWidth: 700 }}>
              {skill.why}
            </p>
          </div>

          {/* Peers */}
          <div>
            <SectionLabel>Nearby skills</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {peers.map(p => (
                <button key={p.id} onClick={()=>onOpen(p.id)} style={{
                  textAlign: 'left', background: 'var(--panel)', border: '1px solid var(--rule)',
                  borderRadius: 'var(--radius)', padding: 14, cursor: 'pointer',
                  display: 'grid', gap: 10,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <OwnerGlyph owner={p.owner} />
                    <span style={{
                      fontFamily: 'var(--fam-mono)', fontSize: 11,
                      color: p.trajectory >= 0 ? 'var(--ok)' : 'var(--bad)',
                      fontWeight: 600, fontVariantNumeric: 'tabular-nums',
                    }}>
                      {p.trajectory >= 0 ? '↑' : '↓'} {p.trajectory >= 0 ? '+' : ''}{Math.round(p.trajectory*100)}%
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)', lineHeight: 1.3 }}>{p.name}</div>
                  <StatusChip status={p.status} compact />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Mini({ label, value }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--fam-mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--fam-head)', fontSize: 20, fontWeight: 500, color: 'var(--ink)', marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}

function Projection({ label, value, sub, tone }) {
  const color = tone === 'pos' ? 'var(--ok)' : tone === 'neg' ? 'var(--bad)' : 'var(--ink)';
  return (
    <div style={{ padding: 14, borderRadius: 8, background: 'var(--panel-2)', border: '1px solid var(--rule)' }}>
      <div style={{ fontFamily: 'var(--fam-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--fam-head)', fontSize: 22, fontWeight: 500, color, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

Object.assign(window, { DetailStage });

const cmpHeadCell = {
  padding: '12px 16px',
  display: 'flex', alignItems: 'center',
  fontFamily: 'var(--fam-body)',
};


/* ===== assessment-data.jsx ===== */
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


/* ===== assessment.jsx ===== */
// Assessment module — Pack Assessments app look (sidebar + cards).
// Stages: create → invite → in-progress → aria → report


const A_STAGES = {
  CREATE:   'a.create',
  INVITE:   'a.invite',
  PROGRESS: 'a.progress',
  ARIA:     'a.aria',
  REPORT:   'a.report',
};

// ============================================================================
// Wrapper with Pack-Assessments-style sidebar
// ============================================================================
function AssessmentShell({ active, children, onNav }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 'calc(100vh - 65px)' }}>
      <aside style={{
        background: 'var(--panel)', borderRight: '1px solid var(--rule)',
        padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 2,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '4px 10px 14px',
          borderBottom: '1px solid var(--rule)', marginBottom: 10,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8, background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            fontWeight: 700,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9"/><path d="M12 3v9l6 4"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Assessments</div>
            <div style={{ fontSize: 11, color: 'var(--accent)' }}>Admin Dashboard</div>
          </div>
        </div>
        {[
          { id: 'dashboard', label: 'Dashboard',         icon: 'chart' },
          { id: 'projects',  label: 'Projects',          icon: 'folder' },
          { id: 'companies', label: 'Companies',         icon: 'building' },
          { id: 'templates', label: 'Templates',         icon: 'doc' },
          { id: 'config',    label: 'Configurations',    icon: 'cog' },
          { id: 'resources', label: 'Company Resources', icon: 'doc' },
        ].map(item => (
          <button key={item.id} onClick={() => onNav?.(item.id)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '9px 10px', borderRadius: 8, cursor: 'pointer',
            background: active === item.id ? 'var(--accent-soft)' : 'transparent',
            color: active === item.id ? 'var(--accent-700)' : 'var(--ink)',
            border: 0, fontFamily: 'var(--fam-body)', fontSize: 13.5,
            fontWeight: active === item.id ? 600 : 500, textAlign: 'left',
          }}>
            <SidebarIcon name={item.icon} />
            {item.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
          borderTop: '1px solid var(--rule)', marginTop: 8,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-soft)',
            color: 'var(--accent-700)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 600, fontSize: 11,
          }}>V</div>
          <div style={{ fontSize: 12, minWidth: 0 }}>
            <div style={{ color: 'var(--ink)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>vanessa@thepack.tech</div>
            <div style={{ color: 'var(--muted)', fontSize: 11 }}>Admin</div>
          </div>
        </div>
      </aside>
      <main style={{ overflow: 'auto' }}>{children}</main>
    </div>
  );
}

function SidebarIcon({ name }) {
  const map = {
    chart:    'M3 3v18h18 M7 14l4-4 4 3 5-7',
    folder:   'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    building: 'M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16 M9 9h.01 M9 13h.01 M13 9h.01 M13 13h.01',
    doc:      'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 13h6 M9 17h6',
    cog:      'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M19 12a7 7 0 0 0-.16-1.5l2-1.55-2-3.46-2.36 1a7 7 0 0 0-2.6-1.5L13.5 3h-3l-.38 2A7 7 0 0 0 7.52 6.5l-2.36-1-2 3.46 2 1.55A7 7 0 0 0 5 12c0 .51.06 1.01.16 1.5l-2 1.55 2 3.46 2.36-1c.77.6 1.65 1.1 2.6 1.5l.38 2h3l.38-2a7 7 0 0 0 2.6-1.5l2.36 1 2-3.46-2-1.55c.1-.49.16-.99.16-1.5z',
  };
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={map[name] || map.doc}/>
    </svg>
  );
}

// ============================================================================
// 1. CREATE PROJECT — mirrors the Pack screenshot, prefilled from mapping
// ============================================================================
function CreateAssessmentProject({ role, projected, onNext, onCancel }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(`${role.title} — Q2 2026 baseline`);
  const [aType, setAType] = useState('360');
  const [ariaOn, setAriaOn] = useState(true);
  const [limit, setLimit] = useState(30);
  const [country, setCountry] = useState('Italy');
  const [period, setPeriod] = useState('14 days');

  return (
    <div className="fade-up" style={{ padding: '24px 32px 60px', maxWidth: 980, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: 'var(--ink)' }}>Create Assessment Project</h1>
          <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>Set up the basic details of your assessment project</div>
        </div>
        
      </div>

      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 28 }}>
        <Step n={1} label="Basic Information" sub="Set up the basic details of your assessment project" active={step===1} done={step>1} />
        <div style={{ width: 80, height: 1, background: step>1 ? 'var(--accent)' : 'var(--rule-strong)' }} />
        <Step n={2} label="Timeline & Settings" sub={step===1 ? '…' : 'Set duration and invitations'} active={step===2} done={step>2} />
      </div>

      {step === 1 ? (
        <div style={{
          background: 'var(--panel)', border: '1px solid var(--rule)',
          borderRadius: 'var(--radius)', padding: 28,
        }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>Basic Information</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4, marginBottom: 22, paddingBottom: 16, borderBottom: '1px solid var(--rule)' }}>
            Set up the basic details for your assessment project
          </div>

          <FieldRow label="Project Name *">
            <Ds.Input value={name} onChange={e=>setName(e.target.value)} />
          </FieldRow>

          <FieldRow label="Company *">
            <div>
              <Ds.Select
                value="acme"
                options={[
                  { value: 'acme', label: 'Acme Professional Services Ltd.' },
                  { value: '', label: 'Select a company…' },
                ]}
              />
              <Ds.Button variant="outline" size="sm">+ Add New Company</Ds.Button>
            </div>
          </FieldRow>

          <FieldRow label="Skills *" sub="Imported from Skill Mapping — edit before launch">
            <ImportedSkillsPanel projected={projected} role={role} />
          </FieldRow>

          <FieldRow label="Assessment Type *">
            <div style={{ display: 'grid', gap: 10 }}>
              {[
                { v:'90',  t:'90° Assessment',  s:'Self-evaluation only' },
                { v:'180', t:'180° Assessment', s:'Self + Manager evaluation' },
                { v:'270', t:'270° Assessment', s:'Self + Manager + Peer evaluation' },
                { v:'360', t:'360° Assessment', s:'Full circle evaluation' },
              ].map(o => (
                <label key={o.v} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '12px 14px', borderRadius: 8, cursor: 'pointer',
                  border: `1px solid ${aType === o.v ? 'var(--accent)' : 'var(--rule)'}`,
                  background: aType === o.v ? 'var(--accent-soft)' : 'var(--panel)',
                }}>
                  <input type="radio" name="atype" checked={aType === o.v} onChange={()=>setAType(o.v)} style={{ marginTop: 3, accentColor: 'var(--accent)' }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{o.t}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{o.s}</div>
                  </div>
                </label>
              ))}
            </div>
          </FieldRow>

          <FieldRow label="Attach Pack AI Agent (Aria)" sub="Voice-led interview that complements the form-based assessment">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Toggle on={ariaOn} onChange={setAriaOn} />
              <span style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>
                {ariaOn ? 'Enabled — Aria will conduct a 10-min voice interview per participant' : 'Disabled'}
              </span>
            </div>
            {ariaOn && (
              <div style={{
                marginTop: 12, padding: '14px 16px', background: '#eff8ff',
                border: '1px solid #bee0fb', borderRadius: 8, fontSize: 13, color: '#114b8c', lineHeight: 1.55,
              }}>
                By enabling this option, Aria will conduct a brief voice interview as part of the assessment.
                The assessee completes both the form-based assessment <em>and</em> the Aria interview.
                Pre-loaded with the {projected.length} skills from the mapping.
              </div>
            )}
          </FieldRow>

          <FieldRow label="Participant Limit *">
            <div>
              <Ds.Input type="number" value={limit} onChange={e=>setLimit(+e.target.value)} style={{ width: 160 }} />
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Maximum number of subjects that can be invited to this assessment</div>
            </div>
          </FieldRow>

          <FieldRow label="Contract Country *">
            <Ds.Select
              value={country}
              onChange={setCountry}
              options={['Italy','France','Spain','United Kingdom'].map((label) => ({ value: label, label }))}
            />
          </FieldRow>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 18, borderTop: '1px solid var(--rule)', marginTop: 4 }}>
            <Ds.Button variant="outline" onClick={onCancel}>Cancel</Ds.Button>
            <Ds.Button variant="primary" onClick={()=>setStep(2)}>Next →</Ds.Button>
          </div>
        </div>
      ) : (
        <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: 28 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>Timeline & Settings</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4, marginBottom: 22, paddingBottom: 16, borderBottom: '1px solid var(--rule)' }}>
            Schedule the assessment window and configure invitations
          </div>

          <FieldRow label="Assessment period">
            <ChipGroup
              options={['7 days','14 days','21 days','Custom'].map((p) => ({ value: p, label: p }))}
              value={period}
              onChange={setPeriod}
            />
          </FieldRow>

          <FieldRow label="Send reminders">
            <div style={{ display: 'flex', gap: 18 }}>
              <Checkbox label="Day 3" defaultChecked />
              <Checkbox label="Day 7" defaultChecked />
              <Checkbox label="Day 12" defaultChecked />
              <Checkbox label="Final day" defaultChecked />
            </div>
          </FieldRow>

          <FieldRow label="Aggregation method">
            <Ds.Select
              value="weighted"
              options={[
                { value: 'weighted', label: 'Weighted average (manager 40% · peer 30% · self 30%)' },
                { value: 'mean', label: 'Straight mean' },
                { value: 'manager', label: 'Manager-only' },
              ]}
            />
          </FieldRow>

          <FieldRow label="Output language">
            <Ds.Select
              value="English"
              options={['English','Italiano','Français','Español'].map((label) => ({ value: label, label }))}
            />
          </FieldRow>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, paddingTop: 18, borderTop: '1px solid var(--rule)', marginTop: 4 }}>
            <Ds.Button variant="outline" onClick={()=>setStep(1)}>← Back</Ds.Button>
            <Ds.Button variant="primary" onClick={() => onNext({ name, aType, ariaOn, limit, country, period })}>Create project →</Ds.Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Step({ n, label, sub, active, done }) {
  const ring = done ? 'var(--accent)' : active ? 'var(--accent)' : 'var(--rule-strong)';
  const fill = done ? 'var(--accent)' : active ? 'transparent' : 'transparent';
  const fg   = done ? '#fff' : active ? 'var(--accent)' : 'var(--muted)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 320 }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        border: `2px solid ${ring}`, background: fill, color: fg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 600, fontSize: 13,
      }}>{done ? '✓' : n}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: active || done ? 'var(--ink)' : 'var(--muted)' }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{sub}</div>
      </div>
    </div>
  );
}

function FieldRow({ label, sub, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, padding: '16px 0', borderBottom: '1px solid var(--rule)' }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{sub}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return <Ds.Switch checked={on} onChange={onChange} />;
}

function Checkbox({ label, defaultChecked }) {
  const [checked, setChecked] = useState(!!defaultChecked);
  return (
    <Ds.Checkbox label={label} checked={checked} onChange={setChecked} />
  );
}

function ImportedSkillsPanel({ projected, role }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 14px', border: '1px solid var(--rule)', borderRadius: 8,
        background: 'var(--accent-soft)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 28, height: 28, borderRadius: 6, background: 'var(--accent)', color: '#fff',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
              {projected.length} skills imported from {role.title} mapping
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>O*NET-grounded · MIT Iceberg overlay applied · 3-year horizon</div>
          </div>
        </div>
        <Ds.Button variant="ghost" size="sm" onClick={() => setOpen(o=>!o)}>
          {open ? 'Hide' : 'Review'}
        </Ds.Button>
      </div>
      {open && (
        <div style={{ marginTop: 8, padding: 12, border: '1px solid var(--rule)', borderRadius: 8, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 6 }}>
          {projected.map(s => (
            <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderRadius: 6, background: 'var(--panel-2)' }}>
              <span style={{ fontSize: 13, color: 'var(--ink)' }}>{s.name}</span>
              <StatusChip status={s.status} compact />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 2. INVITE — single subject for the demo
// ============================================================================
function InviteStage({ project, onLaunch, onBack }) {
  return (
    <div className="fade-up" style={{ padding: '24px 32px', maxWidth: 980, margin: '0 auto' }}>
      <h1 style={{ margin: '8px 0 4px', fontSize: 26, fontWeight: 700 }}>Invite Participants</h1>
      <div style={{ fontSize: 13, color: 'var(--muted)' }}>Add the people who'll be assessed in this project</div>

      <div style={{ marginTop: 20, background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '40px 1.4fr 1fr 1fr 1fr 100px',
          gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--rule)',
          background: 'var(--panel-2)', fontSize: 11, color: 'var(--muted)', fontWeight: 600,
          letterSpacing: '.06em', textTransform: 'uppercase',
        }}>
          <div /><div>Participant</div><div>Role</div><div>Manager</div><div>Peers (360°)</div><div>Status</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '40px 1.4fr 1fr 1fr 1fr 100px', gap: 12, padding: '14px 16px', alignItems: 'center' }}>
          <Avatar initials="SB" />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>{ASSESSED_PERSON.name}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{ASSESSED_PERSON.email}</div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink)' }}>{ASSESSED_PERSON.role}</div>
          <div style={{ fontSize: 13, color: 'var(--ink)' }}>{ASSESSED_PERSON.manager}</div>
          <div style={{ fontSize: 13, color: 'var(--ink)' }}>4 selected</div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 500,
            padding: '3px 10px', borderRadius: 999,
            background: '#fff7ec', color: '#a35a00', border: '1px solid #f1c98a', width: 'fit-content',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d89b1f' }}/>
            Pending
          </span>
        </div>
        <div style={{ padding: 14, borderTop: '1px solid var(--rule)' }}>
          <Ds.Button variant="outline">+ Add participant</Ds.Button>
        </div>
      </div>

      <div style={{
        marginTop: 16, padding: '14px 18px', background: 'var(--accent-soft)',
        border: '1px solid #f5d5b5', borderRadius: 'var(--radius)', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 36, height: 36, borderRadius: 8, background: 'var(--accent)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>🤖</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Aria AI agent attached</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Each participant gets a voice interview with Aria, calibrated to the {project.projected.length} skills.</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
        <Ds.Button variant="outline" onClick={onBack}>← Back</Ds.Button>
        <Ds.Button variant="primary" onClick={onLaunch}>Launch assessment →</Ds.Button>
      </div>
    </div>
  );
}

function Avatar({ initials, size = 36 }) {
  return <Ds.Avatar fallback={initials} size={size} />;
}

function Breadcrumb({ crumbs }) {
  return <Ds.Breadcrumb items={(crumbs || []).map((label) => ({ label }))} />;
}

// ============================================================================
// 3. PROGRESS — short animation, then "complete"
// ============================================================================
function AssessmentProgress({ project, onOpenAria, onOpenReport }) {
  const total = 6;
  const [done, setDone] = useState(0);
  const [allDone, setAllDone] = useState(false);
  const [showAriaCard, setShowAriaCard] = useState(true);

  useEffect(() => {
    if (done >= total) { setAllDone(true); return; }
    const id = setTimeout(() => setDone(d => d + 1), 600);
    return () => clearTimeout(id);
  }, [done, total]);

  const submissions = [
    { who: ASSESSED_PERSON.name, role: 'Self',      t: '14:02', avatar: ASSESSED_PERSON.initials },
    { who: 'Marco Riva',      role: 'Manager',   t: '14:48', avatar: 'MR' },
    { who: 'Elena Conti',     role: 'Peer',      t: '15:21', avatar: 'EC' },
    { who: 'David Park',      role: 'Peer',      t: '16:05', avatar: 'DP' },
    { who: 'Anna Tatti',      role: 'Peer',      t: '16:40', avatar: 'AT' },
    { who: 'Luca Bernardi',   role: 'Peer',      t: '17:12', avatar: 'LB' },
  ];

  return (
    <div className="fade-up" style={{ padding: '24px 32px', maxWidth: 1180, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 4 }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            360° Assessment · {ASSESSED_PERSON.name} · {project.projected.length} skills · Aria voice interview attached
          </div>
        </div>
        {allDone && <Ds.Button variant="primary" onClick={onOpenReport}>Open report →</Ds.Button>}
      </div>

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        <KpiCard title="Responses" value={`${done}/${total}`} sub={allDone ? 'All in' : 'Streaming'} tone={allDone ? 'pos' : 'progress'} />
        <KpiCard title="Aria interview" value={allDone ? 'Completed' : 'Scheduled'} sub={allDone ? 'Transcript ready' : 'Tue 19 May'} tone="info" />
        <KpiCard title="Days elapsed" value={allDone ? '6' : '4'} sub="of 14" tone="neutral" />
        <KpiCard title="Confidence" value={allDone ? 'High' : '—'} sub={allDone ? '11/12 skills high-agreement' : 'pending'} tone={allDone ? 'pos' : 'neutral'} />
      </div>

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--rule)', fontSize: 14, fontWeight: 600 }}>
            Submissions
          </div>
          <div>
            {submissions.map((r, i) => {
              const isDone = i < done;
              return (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '36px 1fr auto auto', gap: 14,
                  padding: '12px 18px', borderTop: i === 0 ? 0 : '1px solid var(--rule)',
                  alignItems: 'center', opacity: isDone ? 1 : 0.5,
                  background: i === done && !allDone ? 'var(--accent-soft)' : 'transparent',
                }}>
                  <Avatar initials={r.avatar} size={32} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{r.who}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{r.role}</div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--fam-mono)' }}>
                    {isDone ? `Submitted ${r.t}` : i === done ? 'Submitting…' : 'Pending'}
                  </div>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: isDone ? 'var(--ok)' : 'var(--panel-2)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: isDone ? 'none' : '1px solid var(--rule-strong)', fontSize: 12,
                  }}>{isDone ? '✓' : ''}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          {showAriaCard && (
            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              color: '#e7e6e3', borderRadius: 'var(--radius)', padding: 20,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>🤖</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Aria · Pack AI</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>Voice interview with {ASSESSED_PERSON.name.split(' ')[0]}</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.5, marginTop: 14 }}>
                {allDone
                  ? 'Voice interview completed. Transcript and structured outputs are attached to the report.'
                  : 'Aria conducted a 12-minute voice interview covering coaching, change communication, and AI-fluency scenarios.'}
              </p>
              <button onClick={onOpenAria} style={{
                marginTop: 14, padding: '8px 14px', borderRadius: 8, cursor: 'pointer',
                background: 'rgba(255,255,255,.1)', color: '#fff', border: '1px solid rgba(255,255,255,.2)',
                fontSize: 13, fontWeight: 600,
              }}>{allDone ? 'Listen to recap' : 'Preview Aria interview'} →</button>
            </div>
          )}

          <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Skills covered</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.projected.map(s => (
                <span key={s.id} style={{
                  fontSize: 11, padding: '3px 9px', borderRadius: 999,
                  background: 'var(--panel-2)', color: 'var(--ink)', border: '1px solid var(--rule)',
                }}>{s.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, sub, tone }) {
  const bg = tone === 'pos' ? '#ecfdf5'
           : tone === 'progress' ? 'var(--accent-soft)'
           : tone === 'info' ? '#eff6ff'
           : 'var(--panel)';
  const border = tone === 'pos' ? '#a7e3c4'
               : tone === 'progress' ? '#f5c89e'
               : tone === 'info' ? '#bedbfb'
               : 'var(--rule)';
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 'var(--radius)', padding: 16 }}>
      <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', marginTop: 4 }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{sub}</div>
    </div>
  );
}

// ============================================================================
// 4. ARIA INTERVIEW — full-screen video experience (placeholder)
// ============================================================================
// The user will replace the <video> src with their actual recording.
// Demo behaviour: play "intro" portion, then offer "Skip to report" CTA.
function AriaInterviewModal({ onClose, onComplete }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [t, setT] = useState(0);
  const [duration, setDuration] = useState(28); // updated from the real video when it loads
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show "Skip to report" CTA after 6s regardless of video state.
    const id = setTimeout(() => setShowSkip(true), 6000);
    return () => clearTimeout(id);
  }, []);

  // Try to play any real <video> if a src is provided
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    if (playing) v.play?.().catch(() => {});
    else v.pause?.();
  }, [playing]);

  const pct = Math.min(100, (t / duration) * 100);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000', zIndex: 1000,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar — Pack branding + close */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px',
        background: 'linear-gradient(180deg, rgba(0,0,0,.9), rgba(0,0,0,0))',
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#fff' }}>
          <img src={(window.__resources && window.__resources.packLogo) || "assets/pack-black.svg"} alt="Pack" style={{ height: 20, opacity: .85, filter: 'brightness(0) invert(1)' }} />
          <span style={{ fontSize: 12, opacity: .6, letterSpacing: '.08em', textTransform: 'uppercase' }}>Pack AI · Aria</span>
        </div>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)',
          color: '#fff', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12,
          backdropFilter: 'blur(8px)',
        }}>Close</button>
      </div>

      {/* Video stage */}
      <div style={{
        flex: 1, position: 'relative', background: '#0a0a0a',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        {/* Real Aria video — file lives next to the standalone .html as `AriaDemo.mov`.
            The animated avatar below acts as a fallback if the file is missing. */}
        <video
          ref={videoRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 2 }}
          playsInline
          src="AriaDemo.mov"
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            setT(v.currentTime);
            if (v.currentTime >= 6 && !showSkip) setShowSkip(true);
            if (v.ended) setPlaying(false);
          }}
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            if (v.duration && isFinite(v.duration)) setDuration(v.duration);
          }}
        />

        <AriaAvatarStage playing={playing} t={t} />
      </div>

      {/* Bottom controls */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
        padding: '20px 32px 28px',
        background: 'linear-gradient(0deg, rgba(0,0,0,.85), rgba(0,0,0,0))',
        display: 'flex', alignItems: 'center', gap: 18,
      }}>
        <button onClick={() => setPlaying(p => !p)} style={{
          width: 48, height: 48, borderRadius: '50%', background: '#fff', color: '#000',
          border: 0, cursor: 'pointer', fontSize: 18, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>{playing ? '⏸' : '▶'}</button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <Tag tone="info">Coaching</Tag>
              <Tag tone="info">Change comms</Tag>
              <Tag tone="info">AI fluency</Tag>
            </div>
            <div style={{ color: 'rgba(255,255,255,.6)', fontFamily: 'var(--fam-mono)', fontSize: 12 }}>
              {fmtTime(t)} / {fmtTime(duration)} · intro
            </div>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,.15)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: 2, transition: 'width .3s' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{
            padding: '12px 18px', borderRadius: 10, cursor: 'pointer',
            background: 'rgba(255,255,255,.1)', color: '#fff',
            border: '1px solid rgba(255,255,255,.2)',
            fontSize: 14, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            Skip video
          </button>
          <button onClick={onComplete} style={{
            padding: '12px 20px', borderRadius: 10, cursor: 'pointer',
            background: 'var(--accent)', color: '#fff', border: 0,
            fontSize: 14, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            Skip to report
            <span style={{ fontSize: 16 }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function AriaAvatarStage({ playing, t }) {
  // Animated radial visual that stands in for the recorded video.
  // Replace this whole component or hide it (display:none) when a real <video> src is in.
  const intensity = playing ? 1 : 0.4;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(circle at 50% 40%, #2a1d12 0%, #0a0a0a 75%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Concentric pulse rings */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute',
          width: 260 + i * 90 + Math.sin((t + i) * 2) * 12 * intensity,
          height: 260 + i * 90 + Math.sin((t + i) * 2) * 12 * intensity,
          borderRadius: '50%',
          border: '1px solid rgba(255,139,69,.25)',
          opacity: 1 - i * 0.3,
          transition: 'width .25s, height .25s',
        }} />
      ))}
      <div style={{
        width: 200, height: 200, borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent) 0%, #ff5a1f 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 96, boxShadow: '0 24px 60px rgba(255,90,30,.3)',
      }}>🤖</div>
      <div style={{
        position: 'absolute', top: '70%', textAlign: 'center', color: '#fff',
      }}>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-.01em' }}>Aria</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', marginTop: 4 }}>
          Voice interview · live transcript on
        </div>
      </div>
    </div>
  );
}

function Tag({ children, tone }) {
  return (
    <span style={{
      fontSize: 10, padding: '3px 8px', borderRadius: 4, letterSpacing: '.04em',
      background: tone === 'info' ? 'rgba(94,179,232,.15)' : 'rgba(148,163,184,.15)',
      color: tone === 'info' ? 'var(--accent)' : '#cbd5e1',
    }}>{children}</span>
  );
}

function fmtTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2,'0')}`;
}

// ============================================================================
// 5. INDIVIDUAL REPORT — Tania-style, 1-5 levels, self/manager/peer
// ============================================================================
function IndividualReport({ project, role, onGap, onDevelopment, onMentors, onBack }) {
  const projected = useMemo(() => projectSkills(role.skills, 3), [role]);
  const assessed = useMemo(() => getAssessedSkills(projected), [projected]);
  const sortedByGap = useMemo(() => [...assessed].sort((a,b) => b.priority - a.priority), [assessed]);
  const avgLevel = useMemo(() => assessed.reduce((s,x) => s + x.result.agg, 0) / assessed.length, [assessed]);
  const criticalGaps = useMemo(() => sortedByGap.filter(s => s.gap > 0.4 && s.relevance !== 'low').slice(0, 4), [sortedByGap]);
  const strengths = useMemo(() => [...assessed].sort((a,b) => b.result.agg - a.result.agg).slice(0, 3), [assessed]);
  const onTarget = useMemo(() => assessed.filter(s => s.gap <= 0).length, [assessed]);

  return (
    <div className="fade-up" style={{ padding: '24px 32px 60px', maxWidth: 1280, margin: '0 auto' }}>

      {/* OVERVIEW SECTION */}
      <section id="section-overview" style={{ marginBottom: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 16, marginBottom: 16 }}>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <Avatar initials={ASSESSED_PERSON.initials} size={56} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{ASSESSED_PERSON.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{ASSESSED_PERSON.email}</div>
              </div>
            </div>
            <KvRow k="Role" v={ASSESSED_PERSON.role} />
            <KvRow k="Manager" v={ASSESSED_PERSON.manager} />
            <KvRow k="Tenure" v={ASSESSED_PERSON.tenure} />
            <KvRow k="Location" v={ASSESSED_PERSON.location} />
            <KvRow k="Raters" v="1 self · 1 manager · 4 peers" />
            <KvRow k="Aria interview" v="Completed · 11:52" />
          </div>

          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 12 }}>
              <KpiCard title="Average level" value={avgLevel.toFixed(2)} sub="of 5 · across all skills" tone="info" />
              <KpiCard title="On / above target" value={`${onTarget}/${assessed.length}`} sub="Skills at or above target" tone="pos" />
              <KpiCard title="Critical gaps" value={String(criticalGaps.length)} sub="High-relevance, below target" tone="progress" />
              <KpiCard title="Est. close time" value="6–9 mo" sub="With recommended plan" tone="neutral" />
            </div>
            <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: 18 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Headline</div>
              <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.6, margin: 0 }}>
                {ASSESSED_PERSON.name.split(' ')[0]} is <strong>solid in employee-relations and compliance work</strong> — both above target — and clearly identifies as a coach. Her growth edge is the <strong>future-facing {ASSESSED_PERSON.role} toolkit</strong>: workforce planning, AI fluency, and people-data storytelling, where she sits 1.0–2.0 levels below where the role is heading.
              </p>
            </div>
          </div>
        </div>

        {/* Strengths & critical gaps strip */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 16 }}>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>Strengths to leverage</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {strengths.map(s => (
                <div key={s.id} style={{
                  padding: '10px 12px', borderRadius: 8,
                  background: '#ecfdf5', border: '1px solid #a7e3c4',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                      Level {s.result.agg.toFixed(2)} · target {s.target}
                    </div>
                  </div>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#0a6b3d', fontVariantNumeric: 'tabular-nums' }}>
                    {s.result.agg >= s.target ? `+${(s.result.agg - s.target).toFixed(1)}` : s.result.agg.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Aria interview · summary</div>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>Recorded 14 May · 12 min</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--ink)', fontSize: 13, lineHeight: 1.65 }}>
              <li>Self-rates higher than peers on <strong>coaching</strong> — calibrate via observed sessions.</li>
              <li>Strong instinct for <strong>workforce conversations</strong>, but limited tooling experience.</li>
              <li>Framed AI-fluency as <strong>"willing to learn"</strong> — no current production use.</li>
              <li>Confident, structured under pressure; emotion-led on ER topics.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION — same table as before */}
      <section id="section-skills" style={{ marginBottom: 28 }}>
        <SectionHeader title="Skill levels" sub="1–5 Pack scale · self / manager / peer · weighted aggregate" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8, marginBottom: 14 }}>
          {LEVELS.map(l => (
            <div key={l.n} style={{ padding: 12, border: '1px solid var(--rule)', borderRadius: 8, background: 'var(--panel)' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500 }}>Level {l.n}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginTop: 2 }}>{l.label}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, lineHeight: 1.4 }}>{l.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1.8fr 1fr 240px 110px 90px',
            gap: 12, padding: '14px 18px', background: 'var(--panel-2)',
            borderBottom: '1px solid var(--rule)', fontSize: 11, fontWeight: 600,
            color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase',
          }}>
            <div>Skill</div>
            <div>Sources</div>
            <div>Aggregate (1–5)</div>
            <div style={{ textAlign: 'right' }}>Agg.</div>
            <div style={{ textAlign: 'right' }}>Confidence</div>
          </div>
          {[...assessed].sort((a,b) => a.result.agg - b.result.agg).map((s, i) => (
            <div key={s.id} style={{
              display: 'grid', gridTemplateColumns: '1.8fr 1fr 240px 110px 90px',
              gap: 12, padding: '14px 18px', alignItems: 'center',
              borderTop: i === 0 ? 0 : '1px solid var(--rule)',
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{s.name}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Target: Level {s.target} · {LEVELS[s.target-1].label}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink)' }}>
                <div>Self <span style={{ color: 'var(--muted)' }}>{s.result.self.toFixed(2)}</span></div>
                <div>Mgr <span style={{ color: 'var(--muted)' }}>{s.result.manager.toFixed(2)}</span> · Peer <span style={{ color: 'var(--muted)' }}>{s.result.peer.toFixed(2)}</span></div>
              </div>
              <LevelBarRow agg={s.result.agg} target={s.target} />
              <div style={{ textAlign: 'right', fontFamily: 'var(--fam-mono)', fontVariantNumeric: 'tabular-nums', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>
                {s.result.agg.toFixed(2)}
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{
                  fontSize: 11, padding: '2px 7px', borderRadius: 4,
                  background: s.result.confidence === 'high' ? '#ecfdf5' : '#fff7ec',
                  color: s.result.confidence === 'high' ? '#0a6b3d' : '#8a5a00',
                  border: `1px solid ${s.result.confidence === 'high' ? '#a7e3c4' : '#f1c98a'}`,
                  fontWeight: 500,
                }}>{s.result.confidence}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GAP SECTION — embedded teaser */}
      <section id="section-gap" style={{ marginBottom: 28 }}>
        <SectionHeader
          title="Gap analysis"
          sub="Mapping target vs current level · sorted by priority"
          actionLabel="Open full gap analysis →"
          onAction={onGap}
        />
        <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: 22 }}>
          <div style={{ display: 'grid', gap: 14 }}>
            {criticalGaps.slice(0, 3).map((s, i) => (
              <ReportGapRow key={s.id} skill={s} rank={i+1} />
            ))}
          </div>
        </div>
      </section>

      {/* PLAN SECTION — embedded teaser */}
      <section id="section-plan">
        <SectionHeader
          title="Development plan"
          sub="Top priorities with mentor + content + AI practice"
          actionLabel="Open full plan →"
          onAction={onDevelopment}
        />
        <div style={{ display: 'grid', gap: 14 }}>
          {criticalGaps.slice(0, 3).map(s => (
            <PlanTeaserRow key={s.id} skill={s} onMentors={onMentors} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, sub, actionLabel, onAction }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>{title}</div>
        {sub && <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{sub}</div>}
      </div>
      {actionLabel && (
        <Ds.Button variant="ghost" size="sm" onClick={onAction}>{actionLabel}</Ds.Button>
      )}
    </div>
  );
}

function ReportGapRow({ skill, rank }) {
  const tone = skill.gap > 1 ? 'var(--bad)' : '#d89b1f';
  const pct = ((skill.result.agg - 1) / 4) * 100;
  const tpct = ((skill.target - 1) / 4) * 100;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 280px 80px', gap: 16, alignItems: 'center' }}>
      <div style={{
        width: 26, height: 26, borderRadius: '50%', background: tone, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12,
      }}>{rank}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{skill.name}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
          Now Level {skill.result.agg.toFixed(2)} · Target Level {skill.target}
        </div>
      </div>
      <div style={{ position: 'relative', height: 22 }}>
        <div style={{ position: 'absolute', top: 10, left: 0, right: 0, height: 2, background: 'var(--rule)' }} />
        <div style={{ position: 'absolute', top: 8, left: `${Math.min(pct, tpct)}%`, width: `${Math.abs(pct - tpct)}%`, height: 6, background: tone, opacity: .25, borderRadius: 3 }} />
        <div style={{ position: 'absolute', top: 4, left: `calc(${tpct}% - 7px)`, width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--ink)', background: 'var(--panel)' }} />
        <div style={{ position: 'absolute', top: 5, left: `calc(${pct}% - 6px)`, width: 12, height: 12, borderRadius: '50%', background: tone, border: '2px solid var(--panel)', boxShadow: '0 0 0 1px var(--ink)' }} />
      </div>
      <div style={{ textAlign: 'right', fontFamily: 'var(--fam-mono)', fontVariantNumeric: 'tabular-nums', fontWeight: 700, color: tone, fontSize: 16 }}>
        −{skill.gap.toFixed(2)}
      </div>
    </div>
  );
}

function PlanTeaserRow({ skill, onMentors }) {
  const ms = Object.values(MENTORS).filter(m => m.focus.includes(skill.id)).slice(0, 1);
  const content = (CONTENT_LIBRARY[skill.id] || []).slice(0, 1);
  const ai = AI_PRACTICE[skill.id];
  return (
    <div style={{
      background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)',
      padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, alignItems: 'center',
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{skill.name}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
          Gap <strong style={{ color: 'var(--ink)' }}>{skill.gap.toFixed(2)}</strong> · Close in ~{skill.gap > 1.2 ? '6 mo' : '3–4 mo'}
        </div>
      </div>
      {ms[0] ? (
        <button onClick={onMentors} style={{
          display: 'flex', gap: 10, alignItems: 'center', padding: '8px 10px',
          background: 'var(--panel-2)', border: '1px solid var(--rule)', borderRadius: 8, cursor: 'pointer', textAlign: 'left',
        }}>
          <Avatar initials={ms[0].initials} size={32} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Mentor</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {ms[0].name}
            </div>
          </div>
        </button>
      ) : <Empty>No mentor matched</Empty>}
      {content[0] && (
        <div style={{ padding: '8px 10px', background: 'var(--panel-2)', border: '1px solid var(--rule)', borderRadius: 8 }}>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>L&D content</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{content[0].title}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>{content[0].kind} · {content[0].duration}</div>
        </div>
      )}
      {ai && (
        <div style={{
          padding: '8px 10px', borderRadius: 8, color: '#e7e6e3',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        }}>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Pack AI practice</div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{ai.avatar}</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>{ai.duration}</div>
        </div>
      )}
    </div>
  );
}

function Empty({ children }) {
  return <div style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>{children}</div>;
}

function LevelBarRow({ agg, target }) {
  // 1..5 scale → 0..100%
  const pct = ((agg - 1) / 4) * 100;
  const tpct = ((target - 1) / 4) * 100;
  const tone = agg >= target ? 'var(--ok)' : agg >= target - 0.6 ? '#d89b1f' : 'var(--bad)';
  return (
    <div style={{ position: 'relative', height: 12 }}>
      <div style={{ position: 'absolute', top: 4, left: 0, right: 0, height: 4, background: 'var(--panel-2)', borderRadius: 2, border: '1px solid var(--rule)' }} />
      <div style={{ position: 'absolute', top: 4, left: 0, height: 4, width: `${pct}%`, background: tone, borderRadius: 2 }} />
      <div title={`Target Level ${target}`} style={{
        position: 'absolute', top: -2, left: `calc(${tpct}% - 1px)`, width: 2, height: 16,
        background: 'var(--ink)',
      }} />
    </div>
  );
}

function KvRow({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px dashed var(--rule)', fontSize: 12 }}>
      <span style={{ color: 'var(--muted)' }}>{k}</span>
      <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{v}</span>
    </div>
  );
}

// ============================================================================
// shared styles
// ============================================================================
const packInput = {
  width: '100%', padding: '9px 12px',
  border: '1px solid var(--rule-strong)', borderRadius: 6,
  background: 'var(--panel)', color: 'var(--ink)',
  fontFamily: 'var(--fam-body)', fontSize: 14,
};
const packBtnPrimary = {
  background: 'var(--accent)', color: '#fff', border: 0,
  padding: '9px 18px', borderRadius: 8, fontSize: 14, fontWeight: 600,
  cursor: 'pointer', fontFamily: 'var(--fam-body)',
};
const packBtnSecondary = {
  background: 'var(--panel)', color: 'var(--ink)', border: '1px solid var(--rule-strong)',
  padding: '9px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
  cursor: 'pointer', fontFamily: 'var(--fam-body)',
};

Object.assign(window, {
  AssessmentShell, CreateAssessmentProject, InviteStage,
  AssessmentProgress, AriaInterviewModal, IndividualReport, A_STAGES,
  Avatar, Breadcrumb, KpiCard, packBtnPrimary, packBtnSecondary,
});


/* ===== gap.jsx ===== */
// Gap Analysis — mapping target vs assessment outcome on 1–5 axis

function GapAnalysisStage({ role, onDevelopment, onBack }) {
  const projected = useMemo(() => projectSkills(role.skills, 3), [role]);
  const assessed = useMemo(() => getAssessedSkills(projected), [projected]);

  const sorted = useMemo(() => [...assessed].sort((a,b) => b.priority - a.priority), [assessed]);
  const criticalGaps = sorted.filter(s => s.gap > 0.5 && s.relevance !== 'low').slice(0, 5);
  const strengths = useMemo(() => [...assessed].sort((a,b) => a.gap - b.gap).slice(0, 3), [assessed]);

  const summary = useMemo(() => {
    const totalGap = assessed.filter(s => s.gap > 0).reduce((s,x) => s + x.gap, 0);
    const onOrAbove = assessed.filter(s => s.gap <= 0).length;
    return {
      avgGap: (totalGap / assessed.length).toFixed(2),
      onTrack: onOrAbove,
      total: assessed.length,
      criticalCount: criticalGaps.length,
    };
  }, [assessed, criticalGaps]);

  return (
    <div className="fade-up" style={{ padding: '24px 32px 60px', maxWidth: 1180, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500, letterSpacing: '.04em' }}>GAP ANALYSIS</div>
          <h1 style={{ margin: '4px 0 6px', fontSize: 30, fontWeight: 700, color: 'var(--ink)' }}>
            Where {ASSESSED_PERSON.name.split(' ')[0]} stands vs the {ASSESSED_PERSON.role} target
          </h1>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            Targets come from the Skill Mapping output · Outcomes from the May 2026 assessment · 3-year horizon
          </div>
        </div>
      </div>

      {/* Summary KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
        <KpiCard title="Critical gaps" value={String(summary.criticalCount)} sub="High-relevance skills below target" tone="progress" />
        <KpiCard title="On / above target" value={`${summary.onTrack}/${summary.total}`} sub="Skills at or above mapping target" tone="pos" />
        <KpiCard title="Avg gap" value={summary.avgGap} sub="Levels below target (avg)" tone="neutral" />
        <KpiCard title="Est. close time" value="6–9 mo" sub="With recommended plan" tone="info" />
      </div>

      {/* Spider: current vs target vs 3-year target */}
      <GapRadarCard assessed={assessed} />

      {/* Master chart: every skill on the 1-5 axis */}
      <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: 22, marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>Skill map vs current level</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
              Each row plots <strong>target</strong> (from mapping) and <strong>current</strong> (from assessment) on the 1–5 scale. Sorted by gap priority.
            </div>
          </div>
          <GapMarkerLegend />
        </div>
        <GapAxisHeader />
        <div style={{ display: 'grid', gap: 0 }}>
          {sorted.map((s, i) => (
            <GapRow key={s.id} skill={s} index={i} />
          ))}
        </div>
      </div>

      {/* Critical gaps detail + strengths */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: 22 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>Critical gaps to close first</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>Priority = gap size × relevance × urgency × trend</div>
          <div style={{ display: 'grid', gap: 12 }}>
            {criticalGaps.map((s, i) => (
              <CriticalGapCard key={s.id} skill={s} rank={i+1} />
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>Strengths to leverage</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {strengths.map(s => (
                <div key={s.id} style={{
                  padding: '10px 12px', borderRadius: 8,
                  background: '#ecfdf5', border: '1px solid #a7e3c4',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                    Level {s.result.agg.toFixed(2)} · {s.gap < 0 ? `+${(-s.gap).toFixed(1)} above target` : 'at target'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>Considerations from Aria interview</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--ink)', fontSize: 13, lineHeight: 1.6 }}>
              <li>{ASSESSED_PERSON.name.split(' ')[0]} <strong>self-rates higher</strong> than peers on coaching — calibrate via observed sessions.</li>
              <li>Voice interview surfaced <strong>strong instinct for workforce conversations</strong>, but limited tooling experience.</li>
              <li>AI-fluency framed as <strong>"willing to learn"</strong>; no current production use.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function GapRadarCard({ assessed }) {
  // Pick the 8 most assessed-relevant skills for the spider — prioritise high-relevance ones
  // so the chart is dense and meaningful.
  const top = [...assessed]
    .sort((a,b) => {
      const w = (r) => r === 'high' ? 2 : r === 'med' ? 1 : 0;
      return (w(b.relevance) + Math.abs(b.gap) * 0.4) - (w(a.relevance) + Math.abs(a.gap) * 0.4);
    })
    .slice(0, 8);

  // Normalize 1–5 levels to 0–100
  const lvl = (n) => Math.max(0, Math.min(100, ((n - 1) / 4) * 100));

  const nowVals    = Object.fromEntries(top.map(s => [s.id, lvl(s.result.agg)]));
  const targetVals = Object.fromEntries(top.map(s => [s.id, lvl(s.target)]));
  // "+3y target" — bumps high-trajectory growing skills by 1 level
  const futureVals = Object.fromEntries(top.map(s => {
    const bump = s.trajectory > 0.4 ? 1 : s.trajectory > 0.15 ? 0.5 : 0;
    return [s.id, lvl(Math.min(5, s.target + bump))];
  }));

  return (
    <div style={{
      background: 'var(--panel)', border: '1px solid var(--rule)',
      borderRadius: 'var(--radius)', padding: 24, marginBottom: 22,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{ASSESSED_PERSON.name.split(' ')[0]} now vs target — full skill profile</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
            Levels 1–5 across the {top.length} most important {ASSESSED_PERSON.role} skills. Dashed line shows where the role is heading in 3 years.
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '460px 1fr', gap: 28, alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <RadarChart
            axes={top.map(s => ({
              key: s.id,
              label: shortenSkillGap(s.name),
              sub: `L${s.target}${s.trajectory > 0.15 ? ' ↗' : s.trajectory < -0.15 ? ' ↘' : ''}`,
            }))}
            series={[
              { name: ASSESSED_PERSON.name.split(' ')[0] + ' now',  color: '#9c2b2b',         values: nowVals,    fillOpacity: 0.18, strokeWidth: 2 },
              { name: 'Target',    color: 'var(--ink)',       values: targetVals, fillOpacity: 0.06, strokeWidth: 1.5 },
              { name: 'In +3y',    color: 'var(--accent)',    values: futureVals, fillOpacity: 0,    strokeWidth: 1.5, dashed: true },
            ]}
            size={460}
          />
        </div>
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 18 }}>
            <GapLegend swatch="#9c2b2b" label={ASSESSED_PERSON.name.split(' ')[0] + " — now"} />
            <GapLegend swatch="var(--ink)" label="Today's target (from mapping)" />
            <GapLegend swatch="var(--accent)" dashed label="+3y target (with role shift)" />
          </div>
          <p style={{ margin: 0, color: 'var(--ink)', fontSize: 14, lineHeight: 1.6 }}>
            The role's <strong>target shape pushes outward</strong> over the next 3 years on workforce planning, data
            storytelling, and AI fluency — the same axes where {ASSESSED_PERSON.name.split(' ')[0]} is furthest behind today. Closing the gap to
            today's target alone is not enough; the plan should aim at the dashed line.
          </p>
          <div style={{ marginTop: 18, padding: 14, background: 'var(--panel-2)', border: '1px solid var(--rule)', borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>Reading the chart</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: 'var(--ink)', lineHeight: 1.6 }}>
              <li><strong>Filled red</strong> — where {ASSESSED_PERSON.name.split(' ')[0]} is today</li>
              <li><strong>Solid grey</strong> — what the role needs today</li>
              <li><strong>Dashed orange</strong> — what the role will need in 3 years</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function shortenSkillGap(name) {
  return name
    .replace('Strategic Workforce Planning', 'Workforce')
    .replace('People Data Storytelling', 'Data Story')
    .replace('AI Fluency for People Decisions', 'AI Fluency')
    .replace('Performance Management System Admin', 'Perf Admin')
    .replace('Benefits & Payroll Query Handling', 'Benefits')
    .replace('Employment Law & Regulatory Compliance', 'Compliance')
    .replace('Inclusion & Belonging Program Design', 'Inclusion')
    .replace('Sourcing & Interview Screening', 'Sourcing')
    .replace('Organization Design', 'Org Design')
    .replace('Employee Relations & Advisory', 'ER & Advisory')
    .replace('Coaching & Developmental Conversations', 'Coaching')
    .replace('Change Communication', 'Change Comms');
}

function GapLegend({ swatch, label, dashed }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink)' }}>
      <span style={{
        width: 18, height: 3,
        background: dashed ? `repeating-linear-gradient(90deg, ${swatch} 0 5px, transparent 5px 9px)` : swatch,
      }} />
      <strong style={{ fontWeight: 600 }}>{label}</strong>
    </span>
  );
}

function GapAxisHeader() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '320px 1fr 90px', gap: 16,
      padding: '8px 0 6px', borderBottom: '1px dashed var(--rule)', marginBottom: 8,
      fontSize: 11, color: 'var(--muted)', fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase',
    }}>
      <div>Skill</div>
      <div style={{ position: 'relative' }}>
        {[1,2,3,4,5].map(n => (
          <div key={n} style={{
            position: 'absolute', left: `${((n-1)/4) * 100}%`, transform: 'translateX(-50%)',
            fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--fam-mono)',
          }}>{n}</div>
        ))}
        <div style={{ height: 12 }} />
      </div>
      <div style={{ textAlign: 'right' }}>Gap</div>
    </div>
  );
}

function GapRow({ skill }) {
  const { result, target, gap } = skill;
  const currentPct = ((result.agg - 1) / 4) * 100;
  const targetPct  = ((target - 1) / 4) * 100;
  const above = gap < 0;
  const onTarget = Math.abs(gap) < 0.15;
  const tone = above ? 'var(--ok)' : onTarget ? '#3b82f6' : gap > 1 ? 'var(--bad)' : '#d89b1f';
  const fillFrom = Math.min(currentPct, targetPct);
  const fillTo   = Math.max(currentPct, targetPct);

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '320px 1fr 90px', gap: 16,
      padding: '14px 0', borderTop: '1px solid var(--rule)', alignItems: 'center',
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{skill.name}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
          <StatusChip status={skill.status} compact />
          <span>·</span>
          <span>{skill.relevance === 'high' ? 'Critical' : skill.relevance === 'med' ? 'Important' : 'Supporting'}</span>
        </div>
      </div>
      <div style={{ position: 'relative', height: 28 }}>
        {/* Ticks */}
        {[1,2,3,4,5].map(n => (
          <div key={n} style={{
            position: 'absolute', left: `${((n-1)/4) * 100}%`, top: 6, width: 1, height: 16,
            background: n === 1 || n === 5 ? 'var(--rule-strong)' : 'var(--rule)',
          }} />
        ))}
        <div style={{ position: 'absolute', top: 13, left: 0, right: 0, height: 2, background: 'var(--rule)' }} />
        {/* Connector band */}
        <div style={{
          position: 'absolute', top: 11, left: `${fillFrom}%`, width: `${fillTo - fillFrom}%`, height: 6,
          background: tone, opacity: .25, borderRadius: 3,
        }} />
        {/* Target marker (outline circle) */}
        <div style={{
          position: 'absolute', top: 6, left: `calc(${targetPct}% - 8px)`,
          width: 16, height: 16, borderRadius: '50%', border: '2px solid var(--ink)', background: 'var(--panel)',
        }} />
        {/* Current marker (filled) */}
        <div style={{
          position: 'absolute', top: 7, left: `calc(${currentPct}% - 7px)`,
          width: 14, height: 14, borderRadius: '50%', background: tone, border: '2px solid var(--panel)', boxShadow: '0 0 0 1px var(--ink)',
        }} />
      </div>
      <div style={{ textAlign: 'right', fontFamily: 'var(--fam-mono)', fontVariantNumeric: 'tabular-nums', fontWeight: 600, color: tone, fontSize: 14 }}>
        {above ? '+' : ''}{(-gap).toFixed(2)}
      </div>
    </div>
  );
}

function GapMarkerLegend() {
  return (
    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--muted)', alignItems: 'center' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--ink)' }} />
        Target
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--ok)' }} />
        On / above
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#d89b1f' }} />
        Close gap
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--bad)' }} />
        Major gap
      </span>
    </div>
  );
}

function CriticalGapCard({ skill, rank }) {
  const tone = skill.gap > 1 ? '#9c2b2b' : '#d89b1f';
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '32px 1fr auto', gap: 14,
      padding: '14px 16px', border: '1px solid var(--rule)', borderRadius: 10,
      background: skill.gap > 1 ? '#fef2f2' : '#fffaf0',
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: tone, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 13,
      }}>{rank}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{skill.name}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
          Now <strong style={{ color: 'var(--ink)' }}>Level {skill.result.agg.toFixed(1)}</strong> · Target <strong style={{ color: 'var(--ink)' }}>Level {skill.target}</strong> · Gap <strong style={{ color: tone }}>{skill.gap.toFixed(2)}</strong>
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink)', marginTop: 8, lineHeight: 1.55 }}>
          {gapNarrative(skill)}
        </div>
      </div>
      <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--muted)' }}>
        Priority<br/>
        <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{skill.priority.toFixed(2)}</span>
      </div>
    </div>
  );
}

function gapNarrative(s) {
  // Skill-aware blurb so it doesn't read like Lorem Ipsum
  const map = {
    aifluency: 'No production use yet. Aria interview noted curiosity but no scaffolding. Pair with a mentor and a structured course; AI-practice scenarios will accelerate fluency.',
    workforce: 'Foundational understanding, limited scenario modelling. Pair with an experienced People Strategy coach and a workforce planning workshop.',
    datastorytelling: 'Comfortable with raw data, less so with leadership narrative. Coach-led boardroom storytelling lab + AI practice with Nova.',
    orgdesign: 'Has handled small reshapes; not yet led a de-layering. Pair with mentor + playbook; consider shadowing on an upcoming restructure.',
    coaching: 'Strong day-to-day, peer agreement lower than self-perception. Calibrate via observed sessions; reinforce with role-play in Ludo.',
  };
  return map[s.id] || 'Below target in a high-relevance skill — schedule mentor pairing and content first; revisit in 90 days.';
}

Object.assign(window, { GapAnalysisStage });


/* ===== development.jsx ===== */
// Skill Development Plan — mentor + content library + AI practice per priority gap

function DevelopmentPlanStage({ role, onBack, onStartPractice, onPickMentor, onCoacheeView }) {
  const projected = useMemo(() => projectSkills(role.skills, 3), [role]);
  const assessed = useMemo(() => getAssessedSkills(projected), [projected]);
  const priorityGaps = useMemo(
    () => [...assessed].filter(s => s.gap > 0.4 && s.relevance !== 'low').sort((a,b) => b.priority - a.priority).slice(0, 4),
    [assessed]
  );

  const totalContent = priorityGaps.reduce((sum, g) => sum + (CONTENT_LIBRARY[g.id]?.length ?? 0), 0);
  const totalMentors = new Set(priorityGaps.flatMap(g => mentorsFor(g.id).map(m => m.id))).size;

  return (
    <div className="fade-up" style={{ padding: '24px 32px 60px', maxWidth: 1180, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500, letterSpacing: '.04em' }}>DEVELOPMENT PLAN</div>
          <h1 style={{ margin: '4px 0 6px', fontSize: 30, fontWeight: 700, color: 'var(--ink)' }}>
            {ASSESSED_PERSON.name.split(' ')[0]}'s 6-month plan
          </h1>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            Generated from {priorityGaps.length} priority gaps · {totalMentors} mentors · {totalContent} learning resources · Pack AI practice
          </div>
        </div>
      </div>

      {/* Overall timeline */}
      <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: 22, marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>6-month learning track</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
              Sequenced by priority. Mentor sessions anchor each block; content + AI practice fill the weeks in between.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--muted)' }}>
            <LegendDot color="var(--accent)" label="Mentor 1:1" />
            <LegendDot color="var(--accent)" label="Content" />
            <LegendDot color="#6a3ab0" label="AI practice" />
            <LegendDot color="var(--ok)" label="Checkpoint" />
          </div>
        </div>
        <TimelineRail gaps={priorityGaps} />
      </div>

      {/* Per-gap detailed plan */}
      <div style={{ display: 'grid', gap: 16 }}>
        {priorityGaps.map((g, i) => (
          <GapPlanCard key={g.id} skill={g} rank={i+1} onStartPractice={onStartPractice} onPickMentor={onPickMentor} />
        ))}
      </div>

      {/* CTA strip */}
      <div style={{
        marginTop: 24, padding: '20px 24px',
        background: 'linear-gradient(135deg, #fff4eb 0%, #fff 100%)',
        border: '1px solid var(--rule)', borderRadius: 'var(--radius)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>Ready to launch this plan?</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
            We'll send {ASSESSED_PERSON.name.split(' ')[0]} her plan, book the first mentor session, and enrol her in the recommended content.
            Her manager gets a copy and a checkpoint reminder at 90 days.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Ds.Button variant="outline">Schedule kickoff</Ds.Button>
          <Ds.Button variant="primary">Activate plan →</Ds.Button>
        </div>
      </div>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
      {label}
    </span>
  );
}

function TimelineRail({ gaps }) {
  const months = ['Jun','Jul','Aug','Sep','Oct','Nov'];
  // Place activities along a 24-week strip
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: `120px repeat(${months.length}, 1fr)`, fontSize: 11, color: 'var(--muted)', fontWeight: 500, marginBottom: 8 }}>
        <div />
        {months.map(m => <div key={m} style={{ paddingLeft: 6, borderLeft: '1px dashed var(--rule)' }}>{m}</div>)}
      </div>
      {gaps.map((g, i) => (
        <div key={g.id} style={{ display: 'grid', gridTemplateColumns: `120px repeat(${months.length}, 1fr)`, gap: 0, alignItems: 'center', padding: '8px 0', borderTop: i === 0 ? 0 : '1px solid var(--rule)' }}>
          <div style={{ fontSize: 12, color: 'var(--ink)', fontWeight: 500, paddingRight: 8 }}>{g.name}</div>
          <div style={{ gridColumn: `2 / span ${months.length}`, position: 'relative', height: 28 }}>
            {/* Background rail */}
            <div style={{ position: 'absolute', top: 13, left: 0, right: 0, height: 2, background: 'var(--panel-2)' }} />
            {/* Pills along the rail */}
            {trackPlan(g.id).map((b, idx) => (
              <div key={idx} title={b.label} style={{
                position: 'absolute', top: 6, left: `${b.start}%`, width: `${b.width}%`, height: 16,
                background: b.color, borderRadius: 999,
                display: 'flex', alignItems: 'center', paddingLeft: 10, fontSize: 10, color: '#fff',
                fontWeight: 500, overflow: 'hidden', whiteSpace: 'nowrap',
              }}>{b.short}</div>
            ))}
            {/* Checkpoint */}
            <div style={{
              position: 'absolute', top: 4, left: 'calc(50% - 7px)',
              width: 14, height: 20, background: 'var(--ok)',
              clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)',
            }} title="90-day checkpoint" />
          </div>
        </div>
      ))}
    </div>
  );
}

function trackPlan(id) {
  // hand-tuned, demo-readable schedules
  const plans = {
    workforce: [
      { start: 2, width: 14, color: 'var(--accent)', short: 'Kickoff 1:1', label: 'Mentor: Elena Rossi' },
      { start: 18, width: 20, color: 'var(--accent)', short: 'WFP Foundations course', label: 'Pack L&D' },
      { start: 42, width: 12, color: 'var(--accent)', short: '1:1', label: 'Mentor session' },
      { start: 58, width: 14, color: '#6a3ab0', short: 'Ludo · CFO sim', label: 'AI practice' },
      { start: 78, width: 16, color: 'var(--accent)', short: 'Scenario lab', label: 'Workshop' },
    ],
    datastorytelling: [
      { start: 10, width: 22, color: 'var(--accent)', short: 'People Analytics course', label: 'Pack L&D' },
      { start: 34, width: 12, color: 'var(--accent)', short: '1:1', label: 'Mentor: Daniel Schmidt' },
      { start: 50, width: 14, color: '#6a3ab0', short: 'Nova · pitch sim', label: 'AI practice' },
      { start: 70, width: 18, color: 'var(--accent)', short: 'Boardroom lab', label: 'Workshop' },
    ],
    aifluency: [
      { start: 4, width: 14, color: 'var(--accent)', short: 'Kickoff 1:1', label: 'Mentor: Priya Nair' },
      { start: 22, width: 22, color: 'var(--accent)', short: 'AI Fluency course', label: 'Pack L&D' },
      { start: 48, width: 12, color: '#6a3ab0', short: 'Ludo · policy sim', label: 'AI practice' },
      { start: 64, width: 18, color: 'var(--accent)', short: 'Prompting playbook', label: 'Pack L&D' },
      { start: 86, width: 10, color: 'var(--accent)', short: '1:1', label: 'Mentor checkpoint' },
    ],
    orgdesign: [
      { start: 6, width: 14, color: 'var(--accent)', short: 'Kickoff 1:1', label: 'Mentor: Elena Rossi' },
      { start: 26, width: 20, color: 'var(--accent)', short: 'Org Design course', label: 'Pack L&D' },
      { start: 54, width: 12, color: '#6a3ab0', short: 'Ludo · sceptic sim', label: 'AI practice' },
      { start: 74, width: 16, color: 'var(--accent)', short: 'De-Layering playbook', label: 'BCG insights' },
    ],
    coaching: [
      { start: 8, width: 18, color: 'var(--accent)', short: 'Coaching course', label: 'Pack L&D' },
      { start: 32, width: 14, color: '#6a3ab0', short: 'Ludo · perf sim', label: 'AI practice' },
    ],
  };
  return plans[id] || [];
}

function mentorsFor(skillId) {
  return Object.values(MENTORS).filter(m => m.focus.includes(skillId)).slice(0, 2);
}

function GapPlanCard({ skill, rank, onStartPractice, onPickMentor }) {
  const ms = mentorsFor(skill.id);
  const content = CONTENT_LIBRARY[skill.id] || [];
  const ai = AI_PRACTICE[skill.id];

  return (
    <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
      <div style={{
        padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 14,
        borderBottom: '1px solid var(--rule)', background: 'var(--panel-2)',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: 'var(--accent)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
        }}>{rank}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{skill.name}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            Now Level {skill.result.agg.toFixed(2)} · Target Level {skill.target} · Gap <strong style={{ color: 'var(--ink)' }}>{skill.gap.toFixed(2)}</strong> · Est. close <strong style={{ color: 'var(--ink)' }}>{estClose(skill.gap)}</strong>
          </div>
        </div>
        <StatusChip status={skill.status} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
        {/* Mentor */}
        <section style={{ padding: 20, borderRight: '1px solid var(--rule)' }}>
          <SectionMini label="MENTOR / COACH" color="var(--accent)" />
          {ms.length > 0 ? ms.map(m => (
            <MentorMini key={m.id} mentor={m} onPickMentor={onPickMentor} />
          )) : <DevEmpty>No matching mentor — search the network</DevEmpty>}
        </section>
        {/* Content */}
        <section style={{ padding: 20, borderRight: '1px solid var(--rule)' }}>
          <SectionMini label="L&D CONTENT" color="var(--accent)" />
          <div style={{ display: 'grid', gap: 8 }}>
            {content.slice(0, 3).map(c => (
              <div key={c.id} style={{
                display: 'grid', gridTemplateColumns: '1fr auto', gap: 8,
                padding: '10px 12px', border: '1px solid var(--rule)', borderRadius: 8,
              }}>
                <div>
                  <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{c.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{c.kind} · {c.duration} · {c.provider}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: 11, fontWeight: 600, color: '#0a6b3d', padding: '2px 6px',
                    background: '#ecfdf5', borderRadius: 4, border: '1px solid #a7e3c4',
                  }}>{c.match}%</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>match</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* AI Practice */}
        <section style={{ padding: 20 }}>
          <SectionMini label="PACK AI PRACTICE" color="#6a3ab0" />
          {ai ? (
            <div style={{
              padding: 14, borderRadius: 8, color: '#e7e6e3',
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#a855f7,#6a3ab0)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                }}>🤖</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{ai.avatar}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{ai.duration}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.55 }}>{ai.scenario}</div>
              <Ds.Button variant="primary" onClick={() => onStartPractice?.(skill.id)} style={{ marginTop: 12, width: '100%' }}>
                Start practice →
              </Ds.Button>
            </div>
          ) : <DevEmpty>No scenario library yet</DevEmpty>}
        </section>
      </div>
    </div>
  );
}

function MentorMini({ mentor, onPickMentor }) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
      <Avatar initials={mentor.initials} size={42} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{mentor.name}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{mentor.title}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, lineHeight: 1.4 }}>{mentor.bio}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
          <div style={{
            fontSize: 11, padding: '2px 7px', borderRadius: 4,
            background: '#fef3c7', color: '#854d0e', border: '1px solid #fde68a',
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            ★ {mentor.rating}
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{mentor.sessions} sessions · {mentor.rate}</span>
        </div>
        <Ds.Button variant="primary" onClick={onPickMentor} style={{ marginTop: 10, width: '100%' }}>
          Book — {mentor.nextSlot}
        </Ds.Button>
      </div>
    </div>
  );
}

function SectionMini({ label, color }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 600, letterSpacing: '.08em',
      color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 14,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
      {label}
    </div>
  );
}

function DevEmpty({ children }) {
  return <div style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>{children}</div>;
}

function estClose(gap) {
  if (gap > 1.5) return '6–9 months';
  if (gap > 0.8) return '4–6 months';
  return '2–4 months';
}

Object.assign(window, { DevelopmentPlanStage });


/* ===== mentoring.jsx ===== */
// Mentoring module — Pick a Mentor + Coachee Dashboard (mentee POV: Sara)
// Visuals match the Pack mentoring screens (Matching.png + Mentoring screen.png)

// ============================================================================
// PICK A MENTOR — compatibility-ranked cards
// ============================================================================
function PickMentorStage({ role, onBack, onPick }) {
  const projected = useMemo(() => projectSkills(role.skills, 3), [role]);
  const assessed  = useMemo(() => getAssessedSkills(projected), [projected]);
  const priorityGaps = useMemo(
    () => [...assessed].filter(s => s.gap > 0.4 && s.relevance !== 'low').sort((a,b)=>b.priority-a.priority),
    [assessed]
  );

  const ranked = useMemo(() => {
    return Object.values(MENTORS)
      .map(m => ({ ...m, compatibility: mentorCompatibility(m, priorityGaps) }))
      .sort((a,b) => b.compatibility - a.compatibility);
  }, [priorityGaps]);

  const deadline = '09/06/2026 17:16';
  const [countdown] = useState({ days: 20, hours: 23, minutes: 57, seconds: 16 });
  const [tokens] = useState(2);

  return (
    <div className="fade-up" style={{ minHeight: 'calc(100vh - 65px)', background: 'var(--bg)' }}>
      <CoacheeTopBar active="mentors" onBack={onBack} />

      <div style={{ padding: '36px 32px 60px', maxWidth: 1280, margin: '0 auto' }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
          Pick a mentor
        </h1>

        <div style={{
          marginTop: 28, display: 'grid', gridTemplateColumns: '1fr auto',
          gap: 18, padding: '18px 0', borderBottom: '1px solid var(--rule)',
        }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{
              width: 32, height: 32, borderRadius: '50%', background: 'var(--panel-2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)', flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
            </span>
            <div style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.55, maxWidth: 720 }}>
              You have until <strong>{deadline}</strong> to match with a Mentor, after which the system will match you automatically with the best candidate.
            </div>
          </div>
          <CountdownStrip {...countdown} />
        </div>

        {/* Mentor cards */}
        <div style={{ marginTop: 28, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
            <button style={{
              width: 32, height: 32, borderRadius: '50%', background: 'var(--panel)',
              border: '1px solid var(--rule)', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: 'var(--muted)',
            }} title="Filters">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </button>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
            paddingBottom: 18,
          }}>
            {ranked.slice(0, 3).map(m => (
              <MentorCard key={m.id} mentor={m} onPick={() => onPick?.(m.id)} />
            ))}
          </div>
          {/* Pagination dot */}
          <div style={{
            margin: '4px auto 0', width: 120, height: 4,
            background: 'var(--rule)', borderRadius: 999, position: 'relative',
          }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: 60, height: 4, background: 'var(--muted)', borderRadius: 999 }} />
          </div>
        </div>

        {/* Tokens + upcoming events */}
        <div style={{
          marginTop: 28, display: 'grid', gridTemplateColumns: '280px 1fr', gap: 18,
        }}>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: 22 }}>
            <div style={{ fontSize: 11, color: 'var(--ink)', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600 }}>
              Tokens left
            </div>
            <div style={{
              fontSize: 56, fontWeight: 700, color: 'var(--accent)',
              fontVariantNumeric: 'tabular-nums', textAlign: 'center', marginTop: 18,
            }}>{tokens}</div>
            <div style={{ fontSize: 13, color: 'var(--ink)', textAlign: 'center', marginTop: 6 }}>You have {tokens} left.</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55, marginTop: 12, textAlign: 'center' }}>
              Tokens allow you to book chemistry sessions with mentors. Each session uses one token. You can schedule up to 3 chemistry sessions to find your ideal match.
            </div>
          </div>

          <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>Upcoming events</div>
            <div style={{
              display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 16, alignItems: 'center',
              padding: '12px 0', borderTop: '1px solid var(--rule)',
            }}>
              <Avatar initials={ranked[0].initials} size={36} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
                  Chemistry | {ranked[0].name} / {ASSESSED_PERSON.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  Wednesday, 20 May 2026 at 21:30:00 GMT+03:00
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Ds.Button variant="primary">Join</Ds.Button>
                <Ds.Button variant="outline">Reschedule</Ds.Button>
                <Ds.Button variant="outline">Cancel</Ds.Button>
              </div>
            </div>
          </div>
        </div>

        {/* Help banner */}
        <div style={{
          marginTop: 28, padding: '16px 22px', borderRadius: 10,
          background: 'var(--accent-soft)', border: '1px solid #f5d5b5',
          textAlign: 'center', fontSize: 13, color: 'var(--ink)',
        }}>
          IF YOU NEED ANY HELP MATCHING PLEASE CONTACT OUR TEAM THROUGH <strong>CHAT</strong> OR EMAIL US AT <strong style={{ color: 'var(--accent-700)' }}>OPERATIONS@THEPACK.TECH</strong>
        </div>
      </div>
    </div>
  );
}

function MentorCard({ mentor, onPick }) {
  return (
    <button onClick={onPick} style={{
      background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 16,
      padding: 24, cursor: 'pointer', textAlign: 'center', position: 'relative',
      transition: 'transform .15s, box-shadow .15s, border-color .15s',
      boxShadow: '0 1px 2px rgba(0,0,0,.04)', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}
    onMouseEnter={(e)=> {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,.1)';
      e.currentTarget.style.borderColor = 'var(--accent)';
    }}
    onMouseLeave={(e)=> {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,.04)';
      e.currentTarget.style.borderColor = 'var(--rule)';
    }}>
      <div style={{
        position: 'absolute', top: 22, right: 22,
        padding: '4px 12px', borderRadius: 999,
        background: 'var(--panel-2)', border: '1px solid var(--rule)',
        fontSize: 13, color: 'var(--ink)',
      }}>
        <strong style={{ fontWeight: 700 }}>{mentor.compatibility}%</strong> <span style={{ color: 'var(--muted)' }}>compatibility</span>
      </div>

      <PortraitAvatar initials={mentor.initials} size={110} />

      <div style={{ marginTop: 18, fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>{mentor.name}</div>
      <div style={{ marginTop: 6, fontSize: 13, color: 'var(--ink)' }}>{mentor.company}</div>
      <div style={{ marginTop: 4, fontSize: 13, color: 'var(--muted)' }}>{mentor.title}</div>

      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{mentor.rating.toFixed(2)}</span>
        <Stars rating={mentor.rating} />
      </div>

      <div style={{
        marginTop: 18, alignSelf: 'flex-end',
        width: 26, height: 26, borderRadius: '50%', background: 'var(--panel-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 11,
      }}>in</div>
    </button>
  );
}

function PortraitAvatar({ initials, size = 110 }) {
  // Realistic portrait stand-in: gradient ring + initials.
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg, #fbe6d3 0%, #ffd0a8 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#8a4318', fontWeight: 700, fontSize: size * 0.34,
      letterSpacing: '.04em', border: '1px solid rgba(0,0,0,.04)',
    }}>{initials}</div>
  );
}

function Stars({ rating }) {
  // 5 stars, partial fill for fractional
  return (
    <div style={{ display: 'inline-flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => {
        const filled = i <= Math.floor(rating);
        const partial = !filled && i - rating < 1;
        const ratio = partial ? rating - Math.floor(rating) : 0;
        return (
          <span key={i} style={{ position: 'relative', display: 'inline-block', width: 14, height: 14 }}>
            <span style={{ color: 'var(--rule-strong)' }}>★</span>
            <span style={{
              position: 'absolute', inset: 0,
              clipPath: filled ? 'inset(0 0 0 0)' : partial ? `inset(0 ${100 - ratio*100}% 0 0)` : 'inset(0 100% 0 0)',
              color: '#fbbf24', overflow: 'hidden',
            }}>★</span>
          </span>
        );
      })}
    </div>
  );
}

function CountdownStrip({ days, hours, minutes, seconds }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      {[
        ['DAYS', days], ['HOURS', hours], ['MINUTES', minutes], ['SECONDS', seconds],
      ].map(([label, v], i, arr) => (
        <React.Fragment key={label}>
          <div style={{ textAlign: 'center', minWidth: 56 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{String(v).padStart(2,'0')}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', fontWeight: 600, marginTop: 4 }}>{label}</div>
          </div>
          {i < arr.length - 1 && <div style={{ fontSize: 22, color: 'var(--muted)', fontWeight: 300 }}>:</div>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ============================================================================
// COACHEE DASHBOARD — Sara's view as the coachee
// ============================================================================
function CoacheeDashboardStage({ role, mentorId, onBack, onBookCheckIn }) {
  const projected = useMemo(() => projectSkills(role.skills, 3), [role]);
  const assessed  = useMemo(() => getAssessedSkills(projected), [projected]);
  const priorityGaps = useMemo(
    () => [...assessed].filter(s => s.gap > 0.4 && s.relevance !== 'low').sort((a,b)=>b.priority-a.priority),
    [assessed]
  );
  const ranked = useMemo(() => {
    return Object.values(MENTORS)
      .map(m => ({ ...m, compatibility: mentorCompatibility(m, priorityGaps) }))
      .sort((a,b) => b.compatibility - a.compatibility);
  }, [priorityGaps]);
  const mentor = MENTORS[mentorId] || ranked[0];

  return (
    <div className="fade-up" style={{ minHeight: 'calc(100vh - 65px)', background: 'var(--bg)' }}>
      <CoacheeTopBar active="dashboard" onBack={onBack} />

      <div style={{ padding: '24px 32px 60px', maxWidth: 1280, margin: '0 auto' }}>
        {/* Hero card */}
        <div style={{ background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: '22px 26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
            <Avatar initials={ASSESSED_PERSON.initials} size={48} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>{ASSESSED_PERSON.name}</h1>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--panel-2)', color: 'var(--muted)', fontWeight: 500 }}>Coachee</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0 }}>
            <StatBlock label="✓ COMPLETED SESSIONS" value="0" />
            <StatBlock label="◴ CHEMISTRY SESSIONS" value="1" />
            <StatBlock label="📅 UPCOMING SESSIONS" value="1" />
            <StatBlock label="👥 PROPOSED MENTORS" value="3" />
            <StatBlock label="◉ ASSIGNED MENTOR" value={mentor.name.split(' ')[0]} valueColor="var(--accent-700)" />
          </div>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, paddingTop: 22, borderTop: '1px solid var(--rule)' }}>
            {/* Personal info */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>Personal info</div>
              <InfoRow icon="building" label="Company" value="Acme Professional Services Ltd." />
              <InfoRow icon="briefcase" label="Job title" value={ASSESSED_PERSON.role} />
              <InfoRow icon="mail" label="Email" value={ASSESSED_PERSON.email} accent />
              <InfoRow icon="clock" label="Timezone" value="Europe/Milan" />
              <InfoRow icon="globe" label="Mentoring languages" value="Italiano (Italian)" />
              <InfoRow icon="path" label="Path" custom={
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 2 }}>
                  {['Strategic Workforce Planning', 'AI Fluency for People Leaders', 'Data Storytelling for HR'].map(p => (
                    <span key={p} style={{
                      display: 'inline-block', alignSelf: 'flex-start',
                      padding: '4px 12px', fontSize: 12, color: 'var(--accent-700)',
                      background: 'var(--accent-soft)', border: '1px solid #f5d5b5',
                      borderRadius: 999, fontWeight: 500,
                    }}>{p}</span>
                  ))}
                </div>
              } />
              <InfoRow icon="flag" label="Coaching Goal(s)" value="Close the gap on workforce planning, data storytelling and AI fluency. Build confidence presenting people analytics to leadership." />
            </div>

            {/* Program details */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>Program details</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                Program information
              </div>
              <KvRowDense k="Program Name" v="HRBP Future-Ready · 6 months · 25/05/2026 – 30/11/2026" />
              <KvRowDense k="Program Mode" v="External" />
              <KvRowDense k="Progress model" v="Time-based (by program dates)" />
              <KvRowDense k="Dates" v="25/05/2026 – 30/11/2026" />
              <KvRowDense k="Linked assessment" v="Q2 2026 HRBP 360°" />
              <KvRowDense k="Linked gap analysis" v="3 critical gaps · 0.85 avg" />
            </div>
          </div>
        </div>

        {/* Upcoming events */}
        <div style={{ marginTop: 22, background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: '20px 24px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>Upcoming events</div>
          <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 16, alignItems: 'center' }}>
            <Avatar initials={mentor.initials} size={36} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
                Coaching check-in | {mentor.name} coachee: {ASSESSED_PERSON.name}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                Wednesday, 20 May 2026 at 13:30:00 GMT+03:00
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Ds.Button variant="primary">Join</Ds.Button>
              <Ds.Button variant="outline">Reschedule</Ds.Button>
              <Ds.Button variant="outline">Cancel</Ds.Button>
            </div>
          </div>
        </div>

        {/* My Coach */}
        <div style={{ marginTop: 22, background: 'var(--panel)', border: '1px solid var(--rule)', borderRadius: 'var(--radius)', padding: '22px 26px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 18 }}>My Coach</div>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
            <div>
              <PortraitAvatar initials={mentor.initials} size={200} />
              <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{mentor.rating.toFixed(2)}</span>
                <Stars rating={mentor.rating} />
              </div>
              <div style={{ marginTop: 14 }}>
                {Object.entries(mentor.breakdown).map(([k, v]) => (
                  <CoachBreakdownRow key={k} label={k} value={v} />
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>{mentor.name}</h2>
              <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
                <CoachInfo emoji="🏢" label="Company" value={mentor.company} />
                <CoachInfo emoji="💼" label="Job title" value={mentor.title} />
                <CoachInfo emoji="🏷" label="Fields of work" value={mentor.fields.join(', ')} />
                <CoachInfo emoji="🎯" label="Expertises" value={mentor.expertises.join(', ')} />
                <CoachInfo emoji="🤝" label="Experience" value={mentor.experience} />
                <div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span>📚</span>
                    <strong style={{ fontSize: 13, color: 'var(--ink)' }}>Paths:</strong>
                  </span>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                    {mentor.paths.map(p => (
                      <span key={p} style={{
                        padding: '4px 10px', fontSize: 12, color: '#fff',
                        background: 'var(--accent)', borderRadius: 4, fontWeight: 500,
                      }}>{p}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span>🔑</span>
                    <strong style={{ fontSize: 13, color: 'var(--ink)' }}>Coaching Expertise:</strong>
                  </span>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                    {['Coaching for performance and feedback', 'Strategic and adaptive thinking', 'Mentoring and inclusive leadership'].map(p => (
                      <span key={p} style={{
                        padding: '4px 10px', fontSize: 12, color: '#fff',
                        background: '#0974b8', borderRadius: 4, fontWeight: 500,
                      }}>{p}</span>
                    ))}
                  </div>
                </div>
                <CoachInfo emoji="📜" label="Certificate" value={mentor.certificate} />
                <CoachInfo emoji="🗣" label="Languages" value={mentor.languages.join(', ')} />
                <CoachInfo emoji="🌐" label="Timezone" value={mentor.timezone} />
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span>📝</span>
                    <strong style={{ fontSize: 13, color: 'var(--ink)' }}>About:</strong>
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--ink)', lineHeight: 1.6 }}>
                    {mentor.bio} Recognised for combining structured frameworks with deep listening; her coachees consistently leave with concrete actions and a clearer view of their role's evolution.
                  </p>
                </div>
              </div>
              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
                <Ds.Button variant="outline" onClick={onBookCheckIn}>
                  Book check-in call
                  <span style={{
                    width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,.3)',
                    fontSize: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>?</span>
                </Ds.Button>
              </div>
            </div>
          </div>

          {/* Calendar booking */}
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--rule)' }}>
            <div style={{
              padding: '14px 18px', borderRadius: 8, background: 'var(--accent-soft)',
              border: '1px solid #f5d5b5', fontSize: 13, color: 'var(--ink)', lineHeight: 1.55,
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16,
              marginBottom: 18,
            }}>
              <div>
                If you're unable to find a time slot that works for you, feel free to reach out to your Coach via chat or email. Together, you can discuss and arrange a meeting time that is mutually convenient. Your Coach is here to support you, so don't hesitate to communicate with them to find the best slot for both of you.
              </div>
              <button style={{ background: 'transparent', border: 0, fontSize: 18, color: 'var(--muted)', cursor: 'pointer' }}>×</button>
            </div>

            <BookingCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}

function CoacheeTopBar({ active, onBack }) {
  return (
    <header style={{
      display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center',
      padding: '0 28px', height: 60, background: 'var(--panel)',
      borderBottom: '1px solid var(--rule)',
    }}>
      <button onClick={onBack} style={{ background: 'transparent', border: 0, cursor: 'pointer', padding: 0 }}>
        <img src={(window.__resources && window.__resources.packLogo) || "assets/pack-black.svg"} alt="Pack" style={{ height: 22 }} />
      </button>
      <nav style={{ display: 'flex', gap: 26, justifyContent: 'center' }}>
        {[
          { id: 'dashboard', label: 'Pannello di controllo' },
          { id: 'mentors',   label: 'Eventi' },
          { id: 'library',   label: 'Libreria' },
        ].map(t => (
          <span key={t.id} style={{
            padding: '20px 0', fontSize: 14, fontWeight: 500,
            color: active === t.id ? 'var(--accent-700)' : 'var(--muted)',
            borderBottom: active === t.id ? '2px solid var(--accent)' : '2px solid transparent',
            cursor: 'pointer',
          }}>{t.label}</span>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontSize: 18 }}>🇺🇸</span>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: 'var(--panel-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600,
          color: 'var(--ink)', border: '1px solid var(--rule-strong)',
        }}>SB</div>
      </div>
    </header>
  );
}

function StatBlock({ label, value, valueColor }) {
  return (
    <div style={{ padding: '4px 0' }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.08em', color: 'var(--muted)', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ marginTop: 6, fontSize: 24, fontWeight: 700, color: valueColor || 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}

function InfoRow({ icon, label, value, custom, accent }) {
  const icons = {
    building:  'M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16',
    briefcase: 'M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2',
    mail:      'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 0 8 7 8-7',
    clock:     'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2',
    globe:     'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
    path:      'M3 6h13l5 5-5 5H3z',
    flag:      'M4 22V4l4 2 4-2 4 2 4-2v12l-4 2-4-2-4 2-4-2',
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: 16, marginBottom: 10, alignItems: 'flex-start' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={icons[icon] || icons.building} />
        </svg>
        {label}
      </span>
      {custom ?? (
        <span style={{ fontSize: 13, color: accent ? 'var(--accent-700)' : 'var(--ink)' }}>{value}</span>
      )}
    </div>
  );
}

function KvRowDense({ k, v }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16, padding: '6px 0', fontSize: 13 }}>
      <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{k}</span>
      <span style={{ color: 'var(--ink)' }}>{v}</span>
    </div>
  );
}

function CoachBreakdownRow({ label, value }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center', marginBottom: 6 }}>
      <div>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{label}</div>
        <div style={{ height: 4, background: 'var(--panel-2)', borderRadius: 999, marginTop: 2, overflow: 'hidden' }}>
          <div style={{ width: `${(value/5)*100}%`, height: '100%', background: 'var(--accent)' }} />
        </div>
      </div>
      <span style={{ fontSize: 11, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{value}/5</span>
    </div>
  );
}

function CoachInfo({ emoji, label, value }) {
  return (
    <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.55 }}>
      <span>{emoji} <strong>{label}:</strong> {value}</span>
    </div>
  );
}

function BookingCalendar() {
  const [selected, setSelected] = useState(19);
  const today = 19;
  const dim = [
    [null,null,null,null,null,null, null], // (use weeks)
  ];
  // Build a May 2026 calendar: Sunday-start, 1st May 2026 is a Friday
  const firstDay = 5; // Friday (0=Sun)
  const lastDate = 31;
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= lastDate; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>May 2026</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button style={{
              padding: '4px 10px', fontSize: 12, border: '1px solid var(--rule-strong)',
              borderRadius: 6, background: 'var(--panel)', cursor: 'pointer',
            }}>Today</button>
            <button style={navArrowBtn}>‹</button>
            <button style={navArrowBtn}>›</button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: 11, color: 'var(--muted)', fontWeight: 500, marginBottom: 6 }}>
          {['S','M','T','W','T','F','S'].map((d, i) => <div key={i}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const isSel = d === selected;
            const past = d < today;
            return (
              <button key={i} onClick={() => !past && setSelected(d)} disabled={past} style={{
                aspectRatio: '1 / 1', borderRadius: '50%', border: 0,
                cursor: past ? 'default' : 'pointer',
                background: isSel ? 'var(--accent)' : 'transparent',
                color: isSel ? '#fff' : past ? 'var(--rule-strong)' : 'var(--ink)',
                fontSize: 13, fontWeight: isSel ? 600 : 400,
              }}>{d}</button>
            );
          })}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>
          Available slots for May {selected}, 2026
        </div>
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)', fontSize: 13 }}>
          No availability
        </div>
      </div>
    </div>
  );
}

const navArrowBtn = {
  width: 24, height: 24, borderRadius: 4, border: 0, background: 'transparent',
  fontSize: 16, color: 'var(--muted)', cursor: 'pointer',
};

Object.assign(window, { PickMentorStage, CoacheeDashboardStage });



/* ===== host wrapper: mounted by the HR Director shell ===== */
function PackDemo(props){
  const module = props.module || 'mapping';
  const horizon = Number(props.horizon) || 3;
  const onNavigate = props.onNavigate || function(){};
  const [liveRole, setLiveRole] = useState(null);
  const role = liveRole || ROLES.hrbp;
  const projected = useMemo(function(){ return projectSkills(role.skills, horizon); }, [role, horizon]);
  const [stage, setStage] = useState('input');
  const [skillId, setSkillId] = useState(null);
  const [params, setParams] = useState(null);
  const [project, setProject] = useState(null);
  const [showAria, setShowAria] = useState(false);
  const mkProject = function(){ return { name: role.title + ' — Q2 2026 baseline', aType:'360', ariaOn:true, limit:30, country:'Italy', period:'14 days', projected: projected, role: role }; };
  const proj = project || mkProject();

  useEffect(function(){ if(props.onStage) props.onStage(stage); }, [stage]);
  useEffect(function(){ if(props.onReady) props.onReady({ setStage: setStage }); }, []);

  useEffect(function(){
    if(module === 'mapping'){
      setStage(function(s){ return ['input','pipeline','dashboard','detail'].indexOf(s) >= 0 ? s : 'dashboard'; });
    } else if(module === 'assessment'){
      setStage(function(s){ return s.indexOf('a.') === 0 ? s : 'a.create'; });
    } else if(module === 'gap'){
      setStage('g.main');
    } else if(module === 'development'){
      setStage(function(s){ return s.indexOf('d.') === 0 ? s : 'd.main'; });
    }
  }, [module]);

  const goModule = function(m, st){ if(!project) setProject(mkProject()); if(st) setStage(st); onNavigate(m); };

  return (
    <div className="theme-pack" style={{ background:'var(--bg)', color:'var(--ink)', minHeight:'100%' }}>
      {module === 'mapping' && (
        <React.Fragment>
          {stage === 'input' && <InputStage onRun={async function(p){
            setParams(Object.assign({}, p, { mappingPending: true }));
            setStage('pipeline');
            if (!window.DemoApi) {
              setParams(p);
              return;
            }
            try {
              const created = await window.DemoApi.createMapping(p);
              setParams(Object.assign({}, p, { mappingId: created.id }));
            } catch (err) {
              setParams(Object.assign({}, p, { mappingError: (err && err.message) || 'live mapping unavailable' }));
            }
          }} dataset="hrbp" setDataset={function(){}} />}
          {stage === 'pipeline' && <PipelineStage onDone={function(){ setStage('dashboard'); }} onReady={function(nextRole){ setLiveRole(nextRole); }} params={Object.assign({}, params, { horizon: horizon })} />}
          {stage === 'dashboard' && <DashboardStage role={role} horizon={horizon} onOpen={function(id){ setSkillId(id); setStage('detail'); }} onBack={function(){ setStage('input'); }} onAssess={function(){ goModule('assessment','a.create'); }} />}
          {stage === 'detail' && <DetailStage role={role} horizon={horizon} skillId={skillId} onClose={function(){ setStage('dashboard'); }} onOpen={function(id){ setSkillId(id); }} />}
        </React.Fragment>
      )}

      {module === 'assessment' && (
        <React.Fragment>
          {stage === 'a.create' && <CreateAssessmentProject role={role} projected={projected} onNext={function(cfg){ setProject(Object.assign({}, cfg, { projected: projected, role: role, createdAt: new Date().toISOString() })); setStage('a.invite'); }} onCancel={function(){ onNavigate('mapping'); }} />}
          {stage === 'a.invite' && <InviteStage project={proj} onLaunch={function(){ setStage('a.progress'); }} onBack={function(){ setStage('a.create'); }} />}
          {stage === 'a.progress' && <AssessmentProgress project={proj} onOpenAria={function(){ setShowAria(true); }} onOpenReport={function(){ setStage('a.report'); }} />}
          {stage === 'a.report' && <IndividualReport project={proj} role={role} onGap={function(){ goModule('gap'); }} onDevelopment={function(){ goModule('development','d.main'); }} onMentors={function(){ goModule('development','d.mentors'); }} onBack={function(){ setStage('a.progress'); }} />}
        </React.Fragment>
      )}

      {module === 'gap' && <GapAnalysisStage role={role} onDevelopment={function(){ goModule('development','d.main'); }} onBack={function(){ goModule('assessment','a.report'); }} />}

      {module === 'development' && (
        <React.Fragment>
          {stage === 'd.main' && <DevelopmentPlanStage role={role} onBack={function(){ goModule('gap'); }} onStartPractice={function(){ setShowAria(true); }} onPickMentor={function(){ setStage('d.mentors'); }} />}
          {stage === 'd.mentors' && <PickMentorStage role={role} onBack={function(){ setStage('d.main'); }} onPick={function(){ setStage('d.main'); }} />}
        </React.Fragment>
      )}

      {showAria && <AriaInterviewModal onClose={function(){ setShowAria(false); }} onComplete={function(){ setShowAria(false); goModule('assessment','a.report'); }} />}
    </div>
  );
}
window.PackDemo = PackDemo;

})();
