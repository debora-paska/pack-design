<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ScoringScale from './scoring-scale.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/ScoringScale',
		component: ScoringScale,
		tags: ['autodocs'],
		args: {
			value: 5,
			options: [3, 4, 5, 6, 7, 8, 9, 10],
			showCaption: true
		},
		argTypes: {
			showCaption: {
				control: { type: 'boolean' }
			}
		}
	});
</script>

<Story name="Default five" />
<Story name="Without caption" args={{ showCaption: false }} />
<Story name="Three" args={{ value: 3 }} />
<Story name="Ten" args={{ value: 10 }} />
