<script lang="ts">
	import { Avatar, AvatarFallback } from '../../ui/avatar/index.js';
	import { Card } from '../../ui/card/index.js';
	import { CardContent } from '../../ui/card/index.js';
	import type { KeyValueRow } from '../types';

	let {
		initials,
		name,
		email,
		rows
	}: {
		initials: string;
		name: string;
		email: string;
		rows: KeyValueRow[];
	} = $props();
</script>

<Card class="gap-3.5 py-5 [--card-spacing:--spacing(5)]">
	<CardContent>
		<div class="mb-3.5 flex items-center gap-3.5">
			<Avatar class="size-14 text-base">
				<AvatarFallback class="text-base">{initials}</AvatarFallback>
			</Avatar>
			<div class="min-w-0">
				<div class="text-[15px] font-semibold text-foreground">{name}</div>
				<div class="text-xs text-muted-foreground">{email}</div>
			</div>
		</div>
		{#each rows as row (row.key)}
			<div
				class="flex justify-between border-b border-dashed border-gray-5 py-1.5 text-xs last:border-b-0"
			>
				<span class="text-muted-foreground">{row.key}</span>
				<span class="font-medium text-foreground">{row.value}</span>
			</div>
		{/each}
	</CardContent>
</Card>
