<script lang="ts">
	import { ArrowRightOutline, PlusOutline } from 'flowbite-svelte-icons';
	import { cn } from '@pack/ui/lib/utils.js';
	import type { InteractionPreview } from '../types';

	let {
		title,
		description,
		cta,
		previewState = 'default',
		isDisabled = false,
		onSelect
	}: {
		title: string;
		description: string;
		cta: string;
		previewState?: InteractionPreview;
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
		'flex flex-col gap-4 rounded-lg bg-primary-500 p-4 text-left text-white',
		!isDisabledState && 'hover:bg-primary-500',
		isHoverPreview && !isDisabledState && 'ring-2 ring-white/40',
		isDisabledState && 'pointer-events-none opacity-55'
	)}
>
	<div class="flex items-start gap-3">
		<span
			class="inline-flex size-[42px] shrink-0 items-center justify-center rounded-md bg-white/20"
		>
			<PlusOutline class="size-5" />
		</span>
		<div>
			<div class="text-[15px] font-semibold leading-snug">{title}</div>
			<div class="mt-1 text-[12.5px] leading-normal text-white/80">{description}</div>
		</div>
	</div>
	<span
		class="inline-flex h-[38px] w-full items-center justify-center gap-1.5 rounded-md bg-white text-[13.5px] font-semibold text-primary-500"
	>
		{cta}
		<ArrowRightOutline class="size-4" />
	</span>
</button>
