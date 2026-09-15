<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Input from './input.svelte';

	const { Story } = defineMeta({
		title: 'Input',
		component: Input,
		tags: ['autodocs'],
		argTypes: {
			ref: { control: false },
			files: { control: false }
		},
		args: {
			placeholder: 'Search skills…',
			oninput: fn()
		}
	});
</script>

<Story name="Default" args={{}} />
<Story name="With value" args={{ value: 'Coaching' }} />
<Story name="Disabled" args={{ disabled: true, value: 'Read only' }} />
<Story name="Number" args={{ type: 'number', value: 12, placeholder: 'Headcount' }} />
