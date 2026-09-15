<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Checkbox from './checkbox.svelte';

	const { Story } = defineMeta({
		title: 'Checkbox',
		component: Checkbox,
		tags: ['autodocs'],
		argTypes: {
			ref: { control: false }
		},
		args: {
			onCheckedChange: fn()
		}
	});
</script>

<Story name="Unchecked" args={{ checked: false }} />
<Story name="Checked" args={{ checked: true }} />
<Story name="Indeterminate" args={{ indeterminate: true }} />
<Story name="Disabled" args={{ checked: true, disabled: true }} />
