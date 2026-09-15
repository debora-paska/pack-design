<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import WizardStep from '../wizard-step/wizard-step.svelte';
	import type { WizardStepItem, WizardStepState } from '../types';

	let {
		steps,
		currentStep = 1
	}: {
		steps: WizardStepItem[];
		currentStep?: number;
	} = $props();

	function stepState(index: number): WizardStepState {
		if (index < currentStep) return 'done';
		if (index === currentStep) return 'active';
		return 'idle';
	}
</script>

<div class="flex items-center justify-center gap-3">
	{#each steps as step, i (step.label)}
		{@const index = i + 1}
		{#if i > 0}
			<div class={cn('h-px w-20', index - 1 < currentStep ? 'bg-primary-500' : 'bg-gray-6')}></div>
		{/if}
		<WizardStep
			{index}
			label={step.label}
			sub={step.sub}
			state={stepState(index)}
		/>
	{/each}
</div>
