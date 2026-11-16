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
		options = COUNTS
	}: { value?: string; label?: string; options?: FilterPillOption[] } = $props();
</script>

<FilterPills {label} {value} {options} onValueChange={(next) => (value = next)} />
