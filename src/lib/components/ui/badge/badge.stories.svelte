<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge, { type BadgeVariant } from './badge.svelte';

	const variants: BadgeVariant[] = [
		'default',
		'neutral',
		'info',
		'destructive',
		'positive',
		'brand',
		'indigo',
		'outline',
		'ghost',
		'link'
	];

	const { Story } = defineMeta({
		title: 'Badge',
		component: Badge,
		tags: ['autodocs'],
		argTypes: {
			variant: { control: 'select', options: variants },
			isTableChip: { control: 'boolean' }
		},
		args: { variant: 'default', isTableChip: false }
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Badge {...args}>Badge</Badge>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template(args)}
		<div class="flex flex-wrap gap-2">
			{#each variants as variant (variant)}
				<Badge {variant} isTableChip={args.isTableChip}>{variant}</Badge>
			{/each}
		</div>
	{/snippet}
</Story>
