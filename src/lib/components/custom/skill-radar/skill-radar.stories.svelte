<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SkillRadar from './skill-radar.svelte';
	import type { SkillRadarAxis, SkillRadarSeries } from '../types';

	const axes: SkillRadarAxis[] = [
		{ key: 'automation', label: 'Automation' },
		{ key: 'judgment', label: 'Judgment' },
		{ key: 'empathy', label: 'Empathy' },
		{ key: 'physical', label: 'Physical' },
		{ key: 'compliance', label: 'Compliance' }
	];

	const nowSeries: SkillRadarSeries = {
		name: 'Now',
		color: '#3982f6',
		values: {
			automation: 42,
			judgment: 68,
			empathy: 74,
			physical: 18,
			compliance: 61
		}
	};

	const horizonSeries: SkillRadarSeries = {
		name: 'Horizon',
		color: 'var(--primary)',
		values: {
			automation: 71,
			judgment: 82,
			empathy: 70,
			physical: 12,
			compliance: 66
		},
		dashed: true,
		fillOpacity: 0.08
	};

	const { Story } = defineMeta({
		title: 'custom/Organisms/SkillRadar',
		component: SkillRadar,
		tags: ['autodocs'],
		args: {
			axes,
			series: [horizonSeries],
			size: 280
		}
	});
</script>

<Story name="Single profile" />

<Story
	name="Now vs horizon"
	args={{
		axes,
		series: [nowSeries, horizonSeries],
		size: 360
	}}
/>

<Story
	name="Tiny"
	args={{
		axes,
		series: [horizonSeries],
		size: 44,
		showLabels: false
	}}
/>
