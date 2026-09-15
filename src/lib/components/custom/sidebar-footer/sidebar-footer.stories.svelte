<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SidebarFooterExample from './sidebar-footer.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/HR Overview/SidebarFooter',
		component: SidebarFooterExample,
		tags: ['autodocs'],
		args: {
			userName: 'Giulia Moretti',
			userRole: 'HR Director',
			previewState: 'default'
		}
	});
</script>

<Story name="Default" />
<Story name="Hover" args={{ previewState: 'hover' }} />
<Story name="Menu open" args={{ previewState: 'menu-open' }} />
