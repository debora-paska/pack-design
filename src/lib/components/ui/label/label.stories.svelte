<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { createRawSnippet } from 'svelte';
	import Label from './label.svelte';

	const { Story } = defineMeta({
		title: 'Label',
		component: Label,
		tags: ['autodocs'],
		args: {
			children: createRawSnippet(() => ({
				render: () => 'Role title'
			}))
		}
	});
</script>

<Story name="Default" args={{}} />
