<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import { Card } from '../../ui/card/index.js';
	import { CardContent } from '../../ui/card/index.js';
	import type { UniversalChipColor } from '../types';

	let {
		title,
		value,
		description,
		color = 'gray'
	}: {
		title: string;
		value: string;
		description: string;
		color?: UniversalChipColor;
	} = $props();

	const washClass: Record<UniversalChipColor, string> = {
		gray: 'bg-gray-3',
		primary: 'bg-primary-50',
		success: 'bg-success-50',
		warning: 'bg-warning-50',
		error: 'bg-error-50',
		info: 'bg-info-50'
	};

	const titleClass: Record<UniversalChipColor, string> = {
		gray: 'text-gray-11',
		primary: 'text-primary-100',
		success: 'text-success-100',
		warning: 'text-warning-100',
		error: 'text-error-100',
		info: 'text-info-100'
	};
</script>

<Card
	class={cn(
		'w-full min-w-0 gap-1 shadow-none ring-0 [--card-spacing:--spacing(4)]',
		washClass[color]
	)}
>
	<CardContent class="flex flex-col gap-1">
		<div class={cn('text-xs font-medium', titleClass[color])}>{title}</div>
		<div class="text-2xl font-bold tracking-tight text-foreground">{value}</div>
		<div class="text-xs text-muted-foreground">{description}</div>
	</CardContent>
</Card>
