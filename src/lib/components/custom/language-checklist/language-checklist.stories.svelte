<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LanguageChecklist from './language-checklist.svelte';

	const options = [
		{ value: 'Italian', label: 'Italian' },
		{ value: 'English', label: 'English' },
		{ value: 'Spanish', label: 'Spanish' },
		{ value: 'French', label: 'French' }
	];

	const { Story } = defineMeta({
		title: 'custom/Assessment/LanguageChecklist',
		component: LanguageChecklist,
		tags: ['autodocs'],
		args: {
			options,
			selected: ['English'],
			isOpen: false,
			placeholder: 'Select languages'
		}
	});
</script>

<Story name="Closed" />
<Story name="Open" args={{ isOpen: true, selected: ['English', 'Italian'] }} />
