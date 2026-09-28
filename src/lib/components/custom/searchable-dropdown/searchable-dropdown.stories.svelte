<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SearchableDropdown from './searchable-dropdown.svelte';

	const options = [
		{
			value: 't1',
			label: 'Leadership Essentials 180°',
			description: 'Core behaviours for first-time managers',
			meta: '24 questions'
		},
		{
			value: 't2',
			label: 'Smart Leadership — full',
			description: 'Complete Smart Leadership category, all modules',
			meta: '32 questions'
		},
		{
			value: 't3',
			label: 'Customer Excellence',
			description: 'Front-line service and recovery behaviours',
			meta: '18 questions'
		}
	];

	const { Story } = defineMeta({
		title: 'custom/Assessment/SearchableDropdown',
		component: SearchableDropdown,
		tags: ['autodocs'],
		args: {
			placeholder: 'Search and select a template',
			selectedLabel: '',
			query: '',
			isOpen: false,
			options
		}
	});
</script>

<Story name="Closed empty" />
<Story
	name="Closed selected"
	args={{ selectedLabel: 'Leadership Essentials 180°', isOpen: false }}
/>
<Story name="Open" args={{ isOpen: true }} />
