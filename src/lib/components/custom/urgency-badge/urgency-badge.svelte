<script lang="ts" module>
	import type { SkillUrgency } from '../types';

	const URGENCY_META: Record<SkillUrgency, { label: string; dotClass: string }> = {
		high: { label: 'High', dotClass: 'bg-destructive' },
		med: { label: 'Medium', dotClass: 'bg-warning-300' },
		low: { label: 'Low', dotClass: 'bg-muted-foreground' }
	};
</script>

<script lang="ts">
	let { level }: { level: SkillUrgency } = $props();

	const meta = $derived(URGENCY_META[level]);
</script>

<span class="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
	<span class="inline-block size-1.5 rounded-full {meta.dotClass}"></span>
	{meta.label}
</span>
