<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import { CheckOutline } from 'flowbite-svelte-icons';
	import type { WizardStepState } from '../types';

	let {
		index,
		label,
		sub,
		state = 'idle'
	}: {
		index: number;
		label: string;
		sub: string;
		state?: WizardStepState;
	} = $props();

	const isDone = $derived(state === 'done');
	const isActive = $derived(state === 'active');
</script>

<div class="flex max-w-[320px] items-center gap-3">
	<div
		class={cn(
			'flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-[13px] font-semibold',
			isDone && 'border-primary-500 bg-primary-500 text-white',
			isActive && 'border-primary-500 bg-transparent text-primary-500',
			state === 'idle' && 'border-gray-6 bg-transparent text-muted-foreground'
		)}
	>
		{#if isDone}
			<CheckOutline class="size-4" />
		{:else}
			{index}
		{/if}
	</div>
	<div class="min-w-0">
		<div class={cn('text-sm font-semibold', isDone || isActive ? 'text-foreground' : 'text-muted-foreground')}>
			{label}
		</div>
		<div class="text-[11px] text-muted-foreground">{sub}</div>
	</div>
</div>
