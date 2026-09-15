<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import UniversalTabsExample from './universal-tabs.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/Atomic/UniversalTabs',
		component: UniversalTabsExample,
		tags: ['autodocs'],
		args: {
			activeId: 'all',
			items: [
				{ id: 'all', label: 'All', count: '24' },
				{ id: 'running', label: 'In progress', count: '8' },
				{ id: 'done', label: 'Done', count: '14' },
				{ id: 'failed', label: 'Failed', count: '2' }
			]
		}
	});
</script>

<Story name="All active" />

<Story name="Done active" args={{ activeId: 'done' }} />

<Story
	name="Failed disabled"
	args={{
		items: [
			{ id: 'all', label: 'All', count: '24' },
			{ id: 'running', label: 'In progress', count: '8' },
			{ id: 'done', label: 'Done', count: '14' },
			{ id: 'failed', label: 'Failed', count: '0', isDisabled: true }
		]
	}}
/>
