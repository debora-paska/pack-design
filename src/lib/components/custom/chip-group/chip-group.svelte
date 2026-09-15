<script lang="ts">
	import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group/index.js';
	import type { ChipGroupOption } from '../types';

	let {
		options,
		value = $bindable()
	}: {
		options: ChipGroupOption[];
		value?: string;
	} = $props();
</script>

<ToggleGroup type="single" variant="outline" size="sm" spacing={2} bind:value>
	{#each options as option (option.value)}
		<ToggleGroupItem value={option.value}>{option.label}</ToggleGroupItem>
	{/each}
</ToggleGroup>
