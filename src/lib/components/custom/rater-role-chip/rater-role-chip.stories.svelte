<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RaterRoleChip from './rater-role-chip.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/RaterRoleChip',
		component: RaterRoleChip,
		tags: ['autodocs'],
		args: {
			label: 'Self',
			isOn: true
		}
	});
</script>

<div class="flex flex-wrap gap-1.5">
	<Story name="On" />
	<Story name="Off" args={{ label: 'Collaborators', isOn: false }} />
</div>
