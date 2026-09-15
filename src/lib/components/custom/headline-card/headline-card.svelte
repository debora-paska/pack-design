<script lang="ts">
	import { Card } from '../../ui/card/index.js';
	import { CardContent } from '../../ui/card/index.js';

	let {
		title = 'Headline',
		body
	}: {
		title?: string;
		body: string;
	} = $props();
</script>

<Card class="gap-2 py-[18px] [--card-spacing:--spacing(4)]">
	<CardContent>
		<div class="mb-2 text-sm font-semibold text-foreground">{title}</div>
		<p class="m-0 text-sm leading-relaxed text-foreground">{body}</p>
	</CardContent>
</Card>
