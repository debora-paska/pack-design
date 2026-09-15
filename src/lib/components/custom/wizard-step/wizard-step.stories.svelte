<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import WizardStep from './wizard-step.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/WizardStep',
		component: WizardStep,
		tags: ['autodocs'],
		args: {
			index: 1,
			label: 'Basic Information',
			sub: 'Set up the basic details of your assessment project',
			state: 'idle'
		}
	});
</script>

<Story name="Idle" />
<Story name="Active" args={{ state: 'active' }} />
<Story
	name="Done"
	args={{
		state: 'done',
		index: 1,
		label: 'Basic Information',
		sub: 'Set up the basic details of your assessment project'
	}}
/>
