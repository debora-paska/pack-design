<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import { Button } from '../../ui/button/index.js';
	import { Checkbox } from '../../ui/checkbox/index.js';
	import UniversalChip from '../universal-chip/universal-chip.svelte';
	import type { SkillMapSkill } from '../types';

	let {
		roleName = 'Select a role',
		skills = [],
		checkedIds = $bindable<string[]>([]),
		onToggleAll
	}: {
		roleName?: string;
		skills?: SkillMapSkill[];
		checkedIds?: string[];
		onToggleAll?: () => void;
	} = $props();

	function handleCheckedChange(id: string, next: boolean | 'indeterminate') {
		const isOn = next === true;
		checkedIds = isOn
			? checkedIds.includes(id)
				? checkedIds
				: [...checkedIds, id]
			: checkedIds.filter((item) => item !== id);
	}
</script>

<div class="flex min-w-0 flex-col">
	<div class="flex items-center justify-between gap-4 border-b border-gray-5 px-5 py-3.5">
		<div class="min-w-0">
			<div class="text-[13.5px] font-semibold text-foreground">{roleName}</div>
			<div class="mt-0.5 text-[11.5px] text-muted-foreground">
				Expected proficiency is shown as context. It is not the questionnaire's scoring format.
			</div>
		</div>
		<Button
			variant="link"
			size="sm"
			class="h-auto shrink-0 px-0 whitespace-nowrap"
			onclick={() => onToggleAll?.()}
		>
			Select all
		</Button>
	</div>

	<div class="max-h-[380px] overflow-y-auto">
		{#if skills.length === 0}
			<div class="px-6 py-14 text-center">
				<div class="text-[13.5px] font-medium text-foreground">
					No completed skill maps for this company yet.
				</div>
				<div class="mt-1.5 text-[12.5px] text-muted-foreground">
					Finish a skill map for this role, or type the skills by hand instead.
				</div>
			</div>
		{:else}
			{#each skills as skill (skill.id)}
				{@const isChecked = checkedIds.includes(skill.id)}
				<label
					class={cn(
						'flex w-full cursor-pointer items-start gap-3 border-b border-gray-5 px-5 py-3.5 text-left',
						isChecked ? 'bg-primary-50' : 'bg-white'
					)}
				>
					<Checkbox
						checked={isChecked}
						onCheckedChange={(next) => handleCheckedChange(skill.id, next)}
					/>
					<div class="min-w-0 flex-1">
						<div class="text-[13.5px] font-medium text-foreground">{skill.name}</div>
						<div class="mt-0.5 text-xs text-muted-foreground">{skill.description}</div>
					</div>
					<UniversalChip color="gray">{skill.expected}</UniversalChip>
				</label>
			{/each}
		{/if}
	</div>
</div>
