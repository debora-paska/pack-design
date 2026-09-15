<script lang="ts">
	import { Input } from '../../ui/input/index.js';
	import FieldRow from './field-row.svelte';

	let {
		label = 'Project Name *',
		sub,
		value = 'HR Business Partner — Q2 2026 baseline'
	}: {
		label?: string;
		sub?: string;
		value?: string;
	} = $props();
</script>

<FieldRow {label} {sub}>
	<Input bind:value />
</FieldRow>
