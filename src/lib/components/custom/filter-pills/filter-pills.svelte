<script lang="ts" module>
	import { tv } from 'tailwind-variants';

	export type FilterPillOption = {
		value: string;
		label: string;
		/** Extra detail shown on hover (e.g. a company size's headcount). */
		hint?: string;
		/** Shown but not selectable. */
		isDisabled?: boolean;
	};

	/** A pill's state: `default`, `active` (the selected one) or `disabled` (2026-11-16). */
	export type FilterPillVariant = 'default' | 'active' | 'disabled';

	export const filterPillVariants = tv({
		base: 'inline-flex h-[30px] shrink-0 items-center gap-1.5 rounded-full border px-[11px] text-xs whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
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

</script>

<script lang="ts">
	import { handleRovingKeydown } from '../../../roving-focus.js';

	/**
	 * One choice among a few, as round pills (Claude Design, Pack Platform 2026-10-01): a radio
	 * group with the arrow keys.
	 */
	let {
		options,
		value,
		label,
		onValueChange
	}: {
		options: readonly FilterPillOption[];
		value: string;
		/** Accessible name of the group. */
		label: string;
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
			{option.label}
		</button>
	{/each}
</div>
