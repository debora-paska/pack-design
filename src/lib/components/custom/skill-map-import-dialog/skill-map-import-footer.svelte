<script lang="ts">
	import { Button } from '../../ui/button/index.js';

	let {
		addLabel = 'Add skills',
		isAddDisabled = false,
		onClose,
		onAdd
	}: {
		addLabel?: string;
		isAddDisabled?: boolean;
		onClose?: () => void;
		onAdd?: () => void;
	} = $props();
</script>

<div class="flex items-center justify-between gap-5 border-t border-gray-5 px-6 py-3.5">
	<div class="text-xs text-muted-foreground">
		Imported skills are remembered for skill-gap reporting. They do not invite anyone to rate.
	</div>
	<div class="flex items-center gap-2.5">
		<Button variant="secondary" onclick={() => onClose?.()}>Cancel</Button>
		<Button disabled={isAddDisabled} onclick={() => onAdd?.()}>{addLabel}</Button>
	</div>
</div>
