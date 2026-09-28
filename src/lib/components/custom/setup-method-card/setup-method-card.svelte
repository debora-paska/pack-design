<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import {
		AtomOutline,
		CheckCircleOutline,
		FileOutline
	} from 'flowbite-svelte-icons';
	import { RadioGroup, RadioGroupItem } from '../../ui/radio-group/index.js';
	import type { SetupMethodIcon } from '../types';

	let {
		title,
		footer,
		icon = 'artificial-intelligence',
		value = 'method',
		isSelected = false,
		isDisabled = false,
		onSelect
	}: {
		title: string;
		footer: string;
		icon?: SetupMethodIcon;
		value?: string;
		isSelected?: boolean;
		isDisabled?: boolean;
		onSelect?: () => void;
	} = $props();
</script>

<button
	type="button"
	disabled={isDisabled}
	class={cn(
		'flex min-h-[132px] w-full flex-col gap-3 rounded-lg border p-4 text-left transition-colors',
		isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-5 bg-card',
		isDisabled && 'pointer-events-none cursor-not-allowed opacity-50'
	)}
	onclick={() => onSelect?.()}
>
	<div class="flex items-start justify-between gap-2.5">
		<span
			class="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary-700"
		>
			{#if icon === 'template'}
				<FileOutline class="size-4" />
			{:else if icon === 'skills-list'}
				<CheckCircleOutline class="size-4" />
			{:else}
				<AtomOutline class="size-4" />
			{/if}
		</span>
		<span class="pointer-events-none" aria-hidden="true">
			<RadioGroup value={isSelected ? value : ''} class="gap-0">
				<RadioGroupItem {value} tabindex={-1} />
			</RadioGroup>
		</span>
	</div>
	<div class="text-sm font-semibold text-foreground">{title}</div>
	<div class="mt-auto border-t border-gray-5 pt-2.5 text-[11.5px] text-muted-foreground">
		{footer}
	</div>
</button>
