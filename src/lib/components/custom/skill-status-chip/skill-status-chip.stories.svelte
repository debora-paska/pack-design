<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SkillStatusChip from './skill-status-chip.svelte';

	const { Story } = defineMeta({
		title: 'custom/Atomic/SkillStatusChip',
		component: SkillStatusChip,
		tags: ['autodocs'],
		args: {
			status: 'growing'
		}
	});
</script>

<Story name="Growing" args={{ status: 'growing' }} />
<Story name="Stable" args={{ status: 'stable' }} />
<Story name="Embedded" args={{ status: 'embedded' }} />
<Story name="New" args={{ status: 'new' }} />
<Story name="Declining" args={{ status: 'declining' }} />
