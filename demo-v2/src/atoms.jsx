// Shared atoms: chips, icons, radar, meter

const { useMemo, useState, useEffect, useRef } = React;

function StatusChip({ status, compact = false }) {
  const meta = STATUS_META[status];
  if (!meta) return null;
  const variant = { pos: 'secondary', neu: 'outline', neg: 'destructive', new: 'default' }[meta.tone] || 'outline';
  const Ds = window.KigenDesignSystem_093b66 || {};
  return (
    <Ds.Badge variant={variant} style={compact ? { height: 20, padding: '0 8px', fontSize: 11 } : undefined}>
      {meta.label}
    </Ds.Badge>
  );
}

function OwnerGlyph({ owner }) {
  const m = OWNER_META[owner];
  const color = owner === 'human' ? 'var(--ok)' :
                owner === 'hybrid' ? 'var(--accent)' :
                owner === 'ai' ? 'var(--new)' : 'var(--muted)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ink)' }}>
      <span style={{ color, fontSize: 11 }}>{m.glyph}</span>
      <span style={{ fontSize: 12 }}>{m.short}</span>
    </span>
  );
}

function Pill({ children, tone = 'neutral' }) {
  const Ds = window.KigenDesignSystem_093b66 || {};
  return (
    <Ds.Badge variant={tone === 'accent' ? 'default' : 'secondary'}>
      {children}
    </Ds.Badge>
  );
}

function Meter({ value, label }) {
  const v = Math.max(0, Math.min(100, value));
  const Ds = window.KigenDesignSystem_093b66 || {};
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted-foreground)' }}>
        <span>{label}</span>
        <span style={{ color: 'var(--foreground)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(v)}%</span>
      </div>
      <Ds.Progress value={v} />
    </div>
  );
}

// Small radar chart for 5 dims (0..100)
function Radar({ dims, size = 220, showLabels = true, palette }) {
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - (showLabels ? 34 : 12);
  const axes = DIMS; // 5 axes
  const angle = (i) => (Math.PI * 2 * i) / axes.length - Math.PI / 2;
  const point = (i, v) => {
    const rad = r * (v / 100);
    return [cx + Math.cos(angle(i)) * rad, cy + Math.sin(angle(i)) * rad];
  };
  const poly = axes.map((a, i) => point(i, dims[a.key])).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const gridLevels = [25, 50, 75, 100];

  const accent = palette?.accent || 'var(--accent)';
  const ring = palette?.ring || 'var(--rule)';
  const labelCol = palette?.label || 'var(--muted)';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      {/* rings */}
      {gridLevels.map((lv) => {
        const pts = axes.map((_, i) => point(i, lv)).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
        return <polygon key={lv} points={pts} fill="none" stroke={ring} strokeWidth={1} strokeDasharray={lv === 100 ? '' : '2,3'} />;
      })}
      {/* axes */}
      {axes.map((a, i) => {
        const [x, y] = point(i, 100);
        return <line key={a.key} x1={cx} y1={cy} x2={x} y2={y} stroke={ring} strokeWidth={1} />;
      })}
      {/* polygon */}
      <polygon points={poly} fill={accent} fillOpacity={0.18} stroke={accent} strokeWidth={1.5} />
      {axes.map((a, i) => {
        const [x, y] = point(i, dims[a.key]);
        return <circle key={a.key} cx={x} cy={y} r={3} fill={accent} />;
      })}
      {/* labels */}
      {showLabels && axes.map((a, i) => {
        const [lx, ly] = point(i, 122);
        const anchor = Math.abs(Math.cos(angle(i))) < 0.3 ? 'middle' : Math.cos(angle(i)) > 0 ? 'start' : 'end';
        return (
          <text key={a.key} x={lx} y={ly} fill={labelCol} fontSize={10}
            textAnchor={anchor} dominantBaseline="middle" fontFamily="var(--fam-mono)"
            style={{ letterSpacing: '.02em' }}
          >
            {a.label.toUpperCase()}
          </text>
        );
      })}
    </svg>
  );
}

function TinyRadar({ dims, size = 44 }) {
  return <Radar dims={dims} size={size} showLabels={false} />;
}

