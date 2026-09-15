<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SkillCoverageCard from './skill-coverage-card.svelte';

	const { Story } = defineMeta({
		title: 'custom/Organisms/SkillCoverageCard',
		component: SkillCoverageCard,
		tags: ['autodocs']
	});
</script>

<Story name="Default" />

<Story
	name="Low coverage"
	args={{
		title: 'Skill coverage',
		description: 'Share of the role map with a current score.',
		label: 'Required skills with at least one rated person',
		value: 28
	}}
/>
