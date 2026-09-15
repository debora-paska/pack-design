<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import QuickActionPrimary from './quick-action-primary.svelte';

	const { Story } = defineMeta({
		title: 'custom/HR Overview/QuickActionPrimary',
		component: QuickActionPrimary,
		tags: ['autodocs'],
		args: {
			title: 'New mapping',
			description: 'Get a detailed mappings on specific roles.',
			cta: 'Start mapping',
			previewState: 'default'
		}
	});
</script>

<Story name="Default" />
<Story name="Hover" args={{ previewState: 'hover' }} />
<Story name="Disabled" args={{ previewState: 'disabled' }} />
