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
