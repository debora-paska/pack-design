<script lang="ts">
	import { CheckOutline } from 'flowbite-svelte-icons';
	import UniversalChip from '../universal-chip/universal-chip.svelte';
	import { SKILL_STATUS_META } from '../skill-status-chip/skill-status-chip.svelte';
	import type { ImportedSkillItem, SkillStatus, UniversalChipColor } from '../types';

	let {
		count,
		mappingTitle,
		subtitle = 'O*NET-grounded · MIT Iceberg overlay applied · 3-year horizon',
		skills,
		isOpen = $bindable(false)
	}: {
		count: number;
		mappingTitle: string;
		subtitle?: string;
		skills: ImportedSkillItem[];
		isOpen?: boolean;
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
		<button
			type="button"
			class="shrink-0 text-[13px] font-semibold text-primary-500"
			onclick={handleToggle}
		>
			{isOpen ? 'Hide' : 'Review'}
		</button>
	</div>
	{#if isOpen}
		<div class="mt-2 grid grid-cols-2 gap-1.5 rounded-lg border border-gray-5 p-3">
			{#each skills as skill (skill.name)}
				<div class="flex items-center justify-between rounded-md bg-gray-2 px-2.5 py-2">
					<span class="text-[13px] text-foreground">{skill.name}</span>
					<UniversalChip color={statusColor[skill.status]}>
						{SKILL_STATUS_META[skill.status].label}
					</UniversalChip>
				</div>
			{/each}
		</div>
	{/if}
</div>
