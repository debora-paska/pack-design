<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import HeadlineCard from './headline-card.svelte';

	const { Story } = defineMeta({
		title: 'custom/Individual Report/HeadlineCard',
		component: HeadlineCard,
		tags: ['autodocs'],
		args: {
			body: 'Sara is solid in employee-relations and compliance work — both above target — and clearly identifies as a coach. Her growth edge is the future-facing HRBP toolkit: workforce planning, AI fluency, and people-data storytelling, where she sits 1.0–2.0 levels below where the role is heading.'
		}
	});
</script>

<Story name="Default" />
