<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import type { InteractionPreview } from '../types';

	let {
		label,
		isActive = false,
		isDisabled = false,
		previewState = 'default',
		hint = '',
		onSelect
	}: {
		label: string;
		isActive?: boolean;
		isDisabled?: boolean;
		previewState?: InteractionPreview;
		hint?: string;
		onSelect?: () => void;
	} = $props();

	const isHoverPreview = $derived(previewState === 'hover');
	const isActiveState = $derived(isActive || previewState === 'active');
	const isDisabledState = $derived(isDisabled || previewState === 'disabled');
</script>

<button
	type="button"
	title={hint}
	disabled={isDisabledState}
	onclick={() => {
		if (!isDisabledState) onSelect?.();
	}}
	class={cn(
		'inline-flex items-center gap-1.5 border-b-2 border-transparent px-1 py-2.5 text-sm font-medium whitespace-nowrap text-muted-foreground',
		!isDisabledState && !isActiveState && 'hover:text-gray-12',
		isHoverPreview && !isDisabledState && !isActiveState && 'text-gray-12',
		// Active (2026-11-16): gray-13 text, the primary-700 underline as the marker (5.6:1).
		isActiveState && !isDisabledState && 'border-primary-700 text-gray-13',
		isDisabledState && 'cursor-default text-gray-8'
	)}
>
	{label}
</button>
