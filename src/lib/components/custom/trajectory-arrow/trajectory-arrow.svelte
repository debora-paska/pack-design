<script lang="ts">
	import { ArrowDownOutline, ArrowUpOutline } from 'flowbite-svelte-icons';

	let { value, compact = false }: { value: number; compact?: boolean } = $props();

	const isUp = $derived(value >= 0);
	const percentLabel = $derived(`${isUp ? '+' : ''}${(value * 100).toFixed(0)}%`);
</script>

<span
	class="inline-flex items-center justify-end gap-1.5 font-semibold tabular-nums"
	class:text-success-400={isUp}
	class:text-destructive={!isUp}
	class:text-[11px]={compact}
	class:text-[13px]={!compact}
>
	{#if isUp}
		<ArrowUpOutline class={compact ? 'size-3' : 'size-4'} />
	{:else}
		<ArrowDownOutline class={compact ? 'size-3' : 'size-4'} />
	{/if}
	{percentLabel}
</span>
