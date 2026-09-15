<script lang="ts">
	import {
		ChartOutline,
		ClipboardCheckOutline,
		CogOutline,
		GridOutline,
		UsersGroupOutline
	} from 'flowbite-svelte-icons';
	import { AngleDownOutline } from 'flowbite-svelte-icons';
	import { cn } from '@pack/ui/lib/utils.js';
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
		'flex w-full items-center gap-2.5 rounded-md text-left',
		isNested ? 'mt-0.5 py-1.5 pr-2.5 pl-[47px] text-[12.5px]' : 'px-2.5 py-2 text-[13.5px]',
		isGroup ? 'font-medium text-sidebar-foreground' : 'text-gray-11',
		!isDisabledState && 'hover:bg-gray-2',
		isHoverPreview && !isDisabledState && !isActiveState && 'bg-gray-2',
		isActiveState && 'bg-sidebar-accent font-medium text-primary-500',
		isDisabledState && 'pointer-events-none opacity-45'
	)}
>
	{#if !isNested && icon === 'dashboard'}
		<ChartOutline class="size-[17px] shrink-0" />
	{:else if !isNested && icon === 'skill-mapping'}
		<GridOutline class="size-[17px] shrink-0" />
	{:else if !isNested && icon === 'assessment'}
		<ClipboardCheckOutline class="size-[17px] shrink-0" />
	{:else if !isNested && icon === 'learning-and-development'}
		<UsersGroupOutline class="size-[17px] shrink-0" />
	{:else if !isNested && icon === 'general'}
		<CogOutline class="size-[17px] shrink-0" />
	{/if}
	<span class="min-w-0 flex-1 truncate">{label}</span>
	{#if isGroup}
		<AngleDownOutline
			class={cn('ml-auto size-3.5 shrink-0 text-gray-8', !isExpanded && '-rotate-90')}
		/>
	{/if}
</button>
