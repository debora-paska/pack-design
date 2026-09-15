<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MappingCard from './mapping-card.svelte';

	const { Story } = defineMeta({
		title: 'custom/HR Overview/MappingCard',
		component: MappingCard,
		tags: ['autodocs'],
		args: {
			type: 'family',
			status: 'done',
			title: 'People & Culture',
			company: 'Pack',
			date: '1d ago',
			chips: ['3 roles', 'horizon 3y'],
			phases: '9 of 9 phases done',
			progress: 100,
			id: '#663',
			cta: 'Open recap'
		}
	});
</script>

<Story name="Family Done" />

<Story
	name="Single In progress"
	args={{
		type: 'single',
		status: 'queued',
		title: 'HR Business Partner',
		company: 'Pack',
		chips: ['horizon 3y'],
		phases: '3 of 9 phases done',
		progress: 33,
		cta: 'Open run'
	}}
/>

<Story
	name="Tasks Failed"
	args={{
		type: 'tasks',
		status: 'failed',
		title: 'Incident triage runbook',
		company: 'Pack',
		chips: ['horizon 3y'],
		phases: '0 of 9 phases done',
		progress: 0,
		cta: 'Open run'
	}}
/>

<Story
	name="Completed only"
	args={{
		type: 'single',
		status: 'done',
		title: 'Conseil Clientele',
		company: 'Crédit Mutuel',
		isCompletedOnly: true,
		completedText: 'Completed 23/7/2026',
		cta: 'Open run'
	}}
/>
