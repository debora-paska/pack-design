<script lang="ts">
	import {
		ChartMixedOutline,
		ChartPieOutline,
		FileLinesOutline,
		UsersGroupOutline
	} from 'flowbite-svelte-icons';
	import { Card } from '../../ui/card/index.js';
	import type { OverviewStatVariant } from '../types';

	let {
		variant = 'coverage',
		label,
		value,
		meta
	}: {
		variant?: OverviewStatVariant;
		label: string;
		value: string;
		meta: string;
	} = $props();
</script>

<Card class="w-full min-w-0 flex-row items-center gap-3 py-3.5 [--card-spacing:--spacing(4)]">
	<div
		class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-500"
	>
		{#if variant === 'coverage'}
			<ChartPieOutline class="size-6" />
		{:else if variant === 'families'}
			<UsersGroupOutline class="size-6" />
		{:else if variant === 'skills'}
			<ChartMixedOutline class="size-6" />
		{:else}
			<FileLinesOutline class="size-6" />
		{/if}
	</div>
	<div class="min-w-0">
		<div class="truncate text-[13px] text-muted-foreground">{label}</div>
		<div class="my-0.5 truncate text-2xl font-semibold tracking-tight text-foreground">{value}</div>
		<div class="truncate text-xs text-muted-foreground">{meta}</div>
	</div>
</Card>
