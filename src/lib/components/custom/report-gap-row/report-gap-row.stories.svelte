<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ReportGapRow from './report-gap-row.svelte';

	const { Story } = defineMeta({
		title: 'custom/Individual Report/ReportGapRow',
		component: ReportGapRow,
		tags: ['autodocs'],
		args: {
			rank: 1,
			name: 'AI Fluency for People Decisions',
			currentLevel: 1.8,
			targetLevel: 4,
			gap: 2.2
		}
	});
</script>

<Story name="Large gap" />
<Story
	name="Medium gap"
	args={{
		rank: 2,
		name: 'Strategic Workforce Planning',
		currentLevel: 2.05,
		targetLevel: 4,
		gap: 0.85
	}}
/>
