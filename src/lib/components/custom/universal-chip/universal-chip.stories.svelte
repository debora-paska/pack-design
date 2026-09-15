<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { createRawSnippet } from 'svelte';
	import UniversalChip from './universal-chip.svelte';

	const { Story } = defineMeta({
		title: 'custom/HR Overview/UniversalChip',
		component: UniversalChip,
		tags: ['autodocs'],
		args: {
			color: 'gray',
			children: createRawSnippet(() => ({
				render: () => '3 roles'
			}))
		}
	});
</script>

<Story name="Gray" />
<Story name="Primary" args={{ color: 'primary', children: createRawSnippet(() => ({ render: () => 'Primary' })) }} />
<Story name="Success" args={{ color: 'success', children: createRawSnippet(() => ({ render: () => 'Done' })) }} />
<Story name="Warning" args={{ color: 'warning', children: createRawSnippet(() => ({ render: () => 'In progress' })) }} />
<Story name="Error" args={{ color: 'error', children: createRawSnippet(() => ({ render: () => 'Failed' })) }} />
<Story name="Info" args={{ color: 'info', children: createRawSnippet(() => ({ render: () => 'Job family' })) }} />
