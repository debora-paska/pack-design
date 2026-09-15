<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import HrSidebarExample from './hr-sidebar.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/HR Overview/Sidebar',
		component: HrSidebarExample,
		tags: ['autodocs'],
		args: {
			activeItem: 'smMappings',
			userName: 'Giulia Moretti',
			userRole: 'HR Director'
		}
	});
</script>

<Story name="Menu active" />
<Story name="Dashboard active" args={{ activeItem: 'dashboard' }} />
