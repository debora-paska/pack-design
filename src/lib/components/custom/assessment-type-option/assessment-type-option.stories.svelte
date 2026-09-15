<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AssessmentTypeOption from './assessment-type-option.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/AssessmentTypeOption',
		component: AssessmentTypeOption,
		tags: ['autodocs'],
		args: {
			title: '360° Assessment',
			description: 'Full circle evaluation',
			value: '360',
			isSelected: false
		}
	});
</script>

<Story name="Default" />
<Story name="Selected" args={{ isSelected: true }} />
<Story
	name="Self only"
	args={{
		title: '90° Assessment',
		description: 'Self-evaluation only',
		value: '90',
		isSelected: false
	}}
/>
