<script lang="ts">
	import ExpectedLevelPicker from '../expected-level-picker/expected-level-picker.svelte';
	import SkillDescriptionField from './skill-description-field.svelte';
	import SkillEditorHeader from './skill-editor-header.svelte';

	let {
		name,
		description = '',
		importedLabel = '',
		expectedLevel = $bindable(3),
		isEditing = false,
		draft = $bindable(''),
		onRemove,
		onStartEdit,
		onSaveDescription,
		onCancelEdit,
		onSelectLevel
	}: {
		name: string;
		description?: string;
		importedLabel?: string;
		expectedLevel?: number;
		isEditing?: boolean;
		draft?: string;
		onRemove?: () => void;
		onStartEdit?: () => void;
		onSaveDescription?: () => void;
		onCancelEdit?: () => void;
		onSelectLevel?: (level: number) => void;
	} = $props();
</script>

<div class="flex flex-col gap-2.5 border-t border-gray-5 px-3.5 py-3.5 first:border-t-0">
	<SkillEditorHeader {name} {importedLabel} {onRemove} />

	<ExpectedLevelPicker
		bind:value={expectedLevel}
		onSelect={(level) => onSelectLevel?.(level)}
	/>

	<SkillDescriptionField
		{description}
		{isEditing}
		bind:draft
		{onStartEdit}
		{onSaveDescription}
		{onCancelEdit}
	/>
</div>
