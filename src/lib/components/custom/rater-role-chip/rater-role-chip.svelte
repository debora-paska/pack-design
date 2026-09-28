<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';

	let {
		label,
		isOn = false
	}: {
		label: string;
		isOn?: boolean;
	} = $props();
</script>

<span
	class={cn(
		'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
		isOn ? 'bg-primary-50 text-primary-700' : 'bg-gray-3 text-muted-foreground'
	)}
>
	{isOn ? label : `${label} · off`}
</span>
