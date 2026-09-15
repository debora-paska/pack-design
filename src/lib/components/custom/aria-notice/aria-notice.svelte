<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div
	class="rounded-lg border border-info-75 bg-info-50 px-4 py-3.5 text-[13px] leading-relaxed text-info-400"
>
	{@render children()}
</div>
