<script lang="ts">
	import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group/index.js';
	import { cn } from '@pack/ui/lib/utils.js';
	import { chipVariants } from '../chip/chip.svelte';
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
		<ToggleGroupItem
			value={option.value}
			class={cn(
				chipVariants({ state: value === option.value ? 'selected' : 'default' }),
				'h-8 shadow-none data-[state=on]:border-primary-500 data-[state=on]:bg-primary-50 data-[state=on]:text-primary-500'
			)}
		>
			{option.label}
		</ToggleGroupItem>
	{/each}
</ToggleGroup>
