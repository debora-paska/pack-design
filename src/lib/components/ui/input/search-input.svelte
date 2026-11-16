<script lang="ts">
	import SearchIcon from '@lucide/svelte/icons/search';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '@pack/ui/lib/utils.js';

	/**
	 * The search field (designer handover v1.2, focus-ring pattern; 2026-11-16): 40px tall, 8px
	 * corners, 12px side padding, 14px text, the magnifier first, a gray-9 edge (3.15:1 on the page)
	 * on a gray-1 fill. Name it with a label or `aria-label`. `class` is for layout only.
	 */
	let {
		value = $bindable(''),
		ref = $bindable(null),
		class: className,
		...restProps
	}: Omit<HTMLInputAttributes, 'type' | 'value' | 'files'> & {
		value?: string | null;
		ref?: HTMLInputElement | null;
	} = $props();
</script>

<div
	class={cn(
		'flex h-10 w-full min-w-0 items-center gap-2 rounded-lg border border-gray-9 bg-gray-1 px-3 focus-within:ring-2 focus-within:ring-primary-700 focus-within:ring-offset-2 has-disabled:cursor-not-allowed has-disabled:bg-gray-3',
		className
	)}
>
	<SearchIcon class="size-4 shrink-0 text-gray-11" aria-hidden="true" />
	<input
		bind:this={ref}
		bind:value
		type="search"
		class="h-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
		{...restProps}
	/>
</div>
