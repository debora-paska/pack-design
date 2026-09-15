<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';

	let {
		value,
		target
	}: {
		value: number;
		target: number;
	} = $props();

	const toPercent = (level: number) => Math.max(0, Math.min(100, ((level - 1) / 4) * 100));
	const valuePercent = $derived(toPercent(value));
	const targetPercent = $derived(toPercent(target));
	const toneClass = $derived(
		value >= target
			? 'bg-success-400'
			: value >= target - 0.6
				? 'bg-warning-400'
				: 'bg-error-400'
	);
</script>

<div class="relative h-3">
	<div class="absolute top-1 right-0 left-0 h-1 rounded-sm border border-gray-5 bg-gray-3"></div>
	<div
		class={cn('absolute top-1 left-0 h-1 rounded-sm', toneClass)}
		style="width: {valuePercent}%"
	></div>
	<div
		class="absolute top-[-2px] h-4 w-0.5 bg-foreground"
		style="left: calc({targetPercent}% - 1px)"
		title="Target Level {target}"
	></div>
</div>
