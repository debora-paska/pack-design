<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ExpectedLevelPicker from './expected-level-picker.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/ExpectedLevelPicker',
		component: ExpectedLevelPicker,
		tags: ['autodocs'],
		args: {
			value: undefined,
			levels: [1, 2, 3, 4, 5]
		},
		argTypes: {
			value: {
				control: { type: 'select' },
				options: [undefined, 1, 2, 3, 4, 5]
			}
		}
	});
</script>

<Story name="Default" />
