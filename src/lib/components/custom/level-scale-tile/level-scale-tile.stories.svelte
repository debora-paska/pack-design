<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LevelScaleTile from './level-scale-tile.svelte';

	const { Story } = defineMeta({
		title: 'custom/Individual Report/LevelScaleTile',
		component: LevelScaleTile,
		tags: ['autodocs'],
		args: {
			level: 1,
			label: 'Novice',
			description: 'Understands the skill and its importance'
		}
	});
</script>

<Story name="Novice" />
<Story
	name="Beginner"
	args={{
		level: 2,
		label: 'Beginner',
		description: 'Demonstrates this skill under supervision'
	}}
/>
<Story
	name="Competent"
	args={{
		level: 3,
		label: 'Competent',
		description: 'Demonstrates independently, without supervision'
	}}
/>
<Story
	name="Advanced"
	args={{
		level: 4,
		label: 'Advanced',
		description: 'Encourages or supervises others in this skill'
	}}
/>
<Story
	name="Expert"
	args={{
		level: 5,
		label: 'Expert',
		description: 'Develops new applications with impact beyond the org'
	}}
/>
