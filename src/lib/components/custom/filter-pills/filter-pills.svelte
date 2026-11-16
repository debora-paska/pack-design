<script lang="ts" module>
	import { tv } from 'tailwind-variants';

	/**
	 * The dot's colour: the text colour of the `Badge` variant of the same name (2026-11-16), so a
	 * pill and a badge that mean the same thing match.
	 */
	export type FilterPillTone = 'neutral' | 'info' | 'destructive' | 'positive' | 'brand' | 'indigo';

	export type FilterPillOption = {
		value: string;
		label: string;
		/** The dot's colour, when the group has dots (`hasDot`). Defaults to `neutral`. */
		tone?: FilterPillTone;
		/** Extra detail shown on hover (e.g. a company size's headcount). */
		hint?: string;
		/** Shown but not selectable. */
		isDisabled?: boolean;
	};

	/** A pill's state: `default`, `active` (the selected one) or `disabled` (2026-11-16). */
	export type FilterPillVariant = 'default' | 'active' | 'disabled';

	export const filterPillVariants = tv({
		base: 'inline-flex h-[30px] shrink-0 items-center gap-1.5 rounded-full border px-[11px] text-xs whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2',
		variants: {
			variant: {
				default: 'border-gray-5 bg-white font-medium text-gray-11',
				active: 'border-primary bg-primary-50 font-semibold text-primary-700',
				// Not usable, so exempt from contrast; a colour, not opacity.
				disabled: 'cursor-not-allowed border-gray-5 bg-gray-3 font-medium text-gray-9'
			}
		},
		defaultVariants: { variant: 'default' }
	});

	export const filterPillDotVariants = tv({
		base: 'size-[7px] shrink-0 rounded-full',
		variants: {
			tone: {
				neutral: 'bg-gray-11',
				info: 'bg-info-500',
				destructive: 'bg-error-500',
				positive: 'bg-success-500',
				brand: 'bg-primary-700',
				indigo: 'bg-indigo-400'
			},
			isDisabled: { true: 'bg-gray-9' }
		},
		defaultVariants: { tone: 'neutral' }
	});
</script>

<script lang="ts">
	import { handleRovingKeydown } from '../../../roving-focus.js';

	/**
	 * One choice among a few, as round pills (Claude Design, Pack Platform 2026-10-01): a radio
	 * group with the arrow keys. With `hasDot`, each pill shows a dot in its option's `tone`.
	 */
	let {
		options,
		value,
		label,
		hasDot = false,
		onValueChange
	}: {
		options: readonly FilterPillOption[];
		value: string;
		/** Accessible name of the group. */
		label: string;
		/** A coloured dot before each label (the option's `tone`). */
		hasDot?: boolean;
		onValueChange: (value: string) => void;
	} = $props();

	// One tab stop for the group: the checked pill, or the first usable one when none is.
	const focusValue = $derived(
		options.some((option) => option.value === value && !option.isDisabled)
			? value
			: options.find((option) => !option.isDisabled)?.value
	);

	function variantOf(option: FilterPillOption): FilterPillVariant {
		if (option.isDisabled) return 'disabled';
		return option.value === value ? 'active' : 'default';
	}
</script>

<div
	role="radiogroup"
	aria-label={label}
	onkeydown={handleRovingKeydown}
	tabindex="-1"
	class="flex flex-wrap items-center gap-2"
>
	{#each options as option (option.value)}
		<button
			type="button"
			role="radio"
			aria-checked={option.value === value}
			tabindex={option.value === focusValue ? 0 : -1}
			disabled={option.isDisabled}
			title={option.hint}
			class={filterPillVariants({ variant: variantOf(option) })}
			onclick={() => onValueChange(option.value)}
		>
			{#if hasDot}
				<span
					aria-hidden="true"
					class={filterPillDotVariants({ tone: option.tone, isDisabled: option.isDisabled })}
				></span>
			{/if}
			{option.label}
		</button>
	{/each}
</div>
