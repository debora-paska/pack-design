<script lang="ts">
	import { Button } from '../../ui/button/index.js';

	let {
		description = '',
		isEditing = false,
		draft = $bindable(''),
		onStartEdit,
		onSaveDescription,
		onCancelEdit
	}: {
		description?: string;
		isEditing?: boolean;
		draft?: string;
		onStartEdit?: () => void;
		onSaveDescription?: () => void;
		onCancelEdit?: () => void;
	} = $props();
</script>

{#if isEditing}
	<div>
		<textarea
			class="border-input w-full resize-y rounded-md border bg-transparent px-2.5 py-2 text-[13px] leading-relaxed text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
			rows="2"
			placeholder="Description (optional)"
			value={draft}
			oninput={(event) => {
				draft = (event.currentTarget as HTMLTextAreaElement).value;
			}}
		></textarea>
		<div class="mt-2 flex justify-end gap-2">
			<Button variant="secondary" size="sm" onclick={() => onCancelEdit?.()}>Cancel</Button>
			<Button size="sm" onclick={() => onSaveDescription?.()}>Save</Button>
		</div>
	</div>
{:else}
	<div class="flex items-start justify-between gap-3">
		<div class="min-w-0">
			<div class="text-[11.5px] text-muted-foreground">Description</div>
			<div
				class="mt-0.5 text-[13px] {description ? 'text-foreground' : 'text-muted-foreground'}"
			>
				{description || 'No description yet'}
			</div>
		</div>
		<Button
			variant="link"
			size="sm"
			class="h-auto shrink-0 px-0 whitespace-nowrap"
			onclick={() => onStartEdit?.()}
		>
			Edit
		</Button>
	</div>
{/if}
