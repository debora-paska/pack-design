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

	let { owner }: { owner: SkillOwner } = $props();

	const meta = $derived(SKILL_OWNER_META[owner]);
	const glyphClass = $derived(
		{
			human: 'text-success-400',
			hybrid: 'text-primary',
			ai: 'text-info-300',
			robot: 'text-muted-foreground'
		}[owner]
	);
</script>

<span class="inline-flex items-center gap-1.5 text-foreground">
	<span class={cn('text-[11px]', glyphClass)}>{meta.glyph}</span>
	<span class="text-xs">{meta.short}</span>
</span>
