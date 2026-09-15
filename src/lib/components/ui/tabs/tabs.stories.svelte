<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TabsExample from './tabs.example.svelte';

	const { Story } = defineMeta({
		title: 'Tabs',
		component: TabsExample,
		tags: ['autodocs']
	});
</script>

<Story name="Default" />

<Story name="Line" args={{ variant: 'line' }} />
