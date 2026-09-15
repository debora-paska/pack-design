<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';

	let {
		title,
		description,
		value,
		groupName = 'assessment-type',
		isSelected = false,
		onSelect
	}: {
		title: string;
		description: string;
		value: string;
		groupName?: string;
		isSelected?: boolean;
		onSelect?: (value: string) => void;
	} = $props();
</script>

<label
	class={cn(
		'flex cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-3',
		isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-5 bg-card'
	)}
>
	<input
		type="radio"
		name={groupName}
		{value}
		checked={isSelected}
		class="mt-[3px] accent-primary-500"
		onchange={() => onSelect?.(value)}
	/>
	<div class="min-w-0">
		<div class="text-sm font-semibold text-foreground">{title}</div>
		<div class="mt-0.5 text-xs text-muted-foreground">{description}</div>
	</div>
</label>
