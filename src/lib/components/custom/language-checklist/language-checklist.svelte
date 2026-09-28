<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import { AngleDownOutline } from 'flowbite-svelte-icons';
	import { Checkbox } from '../../ui/checkbox/index.js';
	import type { LanguageChecklistOption } from '../types';

	let {
		options = [],
		selected = $bindable<string[]>([]),
		isOpen = $bindable(false),
		placeholder = 'Select languages',
		onToggleOption
	}: {
		options?: LanguageChecklistOption[];
		selected?: string[];
		isOpen?: boolean;
		placeholder?: string;
		onToggleOption?: (value: string) => void;
	} = $props();

	const label = $derived(
		selected.length
			? options
					.filter((option) => selected.includes(option.value))
					.map((option) => option.label)
					.join(', ')
			: placeholder
	);

	function handleCheckedChange(value: string, next: boolean | 'indeterminate') {
		const isOn = next === true;
		if (!isOn && selected.length === 1 && selected.includes(value)) return;
		selected = isOn
			? selected.includes(value)
				? selected
				: [...selected, value]
			: selected.filter((item) => item !== value);
		onToggleOption?.(value);
	}
</script>

<div class="relative max-w-[300px]">
	<button
		type="button"
		class="border-input data-placeholder:text-muted-foreground flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-2.5 py-2 text-left text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
		onclick={() => (isOpen = !isOpen)}
	>
		<span
			class={cn(
				'truncate',
				selected.length ? 'text-foreground' : 'text-muted-foreground'
			)}
		>
			{label}
		</span>
		<AngleDownOutline
			class={cn('size-4 shrink-0 text-muted-foreground transition-transform', isOpen && 'rotate-180')}
		/>
	</button>

	{#if isOpen}
		<div
			class="bg-popover text-popover-foreground absolute top-[42px] right-0 left-0 z-20 rounded-md p-1.5 shadow-md ring-1 ring-foreground/10"
		>
			{#each options as option (option.value)}
				{@const isOn = selected.includes(option.value)}
				<label
					class={cn(
						'flex w-full cursor-pointer items-center gap-2.5 rounded-sm px-2.5 py-2 text-left text-[13px]',
						isOn
							? 'bg-primary-50 font-semibold text-primary-800'
							: 'font-medium text-foreground'
					)}
				>
					<Checkbox
						checked={isOn}
						onCheckedChange={(next) => handleCheckedChange(option.value, next)}
					/>
					<span>{option.label}</span>
				</label>
			{/each}
		</div>
	{/if}
</div>
