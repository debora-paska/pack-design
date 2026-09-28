<script lang="ts">
	import { Button } from '../../ui/button/index.js';
	import { CloseOutline } from 'flowbite-svelte-icons';
	import UniversalChip from '../universal-chip/universal-chip.svelte';

	let {
		name,
		importedLabel = '',
		onRemove
	}: {
		name: string;
		importedLabel?: string;
		onRemove?: () => void;
	} = $props();
</script>

<div class="flex items-start justify-between gap-3">
	<div class="min-w-0">
		<div class="text-[13.5px] font-medium text-foreground">{name}</div>
		{#if importedLabel}
			<div class="mt-1.5">
				<UniversalChip color="gray">{importedLabel}</UniversalChip>
			</div>
		{/if}
	</div>
	<Button
		variant="outline"
		size="icon-sm"
		onclick={() => onRemove?.()}
		aria-label="Remove skill"
	>
		<CloseOutline class="size-3.5" />
	</Button>
</div>
