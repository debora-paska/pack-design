<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import { Input } from '../../ui/input/index.js';
	import { Switch } from '../../ui/switch/index.js';
	import type { ConfigurationPickerItem, ConfigurationPickerScope } from '../types';

	let {
		isEnabled = $bindable(false),
		query = $bindable(''),
		scope = $bindable<ConfigurationPickerScope>('company'),
		selectedValue = '',
		items = [],
		description = "Narrow generation to this company's competency set. A configuration is a named subset of this company's categories and modules — not a saved questionnaire, and never shared with other companies.",
		onSelect
	}: {
		isEnabled?: boolean;
		query?: string;
		scope?: ConfigurationPickerScope;
		selectedValue?: string;
		items?: ConfigurationPickerItem[];
		description?: string;
		onSelect?: (value: string) => void;
	} = $props();
</script>

<div>
	<div class="flex items-center gap-3">
		<Switch bind:checked={isEnabled} />
		<span class="text-sm text-foreground">Use a company configuration</span>
	</div>
	<div class="mt-2 max-w-[640px] text-[12.5px] leading-relaxed text-muted-foreground">
		{description}
	</div>

	{#if isEnabled}
		<div
			class="mt-3 flex max-w-[640px] flex-col gap-2.5 rounded-lg border border-gray-5 bg-gray-2 p-3"
		>
			<div class="flex items-center gap-2.5">
				<div
					class="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-gray-5 bg-white px-2.5"
				>
					<SearchOutline class="size-3.5 shrink-0 text-muted-foreground" />
					<Input
						class="h-9 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
						placeholder="Search configurations"
						value={query}
						oninput={(event) => {
							query = (event.currentTarget as HTMLInputElement).value;
						}}
					/>
				</div>
				<div class="flex shrink-0 gap-1 rounded-md border border-gray-5 bg-white p-0.5">
					<button
						type="button"
						class={cn(
							'rounded-sm px-2.5 py-1 text-xs font-medium',
							scope === 'all' ? 'bg-primary-50 text-primary-700' : 'text-muted-foreground'
						)}
						onclick={() => (scope = 'all')}
					>
						All
					</button>
					<button
						type="button"
						class={cn(
							'rounded-sm px-2.5 py-1 text-xs font-medium',
							scope === 'company'
								? 'bg-primary-50 text-primary-700'
								: 'text-muted-foreground'
						)}
						onclick={() => (scope = 'company')}
					>
						This company
					</button>
				</div>
			</div>

			<div class="flex flex-col gap-1.5">
				{#each items as item (item.value)}
					<button
						type="button"
						class={cn(
							'flex w-full items-start justify-between gap-3 rounded-md border px-3 py-2.5 text-left',
							selectedValue === item.value
								? 'border-primary-300 bg-primary-50'
								: 'border-transparent bg-white'
						)}
						onclick={() => onSelect?.(item.value)}
					>
						<div class="min-w-0">
							<div class="text-[13.5px] font-medium text-foreground">{item.name}</div>
							<div class="mt-0.5 text-xs text-muted-foreground">{item.meta}</div>
						</div>
						<span class="shrink-0 text-[11.5px] whitespace-nowrap text-muted-foreground">
							{item.company}
						</span>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
