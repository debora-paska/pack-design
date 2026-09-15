<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ChipGroup from './chip-group.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/ChipGroup',
		component: ChipGroup,
		tags: ['autodocs'],
		args: {
			value: '14 days',
			options: [
				{ value: '7 days', label: '7 days' },
				{ value: '14 days', label: '14 days' },
				{ value: '21 days', label: '21 days' },
				{ value: 'Custom', label: 'Custom' }
			]
		}
	});
</script>

<Story name="Period" />
