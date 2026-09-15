<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InternalTab from './internal-tab.svelte';

	const { Story } = defineMeta({
		title: 'custom/HR Overview/InternalTab',
		component: InternalTab,
		tags: ['autodocs'],
		args: {
			label: 'Skill map',
			previewState: 'default'
		}
	});
</script>

<Story name="Default" />
<Story name="Hover" args={{ previewState: 'hover' }} />
<Story name="Active" args={{ previewState: 'active' }} />
<Story name="Disabled" args={{ label: 'Skill Assessment', previewState: 'disabled' }} />
