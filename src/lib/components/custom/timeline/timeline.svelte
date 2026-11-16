<script lang="ts" generics="T extends { date: Date }">
	import type { Snippet } from 'svelte';
	import { cn } from '@pack/ui/lib/utils.js';

	let {
		items,
		item: renderItem,
		hasMore = false,
		loadMore
	}: {
		items: T[];
		item: Snippet<[T]>;
		hasMore?: boolean;
		loadMore?: Snippet;
	} = $props();

	// The same look as production's history timeline (web, employee profile), 2026-11-16.
	const getLocale = () => 'en-US';

	function isSameDay(a: Date, b: Date): boolean {
		return a.toDateString() === b.toDateString();
	}

	function formatDate(value: Date): string {
		return new Intl.DateTimeFormat(getLocale(), { dateStyle: 'medium' }).format(value);
	}

	function formatTime(value: Date): string {
		return new Intl.DateTimeFormat(getLocale(), { timeStyle: 'short' }).format(value);
	}
</script>

{#snippet connector({
	withDot,
	isFirst,
	isLast
}: {
	withDot: boolean;
	isFirst: boolean;
	isLast: boolean;
})}
	<div class="flex w-6 shrink-0 flex-col items-center">
		{#if withDot}
			<div
				class={cn('h-2 w-px shrink-0', {
					'bg-transparent': isFirst,
					'bg-gray-200': !isFirst
				})}
			></div>
			<div class="size-3 shrink-0 rounded-full bg-primary-400 ring-2 ring-white z-10"></div>
		{/if}
		<!-- Same date range: keep a continuous line without a dot -->
		<div class="flex-1 flex flex-col items-center">
			{#if isLast}
				<!-- last item, more data: solid until mid, then dashed -->
				<div class="flex-1 w-px bg-gray-200"></div>
				<div class="max-h-6 h-full w-0 border-l border-dotted border-gray-200"></div>
			{:else}
				<div class="w-px flex-1 bg-gray-200"></div>
			{/if}
		</div>
	</div>
{/snippet}

<ul class="text-sm text-gray-700">
	{#each items as evt, i (i)}
		{@const currentDate = formatDate(evt.date)}
		{@const showDate = i === 0 || !isSameDay(items[i - 1].date, evt.date)}
		{@const isFirst = i === 0}
		{@const isLast = i === items.length - 1 && !hasMore}

		<li class="flex items-stretch">
			<!-- Date column -->
			<div class="flex w-28 shrink-0 items-start justify-end pr-4 pt-1.5">
				{#if showDate}
					<span class="text-right text-xs font-medium text-muted-foreground">
						{currentDate}
					</span>
				{/if}
			</div>

			<!-- Dot + vertical line -->
			{@render connector({ withDot: showDate, isFirst, isLast })}

			<!-- Card -->
			<div class="min-w-0 flex-1 pb-3 pl-4 pt-0.5">
				<div class="relative rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-xs">
					{#if evt.date}
						<span class="absolute top-2.5 right-3 text-xs text-gray-400">
							{formatTime(evt.date)}
						</span>
					{/if}
					{@render renderItem(evt)}
				</div>
			</div>
		</li>
	{/each}

	{#if hasMore}
		<li class="flex items-stretch">
			<!-- Empty date column to preserve alignment -->
			<div class="w-28 shrink-0 pr-4"></div>

			<!-- Continuation of the timeline line -->
			{@render connector({ withDot: false, isFirst: false, isLast: true })}

			<!-- Load more aligned with cards, right-justified within card column -->
			<div class="min-w-0 flex-1 pl-4 pt-1 pb-2">
				<div class="flex">
					{#if loadMore}
						{@render loadMore()}
					{/if}
				</div>
			</div>
		</li>
	{/if}
</ul>
