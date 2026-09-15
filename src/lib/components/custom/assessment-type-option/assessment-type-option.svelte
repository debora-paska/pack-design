<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import { RadioGroup, RadioGroupItem } from '../../ui/radio-group/index.js';

	let {
		title,
		description,
		value,
		isSelected = false,
		onSelect
	}: {
		title: string;
		description: string;
		value: string;
		isSelected?: boolean;
		onSelect?: (value: string) => void;
	} = $props();
</script>

<RadioGroup
	class="gap-0"
	value={isSelected ? value : ''}
	onValueChange={(next) => onSelect?.(next)}
>
	<div
		class={cn(
			'flex cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-3',
			isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-5 bg-card'
		)}
		onclick={() => onSelect?.(value)}
	>
		<RadioGroupItem {value} class="mt-[3px]" />
		<div class="min-w-0">
			<div class="text-sm font-semibold text-foreground">{title}</div>
			<div class="mt-0.5 text-xs text-muted-foreground">{description}</div>
		</div>
	</div>
</RadioGroup>
