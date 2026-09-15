<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FieldRowExample from './field-row.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/FieldRow',
		component: FieldRowExample,
		tags: ['autodocs'],
		args: {
			label: 'Project Name *',
			value: 'HR Business Partner — Q2 2026 baseline'
		}
	});
</script>

<Story name="Default" />
<Story
	name="With helper"
	args={{
		label: 'Skills *',
		sub: 'Imported from Skill Mapping — edit before launch',
		value: '12 skills from HR Business Partner mapping'
	}}
/>