// Multi-series radar — axes generic, supports 2+ overlaid polygons.
// values per series are 0..100.
function RadarChart({ axes, series, size = 360, labelSize = 11 }) {
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - 64;
  const a = (i) => (Math.PI * 2 * i) / axes.length - Math.PI / 2;
  const pt = (i, v) => {
    const rad = r * (Math.max(0, Math.min(100, v)) / 100);
    return [cx + Math.cos(a(i)) * rad, cy + Math.sin(a(i)) * rad];
  };
  const rings = [25, 50, 75, 100];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible', display: 'block' }}>
      {/* Concentric rings */}
      {rings.map(lv => {
        const pts = axes.map((_, i) => pt(i, lv)).map(([x,y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
        return <polygon key={lv} points={pts} fill="none" stroke="var(--rule)" strokeWidth={1} strokeDasharray={lv === 100 ? '' : '2,3'} />;
      })}
      {/* Spokes */}
      {axes.map((ax, i) => {
        const [x, y] = pt(i, 100);
        return <line key={ax.key} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--rule)" strokeWidth={1} />;
      })}
      {/* Series polygons */}
      {series.map((s, si) => {
        const pts = axes.map((ax, i) => pt(i, s.values[ax.key] ?? 0)).map(([x,y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
        return (
          <g key={s.name}>
            <polygon points={pts} fill={s.color} fillOpacity={s.fillOpacity ?? 0.15} stroke={s.color} strokeWidth={s.strokeWidth ?? 2} strokeDasharray={s.dashed ? '5,4' : ''} />
            {axes.map((ax, i) => {
              const [x, y] = pt(i, s.values[ax.key] ?? 0);
              return <circle key={`${s.name}-${ax.key}`} cx={x} cy={y} r={3} fill={s.color} />;
            })}
          </g>
        );
      })}
      {/* Labels */}
      {axes.map((ax, i) => {
        const [lx, ly] = pt(i, 122);
        const cos = Math.cos(a(i));
        const anchor = Math.abs(cos) < 0.3 ? 'middle' : cos > 0 ? 'start' : 'end';
        return (
          <text key={ax.key} x={lx} y={ly} fill="var(--ink)" fontSize={labelSize}
            textAnchor={anchor} dominantBaseline="middle"
            fontFamily="var(--fam-body)" fontWeight={500} style={{ letterSpacing: '.01em' }}>
            <tspan>{ax.label}</tspan>
            {ax.sub && (
              <tspan x={lx} dy={labelSize + 2} fill="var(--muted)" fontSize={labelSize - 1} fontWeight={400}>{ax.sub}</tspan>
            )}
          </text>
        );
      })}
    </svg>
  );
}

function Tabs({ tabs, value, onChange }) {
  const Ds = window.KigenDesignSystem_093b66 || {};
  return (
    <Ds.Tabs
      key={value}
      tabs={tabs.map((tab) => ({ value: tab.id, label: tab.label }))}
      defaultValue={value}
      onChange={onChange}
    />
  );
}

function ChipGroup({ options, value, onChange }) {
  const Ds = window.KigenDesignSystem_093b66 || {};
  return (
    <Ds.ToggleGroup>
      {options.map((opt) => (
        <Ds.Toggle
          key={opt.value}
          pressed={value === opt.value}
          onPressedChange={() => onChange(opt.value)}
          size="sm"
        >
          {opt.label}
        </Ds.Toggle>
      ))}
    </Ds.ToggleGroup>
  );
}

function Kbd({ children }) {
  const Ds = window.KigenDesignSystem_093b66 || {};
  return <Ds.Kbd keys={children} />;
}

function SectionLabel({ n, children }) {
  return (
    <div style={{
      fontFamily: 'var(--fam-body)', fontSize: 14, fontWeight: 600,
      color: 'var(--ink)', marginBottom: 14,
    }}>
      {children}
    </div>
  );
}

Object.assign(window, {
  StatusChip, OwnerGlyph, Pill, Meter, Radar, TinyRadar, RadarChart,
  Tabs, ChipGroup, Kbd, SectionLabel,
});
