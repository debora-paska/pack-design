<script lang="ts" module>
	import { cn, type WithElementRef } from '@pack/ui/lib/utils.js';
	import { LoaderCircle } from '@lucide/svelte';
	import { ArrowLeftOutline, ArrowRightOutline, UserOutline } from 'flowbite-svelte-icons';
	import type { Component } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export type ButtonIconName = 'arrow-right' | 'arrow-left' | 'user';

	export const buttonVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: 'bg-primary-500 text-white hover:bg-primary-500',
				outline:
					'border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
				ghost:
					'hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground',
				destructive:
					'bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default:
					'h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
				xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: 'h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
				lg: 'h-10 gap-2 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
				icon: 'size-9',
				'icon-xs':
					"size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
				'icon-sm':
					'size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md',
				'icon-lg': 'size-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	const iconSizeMap = {
		default: 'size-4',
		xs: 'size-3',
		sm: 'size-4',
		lg: 'size-5',
		icon: 'size-4',
		'icon-xs': 'size-3',
		'icon-sm': 'size-4',
		'icon-lg': 'size-5'
	} as const;

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
			icon?: Component;
			iconName?: ButtonIconName;
			iconAtEnd?: boolean;
			loading?: boolean;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled: externalDisabled,
		children,
		onclick,
		icon,
		iconName,
		loading,
		iconAtEnd = false,
		...restProps
	}: ButtonProps = $props();

	let asyncLoading = $state(false);
	const isLoading = $derived(loading || asyncLoading);
	const disabled = $derived(externalDisabled || isLoading);

	const handleClick: ButtonProps['onclick'] = (event) => {
		const result = onclick?.(event as Parameters<NonNullable<ButtonProps['onclick']>>[0]);
		if (result instanceof Promise) {
			asyncLoading = true;
			result.finally(() => {
				asyncLoading = false;
			});
		}
	};
</script>

{#snippet spinnerAndIcon()}
	{#if isLoading}
		<LoaderCircle class={cn('animate-spin', iconSizeMap[size])} />
	{:else if icon}
		{@const Icon = icon}
		<Icon class={cn('shrink-0', iconSizeMap[size])} />
	{:else if iconName === 'arrow-right'}
		<ArrowRightOutline class={cn('shrink-0', iconSizeMap[size])} />
	{:else if iconName === 'arrow-left'}
		<ArrowLeftOutline class={cn('shrink-0', iconSizeMap[size])} />
	{:else if iconName === 'user'}
		<UserOutline class={cn('shrink-0', iconSizeMap[size])} />
	{/if}
{/snippet}

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		onclick={handleClick}
		{...restProps}
	>
		{#if iconAtEnd}
			{@render children?.()}
			{@render spinnerAndIcon()}
		{:else}
			{@render spinnerAndIcon()}
			{@render children?.()}
		{/if}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		onclick={handleClick}
		{...restProps}
	>
		{#if iconAtEnd}
			{@render children?.()}
			{@render spinnerAndIcon()}
		{:else}
			{@render spinnerAndIcon()}
			{@render children?.()}
		{/if}
	</button>
{/if}
