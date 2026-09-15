// Input stage — Job Family / Role / Tasks / Upload

const Ds = window.KigenDesignSystem_093b66 || {};
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
          <h1 style={{
            margin: 0, fontFamily: 'var(--fam-body)',
            fontSize: 28, lineHeight: 1.2, fontWeight: 600, color: 'var(--ink)',
          }}>
            New skill mapping
          </h1>
          <p style={{ color: 'var(--muted)', maxWidth: 680, fontSize: 14, lineHeight: 1.55, marginTop: 6, marginBottom: 0 }}>
            See how any role in your organisation will change over the next few years
            — which skills will grow, which will fade, and where AI will reshape the work.
            Tell us the job, and we&rsquo;ll return a skill map, a forward view, and the
            talent actions to get ahead of it.
          </p>
        </div>

        <div style={{
          background: 'var(--panel)', borderRadius: 'var(--radius)',
          border: '1px solid var(--rule)', overflow: 'hidden',
        }}>
          <Tabs tabs={tabs} value={entry} onChange={setEntry} />
          <div style={{ padding: 24 }}>
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
