<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import WizardStepper from './wizard-stepper.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/WizardStepper',
		component: WizardStepper,
		tags: ['autodocs'],
		args: {
			currentStep: 1,
			steps: [
				{
					label: 'Basic Information',
					sub: 'Set up the basic details of your assessment project'
				},
				{
					label: 'Timeline & Settings',
					sub: '…'
				}
			]
		}
	});
</script>

<Story name="Step 1" />
<Story
	name="Step 2"
	args={{
		currentStep: 2,
		steps: [
			{
				label: 'Basic Information',
				sub: 'Set up the basic details of your assessment project'
			},
			{
				label: 'Timeline & Settings',
				sub: 'Set duration and invitations'
			}
		]
	}}
/>
