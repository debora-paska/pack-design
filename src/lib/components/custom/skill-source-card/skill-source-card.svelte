<script lang="ts">
	import {
		DownloadOutline,
		PlusOutline,
		UploadOutline
	} from 'flowbite-svelte-icons';
	import type { Snippet } from 'svelte';
	import type { SkillSourceKind } from '../types';

	let {
		kind,
		title,
		description,
		children
	}: {
		kind: SkillSourceKind;
		title: string;
		description: string;
		children?: Snippet;
	} = $props();
</script>

<div class="flex flex-col gap-2.5 rounded-lg border border-gray-5 p-3.5">
	<div class="flex items-center gap-2 text-[13px] font-semibold text-foreground">
		{#if kind === 'upload-file'}
			<UploadOutline class="size-3.5" />
		{:else if kind === 'import-from-mapping'}
			<DownloadOutline class="size-3.5" />
		{:else}
			<PlusOutline class="size-3.5" />
		{/if}
		{title}
	</div>
	{#if children}
		{@render children()}
	{/if}
	<div class="text-[11.5px] leading-relaxed text-muted-foreground">{description}</div>
</div>
