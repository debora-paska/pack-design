<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Separator from './separator.svelte';

	const { Story } = defineMeta({
		title: 'Separator',
		component: Separator,
		tags: ['autodocs'],
		argTypes: {
			ref: { control: false }
		}
	});
</script>

<Story name="Horizontal" args={{}} />
<Story name="Vertical" args={{ orientation: 'vertical', class: 'h-8' }} />
