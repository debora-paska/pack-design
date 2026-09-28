<script lang="ts">
	import SkillMapImportDialog from './skill-map-import-dialog.svelte';

	let {
		variant = 'with-skills'
	}: {
		variant?: 'with-skills' | 'empty-map' | 'nothing-selected';
	} = $props();

	const roles = [
		{ id: 'tl', name: 'Contact Centre Team Leader', meta: '12 skills · mapped Jan 2026' },
		{ id: 'tc', name: 'Travel Consultant', meta: '9 skills · mapped Feb 2026' },
		{ id: 'ra', name: 'Revenue Analyst', meta: 'No completed map' }
	];

	const skills = [
		{
			id: 's1',
			name: 'Peak season planning',
			description: 'Plans capacity before the holiday rush.',
			expected: 'Expected 4'
		},
		{
			id: 's2',
			name: 'Coaching conversations',
			description: 'Gives feedback close to the moment.',
			expected: 'Expected 3'
		},
		{
			id: 's3',
			name: 'Escalation ownership',
			description: 'Raises a slipping deadline early.',
			expected: 'Expected 5'
		}
	];

	const selectedRoleId = $derived(variant === 'empty-map' ? 'ra' : 'tl');
	const resolvedSkills = $derived(variant === 'empty-map' ? [] : skills);
	const checkedIds = $derived(variant === 'with-skills' ? ['s1'] : []);
</script>

<div class="relative h-[640px] overflow-hidden rounded-lg border border-gray-5 bg-gray-2">
	<div class="p-4 text-sm text-muted-foreground">Project setup sits underneath.</div>
	<SkillMapImportDialog
		isOpen
		isContained
		{selectedRoleId}
		{roles}
		skills={resolvedSkills}
		{checkedIds}
	/>
</div>
