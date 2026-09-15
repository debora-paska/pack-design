<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import KpiCard from './kpi-card.svelte';

	const { Story } = defineMeta({
		title: 'custom/Individual Report/KpiCard',
		component: KpiCard,
		tags: ['autodocs'],
		args: {
			title: 'Average level',
			value: '3.18',
			description: 'of 5 · across all skills',
			color: 'info'
		},
		argTypes: {
			color: {
				control: { type: 'select' },
				options: ['gray', 'primary', 'success', 'warning', 'error', 'info']
			}
		}
	});
</script>

<Story name="Info" />
<Story
	name="Success"
	args={{
		color: 'success',
		title: 'On / above target',
		value: '7/12',
		description: 'Skills at or above target'
	}}
/>
<Story
	name="Primary"
	args={{
		color: 'primary',
		title: 'Critical gaps',
		value: '4',
		description: 'High-relevance, below target'
	}}
/>
<Story
	name="Gray"
	args={{
		color: 'gray',
		title: 'Est. close time',
		value: '6–9 mo',
		description: 'With recommended plan'
	}}
/>
