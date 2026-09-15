<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
	import { cn, type WithoutChildrenOrChild } from '@pack/ui/lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> = $props();
</script>

<RadioGroupPrimitive.Item
	bind:ref
	data-slot="radio-group-item"
	class={cn(
		'peer relative flex size-4 shrink-0 items-center justify-center rounded-full border border-input bg-white shadow-xs outline-none transition-shadow after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:border-primary-500',
		className
	)}
	{...restProps}
>
	{#snippet children({ checked })}
		{#if checked}
			<span class="size-2 rounded-full bg-primary-500"></span>
		{/if}
	{/snippet}
</RadioGroupPrimitive.Item>
