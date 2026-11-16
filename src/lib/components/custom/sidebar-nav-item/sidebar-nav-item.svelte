<script lang="ts">
	import { AngleDownOutline } from 'flowbite-svelte-icons';
	import { cn } from '@pack/ui/lib/utils.js';
	import ChecklistMinimalisticLinear from '../solar-icons/checklist-minimalistic-linear.svelte';
	import RoundGraphOutline from '../solar-icons/round-graph-outline.svelte';
	import SettingsLinear from '../solar-icons/settings-linear.svelte';
	import UsersGroupRoundedLinear from '../solar-icons/users-group-rounded-linear.svelte';
	import Widget4Linear from '../solar-icons/widget-4-linear.svelte';
	import type { InteractionPreview, SidebarModuleIcon, SidebarNavVariant } from '../types';

	let {
		variant = 'leaf',
		label,
		icon,
		isActive = false,
		isExpanded = true,
		state = 'default',
		isDisabled = false,
		onSelect
	}: {
		variant?: SidebarNavVariant;
		label: string;
		icon?: SidebarModuleIcon;
		isActive?: boolean;
		isExpanded?: boolean;
		state?: InteractionPreview;
		isDisabled?: boolean;
		onSelect?: () => void;
	} = $props();

	const isHoverPreview = $derived(state === 'hover');
	const isActiveState = $derived(isActive || state === 'active');
	const isDisabledState = $derived(isDisabled || state === 'disabled');
	const isNested = $derived(variant === 'nested');
	const isGroup = $derived(variant === 'group');
</script>

<button
	type="button"
	disabled={isDisabledState}
	aria-expanded={isGroup ? isExpanded : undefined}
	onclick={() => {
		if (!isDisabledState) onSelect?.();
	}}
	class={cn(
		'flex w-full items-center gap-2.5 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
		isNested ? 'mt-0.5 py-1.5 pr-2.5 pl-[47px] text-[12.5px]' : 'px-2.5 py-2 text-[13.5px]',
		// Menu entries (leaf, group) are medium at rest; submenu entries regular (2026-11-16).
		isGroup ? 'font-medium text-sidebar-foreground' : isNested ? 'text-gray-11' : 'font-medium text-gray-11',
		!isDisabledState && !(isActiveState && !isGroup) && 'hover:bg-gray-2',
		isHoverPreview && !isDisabledState && !isActiveState && 'bg-gray-2',
		// The current page: a top-level entry is semibold, a submenu entry medium; a group holding it
		// is semibold, with the fill only while collapsed. Fill primary-50, gray-13 icon and text (17.7:1),
		// and a 3px primary-700 bar on the leading edge (5:1 on the fill).
		isActiveState && !isGroup && 'bg-primary-50 text-gray-13 relative before:absolute before:inset-y-1.5 before:left-0 before:w-[3px] before:rounded-full before:bg-primary-700',
		isActiveState && !isGroup && (isNested ? 'font-medium' : 'font-semibold'),
		isActiveState && isGroup && 'font-semibold text-gray-13',
		isActiveState && isGroup && !isExpanded && 'bg-primary-50 relative before:absolute before:inset-y-1.5 before:left-0 before:w-[3px] before:rounded-full before:bg-primary-700',
		// Disabled: a colour, not opacity; not usable, so exempt from contrast.
		isDisabledState && 'pointer-events-none text-gray-9'
	)}
>
	{#if !isNested && icon === 'dashboard'}
		<Widget4Linear />
	{:else if !isNested && icon === 'skill-mapping'}
		<RoundGraphOutline />
	{:else if !isNested && icon === 'assessment'}
		<ChecklistMinimalisticLinear />
	{:else if !isNested && icon === 'learning-and-development'}
		<UsersGroupRoundedLinear />
	{:else if !isNested && icon === 'general'}
		<SettingsLinear />
	{/if}
	<span class="min-w-0 flex-1 truncate">{label}</span>
	{#if isGroup}
		<AngleDownOutline
			class={cn('ml-auto size-3.5 shrink-0 text-gray-8', !isExpanded && '-rotate-90')}
		/>
	{/if}
</button>
