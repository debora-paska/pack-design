<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Switch from './switch.svelte';

	const { Story } = defineMeta({
		title: 'Switch',
		component: Switch,
		tags: ['autodocs'],
		argTypes: {
			ref: { control: false }
		},
		args: {
			onCheckedChange: fn()
		}
	});
</script>

<Story name="Off" args={{ checked: false }} />
<Story name="On" args={{ checked: true }} />
<Story name="Small" args={{ checked: true, size: 'sm' }} />
<Story name="Disabled" args={{ checked: true, disabled: true }} />
