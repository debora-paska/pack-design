<script lang="ts">
	import UniversalTab from '../universal-tab/universal-tab.svelte';
	import type { UniversalTabItem } from '../types';

	let {
		items,
		activeId,
		onSelect
	}: {
		items: UniversalTabItem[];
		activeId: string;
		onSelect?: (id: string) => void;
	} = $props();
</script>

<div class="flex flex-wrap items-center gap-1">
	{#each items as item (item.id)}
		<UniversalTab
			label={item.label}
			count={item.count}
			isActive={activeId === item.id}
			isDisabled={item.isDisabled}
			onSelect={() => onSelect?.(item.id)}
		/>
	{/each}
</div>
