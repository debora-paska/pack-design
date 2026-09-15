<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import BreadcrumbExample from './breadcrumb.example.svelte';

	const { Story } = defineMeta({
		title: 'Breadcrumb',
		component: BreadcrumbExample,
		tags: ['autodocs']
	});
</script>

<Story name="Default" />
