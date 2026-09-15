<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TrajectoryArrow from './trajectory-arrow.svelte';

	const { Story } = defineMeta({
		title: 'custom/Atomic/TrajectoryArrow',
		component: TrajectoryArrow,
		tags: ['autodocs'],
		args: {
			value: 0.18
		}
	});
</script>

<Story name="Up" args={{ value: 0.18 }} />
<Story name="Down" args={{ value: -0.12 }} />
<Story name="Compact" args={{ value: 0.08, compact: true }} />
