<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		label,
		sub,
		children
	}: {
		label: string;
		sub?: string;
		children: Snippet;
	} = $props();
</script>

<div
	class="grid grid-cols-[minmax(8rem,220px)_minmax(0,1fr)] items-start gap-6 border-b border-gray-5 py-4 last:border-b-0"
>
	<div class="min-w-0 pt-0.5">
		<div class="text-[13px] font-semibold text-foreground">{label}</div>
		{#if sub}
			<div class="mt-1 text-xs text-muted-foreground">{sub}</div>
		{/if}
	</div>
	<div class="min-w-0">
		{@render children()}
	</div>
</div>
