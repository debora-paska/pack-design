// Pipeline — async queue feel, runs in background, pauses for human review.

function PipelineStage({ onDone, params }) {
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
  const jobId = useMemo(() => 'JOB-' + Math.random().toString(36).slice(2,7).toUpperCase(), []);
  const submittedAt = useMemo(() => new Date(), []);

  // Simulate the pipeline (accelerated so the demo is watchable)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (let i = 0; i < stages.length; i++) {
        if (cancelled) return;
        setActive(i);
        if (stages[i].humanHold) {
          setPaused(true);
          pushLog({ step: stages[i].id, label: stages[i].label, meta: 'queued for Pack reviewer · avg wait 2h 14m' });
          return; // hold here until the user resumes
        }
        await sleep(520 + Math.random()*220);
        pushLog({ step: stages[i].id, label: stages[i].label, meta: pipelineMeta(stages[i].id) });
        setElapsed(e => e + stages[i].est);
      }
      finish();
    })();
    return () => { cancelled = true; };
  }, []);

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
              <button onClick={()=>setClosed(true)} style={btnGhost}>
                Run in background
              </button>
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
            <button onClick={onDone} style={btnPrimary}>
              Open dashboard →
            </button>
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
        <button onClick={onStart} style={{ ...btnPrimary, background: '#8a5a00' }}>
          Simulate sign-off →
        </button>
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
            ? <button onClick={onOpenDashboard} style={btnPrimary}>Open dashboard →</button>
            : <button onClick={onOpen} style={btnPrimary}>Show progress</button>}
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
