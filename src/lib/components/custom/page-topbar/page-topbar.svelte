<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '@pack/ui/lib/utils.js';

	let {
		title,
		nested = false,
		showWave = false,
		icon,
		crumb,
		actions,
		class: className
	}: {
		title: string;
		nested?: boolean;
		showWave?: boolean;
		icon?: Snippet;
		crumb?: Snippet;
		actions?: Snippet;
		class?: string;
	} = $props();
</script>

<header
	class={cn(
		'page-topbar flex h-20 shrink-0 items-center gap-3.5 border-b border-border bg-white px-[30px] min-w-0',
		nested && 'page-topbar-nested',
		className
	)}
>
	{#if icon}
		<span
			class={cn(
				'page-topbar-icon inline-flex shrink-0 items-center justify-center bg-primary-500 text-white box-border',
				nested ? 'size-7 rounded-[11px] p-1.5' : 'size-9 rounded-[14px] p-1.5'
			)}
		>
			<span
				class={cn(
					'block shrink-0 [filter:drop-shadow(0_0.5px_0.5px_rgba(15,23,42,0.14))] [&_svg]:block [&_svg]:size-full',
					nested ? 'size-4' : 'size-[22px]'
				)}
			>
				{@render icon()}
			</span>
		</span>
	{/if}

	<div
		class={cn(
			'page-topbar-title shrink-0 overflow-hidden text-ellipsis whitespace-nowrap font-semibold tracking-tight text-foreground',
			nested ? 'text-base' : 'text-[22px]',
			showWave && 'flex items-center gap-2.5'
		)}
	>
		{#if showWave}
			<span class="wave-hand text-[22px] leading-none" aria-hidden="true">👋</span>
		{/if}
		{title}
	</div>

	{#if crumb}
		<div
			class="page-topbar-crumb flex min-w-[120px] flex-1 items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap border-l border-border pl-3.5 ml-1 text-[12.5px] text-muted-foreground"
		>
			{@render crumb()}
		</div>
	{/if}

	{#if actions}
		<div class="page-topbar-actions ml-auto flex shrink-0 items-center gap-2.5">
			{@render actions()}
		</div>
	{/if}
</header>

<style>
	.page-topbar-nested .page-topbar-icon {
		animation: topbarIconNest 0.4s cubic-bezier(0.22, 0.8, 0.28, 1) both;
	}

	.page-topbar-nested .page-topbar-title {
		animation: topbarTitleNest 0.36s cubic-bezier(0.22, 0.8, 0.28, 1) both;
	}

	.page-topbar-nested .page-topbar-actions {
		animation: topbarActionsIn 0.34s cubic-bezier(0.22, 0.8, 0.28, 1) 0.14s both;
	}

	.page-topbar-crumb {
		transform-origin: left center;
		animation: topbarCrumbIn 0.44s cubic-bezier(0.22, 0.8, 0.28, 1) 0.1s both;
	}

	@keyframes topbarIconNest {
		from {
			transform: scale(1.28);
		}
		to {
			transform: scale(1);
		}
	}

	@keyframes topbarTitleNest {
		from {
			opacity: 0.55;
			transform: translateX(-6px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes topbarCrumbIn {
		from {
			opacity: 0;
			transform: translateX(-16px);
			clip-path: inset(0 100% 0 0);
		}
		to {
			opacity: 1;
			transform: translateX(0);
			clip-path: inset(0 0 0 0);
		}
	}

	@keyframes topbarActionsIn {
		from {
			opacity: 0;
			transform: translateX(10px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	:global(.wave-hand) {
		display: inline-block;
		transform-origin: 70% 70%;
		animation: packwave 1.6s ease-in-out 0.4s 2;
	}

	@keyframes packwave {
		0%,
		60%,
		100% {
			transform: rotate(0deg);
		}
		12% {
			transform: rotate(14deg);
		}
		24% {
			transform: rotate(-8deg);
		}
		36% {
			transform: rotate(14deg);
		}
		48% {
			transform: rotate(-4deg);
		}
	}
</style>
