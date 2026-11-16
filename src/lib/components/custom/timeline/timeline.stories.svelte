<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Button } from '../../ui/button/index.js';
	import Timeline from './timeline.svelte';

	type HistoryItem = { date: Date; category: string; subject: string };

	const items: HistoryItem[] = [
		{ date: new Date('2026-11-16T10:30:00'), category: 'Email', subject: 'Session reminder' },
		{
			date: new Date('2026-11-16T09:05:00'),
			category: 'Session',
			subject: 'Coaching session booked'
		},
		{ date: new Date('2026-11-12T15:40:00'), category: 'Calendar', subject: 'Session rescheduled' },
		{ date: new Date('2026-11-09T08:00:00'), category: 'Email', subject: 'Welcome to the program' }
	];

	const { Story } = defineMeta({
		title: 'custom/Atomic/Timeline',
		component: Timeline,
		tags: ['autodocs'],
		// A replica of production's timeline, kept identical on purpose (Paska, 2026-11-16): its
		// time (`gray-400`, 2.6:1) fails WCAG 1.4.3. `todo` until the design changes it
		// (proposal: `muted-foreground`, 5.7:1).
		parameters: { a11y: { test: 'todo' } }
	});
</script>

{#snippet card(entry: HistoryItem)}
	<div class="flex min-w-0 flex-col pr-14">
		<span class="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">{entry.category}</span>
		<span class="truncate text-sm font-medium text-foreground">{entry.subject}</span>
	</div>
{/snippet}

<Story name="Default">
	{#snippet template()}
		<div class="max-w-2xl p-4"><Timeline {items} item={card} /></div>
	{/snippet}
</Story>

<Story name="With more to load">
	{#snippet template()}
		<div class="max-w-2xl p-4">
			<Timeline {items} item={card} hasMore>
				{#snippet loadMore()}
					<Button variant="outline" size="sm">Load more</Button>
				{/snippet}
			</Timeline>
		</div>
	{/snippet}
</Story>
