<script lang="ts" module>
	import { type VariantProps, tv } from 'tailwind-variants';

	export const alertVariants = tv({
		base: "grid gap-0.5 rounded-lg border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4 group/alert relative w-full",
		variants: {
			variant: {
				default: 'bg-card text-card-foreground *:data-[slot=alert-title]:text-foreground',
				destructive:
					'border-error-50 bg-error-50 text-foreground *:data-[slot=alert-title]:text-error-75 *:data-[slot=alert-description]:text-muted-foreground *:[svg]:text-error-75',
				success:
					'border-success-50 bg-success-50 text-foreground *:data-[slot=alert-title]:text-success-75 *:data-[slot=alert-description]:text-muted-foreground *:[svg]:text-success-75',
				warning:
					'border-warning-50 bg-warning-50 text-foreground *:data-[slot=alert-title]:text-warning-75 *:data-[slot=alert-description]:text-muted-foreground *:[svg]:text-warning-75',
				info: 'border-info-50 bg-info-50 text-foreground *:data-[slot=alert-title]:text-info-75 *:data-[slot=alert-description]:text-muted-foreground *:[svg]:text-info-75'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	});

	export type AlertVariant = VariantProps<typeof alertVariants>['variant'];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from '@pack/ui/lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'default',
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: AlertVariant;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="alert"
	role="alert"
	class={cn(alertVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
