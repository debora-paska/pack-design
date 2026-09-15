import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';

const rootDir = dirname(fileURLToPath(import.meta.url));
const tokensDir = join(rootDir, 'src/styles/tokens');
const primitivesPath = join(tokensDir, 'primitives.tokens.json');
const semanticPath = join(tokensDir, 'semantic.tokens.json');

const COLOR_RAMP_ORDER = ['gray', 'black', 'white', 'primary', 'success', 'warning', 'error', 'info'];
const WHITE_STEP_ORDER = ['solid', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const SPACE_ORDER = [
	'0',
	'px',
	'0-5',
	'1',
	'1-5',
	'2',
	'2-5',
	'3',
	'3-5',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'11',
	'12',
	'14',
	'16',
	'20',
	'24',
	'28',
	'32',
	'36',
	'40',
	'44',
	'48',
	'52',
	'56',
	'60',
	'64',
	'72',
	'80',
	'96'
];
const FONT_SIZE_ORDER = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
const FONT_WEIGHT_ORDER = [
	'thin',
	'extralight',
	'light',
	'normal',
	'medium',
	'semibold',
	'bold',
	'extrabold',
	'black'
];
const LINE_HEIGHT_ORDER = ['none', 'tight', 'snug', 'normal', 'relaxed'];
const LETTER_SPACING_ORDER = ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'];
const BORDER_WIDTH_ORDER = ['0', '1', '2', '4', '8'];
const STROKE_WIDTH_ORDER = ['0-5', '0-75', '1', '1-25', '1-5', '2', '2-5', '3'];
const SHADOW_ORDER = ['xs', 'sm', 'md', 'lg', 'xl', 'focus-ring'];
const OPACITY_ORDER = [
	'0',
	'5',
	'10',
	'15',
	'20',
	'25',
	'30',
	'35',
	'40',
	'45',
	'50',
	'55',
	'60',
	'65',
	'70',
	'75',
	'80',
	'85',
	'90',
	'95',
	'100'
];
const SEMANTIC_COLOR_ORDER = [
	'background',
	'foreground',
	'card',
	'card-foreground',
	'popover',
	'popover-foreground',
	'muted',
	'muted-foreground',
	'accent',
	'accent-foreground',
	'accent-hover',
	'accent-active',
	'accent-disabled',
	'primary',
	'primary-foreground',
	'primary-hover',
	'primary-active',
	'primary-disabled',
	'secondary',
	'secondary-foreground',
	'secondary-hover',
	'secondary-active',
	'secondary-disabled',
	'destructive',
	'destructive-foreground',
	'destructive-hover',
	'destructive-active',
	'destructive-disabled',
	'success',
	'success-foreground',
	'success-hover',
	'success-active',
	'success-disabled',
	'warning',
	'warning-foreground',
	'warning-hover',
	'warning-active',
	'warning-disabled',
	'info',
	'info-foreground',
	'info-hover',
	'info-active',
	'info-disabled',
	'border',
	'input',
	'ring',
	'chart-1',
	'chart-2',
	'chart-3',
	'chart-4',
	'chart-5'
];

const QUOTED_FONT_NAMES = new Set([
	'Inter',
	'Geist',
	'Segoe UI',
	'Helvetica Neue',
	'Roboto Mono',
	'Geist Mono',
	'SF Mono'
]);

function srgbToLinear(channel) {
	return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function formatNumber(value, digits) {
	let formatted = value.toFixed(digits);
	if (formatted.includes('.')) {
		formatted = formatted.replace(/0+$/, '').replace(/\.$/, '');
	}
	if (formatted === '-0') {
		formatted = '0';
	}
	return formatted;
}

function hexToOklchCss(hexColor) {
	let hex = hexColor.replace('#', '');
	let alpha = 1;
	if (hex.length === 8) {
		alpha = parseInt(hex.slice(6, 8), 16) / 255;
		hex = hex.slice(0, 6);
	}
	const red = srgbToLinear(parseInt(hex.slice(0, 2), 16) / 255);
	const green = srgbToLinear(parseInt(hex.slice(2, 4), 16) / 255);
	const blue = srgbToLinear(parseInt(hex.slice(4, 6), 16) / 255);
	const long = 0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue;
	const medium = 0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue;
	const short = 0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue;
	const longRoot = Math.cbrt(long);
	const mediumRoot = Math.cbrt(medium);
	const shortRoot = Math.cbrt(short);
	const lightness = 0.2104542553 * longRoot + 0.7936177850 * mediumRoot - 0.0040720468 * shortRoot;
	const aAxis = 1.9779984951 * longRoot - 2.4285922050 * mediumRoot + 0.4505937099 * shortRoot;
	const bAxis = 0.0259040371 * longRoot + 0.7993307103 * mediumRoot - 0.8252347474 * shortRoot;
	let chroma = Math.hypot(aAxis, bAxis);
	let hue = (Math.atan2(bAxis, aAxis) * 180) / Math.PI;
	if (hue < 0) {
		hue += 360;
	}
	if (chroma < 0.001) {
		chroma = 0;
		hue = 0;
	}
	const body = `${formatNumber(lightness, 3)} ${formatNumber(chroma, 3)} ${formatNumber(hue, 2)}`;
	if (alpha < 1) {
		return `oklch(${body} / ${formatNumber(alpha, 4)})`;
	}
	return `oklch(${body})`;
}

function rgbToOklchCss(red, green, blue, alpha) {
	const toHex = (channel) => Math.round(channel).toString(16).padStart(2, '0');
	const opaque = hexToOklchCss(`#${toHex(red)}${toHex(green)}${toHex(blue)}`);
	if (alpha >= 1) {
		return opaque;
	}
	return opaque.replace(')', ` / ${formatNumber(alpha, 4)})`);
}

function shadowToOklch(shadow) {
	return shadow.replace(
		/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/g,
		(_, red, green, blue, alpha) =>
			rgbToOklchCss(Number(red), Number(green), Number(blue), alpha === undefined ? 1 : Number(alpha))
	);
}

function packName(path) {
	if (path[0] === 'color') {
		if (path[1] === 'white' && path[2] === 'solid') {
			return 'white';
		}
		return path.slice(1).join('-');
	}
	if (path[0] === 'sem') {
		return path.slice(1).join('-');
	}
	if (path[0] === 'space') {
		return `space-${path[1]}`;
	}
	if (path[0] === 'fontFamily') {
		return `font-${path[1]}`;
	}
	if (path[0] === 'fontSize') {
		return `text-${path[1]}`;
	}
	if (path[0] === 'fontWeight') {
		return `font-weight-${path[1]}`;
	}
	if (path[0] === 'lineHeight') {
		return `leading-${path[1]}`;
	}
	if (path[0] === 'letterSpacing') {
		return `tracking-${path[1]}`;
	}
	if (path[0] === 'radius') {
		return `radius-${path[1]}`;
	}
	if (path[0] === 'borderWidth') {
		return `border-w-${path[1]}`;
	}
	if (path[0] === 'strokeWidth') {
		return `stroke-w-${path[1]}`;
	}
	if (path[0] === 'shadow') {
		return `shadow-${path[1]}`;
	}
	if (path[0] === 'opacity') {
		return `opacity-${path[1]}`;
	}
	return path.join('-');
}

function quoteFontName(name) {
	return QUOTED_FONT_NAMES.has(name) ? `'${name}'` : name;
}

function formatFontStack(names) {
	return names.map(quoteFontName).join(', ');
}

function wrapFontStack(cssName, stack) {
	if (cssName === 'font-mono') {
		return `\t--${cssName}: ${stack};`;
	}
	const wrapped = stack.replace(', sans-serif', ',\n\t\tsans-serif');
	return `\t--${cssName}:\n\t\t${wrapped};`;
}

function originalValue(token) {
	return token.original?.$value ?? token.original?.value ?? token.$value ?? token.value;
}

function resolvedValue(token) {
	return token.value ?? token.$value ?? token.original?.$value;
}

function cssValue(token) {
	const raw = originalValue(token);
	if (typeof raw === 'string' && raw.startsWith('{') && raw.endsWith('}')) {
		const referencePath = raw.slice(1, -1).split('.');
		return `var(--${packName(referencePath)})`;
	}
	const type = token.$type ?? token.type;
	const current = resolvedValue(token);
	if (type === 'color' && typeof current === 'string' && current.startsWith('oklch(')) {
		return current;
	}
	if (type === 'color' && typeof raw === 'string' && raw.startsWith('#')) {
		return hexToOklchCss(raw);
	}
	if (type === 'fontFamily' && Array.isArray(raw)) {
		return formatFontStack(raw);
	}
	if (type === 'shadow' && typeof raw === 'string') {
		return shadowToOklch(raw);
	}
	return current;
}

function tokenMap(dictionary) {
	const byName = new Map();
	for (const token of dictionary.allTokens) {
		byName.set(token.name, token);
	}
	return byName;
}

function decl(name, value) {
	return `\t--${name}: ${value};`;
}

function orderedDecls(byName, names) {
	return names.map((name) => {
		const token = byName.get(name);
		if (!token) {
			throw new Error(`Missing token --${name}`);
		}
		return decl(name, cssValue(token));
	});
}

function colorRampDecls(byName) {
	const lines = [];
	for (const ramp of COLOR_RAMP_ORDER) {
		const tokens = [...byName.values()].filter((token) => {
			if (token.path[0] !== 'color' || token.path[1] !== ramp) {
				return false;
			}
			return true;
		});
		if (ramp === 'white') {
			tokens.sort(
				(left, right) => WHITE_STEP_ORDER.indexOf(left.path[2]) - WHITE_STEP_ORDER.indexOf(right.path[2])
			);
			const withoutSolid = tokens.filter((token) => token.path[2] !== 'solid');
			const solid = tokens.find((token) => token.path[2] === 'solid');
			for (const token of withoutSolid) {
				lines.push(decl(token.name, cssValue(token)));
			}
			if (solid) {
				lines.push(decl(solid.name, cssValue(solid)));
			}
			continue;
		}
		tokens.sort((left, right) => {
			const leftStep = left.path[2];
			const rightStep = right.path[2];
			const numeric = Number(leftStep) - Number(rightStep);
			if (!Number.isNaN(numeric) && leftStep !== undefined) {
				return numeric;
			}
			return String(leftStep).localeCompare(String(rightStep));
		});
		for (const token of tokens) {
			lines.push(decl(token.name, cssValue(token)));
		}
	}
	return lines;
}

function radiusBlock(byName) {
	const radius = resolvedValue(byName.get('radius-base'));
	return [
		decl('radius', radius),
		'\t--radius-none: 0px;',
		'\t--radius-xs: calc(var(--radius) - 8px);',
		'\t--radius-sm: calc(var(--radius) - 4px);',
		'\t--radius-md: calc(var(--radius) - 2px);',
		'\t--radius-lg: var(--radius);',
		'\t--radius-xl: calc(var(--radius) + 4px);',
		'\t--radius-2xl: calc(var(--radius) + 8px);',
		'\t--radius-3xl: calc(var(--radius) + 12px);',
		'\t--radius-4xl: calc(var(--radius) + 16px);',
		'\t--radius-full: 9999px;'
	];
}

function themeRadiusBlock() {
	return [
		'\t--radius-xs: calc(var(--radius) - 8px);',
		'\t--radius-sm: calc(var(--radius) - 4px);',
		'\t--radius-md: calc(var(--radius) - 2px);',
		'\t--radius-lg: var(--radius);',
		'\t--radius-xl: calc(var(--radius) + 4px);',
		'\t--radius-2xl: calc(var(--radius) + 8px);',
		'\t--radius-3xl: calc(var(--radius) + 12px);',
		'\t--radius-4xl: calc(var(--radius) + 16px);',
		'\t--radius-none: 0px;',
		'\t--radius-full: 9999px;'
	];
}

function themeSpacingBlock() {
	return SPACE_ORDER.map((step) => {
		const cssName = step.includes('-') ? step.replace('-', '.') : step;
		return `\t--spacing-${cssName}: var(--space-${step});`;
	});
}

function formatGlobals(dictionary) {
	const byName = tokenMap(dictionary);

	const root = [
		'/* Pack light-mode tokens. Semantic layer references primitives only. */',
		':root {',
		'\t/* Color ramps */',
		...colorRampDecls(byName),
		'',
		'\t/* Spacing */',
		...orderedDecls(
			byName,
			SPACE_ORDER.map((step) => `space-${step}`)
		),
		'',
		'\t/* Typography */',
		wrapFontStack('font-sans', cssValue(byName.get('font-sans'))),
		wrapFontStack('font-display', cssValue(byName.get('font-display'))),
		wrapFontStack('font-mono', cssValue(byName.get('font-mono'))),
		...orderedDecls(
			byName,
			FONT_SIZE_ORDER.map((step) => `text-${step}`)
		),
		...orderedDecls(
			byName,
			FONT_WEIGHT_ORDER.map((step) => `font-weight-${step}`)
		),
		...orderedDecls(
			byName,
			LINE_HEIGHT_ORDER.map((step) => `leading-${step}`)
		),
		...orderedDecls(
			byName,
			LETTER_SPACING_ORDER.map((step) => `tracking-${step}`)
		),
		'',
		'\t/* Radius */',
		...radiusBlock(byName),
		'',
		'\t/* Border width */',
		...orderedDecls(
			byName,
			BORDER_WIDTH_ORDER.map((step) => `border-w-${step}`)
		),
		'',
		'\t/* Stroke width */',
		...orderedDecls(
			byName,
			STROKE_WIDTH_ORDER.map((step) => `stroke-w-${step}`)
		),
		'',
		'\t/* Shadow */',
		...orderedDecls(
			byName,
			SHADOW_ORDER.map((step) => `shadow-${step}`)
		),
		'',
		'\t/* Opacity */',
		...orderedDecls(
			byName,
			OPACITY_ORDER.map((step) => `opacity-${step}`)
		),
		'',
		'\t/* Semantic */',
		...orderedDecls(byName, SEMANTIC_COLOR_ORDER),
		'}',
		'',
		'@theme inline {',
		'\t/* Semantic colours → Tailwind bg-*, text-*, border-* */',
		...SEMANTIC_COLOR_ORDER.map((name) => `\t--color-${name}: var(--${name});`),
		'',
		'\t/* Radius */',
		...themeRadiusBlock(),
		'',
		'\t/* Spacing */',
		...themeSpacingBlock(),
		'',
		'\t/* Font */',
		wrapFontStack('font-sans', cssValue(byName.get('font-sans'))),
		wrapFontStack('font-display', cssValue(byName.get('font-display'))),
		wrapFontStack('font-mono', cssValue(byName.get('font-mono'))),
		...orderedDecls(
			byName,
			FONT_SIZE_ORDER.map((step) => `text-${step}`)
		),
		...orderedDecls(
			byName,
			FONT_WEIGHT_ORDER.map((step) => `font-weight-${step}`)
		),
		...orderedDecls(
			byName,
			LINE_HEIGHT_ORDER.map((step) => `leading-${step}`)
		),
		...orderedDecls(
			byName,
			LETTER_SPACING_ORDER.map((step) => `tracking-${step}`)
		),
		'',
		'\t/* Shadow */',
		...orderedDecls(
			byName,
			SHADOW_ORDER.map((step) => `shadow-${step}`)
		),
		'',
		'\t/* Border width */',
		...BORDER_WIDTH_ORDER.map((step) => `\t--border-width-${step}: var(--border-w-${step});`),
		'}',
		''
	];

	return root.join('\n');
}

const styleDictionary = new StyleDictionary({
	source: [primitivesPath],
	preprocessors: ['pack/semantic'],
	log: { verbosity: 'silent' },
	hooks: {
		preprocessors: {
			'pack/semantic': (tokens) => {
				const semantic = JSON.parse(readFileSync(semanticPath, 'utf8'));
				tokens.sem = semantic.color;
				tokens.sem.radius = semantic.radius;
				return tokens;
			}
		},
		transforms: {
			'pack/name': {
				type: 'name',
				transform: (token) => packName(token.path)
			},
			'pack/color': {
				type: 'value',
				filter: (token) => (token.$type ?? token.type) === 'color',
				transform: (token) => {
					const value = token.$value ?? token.value;
					if (typeof value === 'string' && value.startsWith('#')) {
						return hexToOklchCss(value);
					}
					return value;
				}
			}
		},
		formats: {
			'pack/globals': ({ dictionary }) => formatGlobals(dictionary)
		}
	},
	platforms: {
		css: {
			transforms: ['pack/name', 'pack/color'],
			buildPath: join(rootDir, 'src/styles/'),
			files: [
				{
					destination: 'globals.css',
					format: 'pack/globals'
				}
			]
		}
	}
});

await styleDictionary.hasInitialized;
await styleDictionary.buildAllPlatforms();
