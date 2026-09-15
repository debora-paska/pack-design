<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MappingStatusChip from './mapping-status-chip.svelte';

	const { Story } = defineMeta({
		title: 'custom/HR Overview/MappingStatusChip',
		component: MappingStatusChip,
		tags: ['autodocs'],
		args: {
			status: 'done'
		}
	});
</script>

<Story name="Done" />
<Story name="In progress" args={{ status: 'queued' }} />
<Story name="Failed" args={{ status: 'failed' }} />
