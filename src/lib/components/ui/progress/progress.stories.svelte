<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Progress from './progress.svelte';

	const { Story } = defineMeta({
		title: 'Progress',
		component: Progress,
		tags: ['autodocs'],
		argTypes: {
			ref: { control: false }
		},
		args: {
			value: 72,
			max: 100
		}
	});
</script>

<Story name="Default" args={{}} />
<Story name="Empty" args={{ value: 0 }} />
<Story name="Complete" args={{ value: 100 }} />
