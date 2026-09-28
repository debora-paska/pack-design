<script lang="ts">
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

	let { message }: { message: string } = $props();
</script>

<div class="mt-2 flex items-center gap-1.5 text-[12.5px] font-medium text-destructive">
	<ExclamationCircleOutline class="size-3.5 shrink-0" />
	<span>{message}</span>
</div>
