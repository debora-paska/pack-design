<script lang="ts">
	import InternalTab from '../internal-tab/internal-tab.svelte';
	import type { InternalTabItem } from '../types';

	let {
		items,
		activeId,
		onSelect
	}: {
		items: InternalTabItem[];
		activeId: string;
		onSelect?: (id: string) => void;
	} = $props();
</script>

<div class="flex items-center gap-6 border-b border-gray-3">
	{#each items as item (item.id)}
		<InternalTab
			label={item.label}
			isActive={activeId === item.id}
			isDisabled={item.isDisabled}
			hint={item.hint}
			onSelect={() => onSelect?.(item.id)}
		/>
	{/each}
</div>
