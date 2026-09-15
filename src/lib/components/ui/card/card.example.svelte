<script lang="ts">
	import Card from './card.svelte';
	import CardHeader from './card-header.svelte';
	import CardTitle from './card-title.svelte';
	import CardDescription from './card-description.svelte';
	import CardContent from './card-content.svelte';
	import CardFooter from './card-footer.svelte';
	import Button from '../button/button.svelte';

	let {
		size = 'default',
		title = 'Skill coverage',
		description = 'Share of the HRBP map with a current score.',
		body = '72% of required skills have at least one rated person.',
		showFooter = true
	}: {
		size?: 'default' | 'sm';
		title?: string;
		description?: string;
		body?: string;
		showFooter?: boolean;
	} = $props();
</script>

<Card class="w-[360px]" {size}>
	<CardHeader>
		<CardTitle>{title}</CardTitle>
		{#if description}
			<CardDescription>{description}</CardDescription>
		{/if}
	</CardHeader>
	<CardContent>
		<p class="text-muted-foreground">{body}</p>
	</CardContent>
	{#if showFooter}
		<CardFooter class="gap-2">
			<Button>Open report</Button>
			<Button variant="outline">Export</Button>
		</CardFooter>
	{/if}
</Card>
