<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SkillMeter from './skill-meter.svelte';

	const { Story } = defineMeta({
		title: 'custom/Molecular/SkillMeter',
		component: SkillMeter,
		tags: ['autodocs'],
		args: {
			label: 'Required skills with a current score',
			value: 72
		}
	});
</script>

<Story name="Default" />
<Story name="Empty" args={{ label: 'Coverage', value: 0 }} />
<Story name="Complete" args={{ label: 'Coverage', value: 100 }} />
