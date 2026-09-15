<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import QuickActionLink from './quick-action-link.svelte';

	const { Story } = defineMeta({
		title: 'custom/HR Overview/QuickActionLink',
		component: QuickActionLink,
		tags: ['autodocs'],
		args: {
			label: 'View Mappings',
			previewState: 'default'
		}
	});
</script>

<Story name="Default" />
<Story name="Hover" args={{ previewState: 'hover' }} />
<Story name="Disabled" args={{ previewState: 'disabled' }} />
