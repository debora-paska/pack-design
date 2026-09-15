<script lang="ts">
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { cn } from '@pack/ui/lib/utils.js';
	import type { InteractionPreview } from '../types';

	let {
		label,
		previewState = 'default',
		isDisabled = false,
		onSelect
	}: {
		label: string;
		previewState?: Exclude<InteractionPreview, 'active'>;
		isDisabled?: boolean;
		onSelect?: () => void;
	} = $props();

	const isHoverPreview = $derived(previewState === 'hover');
	const isDisabledState = $derived(isDisabled || previewState === 'disabled');
</script>

<button
	type="button"
	disabled={isDisabledState}
	onclick={() => {
		if (!isDisabledState) onSelect?.();
	}}
	class={cn(
		'flex min-h-11 w-full items-center gap-2.5 rounded-md border border-gray-6 px-3.5 text-left text-[13.5px] font-medium text-foreground',
		!isDisabledState && 'hover:bg-primary-50',
		isHoverPreview && !isDisabledState && 'bg-primary-50',
		isDisabledState && 'pointer-events-none opacity-45'
	)}
>
	{label}
	<span
		class="ml-auto inline-flex size-[26px] shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary-500"
	>
		<ArrowRightOutline class="size-4" />
	</span>
</button>
