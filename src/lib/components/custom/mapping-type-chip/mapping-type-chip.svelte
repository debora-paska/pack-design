<script lang="ts">
	import UniversalChip from '../universal-chip/universal-chip.svelte';
	import type { MappingCardType, UniversalChipColor } from '../types';

	let {
		type = 'family'
	}: {
		type?: MappingCardType;
	} = $props();

	const meta: Record<MappingCardType, { label: string; color: UniversalChipColor }> = {
		family: { label: 'Job family', color: 'info' },
		single: { label: 'Single role', color: 'gray' },
		tasks: { label: 'Task set', color: 'warning' }
	};

	const resolved = $derived(meta[type]);
</script>

<UniversalChip
	color={resolved.color}
	class="rounded-md px-2.5 py-1 text-[10.5px] font-bold tracking-wide uppercase"
>
	{resolved.label}
</UniversalChip>
