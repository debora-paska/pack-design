<script lang="ts">
	import { Card } from '../../ui/card/index.js';
	import { CardContent } from '../../ui/card/index.js';
	import { CardHeader } from '../../ui/card/index.js';
	import { CardTitle } from '../../ui/card/index.js';
	import CoverageBar from '../coverage-bar/coverage-bar.svelte';
	import type { CoverageBar as CoverageBarRow } from '../types';

	let {
		title = 'Mapping Coverage',
		rows
	}: {
		title?: string;
		rows: CoverageBarRow[];
	} = $props();
</script>

<Card class="w-full min-w-0">
	<CardHeader>
		<CardTitle>{title}</CardTitle>
	</CardHeader>
	<CardContent class="flex flex-col gap-4">
		{#each rows as row (row.label)}
			<CoverageBar
				label={row.label}
				count={row.count}
				widthPercent={row.widthPercent}
				color={row.color}
			/>
		{/each}
	</CardContent>
</Card>
