<script lang="ts">
	import { Card } from '../../ui/card/index.js';
	import { CardContent } from '../../ui/card/index.js';

	let {
		title = 'Aria interview · summary',
		meta,
		items
	}: {
		title?: string;
		meta: string;
		items: string[];
	} = $props();
</script>

<Card class="gap-3 py-5 [--card-spacing:--spacing(5)]">
	<CardContent>
		<div class="mb-3 flex items-center justify-between gap-3">
			<div class="text-sm font-semibold text-foreground">{title}</div>
			<span class="text-[11px] text-muted-foreground">{meta}</span>
		</div>
		<ul class="list-disc space-y-1 pl-[18px] text-[13px] leading-relaxed text-foreground">
			{#each items as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	</CardContent>
</Card>
