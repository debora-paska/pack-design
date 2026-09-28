<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ColorsExample from './colors.example.svelte';

	const { Story } = defineMeta({
		title: 'Colors',
		component: ColorsExample,
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<Story name="Palette" />
