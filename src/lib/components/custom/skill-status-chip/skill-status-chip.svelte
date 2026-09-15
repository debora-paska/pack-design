<script lang="ts" module>
	import type { BadgeVariant } from '../../ui/badge/badge.svelte';
	import type { SkillStatus } from '../types';

	export const SKILL_STATUS_META: Record<SkillStatus, { label: string; variant: BadgeVariant }> = {
		growing: { label: 'Growing', variant: 'secondary' },
		stable: { label: 'Stable', variant: 'outline' },
		embedded: { label: 'Embedded', variant: 'outline' },
		new: { label: 'New', variant: 'default' },
		declining: { label: 'Declining', variant: 'destructive' }
	};
</script>

<script lang="ts">
	import { Badge } from '../../ui/badge/index.js';

	let { status }: { status: SkillStatus } = $props();

	const meta = $derived(SKILL_STATUS_META[status]);
</script>

<Badge variant={meta.variant}>{meta.label}</Badge>
