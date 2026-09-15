<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SidebarNavItemExample from './sidebar-nav-item.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/HR Overview/SidebarNavItem',
		component: SidebarNavItemExample,
		tags: ['autodocs'],
		args: {
			variant: 'leaf',
			label: 'Dashboard',
			icon: 'dashboard',
			state: 'default'
		}
	});
</script>

<Story name="Leaf Default" />
<Story name="Leaf Hover" args={{ state: 'hover' }} />
<Story name="Leaf Active" args={{ state: 'active' }} />
<Story name="Leaf Disabled" args={{ state: 'disabled' }} />

<Story
	name="Group Expanded"
	args={{ variant: 'group', label: 'Skill Mapping', icon: 'skill-mapping', isExpanded: true }}
/>
<Story
	name="Group Collapsed"
	args={{ variant: 'group', label: 'Skill Mapping', icon: 'skill-mapping', isExpanded: false }}
/>

<Story name="Nested Default" args={{ variant: 'nested', label: 'Overview' }} />
<Story
	name="Nested Active"
	args={{ variant: 'nested', label: 'Mappings', state: 'active' }}
/>
