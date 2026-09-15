<script lang="ts">
	import UniversalChip from '../universal-chip/universal-chip.svelte';
	import type { MappingCardStatus, UniversalChipColor } from '../types';

	let {
		status = 'done'
	}: {
		status?: MappingCardStatus;
	} = $props();

	const meta: Record<MappingCardStatus, { label: string; color: UniversalChipColor }> = {
		done: { label: 'Done', color: 'success' },
		queued: { label: 'In progress', color: 'warning' },
		failed: { label: 'Failed', color: 'error' }
	};

	const resolved = $derived(meta[status]);
</script>

<UniversalChip color={resolved.color}>{resolved.label}</UniversalChip>
