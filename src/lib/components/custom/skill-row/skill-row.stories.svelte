<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SkillRow from './skill-row.svelte';

	const { Story } = defineMeta({
		title: 'custom/Molecular/SkillRow',
		component: SkillRow,
		tags: ['autodocs'],
		args: {
			row: {
				id: 'stakeholder-management',
				name: 'Stakeholder management',
				description: 'Hold alignment across business partners and leadership.',
				status: 'growing',
				owner: 'human',
				urgency: 'high',
				trajectory: 0.18
			}
		}
	});
</script>

<Story name="Default" />
