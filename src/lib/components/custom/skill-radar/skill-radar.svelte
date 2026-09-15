<script lang="ts">
	import type { SkillRadarAxis, SkillRadarSeries } from '../types';

	let {
		axes,
		series,
		size = 360,
		labelSize = 11,
		showLabels = true
	}: {
		axes: SkillRadarAxis[];
		series: SkillRadarSeries[];
		size?: number;
		labelSize?: number;
		showLabels?: boolean;
	} = $props();

	const center = $derived(size / 2);
	const radius = $derived(size / 2 - (showLabels ? 64 : 12));
	const rings = [25, 50, 75, 100];

	function angleForIndex(index: number): number {
		return (Math.PI * 2 * index) / axes.length - Math.PI / 2;
	}

	function pointFor(index: number, value: number): [number, number] {
		const rad = radius * (Math.max(0, Math.min(100, value)) / 100);
		const angle = angleForIndex(index);
		return [center + Math.cos(angle) * rad, center + Math.sin(angle) * rad];
	}

	function polygonPoints(levelOrValues: number | Record<string, number>): string {
		return axes
			.map((axis, index) => {
				const value =
					typeof levelOrValues === 'number' ? levelOrValues : (levelOrValues[axis.key] ?? 0);
				return pointFor(index, value)
					.map((coordinate) => coordinate.toFixed(1))
					.join(',');
			})
			.join(' ');
	}

	function labelAnchor(index: number): 'middle' | 'start' | 'end' {
		const cosine = Math.cos(angleForIndex(index));
		if (Math.abs(cosine) < 0.3) return 'middle';
		return cosine > 0 ? 'start' : 'end';
	}
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 {size} {size}"
	class="block overflow-visible"
	role="img"
	aria-label="Skill radar chart"
>
	{#each rings as level (level)}
		<polygon
			points={polygonPoints(level)}
			fill="none"
			stroke="var(--border)"
			stroke-width="1"
			stroke-dasharray={level === 100 ? '' : '2,3'}
		/>
	{/each}
	{#each axes as axis, index (axis.key)}
		{@const [x, y] = pointFor(index, 100)}
		<line x1={center} y1={center} x2={x} y2={y} stroke="var(--border)" stroke-width="1" />
	{/each}
	{#each series as item (item.name)}
		<g>
			<polygon
				points={polygonPoints(item.values)}
				fill={item.color}
				fill-opacity={item.fillOpacity ?? 0.15}
				stroke={item.color}
				stroke-width={item.strokeWidth ?? 2}
				stroke-dasharray={item.dashed ? '5,4' : ''}
			/>
			{#each axes as axis, index (`${item.name}-${axis.key}`)}
				{@const [x, y] = pointFor(index, item.values[axis.key] ?? 0)}
				<circle cx={x} cy={y} r="3" fill={item.color} />
			{/each}
		</g>
	{/each}
	{#if showLabels}
		{#each axes as axis, index (axis.key)}
			{@const [labelX, labelY] = pointFor(index, 122)}
			<text
				x={labelX}
				y={labelY}
				fill="var(--foreground)"
				font-size={labelSize}
				text-anchor={labelAnchor(index)}
				dominant-baseline="middle"
				font-weight="500"
			>
				<tspan>{axis.label}</tspan>
				{#if axis.sub}
					<tspan
						x={labelX}
						dy={labelSize + 2}
						fill="var(--muted-foreground)"
						font-size={labelSize - 1}
						font-weight="400">{axis.sub}</tspan
					>
				{/if}
			</text>
		{/each}
	{/if}
</svg>
