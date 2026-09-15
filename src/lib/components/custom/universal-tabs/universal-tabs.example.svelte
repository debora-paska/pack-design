<script lang="ts">
	import UniversalTabs from './universal-tabs.svelte';
	import type { UniversalTabItem } from '../types';

	let {
		items,
		activeId
	}: {
		items: UniversalTabItem[];
		activeId: string;
	} = $props();

	let currentId = $state('');
	$effect(() => {
		currentId = activeId;
	});
</script>

<UniversalTabs {items} activeId={currentId} onSelect={(id) => (currentId = id)} />
