<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ReadyBanner from './ready-banner.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/ReadyBanner',
		component: ReadyBanner,
		tags: ['autodocs'],
		args: {
			message: 'Questions are ready. The setup below is locked.'
		}
	});
</script>

<Story name="Default" />
