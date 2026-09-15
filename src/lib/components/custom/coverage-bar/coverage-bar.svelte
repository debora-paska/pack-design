<script lang="ts">
	import type { CoverageBarColor } from '../types';

	let {
		label,
		count,
		widthPercent,
		color = 'primary'
	}: {
		label: string;
		count: string;
		widthPercent: number;
		color?: CoverageBarColor;
	} = $props();

	const fillClass: Record<CoverageBarColor, string> = {
		primary: 'bg-primary-500',
		'primary-soft': 'bg-primary-300',
		success: 'bg-success-400',
		warning: 'bg-warning-300',
		error: 'bg-error-400',
		info: 'bg-info-400',
		muted: 'bg-gray-6'
	};

	const clampedWidth = $derived(Math.max(0, Math.min(100, widthPercent)));
</script>

<div class="flex flex-col gap-1.5">
	<div class="flex justify-between text-[13px]">
		<span class="text-gray-11">{label}</span>
		<span class="font-semibold text-foreground">{count}</span>
	</div>
	<div class="h-3 overflow-hidden rounded-full bg-gray-3">
		<div class="h-full rounded-full {fillClass[color]}" style="width: {clampedWidth}%"></div>
	</div>
</div>
