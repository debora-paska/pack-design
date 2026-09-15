<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import UniversalTab from './universal-tab.svelte';

	const { Story } = defineMeta({
		title: 'custom/Atomic/UniversalTab',
		component: UniversalTab,
		tags: ['autodocs'],
		args: {
			label: 'All',
			count: '24',
			previewState: 'default'
		}
	});
</script>

<Story name="Default" />
<Story name="Hover" args={{ previewState: 'hover' }} />
<Story name="Active" args={{ previewState: 'active' }} />
<Story name="Disabled" args={{ label: 'Failed', count: '0', previewState: 'disabled' }} />
