<script lang="ts">
	import { cn } from '@pack/ui/lib/utils.js';

	let { class: className }: { class?: string } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	fill="none"
	aria-hidden="true"
	class={cn('size-[17px] shrink-0', className)}
>
	<circle cx="9" cy="6" r="4" stroke="currentColor" stroke-width="1.5" />
	<path
		d="M15 9C16.6569 9 18 7.65685 18 6C18 4.34315 16.6569 3 15 3"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
	/>
	<ellipse cx="9" cy="17" rx="7" ry="4" stroke="currentColor" stroke-width="1.5" />
	<path
		d="M18 14C19.7542 14.3847 21 15.3589 21 16.5C21 17.5293 19.9863 18.4229 18.5 18.8704"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
	/>
</svg>
