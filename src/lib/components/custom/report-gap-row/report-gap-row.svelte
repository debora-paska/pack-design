<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';

	let {
		rank,
		name,
		currentLevel,
		targetLevel,
		gap
	}: {
		rank: number;
		name: string;
		currentLevel: number;
		targetLevel: number;
		gap: number;
	} = $props();

	const toPercent = (level: number) => Math.max(0, Math.min(100, ((level - 1) / 4) * 100));
	const currentPercent = $derived(toPercent(currentLevel));
	const targetPercent = $derived(toPercent(targetLevel));
	const isLargeGap = $derived(gap > 1);
	const toneClass = $derived(isLargeGap ? 'bg-error-400' : 'bg-warning-400');
	const textToneClass = $derived(isLargeGap ? 'text-error-400' : 'text-warning-400');
	const spanLeft = $derived(Math.min(currentPercent, targetPercent));
	const spanWidth = $derived(Math.abs(currentPercent - targetPercent));
</script>

<div class="grid grid-cols-[32px_minmax(0,1.2fr)_minmax(7rem,1fr)_4.5rem] items-center gap-3">
	<div
		class={cn(
			'flex size-[26px] items-center justify-center rounded-full text-xs font-bold text-white',
			toneClass
		)}
	>
		{rank}
	</div>
	<div class="min-w-0">
		<div class="text-sm font-semibold text-foreground">{name}</div>
		<div class="mt-0.5 text-[11px] text-muted-foreground">
			Now Level {currentLevel.toFixed(2)} · Target Level {targetLevel}
		</div>
	</div>
	<div class="relative h-[22px]">
		<div class="absolute top-2.5 right-0 left-0 h-0.5 bg-gray-5"></div>
		<div
			class={cn('absolute top-2 h-1.5 rounded-sm opacity-25', toneClass)}
			style="left: {spanLeft}%; width: {spanWidth}%"
		></div>
		<div
			class="absolute top-1 size-3.5 rounded-full border-2 border-foreground bg-card"
			style="left: calc({targetPercent}% - 7px)"
		></div>
		<div
			class={cn('absolute top-[5px] size-3 rounded-full border-2 border-card shadow-[0_0_0_1px_var(--foreground)]', toneClass)}
			style="left: calc({currentPercent}% - 6px)"
		></div>
	</div>
	<div class={cn('text-right text-base font-bold tabular-nums', textToneClass)}>
		−{gap.toFixed(2)}
	</div>
</div>
