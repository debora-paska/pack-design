<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DashboardModuleCardExample from './dashboard-module-card.example.svelte';

	const skillMappingStats = [
		{ label: 'Job families mapped', value: '9' },
		{ label: 'Roles mapped', value: '42' },
		{ label: 'Reports', value: '136' }
	];

	const { Story } = defineMeta({
		title: 'custom/Dashboard/ModuleCard',
		component: DashboardModuleCardExample,
		tags: ['autodocs'],
		args: {
			eyebrow: 'Skill Mapping',
			value: '36',
			unit: 'completed mappings',
			stats: skillMappingStats,
			callToAction: 'All Skill Mapping',
			visual: 'radar',
			status: 'default'
		},
		argTypes: {
			visual: {
				control: { type: 'select' },
				options: ['radar', 'bars', 'steps']
			},
			status: {
				control: { type: 'select' },
				options: ['default', 'freeTrial', 'notActive']
			}
		}
	});
</script>

<Story name="Default" />

<Story
	name="Free trial"
	args={{
		value: '1',
		unit: 'complimentary token',
		stats: [
			{ label: 'Job families', value: 'included' },
			{ label: 'Roles', value: 'included' },
			{ label: 'Reports', value: 'included' }
		],
		callToAction: 'Use trial token',
		status: 'freeTrial',
		tokenLabel: 'Free 1 token',
		notice:
			'Your company has 1 complimentary Skill Mapping token. Use it on one mapping, then unlock the product to keep mapping families, roles, and reports.'
	}}
/>

<Story
	name="Not active"
	args={{
		value: '0',
		unit: 'mappings yet',
		stats: [
			{ label: 'Job families', value: 'unlock' },
			{ label: 'Roles', value: 'unlock' },
			{ label: 'Reports', value: 'unlock' }
		],
		callToAction: 'Contact sales',
		status: 'notActive',
		statusLabel: 'Not active',
		notice:
			'Unlock Skill Mapping to activate this product. Purchase includes 1 complimentary token so you can run your first mapping right away.'
	}}
/>

<Story
	name="Assessment"
	args={{
		eyebrow: 'Assessment',
		value: '3',
		unit: 'active projects - 86 participants',
		stats: [
			{ label: 'Completed', value: '71' },
			{ label: 'Awaiting review', value: '9' },
			{ label: 'Reports ready', value: '6' },
			{ label: 'Avg. completion', value: '78%' }
		],
		callToAction: 'All Assessment',
		visual: 'bars'
	}}
/>

<Story
	name="Learning and Development"
	args={{
		eyebrow: 'Learning & Development',
		value: '7',
		unit: 'active programs',
		stats: [
			{ label: 'Enrolled / invited', value: '64 / 80' },
			{ label: 'Sessions this month', value: '21' },
			{ label: 'Average satisfaction', value: '4.6' }
		],
		callToAction: 'All Learning & Development',
		visual: 'steps'
	}}
/>
