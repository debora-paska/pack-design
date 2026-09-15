<script lang="ts">
	import {
		AdjustmentsHorizontalOutline,
		ArrowRightFromBracketSolid,
		BellOutline
	} from 'flowbite-svelte-icons';
	import { Avatar } from '../../ui/avatar/index.js';
	import { AvatarFallback } from '../../ui/avatar/index.js';
	import { Button } from '../../ui/button/index.js';
	import { Separator } from '../../ui/separator/index.js';
	import { cn } from '@pack/ui/lib/utils.js';
	import type { InteractionPreview, SidebarLanguage } from '../types';

	let {
		userName,
		userRole,
		isMenuOpen = false,
		previewState = 'default',
		language = 'en',
		onToggle,
		onLanguage,
		onPreferences,
		onLogout
	}: {
		userName: string;
		userRole: string;
		isMenuOpen?: boolean;
		previewState?: InteractionPreview | 'menu-open';
		language?: SidebarLanguage;
		onToggle?: () => void;
		onLanguage?: (language: SidebarLanguage) => void;
		onPreferences?: () => void;
		onLogout?: () => void;
	} = $props();

	const isHoverPreview = $derived(previewState === 'hover');
	const isOpen = $derived(isMenuOpen || previewState === 'menu-open');
	const initials = $derived(
		userName
			.split(' ')
			.map((part) => part[0])
			.join('')
			.slice(0, 2)
			.toUpperCase()
	);
</script>

<div class="relative border-t border-gray-3 pt-2">
	{#if isOpen}
		<div
			class="absolute right-0 bottom-[calc(100%+8px)] left-0 z-40 rounded-lg border border-gray-5 bg-sidebar p-1.5"
		>
			<div class="flex items-center justify-between px-2.5 py-2">
				<span class="text-[12.5px] text-muted-foreground">Language</span>
				<div class="flex gap-1">
					<Button
						variant="ghost"
						size="xs"
						class={language === 'en'
							? 'bg-primary-50 font-semibold text-primary-800'
							: 'text-muted-foreground'}
						onclick={() => onLanguage?.('en')}
					>
						EN
					</Button>
					<Button
						variant="ghost"
						size="xs"
						class={language === 'it'
							? 'bg-primary-50 font-semibold text-primary-800'
							: 'text-muted-foreground'}
						onclick={() => onLanguage?.('it')}
					>
						IT
					</Button>
				</div>
			</div>
			<Separator class="my-1" />
			<Button
				variant="ghost"
				class="h-auto w-full justify-start gap-2.5 px-2.5 py-2 text-[13px] text-gray-12"
				onclick={onPreferences}
			>
				<AdjustmentsHorizontalOutline class="size-4" />
				Preferences
			</Button>
			<Button
				variant="ghost"
				class="h-auto w-full justify-start gap-2.5 px-2.5 py-2 text-[13px] text-error-300"
				onclick={onLogout}
			>
				<ArrowRightFromBracketSolid class="size-4" />
				Logout
			</Button>
		</div>
	{/if}
	<button
		type="button"
		onclick={onToggle}
		class={cn(
			'flex w-full items-center gap-2.5 rounded-md px-1.5 py-2 text-left',
			'hover:bg-gray-2',
			isHoverPreview && 'bg-gray-2'
		)}
	>
		<Avatar size="sm" class="size-8">
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
		<div class="min-w-0 flex-1">
			<div class="truncate text-[13px] font-medium text-foreground">{userName}</div>
			<div class="text-[11px] text-muted-foreground">{userRole}</div>
		</div>
		<span
			class="inline-flex size-[30px] shrink-0 items-center justify-center text-muted-foreground"
		>
			<BellOutline class="size-4" />
		</span>
	</button>
</div>
