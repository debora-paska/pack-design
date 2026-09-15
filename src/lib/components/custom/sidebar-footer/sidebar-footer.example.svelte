<script lang="ts">
	import SidebarFooter from './sidebar-footer.svelte';
	import type { InteractionPreview, SidebarLanguage } from '../types';

	let {
		userName = 'Giulia Moretti',
		userRole = 'HR Director',
		previewState = 'default'
	}: {
		userName?: string;
		userRole?: string;
		previewState?: InteractionPreview | 'menu-open';
	} = $props();

	let isMenuOpen = $state(false);
	$effect(() => {
		isMenuOpen = previewState === 'menu-open';
	});
	let language = $state<SidebarLanguage>('en');
</script>

<div class="w-[260px] bg-sidebar pt-40">
	<SidebarFooter
		{userName}
		{userRole}
		{isMenuOpen}
		{previewState}
		{language}
		onToggle={() => (isMenuOpen = !isMenuOpen)}
		onLanguage={(next) => (language = next)}
	/>
</div>
