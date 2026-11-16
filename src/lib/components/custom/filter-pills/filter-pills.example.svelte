<script lang="ts">
	import FilterPills, { type FilterPillOption } from './filter-pills.svelte';

	const COUNTS: FilterPillOption[] = [
		{ value: 'all', label: 'All · 15' },
		{ value: 'suggested', label: 'Suggestions · 2' },
		{ value: 'commented', label: 'Comments · 2' },
		{ value: 'approved', label: 'Accepted · 4' }
	];

	let {
		value = 'all',
		label = 'Show',
		options = COUNTS
	}: { value?: string; label?: string; options?: FilterPillOption[] } = $props();
</script>

<FilterPills {label} {value} {options} onValueChange={(next) => (value = next)} />
