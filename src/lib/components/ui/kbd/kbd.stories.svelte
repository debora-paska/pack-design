<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { createRawSnippet } from 'svelte';
	import Kbd from './kbd.svelte';

	const { Story } = defineMeta({
		title: 'Kbd',
		component: Kbd,
		tags: ['autodocs'],
		args: {
			children: createRawSnippet(() => ({
				render: () => '⌘K'
			}))
		}
	});
</script>

<Story name="Default" args={{}} />
<Story
	name="Enter"
	args={{
		children: createRawSnippet(() => ({
			render: () => '↵'
		}))
	}}
/>
