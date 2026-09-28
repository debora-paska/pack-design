<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InlineFieldError from './inline-field-error.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/InlineFieldError',
		component: InlineFieldError,
		tags: ['autodocs'],
		args: {
			message: 'Add the assessment goal before you generate.'
		}
	});
</script>

<Story name="Default" />
