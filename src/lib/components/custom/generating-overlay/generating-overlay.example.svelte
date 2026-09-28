<script lang="ts">
	import GeneratingOverlay from './generating-overlay.svelte';

	let {
		detail = 'Building a self wording and an other wording for every question. This usually takes under a minute.'
	}: {
		detail?: string;
	} = $props();
</script>

<div class="relative h-[320px] overflow-hidden rounded-lg border border-gray-5">
	<div class="p-6 text-sm text-muted-foreground">Setup form sits underneath.</div>
	<GeneratingOverlay
		isOpen
		isContained
		title="Setting up questions. Do not leave this page."
		{detail}
	/>
</div>
