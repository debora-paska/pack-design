// Gap Analysis — mapping target vs assessment outcome on 1–5 axis

const Ds = window.KigenDesignSystem_093b66 || {};
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
            Where {ASSESSED_PERSON.name.split(' ')[0]} stands vs the {role.title} target
          </h1>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            Targets come from the Skill Mapping output · Outcomes from the May 2026 assessment · 3-year horizon
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Ds.Button variant="outline" onClick={onBack}>← Report</Ds.Button>
          <Ds.Button variant="outline">Export</Ds.Button>
          <Ds.Button variant="primary" onClick={onDevelopment}>Build development plan →</Ds.Button>
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
              <li>Sara <strong>self-rates higher</strong> than peers on coaching — calibrate via observed sessions.</li>
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
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>Sara now vs target — full skill profile</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
            Levels 1–5 across the {top.length} most important HRBP skills. Dashed line shows where the role is heading in 3 years.
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
              { name: 'Sara now',  color: '#9c2b2b',         values: nowVals,    fillOpacity: 0.18, strokeWidth: 2 },
              { name: 'Target',    color: 'var(--ink)',       values: targetVals, fillOpacity: 0.06, strokeWidth: 1.5 },
              { name: 'In +3y',    color: 'var(--accent)',    values: futureVals, fillOpacity: 0,    strokeWidth: 1.5, dashed: true },
            ]}
            size={460}
          />
        </div>
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 18 }}>
            <Legend swatch="#9c2b2b" label="Sara — now" />
            <Legend swatch="var(--ink)" label="Today's target (from mapping)" />
            <Legend swatch="var(--accent)" dashed label="+3y target (with role shift)" />
          </div>
          <p style={{ margin: 0, color: 'var(--ink)', fontSize: 14, lineHeight: 1.6 }}>
            The role's <strong>target shape pushes outward</strong> over the next 3 years on workforce planning, data
            storytelling, and AI fluency — the same axes where Sara is furthest behind today. Closing the gap to
            today's target alone is not enough; the plan should aim at the dashed line.
          </p>
          <div style={{ marginTop: 18, padding: 14, background: 'var(--panel-2)', border: '1px solid var(--rule)', borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>Reading the chart</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: 'var(--ink)', lineHeight: 1.6 }}>
              <li><strong>Filled red</strong> — where Sara is today</li>
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
