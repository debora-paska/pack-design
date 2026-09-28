<script lang="ts">
	import { LoaderCircle } from '@lucide/svelte';
	import { cn } from '@pack/ui/lib/utils.js';

	let {
		isOpen = false,
		isContained = false,
		title = 'Setting up questions. Do not leave this page.',
		detail = 'Building a self wording and an other wording for every question. This usually takes under a minute.'
	}: {
		isOpen?: boolean;
		isContained?: boolean;
		title?: string;
		detail?: string;
	} = $props();
</script>

{#if isOpen}
	<div
		class={cn(
			'z-[200] flex items-center justify-center bg-[rgba(252,252,252,0.94)]',
			isContained ? 'absolute inset-0' : 'fixed inset-0'
		)}
		role="status"
		aria-live="polite"
	>
		<div class="flex max-w-[440px] flex-col items-center gap-3.5 text-center">
			<LoaderCircle class="size-8 animate-spin text-primary-500" />
			<div class="text-[19px] font-semibold text-foreground">{title}</div>
			<div class="text-[13.5px] leading-relaxed text-muted-foreground">{detail}</div>
		</div>
	</div>
{/if}
