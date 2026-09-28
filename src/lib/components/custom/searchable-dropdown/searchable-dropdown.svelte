<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { Input } from '../../ui/input/index.js';
	import type { SearchableDropdownOption } from '../types';

	let {
		placeholder = 'Search and select',
		selectedLabel = '',
		query = $bindable(''),
		isOpen = $bindable(false),
		options = [],
		onSelect,
		onToggle
	}: {
		placeholder?: string;
		selectedLabel?: string;
		query?: string;
		isOpen?: boolean;
		options?: SearchableDropdownOption[];
		onSelect?: (value: string) => void;
		onToggle?: () => void;
	} = $props();

	function handleToggle() {
		isOpen = !isOpen;
		onToggle?.();
	}
</script>

<div class="relative w-full">
	<button
		type="button"
		data-slot="select-trigger"
		class={cn(
			'border-input flex h-9 w-full items-center justify-between gap-1.5 rounded-md border bg-transparent py-2 pr-2 pl-2.5 text-left text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
			!selectedLabel && 'text-muted-foreground'
		)}
		onclick={handleToggle}
	>
		<span class="truncate">{selectedLabel || placeholder}</span>
		<ChevronDownIcon
			class={cn(
				'size-4 shrink-0 text-muted-foreground transition-transform',
				isOpen && 'rotate-180'
			)}
		/>
	</button>

	{#if isOpen}
		<div
			data-slot="select-content"
			class="bg-popover text-popover-foreground absolute top-[42px] right-0 left-0 z-50 overflow-hidden rounded-md shadow-md ring-1 ring-foreground/10"
		>
			<div class="flex items-center gap-2 border-b border-border px-2.5 py-2">
				<SearchOutline class="size-3.5 shrink-0 text-muted-foreground" />
				<Input
					class="h-8 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
					value={query}
					placeholder="Search templates"
					oninput={(event) => {
						query = (event.currentTarget as HTMLInputElement).value;
					}}
				/>
			</div>
			<div class="flex max-h-56 flex-col gap-0.5 overflow-y-auto p-1">
				{#each options as option (option.value)}
					<button
						type="button"
						class="hover:bg-accent hover:text-accent-foreground flex w-full items-start justify-between gap-3 rounded-sm px-2.5 py-2 text-left outline-none"
						onclick={() => {
							onSelect?.(option.value);
							isOpen = false;
						}}
					>
						<div class="min-w-0">
							<div class="text-sm font-medium text-foreground">{option.label}</div>
							{#if option.description}
								<div class="mt-0.5 text-xs text-muted-foreground">{option.description}</div>
							{/if}
						</div>
						{#if option.meta}
							<span class="shrink-0 text-xs text-muted-foreground whitespace-nowrap">
								{option.meta}
							</span>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
