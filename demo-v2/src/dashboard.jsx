// Dashboard — hero summary + filterable skill table

const Ds = window.KigenDesignSystem_093b66 || {};
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
              { name: 'Now',         color: '#5eb3e8',       values: nowVals,    fillOpacity: 0.12, strokeWidth: 1.5, dashed: true },
              { name: `In ${horizon}y`, color: 'var(--accent)', values: futureVals, fillOpacity: 0.22, strokeWidth: 2 },
            ]}
            size={420}
          />
        </div>
        <div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 18 }}>
            <Legend swatch="#5eb3e8" dashed label="Now" />
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
          <h1 style={{
            margin: 0, fontFamily: 'var(--fam-body)',
            fontSize: 28, fontWeight: 600, color: 'var(--ink)',
          }}>{role.title}</h1>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
            {role.family} · {horizon}-year horizon
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Ds.Button variant="outline" onClick={onBack}>← New run</Ds.Button>
          <Ds.Button variant="outline">Export</Ds.Button>
          {onAssess && (
            <Ds.Button variant="primary" onClick={onAssess}>
              Use this map to assess a team member
              <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
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

      {/* Now vs +3y radar */}
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
            <div key={key} style={{
              background: 'var(--panel)', border: '1px solid var(--rule)',
              borderRadius: 'var(--radius)', padding: 18,
              position: 'relative', overflow: 'hidden',
            }}>
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
                    <button key={id} onClick={()=>onOpen(id)} style={{
                      textAlign: 'left', fontSize: 12, padding: '6px 10px',
                      border: '1px solid var(--rule)', background: 'var(--panel-2)',
                      borderRadius: 6, color: 'var(--ink)', cursor: 'pointer',
                    }}>{s.name}</button>
                  );
                })}
              </div>
            </div>
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
  return { upskill: '#3E8B6A', reskill: '#ff8b45', hire: '#0F6FA8', automate: '#6a3ab0' }[k];
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
