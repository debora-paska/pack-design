<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const chipVariants = tv({
		base: 'inline-flex w-fit shrink-0 items-center justify-center rounded-md border px-2.5 py-1 text-sm font-medium',
		variants: {
			state: {
				default: 'border-gray-5 bg-white text-foreground',
				selected: 'border-primary-500 bg-white text-primary-500',
				disabled:
					'pointer-events-none cursor-not-allowed border-gray-5 bg-white text-muted-foreground opacity-50'
			}
		},
		defaultVariants: {
			state: 'default'
		}
	});

	export type ChipState = VariantProps<typeof chipVariants>['state'];
</script>

<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	let {
		state = 'default',
		class: className,
		children,
		...restProps
	}: Omit<HTMLButtonAttributes, 'children' | 'disabled'> & {
		state?: ChipState;
		children: Snippet;
	} = $props();

	const isDisabled = $derived(state === 'disabled');
</script>

<button
	type="button"
	class={cn(chipVariants({ state }), className)}
	{...restProps}
	disabled={isDisabled}
>
	{@render children()}
</button>
