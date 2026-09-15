<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ImportedSkillsPanel from './imported-skills-panel.svelte';

	const skills = [
		{ name: 'Employee Relations & Advisory', status: 'stable' },
		{ name: 'Coaching & Developmental Conversations', status: 'growing' },
		{ name: 'Strategic Workforce Planning', status: 'new' },
		{ name: 'AI Fluency for People Decisions', status: 'new' }
	];

	const { Story } = defineMeta({
		title: 'custom/Assessment/ImportedSkillsPanel',
		component: ImportedSkillsPanel,
		tags: ['autodocs'],
		args: {
			count: 12,
			mappingTitle: 'HR Business Partner',
			skills,
			isOpen: false
		}
	});
</script>

<Story name="Collapsed" />
<Story name="Expanded" args={{ isOpen: true }} />
