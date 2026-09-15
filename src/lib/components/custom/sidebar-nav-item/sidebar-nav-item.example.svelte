<script lang="ts">
	import SidebarNavItem from './sidebar-nav-item.svelte';
	import type { InteractionPreview, SidebarModuleIcon, SidebarNavVariant } from '../types';

	let {
		variant = 'leaf',
		label = 'Dashboard',
		icon = 'dashboard',
		isActive = false,
		isExpanded = true,
		state = 'default'
	}: {
		variant?: SidebarNavVariant;
		label?: string;
		icon?: SidebarModuleIcon;
		isActive?: boolean;
		isExpanded?: boolean;
		state?: InteractionPreview;
	} = $props();
</script>

<div class="w-[240px]">
	<SidebarNavItem {variant} {label} {icon} {isActive} {isExpanded} {state} />
</div>
