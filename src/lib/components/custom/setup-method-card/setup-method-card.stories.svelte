<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SetupMethodCard from './setup-method-card.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/SetupMethodCard',
		component: SetupMethodCard,
		tags: ['autodocs'],
		args: {
			title: 'Generate with artificial intelligence',
			footer: 'Modules are chosen for you',
			icon: 'artificial-intelligence',
			isSelected: false,
			isDisabled: false
		},
		argTypes: {
			icon: {
				control: { type: 'select' },
				options: ['artificial-intelligence', 'template', 'skills-list']
			}
		}
	});
</script>

<Story name="Default" />
<Story name="Selected" args={{ isSelected: true }} />
<Story
	name="Template"
	args={{
		title: 'Use a template',
		footer: 'Use existing modules',
		icon: 'template',
		isSelected: false
	}}
/>
<Story
	name="Skills list"
	args={{
		title: 'Generate from a skills list',
		footer: 'Name the modules yourself',
		icon: 'skills-list',
		isSelected: true
	}}
/>
<Story name="Disabled" args={{ isDisabled: true, isSelected: true }} />
