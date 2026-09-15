<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PaginationExample from './pagination.example.svelte';

	const { Story } = defineMeta({
		title: 'Pagination',
		component: PaginationExample,
		tags: ['autodocs']
	});
</script>

<Story name="Default" />
