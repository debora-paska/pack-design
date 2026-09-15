<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { createRawSnippet } from 'svelte';
	import Badge from './badge.svelte';

	const { Story } = defineMeta({
		title: 'Badge',
		component: Badge,
		tags: ['autodocs'],
		args: {
			children: createRawSnippet(() => ({
				render: () => 'Growing'
			}))
		}
	});
</script>

<Story name="Default" args={{}} />
<Story name="Secondary" args={{ variant: 'secondary' }} />
<Story name="Outline" args={{ variant: 'outline' }} />
<Story name="Destructive" args={{ variant: 'destructive' }} />
<Story name="Ghost" args={{ variant: 'ghost' }} />
<Story name="Link" args={{ variant: 'link' }} />
