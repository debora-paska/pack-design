<script lang="ts">
	import StatCard from './stat-card.svelte';
	import type { OverviewStatVariant } from '../types';

	let {
		layout = 'row',
		variant = 'coverage',
		label = 'Employees mapped',
		value = '94 / 117',
		meta = '80.3% coverage'
	}: {
		layout?: 'row' | 'single';
		variant?: OverviewStatVariant;
		label?: string;
		value?: string;
		meta?: string;
	} = $props();
</script>

{#if layout === 'row'}
	<div class="grid w-full grid-cols-4 gap-4">
		<StatCard variant="coverage" label="Employees mapped" value="94 / 117" meta="80.3% coverage" />
		<StatCard variant="families" label="Job families" value="9" meta="42 roles mapped" />
		<StatCard variant="skills" label="Skills mapped" value="412" meta="1,860 tasks covered" />
		<StatCard variant="reports" label="Reports generated" value="136" meta="+18 this month" />
	</div>
{:else}
	<div class="w-1/4 min-w-0">
		<StatCard {variant} {label} {value} {meta} />
	</div>
{/if}
