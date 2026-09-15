// Skill detail drawer — full profile for one skill

const Ds = window.KigenDesignSystem_093b66 || {};
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
          <button onClick={onClose} style={{
            background: 'transparent', border: 0, cursor: 'pointer',
            fontFamily: 'var(--fam-mono)', fontSize: 11, color: 'var(--muted)',
            letterSpacing: '.14em', textTransform: 'uppercase', padding: 0, marginBottom: 8,
          }}>← Back to skill map</button>
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
