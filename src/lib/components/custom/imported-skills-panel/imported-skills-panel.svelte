<script lang="ts">
	import { CheckOutline } from 'flowbite-svelte-icons';
	import { Button } from '../../ui/button/index.js';
	import { Checkbox } from '../../ui/checkbox/index.js';
	import UniversalChip from '../universal-chip/universal-chip.svelte';
	import { SKILL_STATUS_META } from '../skill-status-chip/skill-status-chip.svelte';
	import type { ImportedSkillItem, SkillStatus, UniversalChipColor } from '../types';

	let {
		count,
		mappingTitle,
		subtitle = 'O*NET-grounded · MIT Iceberg overlay applied · 3-year horizon',
		skills,
		isOpen = $bindable(false),
		checkedNames = $bindable<string[]>([])
	}: {
		count: number;
		mappingTitle: string;
		subtitle?: string;
		skills: ImportedSkillItem[];
		isOpen?: boolean;
		checkedNames?: string[];
	} = $props();

	const statusColor: Record<SkillStatus, UniversalChipColor> = {
		growing: 'success',
		stable: 'gray',
		embedded: 'info',
		new: 'primary',
		declining: 'error'
	};

	function handleToggle() {
		isOpen = !isOpen;
	}

	function handleCheckedChange(name: string, next: boolean | 'indeterminate') {
		const isOn = next === true;
		checkedNames = isOn
			? checkedNames.includes(name)
				? checkedNames
				: [...checkedNames, name]
			: checkedNames.filter((item) => item !== name);
	}
</script>

<div>
	<div class="flex items-start justify-between gap-3 rounded-lg border border-gray-5 bg-primary-50 px-3.5 py-2.5">
		<div class="flex min-w-0 flex-1 items-start gap-2.5">
			<span
				class="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary-500 text-white"
			>
				<CheckOutline class="size-4" />
			</span>
			<div class="min-w-0">
				<div class="text-[13px] font-semibold text-foreground">
					{count} skills imported from {mappingTitle} mapping
				</div>
				<div class="text-xs text-muted-foreground">{subtitle}</div>
			</div>
		</div>
		<Button variant="link" size="sm" class="h-auto shrink-0 px-0" onclick={handleToggle}>
			{isOpen ? 'Hide' : 'Review'}
		</Button>
	</div>
	{#if isOpen}
		<div class="mt-2 grid grid-cols-2 gap-1.5 rounded-lg border border-gray-5 p-3">
			{#each skills as skill (skill.name)}
				{@const isChecked = checkedNames.includes(skill.name)}
				<label
					class="flex cursor-pointer items-center justify-between gap-2 rounded-md bg-gray-2 px-2.5 py-2"
				>
					<span class="flex min-w-0 items-center gap-2">
						<Checkbox
							checked={isChecked}
							onCheckedChange={(next) => handleCheckedChange(skill.name, next)}
						/>
						<span class="truncate text-[13px] text-foreground">{skill.name}</span>
					</span>
					<UniversalChip color={statusColor[skill.status]}>
						{SKILL_STATUS_META[skill.status].label}
					</UniversalChip>
				</label>
			{/each}
		</div>
	{/if}
</div>
