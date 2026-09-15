<script lang="ts" module>
	import { tv } from 'tailwind-variants';

	export const universalChipVariants = tv({
		base: 'inline-flex w-fit shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-medium',
		variants: {
			color: {
				gray: 'bg-gray-3 text-gray-11',
				primary: 'bg-primary-500 text-white',
				orange: 'bg-primary-100 text-primary-500',
				success: 'bg-success-50 text-success-200',
				warning: 'bg-warning-50 text-warning-200',
				error: 'bg-error-50 text-error-200',
				info: 'bg-info-50 text-info-200'
			}
		},
		defaultVariants: {
			color: 'gray'
		}
	});
</script>

<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { UniversalChipColor } from '../types';

	let {
		color = 'gray',
		class: className,
		children,
		...restProps
	}: Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
		color?: UniversalChipColor;
		children: Snippet;
	} = $props();
</script>

<span class={cn(universalChipVariants({ color }), className)} {...restProps}>
	{@render children()}
</span>
