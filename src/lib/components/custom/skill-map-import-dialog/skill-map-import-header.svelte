<script lang="ts">
	import { CloseOutline } from 'flowbite-svelte-icons';
	import { Button } from '../../ui/button/index.js';

	let {
		subtitle = 'This company only. Pick a mapped role, then tick the skills you want as modules.',
		onClose
	}: {
		subtitle?: string;
		onClose?: () => void;
	} = $props();
</script>

<div class="flex items-start justify-between gap-5 border-b border-gray-5 px-6 pt-5 pb-4">
	<div>
		<div class="text-lg font-semibold text-foreground">Import from skill mapping</div>
		<div class="mt-1.5 text-[13px] text-muted-foreground">{subtitle}</div>
	</div>
	<Button variant="outline" size="icon-sm" onclick={() => onClose?.()} aria-label="Close">
		<CloseOutline class="size-3.5" />
	</Button>
</div>
