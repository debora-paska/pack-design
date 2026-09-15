<script lang="ts">
	import { Card } from '../../ui/card/index.js';
	import { CardContent } from '../../ui/card/index.js';

	let {
		level,
		label,
		description
	}: {
		level: number;
		label: string;
		description: string;
	} = $props();
</script>

<Card class="gap-1 py-3 [--card-spacing:--spacing(3)]">
	<CardContent>
		<div class="text-[11px] font-medium text-muted-foreground">Level {level}</div>
		<div class="mt-0.5 text-[13px] font-semibold text-foreground">{label}</div>
		<div class="mt-1 text-[11px] leading-snug text-muted-foreground">{description}</div>
	</CardContent>
</Card>
