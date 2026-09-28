<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import EmptySkillsPanel from './empty-skills-panel.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/EmptySkillsPanel',
		component: EmptySkillsPanel,
		tags: ['autodocs'],
		args: {
			title: 'No skills yet',
			description: 'Add at least one skill to generate questions.'
		}
	});
</script>

<Story name="Default" />
