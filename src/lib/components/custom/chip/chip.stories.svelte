<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { createRawSnippet } from 'svelte';
	import Chip from './chip.svelte';

	const { Story } = defineMeta({
		title: 'custom/Atomic/Chip',
		component: Chip,
		tags: ['autodocs'],
		args: {
			state: 'default',
			children: createRawSnippet(() => ({
				render: () => '14 days'
			}))
		},
		argTypes: {
			state: {
				control: { type: 'select' },
				options: ['default', 'selected', 'disabled']
			}
		}
	});
</script>

<Story name="Default" />
<Story name="Selected" args={{ state: 'selected' }} />
<Story name="Disabled" args={{ state: 'disabled' }} />
