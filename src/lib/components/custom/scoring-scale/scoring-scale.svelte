<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';

	let {
		options = [3, 4, 5, 6, 7, 8, 9, 10],
		value = $bindable(5),
		showCaption = true,
		caption,
		onSelect
	}: {
		options?: number[];
		value?: number;
		showCaption?: boolean;
		caption?: string;
		onSelect?: (value: number) => void;
	} = $props();

	const resolvedCaption = $derived(
		caption ??
			`Participants answer on a 1–${value} scale. This is how people score each question. It does not change the questions.`
	);
</script>

<div>
	<div class="flex max-w-[460px] items-center px-2.5 pt-1.5 pb-[30px]">
		{#each options as option, index (option)}
			{@const isSelected = option === value}
			{@const isFilled = option <= value}
			<button
				type="button"
				title={`Scores from 1 to ${option}`}
				class={cn('relative flex items-center', index === 0 ? 'shrink-0' : 'min-w-4 flex-1')}
				onclick={() => {
					value = option;
					onSelect?.(option);
				}}
			>
				{#if index > 0}
					<span
						class={cn('h-1 flex-1 rounded-sm', isFilled ? 'bg-primary-500' : 'bg-gray-6')}
					></span>
				{/if}
				<span
					class={cn(
						'shrink-0 rounded-full border-solid bg-white',
						isSelected
							? 'size-5 border-[6px] border-primary-500 shadow-[0_0_0_4px_var(--color-primary-50)]'
							: isFilled
								? 'size-4 border-4 border-primary-500'
								: 'size-4 border-4 border-gray-6'
					)}
				></span>
				<span
					class={cn(
						'absolute top-7 w-[22px] text-center',
						isSelected
							? '-right-px text-[13px] font-semibold text-primary-700'
							: '-right-0.5 text-xs font-medium text-muted-foreground'
					)}
				>
					{option}
				</span>
			</button>
		{/each}
	</div>
	{#if showCaption}
		<div class="text-[12.5px] text-muted-foreground">{resolvedCaption}</div>
	{/if}
</div>
