<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SkillEditorRow from './skill-editor-row.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/SkillEditorRow',
		component: SkillEditorRow,
		tags: ['autodocs'],
		args: {
			name: 'Coaching conversations',
			description: '',
			importedLabel: '',
			expectedLevel: 3,
			isEditing: false,
			draft: ''
		}
	});
</script>

<Story name="Reading empty description" />
<Story
	name="Imported"
	args={{
		name: 'Peak season planning',
		description: 'Plans capacity before the holiday rush.',
		importedLabel: 'Imported from Contact Centre Team Leader',
		expectedLevel: 4
	}}
/>
<Story
	name="Editing"
	args={{
		name: 'Team morale',
		description: '',
		isEditing: true,
		draft: 'Keeps energy up on short-staffed shifts.'
	}}
/>
