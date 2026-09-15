<script lang="ts">
	import { ChevronRightOutline } from 'flowbite-svelte-icons';
	import SkillRow from '../skill-row/skill-row.svelte';
	import type { SkillListRow } from '../types';

	let {
		rows,
		onOpen
	}: {
		rows: SkillListRow[];
		onOpen?: (id: string) => void;
	} = $props();
</script>

<div class="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
	<div
		class="grid grid-cols-[1fr_120px_140px_110px_140px_40px] gap-2 border-b border-border bg-muted px-5 py-2.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase"
	>
		<div>Skill</div>
		<div>Status</div>
		<div>Future owner</div>
		<div>Urgency</div>
		<div class="text-right">Change over horizon</div>
		<div></div>
	</div>
	<div class="divide-y divide-border">
		{#each rows as row (row.id)}
			<button
				type="button"
				class="m-0 grid w-full cursor-pointer appearance-none grid-cols-[1fr_120px_140px_110px_140px_40px] items-center gap-2 border-0 bg-card px-5 py-3.5 text-left text-inherit hover:bg-muted/60"
				onclick={() => onOpen?.(row.id)}
			>
				<SkillRow {row} layout="contents" />
				<div class="flex justify-end pr-4 text-muted-foreground">
					<ChevronRightOutline class="size-4" />
				</div>
			</button>
		{/each}
	</div>
</div>
