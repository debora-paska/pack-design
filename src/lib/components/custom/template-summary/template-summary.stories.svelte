<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TemplateSummary from './template-summary.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/TemplateSummary',
		component: TemplateSummary,
		tags: ['autodocs'],
		args: {
			name: 'Leadership Essentials 180°',
			description: 'Core behaviours for first-time managers',
			chips: ['6 modules', '24 questions', '2 categories from the bank']
		}
	});
</script>

<Story name="Default" />
