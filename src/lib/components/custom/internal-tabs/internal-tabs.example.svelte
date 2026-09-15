<script lang="ts">
	import InternalTabs from './internal-tabs.svelte';
	import type { InternalTabItem } from '../types';

	let {
		items,
		activeId
	}: {
		items: InternalTabItem[];
		activeId: string;
	} = $props();

	let currentId = $state('');
	$effect(() => {
		currentId = activeId;
	});
</script>

<InternalTabs {items} activeId={currentId} onSelect={(id) => (currentId = id)} />
