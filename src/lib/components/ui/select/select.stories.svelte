<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SelectExample from './select.example.svelte';

	const { Story } = defineMeta({
		title: 'Select',
		component: SelectExample,
		tags: ['autodocs']
	});
</script>

<Story name="Default" />
