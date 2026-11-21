// Mentoring module — Pick a Mentor + Coachee Dashboard (mentee POV: Sara)
// Visuals match the Pack mentoring screens (Matching.png + Mentoring screen.png)

// ============================================================================
// PICK A MENTOR — compatibility-ranked cards
// ============================================================================
const Ds = window.KigenDesignSystem_093b66 || {};
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
                <Ds.Button variant="primary" onClick={onBookCheckIn}>
                  Book check-in call
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
