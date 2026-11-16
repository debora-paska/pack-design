<script lang="ts" module>
	import { type VariantProps, tv } from 'tailwind-variants';

	export const badgeVariants = tv({
		// The "Tags and pills" shape (2026-11-16); `isTableChip` squares it for table cells.
		base: 'h-auto gap-1 rounded-4xl border border-transparent px-[9px] py-[3px] text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 [&>svg]:pointer-events-none',
		variants: {
			variant: {
				/** Dark grey, light text (10.9:1). */
				default: 'bg-gray-12 text-gray-1',
				/** Types, categories, inactive statuses (5.2:1). */
				neutral: 'bg-gray-3 text-gray-11',
				/** Open-ended, under way, informative (8.5:1). */
				info: 'bg-info-50 text-info-500',
				/** An error, a limit exceeded (7.2:1). */
				destructive: 'bg-destructive/10 text-error-500 [a]:hover:bg-destructive/20',
				/** Done, accepted, within limits (5.5:1). */
				positive: 'bg-success-50 text-success-500',
				/** The brand colour: something new or generating (5:1). */
				brand: 'bg-primary-50 text-primary-700',
				/** Leo (the AI), skills (7.2:1). */
				indigo: 'bg-indigo-50 text-indigo-400',
				outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
				ghost: 'hover:bg-muted hover:text-muted-foreground',
				link: 'text-primary-700 underline-offset-4 hover:underline'
			},
			isTableChip: {
				true: 'gap-[5px] rounded-sm px-2 py-0.5',
				false: ''
			}
		},
		defaultVariants: {
			variant: 'default',
			isTableChip: false
		}
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from '@pack/ui/lib/utils.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = 'default',
		isTableChip = false,
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
		/** Square-cornered chip for table cells. */
		isTableChip?: boolean;
	} = $props();
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(badgeVariants({ variant, isTableChip }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
