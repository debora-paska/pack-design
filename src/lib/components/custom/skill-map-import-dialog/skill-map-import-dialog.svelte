<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import type { SkillMapRole, SkillMapSkill } from '../types';
	import SkillMapImportFooter from './skill-map-import-footer.svelte';
	import SkillMapImportHeader from './skill-map-import-header.svelte';
	import SkillMapRoleList from './skill-map-role-list.svelte';
	import SkillMapSkillList from './skill-map-skill-list.svelte';

	let {
		isOpen = false,
		isContained = false,
		subtitle = 'This company only. Pick a mapped role, then tick the skills you want as modules.',
		roles = [],
		selectedRoleId = $bindable(''),
		skills = [],
		checkedIds = $bindable<string[]>([]),
		onClose,
		onToggleAll,
		onAdd
	}: {
		isOpen?: boolean;
		isContained?: boolean;
		subtitle?: string;
		roles?: SkillMapRole[];
		selectedRoleId?: string;
		skills?: SkillMapSkill[];
		checkedIds?: string[];
		onClose?: () => void;
		onToggleAll?: () => void;
		onAdd?: () => void;
	} = $props();

	const selectedRole = $derived(roles.find((role) => role.id === selectedRoleId));
	const addLabel = $derived(
		checkedIds.length === 0
			? 'Add skills'
			: checkedIds.length === 1
				? 'Add 1 skill'
				: `Add ${checkedIds.length} skills`
	);
</script>

{#if isOpen}
	<div
		class={cn(
			'z-[100] flex items-start justify-center overflow-auto bg-black/40 p-8',
			isContained ? 'absolute inset-0' : 'fixed inset-0'
		)}
		role="dialog"
		aria-modal="true"
		aria-label="Import from skill mapping"
	>
		<div
			class="my-auto flex w-full max-w-[940px] flex-col overflow-hidden rounded-xl border border-gray-5 bg-white shadow-lg"
		>
			<SkillMapImportHeader {subtitle} {onClose} />

			<div class="grid min-h-0 grid-cols-[minmax(0,280px)_minmax(0,1fr)] overflow-auto">
				<SkillMapRoleList {roles} bind:selectedRoleId />
				<SkillMapSkillList
					roleName={selectedRole?.name ?? 'Select a role'}
					{skills}
					bind:checkedIds
					{onToggleAll}
				/>
			</div>

			<SkillMapImportFooter
				{addLabel}
				isAddDisabled={checkedIds.length === 0}
				{onClose}
				{onAdd}
			/>
		</div>
	</div>
{/if}
