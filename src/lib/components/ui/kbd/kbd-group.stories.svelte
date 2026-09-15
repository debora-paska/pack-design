<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import KbdGroupExample from './kbd-group.example.svelte';

	const { Story } = defineMeta({
		title: 'KbdGroup',
		component: KbdGroupExample,
		tags: ['autodocs']
	});
</script>

<Story name="Shortcut" />
