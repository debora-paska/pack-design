<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RadioGroupExample from './radio-group.example.svelte';

	const { Story } = defineMeta({
		title: 'Radio',
		component: RadioGroupExample,
		tags: ['autodocs'],
		args: {
			value: 'comfortable',
			disabled: false
		}
	});
</script>

<Story name="Default" />
<Story name="Unchecked" args={{ value: '' }} />
<Story name="Disabled" args={{ disabled: true }} />
