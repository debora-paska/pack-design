<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SkillLevelRow from './skill-level-row.svelte';

	const { Story } = defineMeta({
		title: 'custom/Individual Report/SkillLevelRow',
		component: SkillLevelRow,
		tags: ['autodocs'],
		args: {
			name: 'Employee Relations & Advisory',
			targetLabel: 'Target: Level 3 · Competent',
			self: '4.30',
			manager: '4.00',
			peer: '4.00',
			value: 4.05,
			target: 3,
			confidence: 'high'
		}
	});
</script>

<Story name="High confidence" />
<Story
	name="Medium confidence"
	args={{
		name: 'AI Fluency for People Decisions',
		targetLabel: 'Target: Level 4 · Advanced',
		self: '2.30',
		manager: '1.50',
		peer: '1.80',
		value: 1.8,
		target: 4,
		confidence: 'medium'
	}}
/>
