<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LevelBarRow from './level-bar-row.svelte';

	const { Story } = defineMeta({
		title: 'custom/Individual Report/LevelBarRow',
		component: LevelBarRow,
		tags: ['autodocs'],
		args: {
			value: 4.05,
			target: 3
		}
	});
</script>

<Story name="Above target" />
<Story name="Near target" args={{ value: 3.2, target: 3.6 }} />
<Story name="Below target" args={{ value: 1.8, target: 4 }} />
