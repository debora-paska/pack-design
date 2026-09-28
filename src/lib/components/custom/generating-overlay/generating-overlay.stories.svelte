<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import GeneratingOverlayExample from './generating-overlay.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/GeneratingOverlay',
		component: GeneratingOverlayExample,
		tags: ['autodocs'],
		args: {
			detail:
				'Building a self wording and an other wording for every question. This usually takes under a minute.'
		}
	});
</script>

<Story name="Default" />
