<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DashboardFeatureCardExample from './dashboard-feature-card.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/Dashboard/FeatureCard',
		component: DashboardFeatureCardExample,
		tags: ['autodocs'],
		args: {
			title: 'Pack AI',
			description:
				'Conversational assessment and coaching sessions that turn skill data into development conversations.',
			callToAction: 'Open Pack AI',
			visual: 'pack-ai',
			status: 'enrolled',
			statusLabel: 'Enrolled'
		},
		argTypes: {
			visual: {
				control: { type: 'select' },
				options: ['pack-ai', 'succession', 'impackt']
			},
			status: {
				control: { type: 'select' },
				options: ['enrolled', 'notActive', 'comingSoon']
			}
		}
	});
</script>

<Story name="Enrolled" />

<Story
	name="Not active"
	args={{
		callToAction: 'Unlock feature',
		status: 'notActive',
		statusLabel: 'Not active',
		description:
			'Unlock Pack AI to run conversational assessment and coaching sessions that turn skill data into development conversations.'
	}}
/>

<Story
	name="Coming soon"
	args={{
		title: 'Impackt',
		description:
			'A living map of the skills, tasks and roles behind every report — kept current as your organization evolves.',
		visual: 'impackt',
		status: 'comingSoon',
		statusLabel: 'Coming soon'
	}}
/>

<Story
	name="Succession Planning"
	args={{
		title: 'Succession Planning',
		description:
			"A talent-intelligence layer that maps your org and skill data to suggest each person's next move — career trajectory, gaps and successors — when they change roles, leave, or need development.",
		visual: 'succession',
		status: 'comingSoon',
		statusLabel: 'Coming soon'
	}}
/>
