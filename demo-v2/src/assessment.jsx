// Assessment module — Pack Assessments app look (sidebar + cards).
// Stages: create → invite → in-progress → aria → report

const { useRef } = React;
const Ds = window.KigenDesignSystem_093b66 || {};

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
        <button onClick={onCancel} style={{
          background: 'var(--panel)', border: '1px solid var(--rule-strong)',
          padding: '8px 14px', borderRadius: 8, fontSize: 13, color: 'var(--ink)', cursor: 'pointer',
        }}>← Back to Projects</button>
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
        <button onClick={() => setOpen(o=>!o)} style={{
          background: 'transparent', border: 0, cursor: 'pointer', color: 'var(--accent-700)', fontWeight: 600, fontSize: 13,
        }}>{open ? 'Hide' : 'Review'}</button>
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
      <Breadcrumb crumbs={['Projects', project.name, 'Participants']} />
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
          <button style={{
            padding: '8px 14px', borderRadius: 8, border: '1px dashed var(--rule-strong)',
            background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontSize: 13,
          }}>+ Add participant</button>
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
    { who: 'Sara Bianchi',    role: 'Self',      t: '14:02', avatar: 'SB' },
    { who: 'Marco Riva',      role: 'Manager',   t: '14:48', avatar: 'MR' },
    { who: 'Elena Conti',     role: 'Peer',      t: '15:21', avatar: 'EC' },
    { who: 'David Park',      role: 'Peer',      t: '16:05', avatar: 'DP' },
    { who: 'Anna Tatti',      role: 'Peer',      t: '16:40', avatar: 'AT' },
    { who: 'Luca Bernardi',   role: 'Peer',      t: '17:12', avatar: 'LB' },
  ];

  return (
    <div className="fade-up" style={{ padding: '24px 32px', maxWidth: 1180, margin: '0 auto' }}>
      <Breadcrumb crumbs={['Projects', project.name]} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 8 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>{project.name}</h1>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
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
                  background: 'linear-gradient(135deg, #ff8b45, #ff6b1a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>🤖</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Aria · Pack AI</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>Voice interview with Sara</div>
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
          <img src={(window.__resources && window.__resources.packLogoWhite) || "assets/pack-logo-white.png"} alt="Pack" style={{ height: 20, opacity: .85 }} />
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
        background: 'linear-gradient(135deg, #ff8b45 0%, #ff5a1f 100%)',
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
      color: tone === 'info' ? '#5eb3e8' : '#cbd5e1',
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
      <Breadcrumb crumbs={['Projects', project.name, 'Reports', ASSESSED_PERSON.name]} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10, marginBottom: 22 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500, letterSpacing: '.04em' }}>ASSESSMENT REPORT · LIVE DASHBOARD</div>
          <h1 style={{ margin: '4px 0 6px', fontSize: 30, fontWeight: 700, color: 'var(--ink)' }}>{ASSESSED_PERSON.name}</h1>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            {ASSESSED_PERSON.role} · {ASSESSED_PERSON.unit} · 360° assessment · May 2026
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Ds.Button variant="outline" onClick={onBack}>← Project</Ds.Button>
          <Ds.Button variant="outline">Share</Ds.Button>
          <Ds.Button variant="primary" onClick={onDevelopment}>Build development plan →</Ds.Button>
        </div>
      </div>

      {/* Tab strip */}
      <div style={{
        display: 'flex', gap: 0, marginBottom: 22, borderBottom: '1px solid var(--rule)',
      }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'skills', label: `Skill levels · ${assessed.length}` },
          { id: 'gap', label: 'Gap analysis' },
          { id: 'plan', label: 'Development plan' },
        ].map((t, i) => (
          <button key={t.id} onClick={()=> {
            // Scroll to the matching section
            const el = document.getElementById(`section-${t.id}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }} style={{
            padding: '10px 18px', background: 'transparent', border: 0, cursor: 'pointer',
            fontSize: 14, fontWeight: 500, color: i === 0 ? 'var(--accent-700)' : 'var(--muted)',
            borderBottom: `2px solid ${i === 0 ? 'var(--accent)' : 'transparent'}`,
            marginBottom: -1,
          }}>{t.label}</button>
        ))}
      </div>

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
                Sara is <strong>solid in employee-relations and compliance work</strong> — both above target — and clearly identifies as a coach. Her growth edge is the <strong>future-facing HRBP toolkit</strong>: workforce planning, AI fluency, and people-data storytelling, where she sits 1.0–2.0 levels below where the role is heading.
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
        <button onClick={onAction} style={{
          background: 'transparent', border: 0, color: 'var(--accent-700)', cursor: 'pointer',
          fontSize: 13, fontWeight: 600, padding: 0,
        }}>{actionLabel}</button>
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
  background: '#5eb3e8', color: '#fff', border: 0,
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
