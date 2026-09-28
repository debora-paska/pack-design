<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';
	import type { SkillMapRole } from '../types';

	let {
		roles = [],
		selectedRoleId = $bindable('')
	}: {
		roles?: SkillMapRole[];
		selectedRoleId?: string;
	} = $props();
</script>

<div class="flex flex-col gap-1.5 border-r border-gray-5 bg-gray-2 p-3.5">
	<div
		class="px-1.5 pb-1.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase"
	>
		Mapped roles
	</div>
	{#each roles as role (role.id)}
		<button
			type="button"
			class={cn(
				'flex flex-col rounded-md border p-2.5 text-left',
				role.id === selectedRoleId
					? 'border-primary-300 bg-white'
					: 'border-transparent bg-transparent'
			)}
			onclick={() => (selectedRoleId = role.id)}
		>
			<div class="text-[13.5px] font-medium text-foreground">{role.name}</div>
			<div class="mt-0.5 text-[11.5px] text-muted-foreground">{role.meta}</div>
		</button>
	{/each}
</div>
