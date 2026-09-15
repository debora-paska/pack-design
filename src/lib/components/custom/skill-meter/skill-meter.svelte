<script lang="ts">
	import { Progress } from '../../ui/progress/index.js';

	let { value, label }: { value: number; label: string } = $props();

	const clamped = $derived(Math.max(0, Math.min(100, value)));
</script>

<div class="flex flex-col gap-1">
	<div class="flex justify-between text-[11px] text-muted-foreground">
		<span>{label}</span>
		<span class="text-foreground tabular-nums">{Math.round(clamped)}%</span>
	</div>
	<Progress value={clamped} />
</div>
