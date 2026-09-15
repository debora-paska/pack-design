<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Card } from '../../ui/card/index.js';
	import { CardContent } from '../../ui/card/index.js';
	import { CardDescription } from '../../ui/card/index.js';
	import { CardFooter } from '../../ui/card/index.js';
	import { CardHeader } from '../../ui/card/index.js';
	import { CardTitle } from '../../ui/card/index.js';

	let {
		title,
		description,
		children,
		footer
	}: {
		title: string;
		description: string;
		children: Snippet;
		footer: Snippet;
	} = $props();
</script>

<Card class="gap-0 py-0 [--card-spacing:--spacing(7)]">
	<CardHeader class="border-b border-gray-5 py-5">
		<CardTitle class="text-base">{title}</CardTitle>
		<CardDescription class="mt-1">{description}</CardDescription>
	</CardHeader>
	<CardContent class="py-1">
		{@render children()}
	</CardContent>
	<CardFooter class="justify-end gap-2.5 border-t border-gray-5 py-[18px]">
		{@render footer()}
	</CardFooter>
</Card>
