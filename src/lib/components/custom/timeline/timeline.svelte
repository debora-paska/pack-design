<script lang="ts" generics="T extends { date: Date }">
	import type { Snippet } from 'svelte';

	/**
	 * A history, newest first: one dated card per item, a dot where a new day starts and a line
	 * joining them (2026-11-16, from web's events history). Neutral: a dark dot, a grey line, cards
	 * framed without a shadow, dates and times in the muted grey (5.4:1). An ordered list with
	 * `<time>` elements, so the order and the dates read without the drawing.
	 */
	let {
		items,
		item: renderItem,
		hasMore = false,
		loadMore,
		label,
		locale = 'en-US'
	}: {
		items: readonly T[];
		/** One item's card content. */
		item: Snippet<[T]>;
		/** More items exist below: the line runs on, dotted, to `loadMore`. */
		hasMore?: boolean;
		/** The control that loads more (a button), shown when `hasMore`. */
		loadMore?: Snippet;
		/** Accessible name of the list, e.g. "Events history". */
		label?: string;
		/** The language dates are written in. */
		locale?: string;
	} = $props();

	const dayFormat = $derived(new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }));
	const timeFormat = $derived(new Intl.DateTimeFormat(locale, { timeStyle: 'short' }));

	function isSameDay(a: Date, b: Date): boolean {
		return a.toDateString() === b.toDateString();
	}
</script>

{#snippet connector(isDay: boolean, isFirst: boolean, tail: 'line' | 'more' | 'none')}
	<div class="flex w-6 shrink-0 flex-col items-center" aria-hidden="true">
		{#if isDay}
			<div class={['h-2 w-px shrink-0', isFirst ? 'bg-transparent' : 'bg-gray-5']}></div>
			<div class="z-10 size-2.5 shrink-0 rounded-full bg-gray-12 ring-2 ring-card"></div>
		{/if}
		{#if tail === 'more'}
			<div class="w-px flex-1 bg-gray-5"></div>
			<div class="h-full max-h-6 w-0 border-l border-dotted border-gray-5"></div>
		{:else if tail === 'line'}
			<div class="w-px flex-1 bg-gray-5"></div>
		{/if}
	</div>
{/snippet}

<ol data-slot="timeline" aria-label={label} class="flex flex-col">
	{#each items as entry, index (index)}
		{@const isDay = index === 0 || !isSameDay(items[index - 1].date, entry.date)}
		<li class="flex items-stretch">
			<div class="flex w-28 shrink-0 items-start justify-end pt-1.5 pr-4">
				{#if isDay}
					<span class="text-right text-xs font-medium text-muted-foreground">
						<time datetime={entry.date.toISOString().slice(0, 10)}
							>{dayFormat.format(entry.date)}</time
						>
					</span>
				{/if}
			</div>
			{@render connector(
				isDay,
				index === 0,
				index < items.length - 1 ? 'line' : hasMore ? 'more' : 'none'
			)}
			<div class="min-w-0 flex-1 pt-0.5 pb-3 pl-4">
				<div class="relative rounded-lg border border-gray-3 bg-card px-4 py-3">
					<span class="absolute top-2.5 right-3 text-xs text-muted-foreground">
						<time datetime={entry.date.toISOString()}>{timeFormat.format(entry.date)}</time>
					</span>
					{@render renderItem(entry)}
				</div>
			</div>
		</li>
	{/each}
	{#if hasMore && loadMore}
		<li class="flex items-stretch">
			<div class="w-28 shrink-0 pr-4"></div>
			<div class="w-6 shrink-0"></div>
			<div class="min-w-0 flex-1 pt-1 pb-2 pl-4">{@render loadMore()}</div>
		</li>
	{/if}
</ol>
