<script lang="ts">
	import SkillStatusChip from '../skill-status-chip/skill-status-chip.svelte';
	import OwnerGlyph from '../owner-glyph/owner-glyph.svelte';
	import UrgencyBadge from '../urgency-badge/urgency-badge.svelte';
	import TrajectoryArrow from '../trajectory-arrow/trajectory-arrow.svelte';
	import type { SkillListRow } from '../types';

	let { row, layout = 'grid' }: { row: SkillListRow; layout?: 'grid' | 'contents' } = $props();
</script>

<div
	class={layout === 'contents'
		? 'contents'
		: 'grid grid-cols-[1fr_120px_140px_110px_140px] items-center gap-2 px-5 py-3.5 text-left'}
>
	<div>
		<div class="text-sm font-semibold text-foreground">{row.name}</div>
		{#if row.description}
			<div class="mt-0.5 text-xs text-muted-foreground">{row.description}</div>
		{/if}
	</div>
	<SkillStatusChip status={row.status} />
	<OwnerGlyph owner={row.owner} />
	<UrgencyBadge level={row.urgency} />
	<div class="text-right">
		<TrajectoryArrow value={row.trajectory} />
	</div>
</div>
