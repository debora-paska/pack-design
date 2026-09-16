<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import { Button } from '../../ui/button/index.js';
	import { Card } from '../../ui/card/index.js';
	import Chip from '../chip/chip.svelte';
	import DashboardFeatureVisual from './dashboard-feature-visual.svelte';
	import type { DashboardFeatureVisual as DashboardFeatureVisualName } from './dashboard-feature-visual.svelte';

	export type DashboardFeatureStatus = 'enrolled' | 'notActive' | 'comingSoon';

	export type { DashboardFeatureVisualName as DashboardFeatureVisual };

	let {
		title,
		description,
		callToAction,
		visual = 'pack-ai',
		status = 'enrolled',
		statusLabel,
		onSelect
	}: {
		title: string;
		description: string;
		callToAction?: string;
		visual?: DashboardFeatureVisualName;
		status?: DashboardFeatureStatus;
		statusLabel?: string;
		onSelect?: () => void;
	} = $props();

	const isEnrolled = $derived(status === 'enrolled');
	const isNotActive = $derived(status === 'notActive');
	const isComingSoon = $derived(status === 'comingSoon');

	const resolvedStatusLabel = $derived(
		statusLabel ?? (isEnrolled ? 'Enrolled' : isNotActive ? 'Not active' : 'Coming soon')
	);
	const resolvedCallToAction = $derived(
		callToAction ?? (isEnrolled ? `Open ${title}` : 'Unlock feature')
	);
	const chipState = $derived(isEnrolled ? 'selected' : isComingSoon ? 'disabled' : 'default');
</script>

<Card
	class="h-full min-w-0 gap-0 overflow-hidden bg-white px-4 py-4 shadow-none [--card-spacing:--spacing(4)]"
>
	<div
		class={cn(
			'flex h-40 items-center justify-center rounded-lg',
			isEnrolled && 'bg-primary-50',
			isNotActive && 'bg-muted',
			isComingSoon && 'bg-gray-3'
		)}
	>
		<div class={cn(isNotActive && 'opacity-80', isComingSoon && 'opacity-50')} aria-hidden="true">
			<DashboardFeatureVisual {visual} />
		</div>
	</div>
	<div class="mt-4 flex min-w-0 flex-1 flex-col">
		<div class="mb-1.5 flex flex-wrap items-center gap-2">
			<div
				class={cn(
					'text-base font-semibold text-foreground',
					isComingSoon && 'text-muted-foreground'
				)}
			>
				{title}
			</div>
			{#if !isComingSoon}
				<Chip state={chipState}>{resolvedStatusLabel}</Chip>
			{/if}
		</div>
		<div
			class={cn(
				'mb-3.5 text-[13px] leading-normal text-muted-foreground',
				isNotActive && 'text-foreground/80'
			)}
		>
			{description}
		</div>
		{#if isComingSoon}
			<Chip state="disabled" class="mt-auto">{resolvedStatusLabel}</Chip>
		{:else}
			<Button
				class="mt-auto flex w-full"
				variant={isEnrolled ? 'default' : 'outline'}
				iconName="arrow-right"
				iconAtEnd
				onclick={onSelect}
			>
				{resolvedCallToAction}
			</Button>
		{/if}
	</div>
</Card>
