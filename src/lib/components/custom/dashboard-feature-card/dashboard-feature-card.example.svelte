<script lang="ts">
	import DashboardFeatureCard from './dashboard-feature-card.svelte';
	import type {
		DashboardFeatureStatus,
		DashboardFeatureVisual
	} from './dashboard-feature-card.svelte';

	let {
		title = 'Pack AI',
		description = 'Conversational assessment and coaching sessions that turn skill data into development conversations.',
		callToAction,
		visual = 'pack-ai',
		status = 'enrolled',
		statusLabel
	}: {
		title?: string;
		description?: string;
		callToAction?: string;
		visual?: DashboardFeatureVisual;
		status?: DashboardFeatureStatus;
		statusLabel?: string;
	} = $props();
</script>

<div class="w-[320px]">
	<DashboardFeatureCard
		{title}
		{description}
		callToAction={status === 'comingSoon' ? undefined : callToAction}
		{visual}
		{status}
		{statusLabel}
	/>
</div>
