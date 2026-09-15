<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ThemeCheck from './theme-check.svelte';

	const { Story } = defineMeta({
		title: 'Theme check',
		component: ThemeCheck
	});
</script>

<Story name="Page" />
