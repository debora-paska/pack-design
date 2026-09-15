<script lang="ts">
	import { onMount } from 'svelte';
	import { PlusOutline } from 'flowbite-svelte-icons';
	import Button, { type ButtonSize, type ButtonVariant } from '../ui/button/button.svelte';
	import { Input } from '../ui/input/index.js';
	import { Badge, type BadgeVariant } from '../ui/badge/index.js';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '../ui/card/index.js';
	import { Alert, AlertDescription, AlertTitle } from '../ui/alert/index.js';

	const buttonVariants: ButtonVariant[] = [
		'default',
		'secondary',
		'destructive',
		'outline',
		'ghost',
		'link'
	];
	const buttonSizes: ButtonSize[] = ['sm', 'default', 'lg', 'icon'];
	const buttonStates = ['rest', 'hover', 'active', 'disabled'] as const;
	const badgeVariants: BadgeVariant[] = [
		'default',
		'secondary',
		'destructive',
		'outline',
		'ghost',
		'link'
	];

	const semanticTokens = [
		'--background',
		'--foreground',
		'--card',
		'--card-foreground',
		'--popover',
		'--popover-foreground',
		'--muted',
		'--muted-foreground',
		'--accent',
		'--accent-foreground',
		'--accent-hover',
		'--accent-active',
		'--accent-disabled',
		'--primary',
		'--primary-foreground',
		'--primary-hover',
		'--primary-active',
		'--primary-disabled',
		'--secondary',
		'--secondary-foreground',
		'--secondary-hover',
		'--secondary-active',
		'--secondary-disabled',
		'--destructive',
		'--destructive-foreground',
		'--destructive-hover',
		'--destructive-active',
		'--destructive-disabled',
		'--success',
		'--success-foreground',
		'--success-hover',
		'--success-active',
		'--success-disabled',
		'--warning',
		'--warning-foreground',
		'--warning-hover',
		'--warning-active',
		'--warning-disabled',
		'--info',
		'--info-foreground',
		'--info-hover',
		'--info-active',
		'--info-disabled',
		'--border',
		'--input',
		'--ring',
		'--chart-1',
		'--chart-2',
		'--chart-3',
		'--chart-4',
		'--chart-5',
		'--radius'
	];

	const pairs: Array<[string, string]> = [
		['--background', '--foreground'],
		['--card', '--card-foreground'],
		['--popover', '--popover-foreground'],
		['--muted', '--muted-foreground'],
		['--accent', '--accent-foreground'],
		['--primary', '--primary-foreground'],
		['--secondary', '--secondary-foreground'],
		['--destructive', '--destructive-foreground'],
		['--success', '--success-foreground'],
		['--warning', '--warning-foreground'],
		['--info', '--info-foreground']
	];

	const hoverClass: Record<ButtonVariant, string> = {
		default: 'bg-primary-500 text-white',
		secondary: 'bg-secondary/80',
		destructive: 'bg-destructive/20',
		outline: 'bg-muted text-foreground',
		ghost: 'bg-muted text-foreground',
		link: 'underline'
	};

	const activeClass: Record<ButtonVariant, string> = {
		default: 'translate-y-px bg-primary-500 text-white',
		secondary: 'translate-y-px bg-secondary-active',
		destructive: 'translate-y-px bg-destructive-active text-destructive-foreground',
		outline: 'translate-y-px bg-muted',
		ghost: 'translate-y-px bg-muted',
		link: 'translate-y-px underline'
	};

	type TokenRow = {
		name: string;
		computed: string;
		resolved: boolean;
	};

	type PairRow = {
		surface: string;
		foreground: string;
		surfaceValue: string;
		foregroundValue: string;
		ratio: number | null;
		pass: boolean | null;
	};

	let tokenRows = $state<TokenRow[]>([]);
	let pairRows = $state<PairRow[]>([]);
	let emptyTokens = $state<string[]>([]);
	let defaultNeutralTokens = $state<string[]>([]);

	function parseRgb(value: string): [number, number, number] | null {
		const rgb = value.match(/rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/);
		if (rgb) {
			return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
		}
		const hex = value.trim();
		if (/^#[0-9a-f]{6}$/i.test(hex)) {
			return [
				parseInt(hex.slice(1, 3), 16),
				parseInt(hex.slice(3, 5), 16),
				parseInt(hex.slice(5, 7), 16)
			];
		}
		return null;
	}

	function relativeLuminance([r, g, b]: [number, number, number]): number {
		const toLinear = (channel: number) => {
			const scaled = channel / 255;
			return scaled <= 0.04045 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
		};
		return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
	}

	function contrastRatio(a: string, b: string): number | null {
		const rgbA = parseRgb(a);
		const rgbB = parseRgb(b);
		if (!rgbA || !rgbB) {
			return null;
		}
		const lumA = relativeLuminance(rgbA);
		const lumB = relativeLuminance(rgbB);
		const lighter = Math.max(lumA, lumB);
		const darker = Math.min(lumA, lumB);
		return (lighter + 0.05) / (darker + 0.05);
	}

	function isDefaultNeutral(name: string, computed: string): boolean {
		const rgb = parseRgb(computed);
		if (!rgb) {
			return false;
		}
		const neutrals: Array<[number, number, number]> = [
			[255, 255, 255],
			[23, 23, 23],
			[10, 10, 10],
			[250, 250, 250],
			[245, 245, 245],
			[229, 229, 229],
			[115, 115, 115],
			[220, 38, 38]
		];
		return neutrals.some(
			([r, g, b]) =>
				Math.abs(rgb[0] - r) < 2 && Math.abs(rgb[1] - g) < 2 && Math.abs(rgb[2] - b) < 2
		);
	}

	function forceClass(variant: ButtonVariant, state: (typeof buttonStates)[number]): string {
		if (state === 'hover') {
			return hoverClass[variant];
		}
		if (state === 'active') {
			return activeClass[variant];
		}
		return '';
	}

	onMount(() => {
		const styles = getComputedStyle(document.documentElement);
		const probe = document.createElement('div');
		probe.style.position = 'absolute';
		probe.style.visibility = 'hidden';
		document.body.appendChild(probe);

		const nextRows: TokenRow[] = [];
		const missing: string[] = [];
		const neutrals: string[] = [];

		for (const name of semanticTokens) {
			const raw = styles.getPropertyValue(name).trim();
			probe.style.backgroundColor = '';
			probe.style.backgroundColor = `var(${name})`;
			const painted = getComputedStyle(probe).backgroundColor;
			const computed =
				name === '--radius' ? raw : painted && painted !== 'rgba(0, 0, 0, 0)' ? painted : raw;
			const resolved = computed !== '' && computed !== 'rgba(0, 0, 0, 0)';
			nextRows.push({ name, computed: computed || '(empty)', resolved });
			if (!resolved) {
				missing.push(name);
			} else if (name !== '--radius' && isDefaultNeutral(name, computed)) {
				neutrals.push(name);
			}
		}

		const nextPairs: PairRow[] = pairs.map(([surface, foreground]) => {
			probe.style.backgroundColor = `var(${surface})`;
			const surfaceValue = getComputedStyle(probe).backgroundColor;
			probe.style.backgroundColor = `var(${foreground})`;
			const foregroundValue = getComputedStyle(probe).backgroundColor;
			const ratio = contrastRatio(surfaceValue, foregroundValue);
			return {
				surface,
				foreground,
				surfaceValue,
				foregroundValue,
				ratio,
				pass: ratio === null ? null : ratio >= 4.5
			};
		});

		probe.remove();
		tokenRows = nextRows;
		pairRows = nextPairs;
		emptyTokens = missing;
		defaultNeutralTokens = neutrals;
	});
