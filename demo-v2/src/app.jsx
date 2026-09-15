// App shell — module switcher (Mapping · Assessment · Gap · Development), per-module nav
const { useState, useEffect, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "pack",
  "horizon": 3,
  "dense": false,
  "dataset": "hrbp"
}/*EDITMODE-END*/;

function loadTweaks() {
  try {
    const saved = JSON.parse(localStorage.getItem('sm.tweaks') || '{}');
    return { ...TWEAK_DEFAULTS, ...saved };
  } catch { return { ...TWEAK_DEFAULTS }; }
}
function saveTweaks(t) {
  localStorage.setItem('sm.tweaks', JSON.stringify(t));
  window.parent.postMessage({ type: '__edit_mode_set_keys', edits: t }, '*');
}

function loadNav() {
  try { return JSON.parse(localStorage.getItem('sm.nav') || '{}'); } catch { return {}; }
}

const MODULES = [
  { id: 'mapping',     label: 'Skill Mapping',     icon: 'mapping' },
  { id: 'assessment',  label: 'Skill Assessment',  icon: 'assessment' },
  { id: 'gap',         label: 'Gap Analysis',      icon: 'gap' },
  { id: 'development', label: 'Skill Development', icon: 'development' },
];

function App() {
  const [tweaks, setTweaks] = useState(loadTweaks);
  const [editMode, setEditMode] = useState(false);

  const nav0 = loadNav();
  const [moduleId, setModuleId] = useState(nav0.moduleId || 'mapping');
  const [stage, setStage] = useState(nav0.stage || 'input');
  const [skillId, setSkillId] = useState(nav0.skillId || null);
  const [params, setParams] = useState(nav0.params || null);
  const [project, setProject] = useState(nav0.project || null);
  const [showAria, setShowAria] = useState(false);

  useEffect(() => {
    localStorage.setItem('sm.nav', JSON.stringify({ moduleId, stage, skillId, params, project }));
  }, [moduleId, stage, skillId, params, project]);

  useEffect(() => {
    const handler = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setEditMode(true);
      if (d.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const setTweak = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next); saveTweaks(next);
  };

  const role = ROLES[tweaks.dataset] || ROLES.hrbp;
  const horizon = Number(tweaks.horizon) || 3;
  const projected = useMemo(() => projectSkills(role.skills, horizon), [role, horizon]);

  // -------- mapping navigation --------
  const runPipeline = (p) => { setParams(p); setStage('pipeline'); if (p?.horizon) setTweak('horizon', p.horizon); };
  const openDashboard = () => setStage('dashboard');
  const openSkill = (id) => { setSkillId(id); setStage('detail'); };
  const closeSkill = () => setStage('dashboard');
  const backToInput = () => setStage('input');

  // -------- assessment navigation --------
  const startAssessmentFromMapping = () => {
    setModuleId('assessment');
    setStage('a.create');
  };
  const createProject = (cfg) => {
    const p = { ...cfg, projected, role, createdAt: new Date().toISOString() };
    setProject(p);
    setStage('a.invite');
  };
  const launchAssessment = () => setStage('a.progress');
  const openReport = () => setStage('a.report');
  const goGap = () => { setModuleId('gap'); setStage('g.main'); };
  const goDevelopment = () => { setModuleId('development'); setStage('d.main'); };
  const goPickMentor = () => { setModuleId('development'); setStage('d.mentors'); };
  const goCoachee = () => { setModuleId('development'); setStage('d.coachee'); };

  const switchModule = (id) => {
    setModuleId(id);
    if (id === 'mapping')     setStage(stage.startsWith('a.') || stage.startsWith('g.') || stage.startsWith('d.') ? 'dashboard' : stage);
    if (id === 'assessment')  setStage('a.report');
    if (id === 'gap')         setStage('g.main');
    if (id === 'development') setStage('d.main');
    if ((id === 'assessment' || id === 'gap' || id === 'development') && !project) {
      setProject({
        name: `${role.title} — Q2 2026 baseline`,
        aType: '360', ariaOn: true, limit: 30, country: 'Italy', period: '14 days',
        projected, role,
      });
    }
  };

  return (
    <div
      className={`theme-${tweaks.theme} ${tweaks.dense ? 'dense' : ''}`}
      data-screen-label={moduleLabel(moduleId, stage)}
      style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)' }}
    >
      <TopBar moduleId={moduleId} onSwitchModule={switchModule} role={role} project={project} />

      {moduleId === 'mapping' && (
        <>
          {stage === 'input' && <InputStage onRun={runPipeline} dataset={tweaks.dataset} setDataset={(d)=>setTweak('dataset', d)} />}
          {stage === 'pipeline' && <PipelineStage onDone={openDashboard} params={{ ...params, horizon }} />}
          {stage === 'dashboard' && <DashboardStage role={role} horizon={horizon} onOpen={openSkill} onBack={backToInput} onAssess={startAssessmentFromMapping} />}
          {stage === 'detail' && <DetailStage role={role} horizon={horizon} skillId={skillId} onClose={closeSkill} onOpen={openSkill} />}
        </>
      )}

      {moduleId === 'assessment' && (
        <AssessmentShell active={stage === 'a.create' ? 'projects' : 'projects'} onNav={() => {}}>
          {stage === 'a.create' && (
            <CreateAssessmentProject
              role={role} projected={projected}
              onNext={createProject}
              onCancel={() => { setModuleId('mapping'); setStage('dashboard'); }}
            />
          )}
          {stage === 'a.invite' && project && (
            <InviteStage project={project} onLaunch={launchAssessment} onBack={() => setStage('a.create')} />
          )}
          {stage === 'a.progress' && project && (
            <AssessmentProgress
              project={project}
              onOpenAria={() => setShowAria(true)}
              onOpenReport={openReport}
            />
          )}
          {stage === 'a.report' && project && (
            <IndividualReport
              project={project} role={role}
              onGap={goGap}
              onDevelopment={goDevelopment}
              onMentors={goPickMentor}
              onBack={() => setStage('a.progress')}
            />
          )}
        </AssessmentShell>
      )}

      {moduleId === 'gap' && project && (
        <GapAnalysisStage
          role={role}
          onDevelopment={goDevelopment}
          onBack={() => { setModuleId('assessment'); setStage('a.report'); }}
        />
      )}

      {moduleId === 'development' && project && (
        <>
          {stage === 'd.main' && (
            <DevelopmentPlanStage
              role={role}
              onBack={() => { setModuleId('gap'); setStage('g.main'); }}
              onStartPractice={() => setShowAria(true)}
              onPickMentor={goPickMentor}
              onCoacheeView={goCoachee}
            />
          )}
          {stage === 'd.mentors' && (
            <PickMentorStage
              role={role}
              onBack={() => setStage('d.main')}
              onPick={() => setStage('d.coachee')}
            />
          )}
          {stage === 'd.coachee' && (
            <CoacheeDashboardStage
              role={role}
              mentorId="m1"
              onBack={() => setStage('d.main')}
              onBookCheckIn={() => setShowAria(true)}
            />
          )}
        </>
      )}

      {showAria && <AriaInterviewModal onClose={() => setShowAria(false)} onComplete={() => { setShowAria(false); setModuleId('assessment'); setStage('a.report'); }} />}

      {editMode && (
        <div className="tweaks-panel">
          <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 18, marginBottom: 6, color: '#fff' }}>Tweaks</div>
          <div style={{ fontSize: 10, color: '#9da1a8', marginBottom: 14, letterSpacing: '.1em', textTransform: 'uppercase' }}>Live — saves to file</div>

          <label className="grp">Aesthetic</label>
          <div className="row">
            {[
              {v:'pack', l:'Pack'}, {v:'editorial', l:'Editorial'}, {v:'engine', l:'Engine'},
            ].map(o => (
              <button key={o.v} className={`chip ${tweaks.theme === o.v ? 'on' : ''}`} onClick={()=>setTweak('theme', o.v)}>{o.l}</button>
            ))}
          </div>

          <label className="grp">Horizon</label>
          <div className="row">
            {[1,3,5,7].map(y => (
              <button key={y} className={`chip ${Number(tweaks.horizon) === y ? 'on' : ''}`} onClick={()=>setTweak('horizon', y)}>{y}y</button>
            ))}
          </div>

          <label className="grp">Jump to module</label>
          <div className="row">
            {MODULES.map(m => (
              <button key={m.id} className={`chip ${moduleId === m.id ? 'on' : ''}`} onClick={() => switchModule(m.id)}>
                {m.label.split(' ').slice(-1)[0]}
              </button>
            ))}
          </div>

          <label className="grp">Mapping stage</label>
          <div className="row">
            {['input','pipeline','dashboard','detail'].map(s => (
              <button key={s} className={`chip ${stage === s ? 'on' : ''}`} onClick={()=>{
                setModuleId('mapping');
                if (s === 'detail' && !skillId) setSkillId(role.skills[0].id);
                setStage(s);
              }}>{s}</button>
            ))}
          </div>

          <label className="grp">Assessment stage</label>
          <div className="row">
            {[
              ['a.create','create'], ['a.invite','invite'],
              ['a.progress','progress'], ['a.report','report'],
            ].map(([s, l]) => (
              <button key={s} className={`chip ${stage === s ? 'on' : ''}`} onClick={()=>{
                setModuleId('assessment'); setStage(s);
                if (!project) setProject({
                  name: `${role.title} — Q2 2026 baseline`,
                  aType: '360', ariaOn: true, limit: 30, country: 'Italy', period: '14 days',
                  projected, role,
                });
              }}>{l}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function moduleLabel(m, s) {
  const mod = ({ mapping:'01 Mapping', assessment:'02 Assessment', gap:'03 Gap', development:'04 Development' })[m] || m;
  return `${mod} · ${s}`;
}

function TopBar({ moduleId, onSwitchModule, role, project }) {
  return (
    <header style={{
      display: 'grid', gridTemplateColumns: 'auto 1fr auto',
      alignItems: 'center', padding: '0 28px', height: 64,
      borderBottom: '1px solid var(--rule)',
      background: 'var(--panel)',
      position: 'sticky', top: 0, zIndex: 50,
      backdropFilter: 'saturate(140%) blur(10px)',
    }}>
      <button onClick={() => onSwitchModule('mapping')} style={{
        display: 'inline-flex', alignItems: 'center', gap: 12,
        background: 'transparent', border: 0, cursor: 'pointer', padding: 0,
      }}>
        <img src={(window.__resources && window.__resources.packLogo) || "assets/pack-black.svg"} alt="Pack" style={{ height: 22, width: 'auto', display: 'block' }} />
        <span style={{
          fontSize: 11, color: 'var(--muted)', fontWeight: 600,
          letterSpacing: '.06em', textTransform: 'uppercase',
          paddingLeft: 12, marginLeft: 4, borderLeft: '1px solid var(--rule)',
        }}>Skills Platform</span>
      </button>

      <nav style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        {MODULES.map(m => {
          const active = m.id === moduleId;
          return (
            <button key={m.id} onClick={() => onSwitchModule(m.id)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 14px', borderRadius: 8, cursor: 'pointer',
              background: active ? 'var(--accent-soft)' : 'transparent',
              color: active ? 'var(--accent-700)' : 'var(--muted)',
              border: 0, fontFamily: 'var(--fam-body)', fontSize: 13,
              fontWeight: active ? 600 : 500,
              transition: 'background .15s, color .15s',
            }}>
              <ModuleIcon name={m.icon} active={active} />
              {m.label}
            </button>
          );
        })}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end' }}>
        {project && moduleId !== 'mapping' && (
          <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'right' }}>
            <div style={{ color: 'var(--ink)', fontWeight: 500 }}>{ASSESSED_PERSON.name}</div>
            <div>{role.title}</div>
          </div>
        )}
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-soft)',
          color: 'var(--accent-700)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 600, fontSize: 12, border: '1px solid var(--rule-strong)',
        }}>V</div>
      </div>
    </header>
  );
}

function ModuleIcon({ name, active }) {
  const paths = {
    mapping:    'M3 6h18M3 12h18M3 18h18 M9 3v18 M15 3v18',
    assessment: 'M9 11l3 3 8-8 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
    gap:        'M3 21V3 M3 21h18 M7 16l4-4 3 3 5-7',
    development:'M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5',
  };
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke={active ? 'var(--accent)' : 'currentColor'}
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || paths.mapping}/>
    </svg>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
