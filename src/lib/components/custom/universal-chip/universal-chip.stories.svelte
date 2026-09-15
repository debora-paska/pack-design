<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { createRawSnippet } from 'svelte';
	import UniversalChip from './universal-chip.svelte';

	const { Story } = defineMeta({
		title: 'custom/Atomic/UniversalChip',
		component: UniversalChip,
		tags: ['autodocs'],
		args: {
			color: 'gray',
			children: createRawSnippet(() => ({
				render: () => '3 roles'
			}))
		},
		argTypes: {
			color: {
				control: { type: 'select' },
				options: ['gray', 'primary', 'orange', 'success', 'warning', 'error', 'info']
			}
		}
	});
</script>

<Story name="Gray" />
<Story name="Primary" args={{ color: 'primary', children: createRawSnippet(() => ({ render: () => 'Primary' })) }} />
<Story name="Orange" args={{ color: 'orange', children: createRawSnippet(() => ({ render: () => 'Orange' })) }} />
<Story name="Success" args={{ color: 'success', children: createRawSnippet(() => ({ render: () => 'Done' })) }} />
<Story name="Warning" args={{ color: 'warning', children: createRawSnippet(() => ({ render: () => 'In progress' })) }} />
<Story name="Error" args={{ color: 'error', children: createRawSnippet(() => ({ render: () => 'Failed' })) }} />
<Story name="Info" args={{ color: 'info', children: createRawSnippet(() => ({ render: () => 'Job family' })) }} />
<Story
	name="Single role"
	args={{ color: 'gray', children: createRawSnippet(() => ({ render: () => 'Single role' })) }}
/>
<Story
	name="Task set"
	args={{ color: 'warning', children: createRawSnippet(() => ({ render: () => 'Task set' })) }}
/>
