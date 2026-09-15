<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AriaSummaryCard from './aria-summary-card.svelte';

	const { Story } = defineMeta({
		title: 'custom/Individual Report/AriaSummaryCard',
		component: AriaSummaryCard,
		tags: ['autodocs'],
		args: {
			meta: 'Recorded 14 May · 12 min',
			items: [
				'Self-rates higher than peers on coaching — calibrate via observed sessions.',
				'Strong instinct for workforce conversations, but limited tooling experience.',
				'Framed AI-fluency as “willing to learn” — no current production use.',
				'Confident, structured under pressure; emotion-led on ER topics.'
			]
		}
	});
</script>

<Story name="Default" />
