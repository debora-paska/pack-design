<script lang="ts">
	import { Button } from '../../ui/button/index.js';
	import { Card } from '../../ui/card/index.js';
	import { CardContent } from '../../ui/card/index.js';
	import { CardFooter } from '../../ui/card/index.js';
	import { CardHeader } from '../../ui/card/index.js';
	import { Progress } from '../../ui/progress/index.js';
	import MappingStatusChip from '../mapping-status-chip/mapping-status-chip.svelte';
	import MappingTypeChip from '../mapping-type-chip/mapping-type-chip.svelte';
	import UniversalChip from '../universal-chip/universal-chip.svelte';
	import type { MappingCardStatus, MappingCardType } from '../types';

	let {
		type = 'family',
		status = 'done',
		title,
		company = '',
		date,
		chips = [],
		phases = '',
		progress = 0,
		id,
		cta = 'Open',
		isCompletedOnly = false,
		completedText = 'Completed',
		onOpen
	}: {
		type?: MappingCardType;
		status?: MappingCardStatus;
		title: string;
		company?: string;
		date: string;
		chips?: string[];
		phases?: string;
		progress?: number;
		id: string;
		cta?: string;
		isCompletedOnly?: boolean;
		completedText?: string;
		onOpen?: () => void;
	} = $props();

	const clampedProgress = $derived(Math.max(0, Math.min(100, progress)));
</script>

<Card class="gap-3 py-4">
	<CardHeader class="flex flex-row items-start justify-between gap-3">
		<MappingTypeChip {type} />
		<div class="shrink-0 text-right">
			<MappingStatusChip {status} />
			<div class="mt-1 text-xs text-gray-8">{date}</div>
		</div>
	</CardHeader>
	<CardContent class="flex flex-col gap-3">
		<div>
			<div class="text-[17px] font-semibold tracking-tight text-foreground">{title}</div>
			{#if company}
				<div class="mt-0.5 text-[13px] text-muted-foreground">{company}</div>
			{/if}
		</div>
		{#if isCompletedOnly}
			<div class="text-[13px] text-muted-foreground">{completedText}</div>
		{:else}
			{#if chips.length > 0}
				<div class="flex flex-wrap gap-1.5">
					{#each chips as chip (chip)}
						<UniversalChip color="gray">{chip}</UniversalChip>
					{/each}
				</div>
			{/if}
			<div class="flex items-baseline justify-between text-[12.5px]">
				<span class="text-gray-11">{phases}</span>
				<span class="font-semibold tabular-nums">{clampedProgress}%</span>
			</div>
			<Progress value={clampedProgress} />
			{#if status === 'failed'}
				<div class="mt-1 text-[12.5px] text-error-400">1 failed</div>
			{/if}
		{/if}
	</CardContent>
	<CardFooter class="justify-between border-t">
		<span class="text-[13px] text-gray-8">{id}</span>
		<Button variant="outline" iconName="arrow-right" iconAtEnd onclick={onOpen}>{cta}</Button>
	</CardFooter>
</Card>
