<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CoverageCardExample from './coverage-card.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/HR Overview/CoverageCard',
		component: CoverageCardExample,
		tags: ['autodocs'],
		args: {
			title: 'Mapping Coverage',
			rows: [
				{ label: 'Mapped', count: '94', widthPercent: 80, color: 'primary' },
				{ label: 'In progress', count: '15', widthPercent: 13, color: 'primary-soft' },
				{ label: 'Not started', count: '8', widthPercent: 7, color: 'muted' }
			]
		}
	});
</script>

<Story name="Default" />
