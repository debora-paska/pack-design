<script lang="ts">
	let {
		title = 'No skills yet',
		description = 'Add at least one skill to generate questions.'
	}: {
		title?: string;
		description?: string;
	} = $props();
</script>

<div class="rounded-lg border border-dashed border-gray-6 px-6 py-7 text-center">
	<div class="text-[13.5px] font-medium text-foreground">{title}</div>
	<div class="mt-1 text-[12.5px] text-muted-foreground">{description}</div>
</div>
