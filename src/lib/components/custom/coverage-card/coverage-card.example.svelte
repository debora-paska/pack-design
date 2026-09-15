<script lang="ts">
	import CoverageCard from './coverage-card.svelte';
	import type { CoverageBar } from '../types';

	let {
		title,
		rows
	}: {
		title?: string;
		rows: CoverageBar[];
	} = $props();
</script>

<div class="grid w-full grid-cols-[1fr_2fr] gap-4">
	<CoverageCard {title} {rows} />
</div>
