<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';

	let {
		levels = [1, 2, 3, 4, 5],
		value = $bindable(undefined as number | undefined),
		onSelect
	}: {
		levels?: number[];
		value?: number;
		onSelect?: (level: number) => void;
	} = $props();
</script>

<div class="flex flex-wrap items-center gap-2">
	<span class="text-xs text-muted-foreground">Expected level:</span>
	{#each levels as level (level)}
		<button
			type="button"
			class={cn(
				'inline-flex size-7 items-center justify-center rounded-md border text-[12.5px]',
				value === level
					? 'border-primary-500 bg-primary-500 font-semibold text-white'
					: 'border-gray-5 bg-white font-medium text-foreground'
			)}
			onclick={() => {
				value = level;
				onSelect?.(level);
			}}
		>
			{level}
		</button>
	{/each}
</div>
