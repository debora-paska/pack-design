<script lang="ts">
	import { CheckCircleOutline } from 'flowbite-svelte-icons';

	let {
		message = 'Questions are ready. The setup below is locked.'
	}: {
		message?: string;
	} = $props();
</script>

<div
	class="flex items-center gap-3 rounded-lg border border-gray-5 bg-gray-2 px-4 py-3"
>
	<CheckCircleOutline class="size-4 shrink-0 text-muted-foreground" />
	<span class="text-[13.5px] font-medium text-foreground">{message}</span>
</div>
