<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { createRawSnippet } from 'svelte';
	import { fn } from 'storybook/test';
	import Toggle from './toggle.svelte';

	const { Story } = defineMeta({
		title: 'Toggle',
		component: Toggle,
		tags: ['autodocs'],
		argTypes: {
			ref: { control: false }
		},
		args: {
			onPressedChange: fn(),
			children: createRawSnippet(() => ({
				render: () => 'Now'
			}))
		}
	});
</script>

<Story name="Off" args={{ pressed: false }} />
<Story name="On" args={{ pressed: true }} />
<Story name="Outline" args={{ variant: 'outline', pressed: true }} />
<Story name="Small" args={{ size: 'sm', pressed: true }} />
