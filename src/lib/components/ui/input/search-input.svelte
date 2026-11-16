<script lang="ts">
	import SearchIcon from '@lucide/svelte/icons/search';
	import XIcon from '@lucide/svelte/icons/x';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '@pack/ui/lib/utils.js';

	/**
	 * The search field (designer handover v1.2, focus-ring pattern; 2026-11-16): 40px tall, 8px
	 * corners, 12px side padding, 14px text, the magnifier first, a gray-9 edge (3.15:1 on the page)
	 * on a gray-1 fill. Name it with a label or `aria-label`. `class` is for layout only.
	 *
	 * Once there is text, a clear button sits inside the field: a real button named `clearLabel`,
	 * reachable by Tab, 24px; it empties the field, sends `input` and returns the focus to the field.
	 * The browser's own clear cross is hidden (no name, no Tab stop).
	 */
	let {
		value = $bindable(''),
		ref = $bindable(null),
		class: className,
		disabled,
		clearLabel = 'Clear search',
		...restProps
	}: Omit<HTMLInputAttributes, 'type' | 'value' | 'files'> & {
		value?: string | null;
		ref?: HTMLInputElement | null;
		/** The clear button's accessible name. */
		clearLabel?: string;
	} = $props();

	const hasText = $derived(Boolean(value) && !disabled);

	function handleClear() {
		value = '';
		if (!ref) return;
		ref.value = '';
		ref.dispatchEvent(new Event('input', { bubbles: true }));
		ref.focus();
	}
</script>

<div
	class={cn(
		'flex h-10 w-full min-w-0 items-center gap-2 rounded-lg border border-gray-9 bg-gray-1 pl-3 focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 has-disabled:cursor-not-allowed has-disabled:bg-gray-3',
		hasText ? 'pr-2' : 'pr-3',
		className
	)}
>
	<SearchIcon class="size-4 shrink-0 text-gray-11" aria-hidden="true" />
	<input
		bind:this={ref}
		bind:value
		{disabled}
		type="search"
		class="h-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:appearance-none"
		{...restProps}
	/>
	{#if hasText}
		<button
			type="button"
			aria-label={clearLabel}
			class="flex size-6 shrink-0 items-center justify-center rounded-md text-gray-11 outline-none hover:bg-gray-3 hover:text-gray-12 focus-visible:ring-2 focus-visible:ring-primary-600"
			onclick={handleClear}
		>
			<XIcon class="size-4" aria-hidden="true" />
		</button>
	{/if}
</div>
