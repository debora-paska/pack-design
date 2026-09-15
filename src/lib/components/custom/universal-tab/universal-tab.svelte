<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import type { InteractionPreview } from '../types';

	let {
		label,
		count,
		isActive = false,
		isDisabled = false,
		previewState = 'default',
		onSelect
	}: {
		label: string;
		count?: string;
		isActive?: boolean;
		isDisabled?: boolean;
		previewState?: InteractionPreview;
		onSelect?: () => void;
	} = $props();

	const isHoverPreview = $derived(previewState === 'hover');
	const isActiveState = $derived(isActive || previewState === 'active');
	const isDisabledState = $derived(isDisabled || previewState === 'disabled');
</script>

<button
	type="button"
	disabled={isDisabledState}
	onclick={() => {
		if (!isDisabledState) onSelect?.();
	}}
	class={cn(
		'inline-flex h-[34px] items-center gap-1.5 rounded-full px-3.5 text-[13.5px] font-medium text-gray-11',
		!isDisabledState && !isActiveState && 'hover:bg-gray-3',
		isHoverPreview && !isDisabledState && !isActiveState && 'bg-gray-3',
		isActiveState && 'bg-primary-50 text-primary-500',
		isDisabledState && 'pointer-events-none opacity-45'
	)}
>
	{label}
	{#if count}
		<span class={cn('text-xs font-semibold text-gray-8', isActiveState && 'text-primary-500')}>
			{count}
		</span>
	{/if}
</button>
