<script lang="ts">
	import HrSidebar from './hr-sidebar.svelte';
	import type { SidebarLanguage } from '../types';

	type GroupId = 'skill-mapping' | 'assessment' | 'learning-and-development' | 'general';

	let {
		activeItem = 'smMappings',
		userName = 'Giulia Moretti',
		userRole = 'HR Director'
	}: {
		activeItem?: string;
		userName?: string;
		userRole?: string;
	} = $props();

	let currentItem = $state('');
	$effect(() => {
		currentItem = activeItem;
	});
	let isMenuOpen = $state(false);
	let language = $state<SidebarLanguage>('en');
	let expandedGroups = $state<GroupId[]>([
		'skill-mapping',
		'assessment',
		'learning-and-development',
		'general'
	]);

	const handleToggleGroup = (id: GroupId) => {
		expandedGroups = expandedGroups.includes(id)
			? expandedGroups.filter((group) => group !== id)
			: [...expandedGroups, id];
	};
</script>

<div class="h-[640px] overflow-hidden rounded-xl border border-border bg-background">
	<HrSidebar
		activeItem={currentItem}
		{userName}
		{userRole}
		{isMenuOpen}
		{language}
		{expandedGroups}
		onNavigate={(id) => (currentItem = id)}
		onToggleGroup={handleToggleGroup}
		onToggleMenu={() => (isMenuOpen = !isMenuOpen)}
		onLanguage={(next) => (language = next)}
	/>
</div>
