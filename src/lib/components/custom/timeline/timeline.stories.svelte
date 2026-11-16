<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Button } from '../../ui/button/index.js';
	import Clock from '@lucide/svelte/icons/clock';
	import Mail from '@lucide/svelte/icons/mail';
	import Video from '@lucide/svelte/icons/video';
	import Timeline from './timeline.svelte';

	type HistoryItem = {
		date: Date;
		channel: 'email' | 'calendar_audit' | 'session';
		category: string;
		subject: string;
	};

	const items: HistoryItem[] = [
		{ date: new Date('2026-11-16T10:30:00'), channel: 'email', category: 'Email', subject: 'Session reminder' },
		{
			date: new Date('2026-11-16T09:05:00'),
			channel: 'session',
			category: 'Session',
			subject: 'Coaching session booked'
		},
		{ date: new Date('2026-11-12T15:40:00'), channel: 'calendar_audit', category: 'Calendar', subject: 'Session rescheduled' },
		{ date: new Date('2026-11-09T08:00:00'), channel: 'email', category: 'Email', subject: 'Welcome to the program' }
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
	<!-- As production's history entry (web, employee profile): the channel's icon in a round tile. -->
	<div class="flex items-center gap-3 pr-14">
		<span
			class="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700"
			title={entry.category}
		>
			{#if entry.channel === 'email'}
				<Mail class="size-4 shrink-0" aria-hidden="true" />
			{:else if entry.channel === 'calendar_audit'}
				<Clock class="size-4 shrink-0" aria-hidden="true" />
			{:else}
				<Video class="size-4 shrink-0" aria-hidden="true" />
			{/if}
		</span>
		<div class="flex min-w-0 flex-col">
			<span class="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">{entry.category}</span>
			<span class="truncate text-sm font-medium text-foreground">{entry.subject}</span>
		</div>
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