</script>

<div class="bg-background text-foreground min-h-screen space-y-10 p-8">
	<header class="space-y-1">
		<p class="text-muted-foreground text-sm">Token verification</p>
		<h1 class="text-2xl font-semibold">/theme-check</h1>
	</header>

	<section class="space-y-4">
		<h2 class="text-lg font-medium">Buttons — sizes</h2>
		<div class="flex flex-wrap items-center gap-3">
			{#each buttonSizes as size}
				<Button {size}>
					{#if size === 'icon'}
						<PlusOutline />
					{:else}
						{size}
					{/if}
				</Button>
			{/each}
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-lg font-medium">Buttons — variants and states</h2>
		<div class="overflow-x-auto">
			<table class="w-full border-collapse text-sm">
				<thead>
					<tr>
						<th class="p-2 text-left">Variant</th>
						{#each buttonStates as state}
							<th class="p-2 text-left">{state}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each buttonVariants as variant}
						<tr>
							<td class="p-2 align-middle font-medium">{variant}</td>
							{#each buttonStates as state}
								<td class="p-2">
									<Button
										{variant}
										disabled={state === 'disabled'}
										data-force={state}
										data-variant={variant}
										class={forceClass(variant, state)}
									>
										{state}
									</Button>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-lg font-medium">Inputs</h2>
		<div class="grid max-w-xl gap-3">
			<Input placeholder="Rest" />
			<Input placeholder="Focused" class="border-ring ring-ring/50 ring" />
			<Input placeholder="Disabled" disabled />
			<Input placeholder="Placeholder only" value="" />
			<Input placeholder="Error" aria-invalid="true" value="Invalid value" />
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-lg font-medium">Card</h2>
		<Card class="max-w-md">
			<CardHeader>
				<CardTitle>Skill coverage</CardTitle>
				<CardDescription>Default card with header, content, and footer.</CardDescription>
			</CardHeader>
			<CardContent>
				<p class="text-muted-foreground">72% of required skills have at least one rated person.</p>
			</CardContent>
			<CardFooter class="gap-2">
				<Button>Open report</Button>
				<Button variant="outline">Export</Button>
			</CardFooter>
		</Card>
	</section>

	<section class="space-y-4">
		<h2 class="text-lg font-medium">Badges</h2>
		<div class="flex flex-wrap gap-2">
			{#each badgeVariants as variant}
				<Badge {variant}>{variant}</Badge>
			{/each}
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-lg font-medium">Alerts</h2>
		<div class="grid max-w-xl gap-3">
			<Alert>
				<AlertTitle>Default</AlertTitle>
				<AlertDescription>Uses card surface and card foreground.</AlertDescription>
			</Alert>
			<Alert variant="destructive">
				<AlertTitle>Destructive</AlertTitle>
				<AlertDescription>Uses the lightest error wash.</AlertDescription>
			</Alert>
			<Alert variant="success">
				<AlertTitle>Success</AlertTitle>
				<AlertDescription>Uses the lightest success wash.</AlertDescription>
			</Alert>
			<Alert variant="warning">
				<AlertTitle>Warning</AlertTitle>
				<AlertDescription>Uses the lightest warning wash.</AlertDescription>
			</Alert>
			<Alert variant="info">
				<AlertTitle>Info</AlertTitle>
				<AlertDescription>Uses the lightest info wash.</AlertDescription>
			</Alert>
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-lg font-medium">Swatches</h2>
		<div class="grid gap-2">
			{#each tokenRows as row}
				<div class="flex items-center gap-3 text-sm">
					<code class="w-56 shrink-0">{row.name}</code>
					<span
						class="border-border size-8 shrink-0 rounded-sm border"
						style:background={row.name === '--radius' ? 'transparent' : `var(${row.name})`}
					></span>
					<span class="text-muted-foreground font-mono text-xs">{row.computed}</span>
				</div>
			{/each}
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-lg font-medium">Surface / foreground pairs</h2>
		<div class="grid gap-3">
			{#each pairRows as pair}
				<div class="flex items-center gap-3 text-sm">
					<div
						class="flex h-12 min-w-48 items-center justify-center rounded-md px-3"
						style:background={`var(${pair.surface})`}
						style:color={`var(${pair.foreground})`}
					>
						{pair.surface} / {pair.foreground}
					</div>
					<span class="font-mono text-xs">
						{pair.ratio === null ? 'unparsed' : pair.ratio.toFixed(2) + ':1'}
						{pair.pass === null ? '' : pair.pass ? 'pass' : 'fail'}
					</span>
				</div>
			{/each}
		</div>
	</section>

	<section class="space-y-2">
		<h2 class="text-lg font-medium">Computed token table</h2>
		<table class="w-full border-collapse text-left text-sm" data-testid="token-table">
			<thead>
				<tr>
					<th class="border-border border p-2">Variable</th>
					<th class="border-border border p-2">Computed value</th>
				</tr>
			</thead>
			<tbody>
				{#each tokenRows as row}
					<tr>
						<td class="border-border border p-2 font-mono">{row.name}</td>
						<td class="border-border border p-2 font-mono">{row.computed}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<table class="w-full border-collapse text-left text-sm" data-testid="contrast-table">
			<thead>
				<tr>
					<th class="border-border border p-2">Pair</th>
					<th class="border-border border p-2">Contrast</th>
					<th class="border-border border p-2">WCAG AA 4.5:1</th>
				</tr>
			</thead>
			<tbody>
				{#each pairRows as pair}
					<tr>
						<td class="border-border border p-2 font-mono">{pair.surface} / {pair.foreground}</td>
						<td class="border-border border p-2 font-mono">
							{pair.ratio === null ? 'unparsed' : `${pair.ratio.toFixed(2)}:1`}
						</td>
						<td class="border-border border p-2"
							>{pair.pass === null ? '—' : pair.pass ? 'pass' : 'fail'}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
		<p class="text-sm" data-testid="empty-tokens">Empty: {emptyTokens.join(', ') || 'none'}</p>
		<p class="text-sm" data-testid="neutral-tokens">
			Default neutrals: {defaultNeutralTokens.join(', ') || 'none'}
		</p>
	</section>
</div>
