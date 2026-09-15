<script lang="ts">
	import { Button } from '../../ui/button/index.js';
	import { Input } from '../../ui/input/index.js';
	import { Switch } from '../../ui/switch/index.js';
	import AriaNotice from '../aria-notice/aria-notice.svelte';
	import AssessmentTypeOption from '../assessment-type-option/assessment-type-option.svelte';
	import FieldRow from '../field-row/field-row.svelte';
	import ImportedSkillsPanel from '../imported-skills-panel/imported-skills-panel.svelte';
	import WizardFormCard from './wizard-form-card.svelte';

	let {
		title = 'Basic Information',
		description = 'Set up the basic details for your assessment project',
		projectName = 'HR Business Partner — Q2 2026 baseline',
		assessmentType = '360',
		isAriaEnabled = true
	}: {
		title?: string;
		description?: string;
		projectName?: string;
		assessmentType?: string;
		isAriaEnabled?: boolean;
	} = $props();

	let selectedType = $state(assessmentType);
	let isAriaOn = $state(isAriaEnabled);
	let name = $state(projectName);

	const types = [
		{ value: '90', title: '90° Assessment', description: 'Self-evaluation only' },
		{ value: '180', title: '180° Assessment', description: 'Self + Manager evaluation' },
		{ value: '270', title: '270° Assessment', description: 'Self + Manager + Peer evaluation' },
		{ value: '360', title: '360° Assessment', description: 'Full circle evaluation' }
	];
</script>

<WizardFormCard {title} {description}>
	<FieldRow label="Project Name *">
		<Input bind:value={name} />
	</FieldRow>
	<FieldRow label="Skills *" sub="Imported from Skill Mapping — edit before launch">
		<ImportedSkillsPanel
			count={12}
			mappingTitle="HR Business Partner"
			skills={[
				{ name: 'Employee Relations & Advisory', status: 'stable' },
				{ name: 'Strategic Workforce Planning', status: 'new' }
			]}
		/>
	</FieldRow>
	<FieldRow label="Assessment Type *">
		<div class="grid gap-2.5">
			{#each types as type (type.value)}
				<AssessmentTypeOption
					title={type.title}
					description={type.description}
					value={type.value}
					isSelected={selectedType === type.value}
					onSelect={(next) => (selectedType = next)}
				/>
			{/each}
		</div>
	</FieldRow>
	<FieldRow
		label="Attach Pack AI Agent (Aria)"
		sub="Voice-led interview that complements the form-based assessment"
	>
		<div class="flex items-center gap-3.5">
			<Switch bind:checked={isAriaOn} />
			<span class="text-[13px] font-medium text-foreground">
				{isAriaOn
					? 'Enabled — Aria will conduct a 10-min voice interview per participant'
					: 'Disabled'}
			</span>
		</div>
		{#if isAriaOn}
			<div class="mt-3">
				<AriaNotice>
					By enabling this option, Aria will conduct a brief voice interview as part of the
					assessment. The assessee completes both the form-based assessment <em>and</em> the Aria
					interview. Pre-loaded with the 12 skills from the mapping.
				</AriaNotice>
			</div>
		{/if}
	</FieldRow>
	{#snippet footer()}
		<Button variant="outline">Cancel</Button>
		<Button iconName="arrow-right" iconAtEnd>Next</Button>
	{/snippet}
</WizardFormCard>
