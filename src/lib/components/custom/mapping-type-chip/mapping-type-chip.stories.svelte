<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MappingTypeChip from './mapping-type-chip.svelte';

	const { Story } = defineMeta({
		title: 'custom/HR Overview/MappingTypeChip',
		component: MappingTypeChip,
		tags: ['autodocs'],
		args: {
			type: 'family'
		}
	});
</script>

<Story name="Family" />
<Story name="Single" args={{ type: 'single' }} />
<Story name="Tasks" args={{ type: 'tasks' }} />
