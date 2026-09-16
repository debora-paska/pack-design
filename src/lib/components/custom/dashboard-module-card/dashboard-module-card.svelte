<script lang="ts">
	import { GiftBoxOutline, LockOutline } from 'flowbite-svelte-icons';
	import { cn } from '@pack/ui/lib/utils.js';
	import { Button } from '../../ui/button/index.js';
	import { Card } from '../../ui/card/index.js';
	import { CardContent } from '../../ui/card/index.js';
	import UniversalChip from '../universal-chip/universal-chip.svelte';
	import DashboardModuleVisual from './dashboard-module-visual.svelte';
	import type { DashboardModuleVisual as DashboardModuleVisualName } from './dashboard-module-visual.svelte';

	export type DashboardModuleStat = {
		label: string;
		value: string;
	};

	export type DashboardModuleStatus = 'default' | 'freeTrial' | 'notActive';

	export type { DashboardModuleVisualName as DashboardModuleVisual };

	let {
		eyebrow,
		value,
		unit,
		stats = [],
		callToAction,
		visual = 'radar',
		status = 'default',
		statusLabel,
		tokenLabel,
		notice,
		onSelect
	}: {
		eyebrow: string;
		value: string;
		unit: string;
		stats?: DashboardModuleStat[];
		callToAction: string;
		visual?: DashboardModuleVisualName;
		status?: DashboardModuleStatus;
		statusLabel?: string;
		tokenLabel?: string;
		notice?: string;
		onSelect?: () => void;
	} = $props();

	const isFreeTrial = $derived(status === 'freeTrial');
	const isNotActive = $derived(status === 'notActive');
	const isPurchaseState = $derived(isFreeTrial || isNotActive);

	const resolvedStatusLabel = $derived(statusLabel ?? (isNotActive ? 'Not active' : ''));
	const resolvedTokenLabel = $derived(tokenLabel ?? (isFreeTrial ? 'Free 1 token' : ''));
	const resolvedNotice = $derived(
		notice ??
			(isFreeTrial
				? `Your company has 1 complimentary ${eyebrow} token. Use it on one run, then unlock the product to keep going.`
				: isNotActive
					? `Unlock ${eyebrow} to activate this product. Purchase includes 1 complimentary token to get started.`
					: '')
	);
</script>

<Card
	class={cn(
		'relative min-h-[240px] overflow-hidden py-[22px] shadow-none [--card-spacing:--spacing(6)]',
		!isNotActive && 'bg-white'
	)}
>
	<DashboardModuleVisual {visual} />
	<CardContent class="relative max-w-[72%]">
		<div class="mb-3 flex flex-wrap items-center gap-2">
			<div
				class={cn(
					'text-[11.5px] font-semibold tracking-[0.07em] text-muted-foreground uppercase',
					isNotActive && 'opacity-80'
				)}
			>
				{eyebrow}
			</div>
			{#if isFreeTrial}
				<UniversalChip color="orange">{resolvedTokenLabel}</UniversalChip>
			{:else if isNotActive}
				<UniversalChip color="gray">{resolvedStatusLabel}</UniversalChip>
			{/if}
		</div>
		<div class={cn(isNotActive && 'opacity-80')}>
			<div class="flex items-baseline gap-2.5">
				<span class="text-[44px] leading-none font-bold tracking-[-0.03em] text-foreground">
					{value}
				</span>
				<span class="text-[13px] text-muted-foreground">{unit}</span>
			</div>
			{#if stats.length > 0}
				<div class="mt-4 flex flex-wrap gap-2">
					{#each stats as stat (`${stat.label}-${stat.value}`)}
						<UniversalChip
							color="gray"
							class="rounded-full border border-gray-5 bg-muted px-3 py-1.5 text-xs font-normal text-muted-foreground"
						>
							{stat.label}
							<span class="ml-1 text-[13px] font-semibold text-foreground">{stat.value}</span>
						</UniversalChip>
					{/each}
				</div>
			{/if}
		</div>
		{#if isPurchaseState && resolvedNotice}
			<div
				class="mt-4 flex items-start gap-2.5 rounded-lg border border-primary-100 bg-primary-50 px-3 py-2.5"
			>
				{#if isFreeTrial}
					<GiftBoxOutline class="mt-0.5 size-4 shrink-0 text-primary-500" />
				{:else}
					<LockOutline class="mt-0.5 size-4 shrink-0 text-primary-500" />
				{/if}
				<p class="m-0 text-[12.5px] leading-snug text-foreground">{resolvedNotice}</p>
			</div>
		{/if}
		<div class="mt-4">
			<Button iconName="arrow-right" iconAtEnd onclick={onSelect}>{callToAction}</Button>
		</div>
	</CardContent>
</Card>
