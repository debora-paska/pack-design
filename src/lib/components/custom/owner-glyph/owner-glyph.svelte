<script lang="ts" module>
	import type { SkillOwner } from '../types';

	export const SKILL_OWNER_META: Record<
		SkillOwner,
		{ label: string; short: string; glyph: string }
	> = {
		human: { label: 'Human-led', short: 'Human', glyph: '◐' },
		hybrid: { label: 'Hybrid Human + AI', short: 'Hybrid', glyph: '◑' },
		ai: { label: 'AI Agent-led', short: 'AI Agent', glyph: '●' },
		robot: { label: 'Robot-led', short: 'Robot', glyph: '■' }
	};
</script>

<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import UniversalChip from '../universal-chip/universal-chip.svelte';

	let { owner }: { owner: SkillOwner } = $props();

	const meta = $derived(SKILL_OWNER_META[owner]);
	const glyphClass = $derived(
		{
			human: 'text-success-400',
			hybrid: 'text-primary-500',
			ai: 'text-info-300',
			robot: 'text-muted-foreground'
		}[owner]
	);
</script>

<UniversalChip color="white" class="gap-1">
	<span class={cn('text-[11px] leading-none', glyphClass)}>{meta.glyph}</span>
	{meta.short}
</UniversalChip>
