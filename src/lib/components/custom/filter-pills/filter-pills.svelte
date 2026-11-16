<script lang="ts" module>
	import { tv } from 'tailwind-variants';

	/** The dot before a pill's label, by meaning. */
	export type FilterPillTone = 'neutral' | 'info' | 'positive';

	export type FilterPillOption = {
		value: string;
		label: string;
		tone?: FilterPillTone;
		/** Extra detail shown on hover (e.g. a company size's headcount). */
		hint?: string;
	};

	export const filterPillVariants = tv({
		base: 'inline-flex h-[30px] shrink-0 items-center gap-1.5 rounded-full border px-[11px] text-xs whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2',
		variants: {
			isSelected: {
				true: 'border-primary bg-primary-50 font-semibold text-primary-700',
				false: 'border-gray-5 bg-white font-medium text-gray-11'
			}
		}
	});

	export const filterPillDotVariants = tv({
		base: 'size-[7px] shrink-0 rounded-full',
		variants: {
			tone: {
				neutral: 'bg-gray-8',
				info: 'bg-info-300',
				positive: 'bg-success-400'
			}
		}
	});
</script>

<script lang="ts">
	import { handleRovingKeydown } from '../../../roving-focus.js';

	/**
	 * One choice among a few filters, as round pills (Claude Design, Pack Platform 2026-10-01):
	 * e.g. "All · 15", "Suggestions · 2". An option with a `tone` gets a coloured dot.
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

	// One tab stop for the group: the checked pill, or the first when none is.
	const focusValue = $derived(
		options.some((option) => option.value === value) ? value : options[0]?.value
	);
</script>

<div
	role="radiogroup"
	aria-label={label}
	onkeydown={handleRovingKeydown}
	tabindex="-1"
	class="flex flex-wrap items-center gap-2"
>
	{#each options as option (option.value)}
		{@const isSelected = option.value === value}
		<button
			type="button"
			role="radio"
			aria-checked={isSelected}
			tabindex={option.value === focusValue ? 0 : -1}
			title={option.hint}
			class={filterPillVariants({ isSelected })}
			onclick={() => onValueChange(option.value)}
		>
			{#if option.tone}
				<span aria-hidden="true" class={filterPillDotVariants({ tone: option.tone })}></span>
			{/if}
			{option.label}
		</button>
	{/each}
</div>
