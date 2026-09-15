<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CoverageBar from './coverage-bar.svelte';

	const { Story } = defineMeta({
		title: 'custom/HR Overview/CoverageBar',
		component: CoverageBar,
		tags: ['autodocs'],
		args: {
			label: 'Mapped',
			count: '94',
			widthPercent: 80,
			color: 'primary'
		}
	});
</script>

<Story name="Primary" />
<Story
	name="Primary soft"
	args={{ label: 'In progress', count: '15', widthPercent: 13, color: 'primary-soft' }}
/>
<Story
	name="Muted"
	args={{ label: 'Not started', count: '8', widthPercent: 7, color: 'muted' }}
/>
<Story name="Success" args={{ label: 'Complete', count: '42', widthPercent: 70, color: 'success' }} />
<Story name="Warning" args={{ label: 'At risk', count: '11', widthPercent: 28, color: 'warning' }} />
<Story name="Error" args={{ label: 'Failed', count: '3', widthPercent: 9, color: 'error' }} />
<Story name="Info" args={{ label: 'Queued', count: '6', widthPercent: 18, color: 'info' }} />
