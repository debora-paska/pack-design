<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AriaNoticeExample from './aria-notice.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/AriaNotice',
		component: AriaNoticeExample,
		tags: ['autodocs'],
		args: {
			skillCount: 12
		}
	});
</script>

<Story name="Default" />
