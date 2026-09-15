<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ToggleGroupExample from './toggle-group.example.svelte';

	const { Story } = defineMeta({
		title: 'ToggleGroup',
		component: ToggleGroupExample,
		tags: ['autodocs']
	});
</script>

<Story name="Single" />

<Story name="Small" args={{ size: 'sm', variant: 'default', value: 'now' }} />
