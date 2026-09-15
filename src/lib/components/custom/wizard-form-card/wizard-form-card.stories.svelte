<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import WizardFormCardExample from './wizard-form-card.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/WizardFormCard',
		component: WizardFormCardExample,
		tags: ['autodocs'],
		args: {
			title: 'Basic Information',
			description: 'Set up the basic details for your assessment project',
			assessmentType: '360',
			isAriaEnabled: true
		}
	});
</script>

<Story name="Basic information" />
<Story
	name="Aria off"
	args={{
		isAriaEnabled: false
	}}
/>
