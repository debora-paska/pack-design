<script lang="ts">
	import SidebarFooter from '../sidebar-footer/sidebar-footer.svelte';
	import SidebarNavItem from '../sidebar-nav-item/sidebar-nav-item.svelte';
	import type { SidebarLanguage } from '../types';

	type GroupId = 'skill-mapping' | 'assessment' | 'learning-and-development' | 'general';

	let {
		activeItem = 'dashboard',
		userName = 'Giulia Moretti',
		userRole = 'HR Director',
		isMenuOpen = false,
		language = 'en',
		expandedGroups = ['skill-mapping', 'assessment', 'learning-and-development', 'general'],
		onNavigate,
		onToggleGroup,
		onToggleMenu,
		onLanguage,
		onPreferences,
		onLogout
	}: {
		activeItem?: string;
		userName?: string;
		userRole?: string;
		isMenuOpen?: boolean;
		language?: SidebarLanguage;
		expandedGroups?: GroupId[];
		onNavigate?: (id: string) => void;
		onToggleGroup?: (id: GroupId) => void;
		onToggleMenu?: () => void;
		onLanguage?: (language: SidebarLanguage) => void;
		onPreferences?: () => void;
		onLogout?: () => void;
	} = $props();

	const isExpanded = (id: GroupId) => expandedGroups.includes(id);
	const isActive = (id: string) => activeItem === id;
</script>

<aside
	class="flex h-full w-[280px] flex-col gap-3.5 bg-sidebar px-3.5 py-4 text-sidebar-foreground"
>
	<div class="px-1.5 pt-1.5 text-lg font-semibold tracking-tight text-foreground">Pack</div>
	<SidebarNavItem
		variant="leaf"
		label="Dashboard"
		icon="dashboard"
		isActive={isActive('dashboard')}
		onSelect={() => onNavigate?.('dashboard')}
	/>
	<nav class="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto">
		<div>
			<SidebarNavItem
				variant="group"
				label="Skill Mapping"
				icon="skill-mapping"
				isExpanded={isExpanded('skill-mapping')}
				onSelect={() => onToggleGroup?.('skill-mapping')}
			/>
			{#if isExpanded('skill-mapping')}
				<SidebarNavItem
					variant="nested"
					label="Overview"
					isActive={isActive('smOverview')}
					onSelect={() => onNavigate?.('smOverview')}
				/>
				<SidebarNavItem
					variant="nested"
					label="Mappings"
					isActive={isActive('smMappings')}
					onSelect={() => onNavigate?.('smMappings')}
				/>
				<SidebarNavItem
					variant="nested"
					label="Reports"
					isActive={isActive('smReports')}
					onSelect={() => onNavigate?.('smReports')}
				/>
			{/if}
		</div>
		<div>
			<SidebarNavItem
				variant="group"
				label="Assessment"
				icon="assessment"
				isExpanded={isExpanded('assessment')}
				onSelect={() => onToggleGroup?.('assessment')}
			/>
			{#if isExpanded('assessment')}
				<SidebarNavItem
					variant="nested"
					label="Overview"
					isActive={isActive('assessmentOverview')}
					onSelect={() => onNavigate?.('assessmentOverview')}
				/>
				<SidebarNavItem
					variant="nested"
					label="Projects"
					isActive={isActive('assessmentProjects')}
					onSelect={() => onNavigate?.('assessmentProjects')}
				/>
				<SidebarNavItem
					variant="nested"
					label="Conversational Assessment"
					isActive={isActive('aria')}
					onSelect={() => onNavigate?.('aria')}
				/>
				<SidebarNavItem
					variant="nested"
					label="Company Resources"
					isActive={isActive('assessmentResources')}
					onSelect={() => onNavigate?.('assessmentResources')}
				/>
				<SidebarNavItem
					variant="nested"
					label="Configurations"
					isActive={isActive('assessmentConfig')}
					onSelect={() => onNavigate?.('assessmentConfig')}
				/>
			{/if}
		</div>
		<div>
			<SidebarNavItem
				variant="group"
				label="Learning and Development"
				icon="learning-and-development"
				isExpanded={isExpanded('learning-and-development')}
				onSelect={() => onToggleGroup?.('learning-and-development')}
			/>
			{#if isExpanded('learning-and-development')}
				<SidebarNavItem
					variant="nested"
					label="Overview"
					isActive={isActive('lndOverview')}
					onSelect={() => onNavigate?.('lndOverview')}
				/>
				<SidebarNavItem
					variant="nested"
					label="Feedbacks"
					isActive={isActive('lndFeedbacks')}
					onSelect={() => onNavigate?.('lndFeedbacks')}
				/>
				<SidebarNavItem
					variant="nested"
					label="Events"
					isActive={isActive('lndEvents')}
					onSelect={() => onNavigate?.('lndEvents')}
				/>
			{/if}
		</div>
		<div>
			<SidebarNavItem
				variant="group"
				label="General"
				icon="general"
				isExpanded={isExpanded('general')}
				onSelect={() => onToggleGroup?.('general')}
			/>
			{#if isExpanded('general')}
				<SidebarNavItem
					variant="nested"
					label="Employees"
					isActive={isActive('employees')}
					onSelect={() => onNavigate?.('employees')}
				/>
				<SidebarNavItem
					variant="nested"
					label="Your Plan"
					isActive={isActive('yourPlan')}
					onSelect={() => onNavigate?.('yourPlan')}
				/>
				<SidebarNavItem
					variant="nested"
					label="Settings"
					isActive={isActive('settings')}
					onSelect={() => onNavigate?.('settings')}
				/>
			{/if}
		</div>
	</nav>
	<SidebarFooter
		{userName}
		{userRole}
		{isMenuOpen}
		{language}
		onToggle={onToggleMenu}
		{onLanguage}
		{onPreferences}
		{onLogout}
	/>
</aside>
