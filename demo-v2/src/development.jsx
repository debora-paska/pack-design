// Skill Development Plan — mentor + content library + AI practice per priority gap

const Ds = window.KigenDesignSystem_093b66 || {};
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
        <div style={{ display: 'flex', gap: 8 }}>
          <Ds.Button variant="outline" onClick={onBack}>← Gap analysis</Ds.Button>
          <Ds.Button variant="outline" onClick={onCoacheeView}>View as Sara →</Ds.Button>
          <Ds.Button variant="primary" onClick={onPickMentor}>Pick mentor →</Ds.Button>
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
            <LegendDot color="#5eb3e8" label="Content" />
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
            We'll send Sara her plan, book the first mentor session, and enrol her in the recommended content.
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
      { start: 18, width: 20, color: '#5eb3e8', short: 'WFP Foundations course', label: 'Pack L&D' },
      { start: 42, width: 12, color: 'var(--accent)', short: '1:1', label: 'Mentor session' },
      { start: 58, width: 14, color: '#6a3ab0', short: 'Ludo · CFO sim', label: 'AI practice' },
      { start: 78, width: 16, color: '#5eb3e8', short: 'Scenario lab', label: 'Workshop' },
    ],
    datastorytelling: [
      { start: 10, width: 22, color: '#5eb3e8', short: 'People Analytics course', label: 'Pack L&D' },
      { start: 34, width: 12, color: 'var(--accent)', short: '1:1', label: 'Mentor: Daniel Schmidt' },
      { start: 50, width: 14, color: '#6a3ab0', short: 'Nova · pitch sim', label: 'AI practice' },
      { start: 70, width: 18, color: '#5eb3e8', short: 'Boardroom lab', label: 'Workshop' },
    ],
    aifluency: [
      { start: 4, width: 14, color: 'var(--accent)', short: 'Kickoff 1:1', label: 'Mentor: Priya Nair' },
      { start: 22, width: 22, color: '#5eb3e8', short: 'AI Fluency course', label: 'Pack L&D' },
      { start: 48, width: 12, color: '#6a3ab0', short: 'Ludo · policy sim', label: 'AI practice' },
      { start: 64, width: 18, color: '#5eb3e8', short: 'Prompting playbook', label: 'Pack L&D' },
      { start: 86, width: 10, color: 'var(--accent)', short: '1:1', label: 'Mentor checkpoint' },
    ],
    orgdesign: [
      { start: 6, width: 14, color: 'var(--accent)', short: 'Kickoff 1:1', label: 'Mentor: Elena Rossi' },
      { start: 26, width: 20, color: '#5eb3e8', short: 'Org Design course', label: 'Pack L&D' },
      { start: 54, width: 12, color: '#6a3ab0', short: 'Ludo · sceptic sim', label: 'AI practice' },
      { start: 74, width: 16, color: '#5eb3e8', short: 'De-Layering playbook', label: 'BCG insights' },
    ],
    coaching: [
      { start: 8, width: 18, color: '#5eb3e8', short: 'Coaching course', label: 'Pack L&D' },
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
          )) : <Empty>No matching mentor — search the network</Empty>}
        </section>
        {/* Content */}
        <section style={{ padding: 20, borderRight: '1px solid var(--rule)' }}>
          <SectionMini label="L&D CONTENT" color="#5eb3e8" />
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
              <button onClick={() => onStartPractice?.(skill.id)} style={{
                marginTop: 12, width: '100%', padding: '8px 14px', borderRadius: 8,
                background: 'rgba(168,85,247,.2)', border: '1px solid rgba(168,85,247,.4)',
                color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 13,
              }}>Start practice →</button>
            </div>
          ) : <Empty>No scenario library yet</Empty>}
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
        <button onClick={onPickMentor} style={{
          marginTop: 10, width: '100%', padding: '7px 10px', borderRadius: 6,
          background: 'var(--accent)', color: '#fff', border: 0, cursor: 'pointer',
          fontSize: 12, fontWeight: 600,
        }}>Book — {mentor.nextSlot}</button>
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

function Empty({ children }) {
  return <div style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>{children}</div>;
}

function estClose(gap) {
  if (gap > 1.5) return '6–9 months';
  if (gap > 0.8) return '4–6 months';
  return '2–4 months';
}

Object.assign(window, { DevelopmentPlanStage });
