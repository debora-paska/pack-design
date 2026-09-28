<script lang="ts">
	import UniversalChip from '../universal-chip/universal-chip.svelte';

	let {
		name,
		description,
		chips = [],
		note = "These saved questions are copied onto this project and worded for every rater role on it. Editing them later does not change the template."
	}: {
		name: string;
		description: string;
		chips?: string[];
		note?: string;
	} = $props();
</script>

<div class="rounded-lg border border-gray-5 bg-gray-2 px-4 py-3.5">
	<div class="text-[13.5px] font-semibold text-foreground">{name}</div>
	<div class="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{description}</div>
	{#if chips.length}
		<div class="mt-2.5 flex flex-wrap gap-1.5">
			{#each chips as chip (chip)}
				<UniversalChip color="gray">{chip}</UniversalChip>
			{/each}
		</div>
	{/if}
	<div class="mt-2.5 text-[12.5px] leading-relaxed text-muted-foreground">{note}</div>
</div>
