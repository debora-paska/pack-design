<script lang="ts">
	import FilterPills, { type FilterPillOption } from './filter-pills.svelte';

	const COUNTS: FilterPillOption[] = [
		{ value: 'all', label: 'All · 15', tone: 'neutral' },
		{ value: 'suggested', label: 'Suggestions · 2', tone: 'info' },
		{ value: 'commented', label: 'Comments · 2', tone: 'neutral' },
		{ value: 'approved', label: 'Accepted · 4', tone: 'positive' }
	];

	let {
		value = 'all',
		label = 'Show',
		hasDot = false,
		options = COUNTS
	}: { value?: string; label?: string; hasDot?: boolean; options?: FilterPillOption[] } = $props();
</script>

<FilterPills {label} {value} {hasDot} {options} onValueChange={(next) => (value = next)} />
