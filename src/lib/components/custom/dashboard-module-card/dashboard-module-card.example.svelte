<script lang="ts">
	import DashboardModuleCard from './dashboard-module-card.svelte';
	import type {
		DashboardModuleStat,
		DashboardModuleStatus,
		DashboardModuleVisual
	} from './dashboard-module-card.svelte';

	let {
		eyebrow = 'Skill Mapping',
		value = '36',
		unit = 'completed mappings',
		stats = [
			{ label: 'Job families mapped', value: '9' },
			{ label: 'Roles mapped', value: '42' },
			{ label: 'Reports', value: '136' }
		],
		callToAction = 'All Skill Mapping',
		visual = 'radar',
		status = 'default',
		statusLabel,
		tokenLabel,
		notice
	}: {
		eyebrow?: string;
		value?: string;
		unit?: string;
		stats?: DashboardModuleStat[];
		callToAction?: string;
		visual?: DashboardModuleVisual;
		status?: DashboardModuleStatus;
		statusLabel?: string;
		tokenLabel?: string;
		notice?: string;
	} = $props();
</script>

<div class="w-full max-w-[920px]">
	<DashboardModuleCard
		{eyebrow}
		{value}
		{unit}
		{stats}
		{callToAction}
		{visual}
		{status}
		{statusLabel}
		{tokenLabel}
		{notice}
	/>
</div>
