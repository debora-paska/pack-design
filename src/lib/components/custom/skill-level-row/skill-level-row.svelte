<script lang="ts">
	import UniversalChip from '../universal-chip/universal-chip.svelte';
	import LevelBarRow from '../level-bar-row/level-bar-row.svelte';
	import type { SkillConfidence } from '../types';

	let {
		name,
		targetLabel,
		self,
		manager,
		peer,
		value,
		target,
		confidence
	}: {
		name: string;
		targetLabel: string;
		self: string;
		manager: string;
		peer: string;
		value: number;
		target: number;
		confidence: SkillConfidence;
	} = $props();
</script>

<div
	class="grid grid-cols-[minmax(0,1.8fr)_minmax(5rem,1fr)_minmax(7rem,240px)_4.5rem_4.5rem] items-center gap-3 border-t border-gray-5 px-[18px] py-3.5 first:border-t-0"
>
	<div class="min-w-0">
		<div class="text-sm font-semibold text-foreground">{name}</div>
		<div class="mt-0.5 text-[11px] text-muted-foreground">{targetLabel}</div>
	</div>
	<div class="text-xs text-foreground">
		<div>Self <span class="text-muted-foreground">{self}</span></div>
		<div>
			Mgr <span class="text-muted-foreground">{manager}</span> · Peer
			<span class="text-muted-foreground">{peer}</span>
		</div>
	</div>
	<LevelBarRow {value} {target} />
	<div class="text-right text-[15px] font-semibold tabular-nums text-foreground">
		{value.toFixed(2)}
	</div>
	<div class="text-right">
		<UniversalChip color={confidence === 'high' ? 'success' : 'warning'}>{confidence}</UniversalChip>
	</div>
</div>
