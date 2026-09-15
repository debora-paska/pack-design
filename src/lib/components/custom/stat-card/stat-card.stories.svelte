<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import StatCardExample from './stat-card.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/HR Overview/StatCard',
		component: StatCardExample,
		tags: ['autodocs'],
		args: {
			layout: 'row'
		}
	});
</script>

<Story name="Row" />

<Story
	name="Coverage"
	args={{
		layout: 'single',
		variant: 'coverage',
		label: 'Employees mapped',
		value: '94 / 117',
		meta: '80.3% coverage'
	}}
/>

<Story
	name="Families"
	args={{
		layout: 'single',
		variant: 'families',
		label: 'Job families',
		value: '9',
		meta: '42 roles mapped'
	}}
/>

<Story
	name="Skills"
	args={{
		layout: 'single',
		variant: 'skills',
		label: 'Skills mapped',
		value: '412',
		meta: '1,860 tasks covered'
	}}
/>

<Story
	name="Reports"
	args={{
		layout: 'single',
		variant: 'reports',
		label: 'Reports generated',
		value: '136',
		meta: '+18 this month'
	}}
/>
