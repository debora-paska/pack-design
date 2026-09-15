<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InternalTabsExample from './internal-tabs.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/HR Overview/InternalTabs',
		component: InternalTabsExample,
		tags: ['autodocs']
	});
</script>

<Story
	name="Mapping type"
	args={{
		activeId: 'family',
		items: [
			{ id: 'family', label: 'Job Family' },
			{ id: 'role', label: 'Single Role' },
			{ id: 'tasks', label: 'Task Set' }
		]
	}}
/>

<Story
	name="Role record Assessment disabled"
	args={{
		activeId: 'map',
		items: [
			{ id: 'map', label: 'Skill map' },
			{
				id: 'assess',
				label: 'Skill Assessment',
				isDisabled: true,
				hint: 'Assessment is disabled for this record'
			}
		]
	}}
/>

<Story
	name="Person record Development disabled"
	args={{
		activeId: 'report',
		items: [
			{ id: 'report', label: 'Report' },
			{ id: 'gap', label: 'Gap Analysis' },
			{
				id: 'development',
				label: 'Development Plan',
				isDisabled: true,
				hint: 'Development is disabled for this record'
			}
		]
	}}
/>

<Story
	name="Project"
	args={{
		activeId: 'overview',
		items: [
			{ id: 'overview', label: 'Overview' },
			{ id: 'participants', label: 'Participants' },
			{ id: 'reports', label: 'Reports' },
			{ id: 'configuration', label: 'Configuration' }
		]
	}}
/>
