<script lang="ts">
	import { Button } from '../../ui/button/index.js';
	import { Input } from '../../ui/input/index.js';
	import SkillSourceCard from './skill-source-card.svelte';
	import type { SkillSourceKind } from '../types';

	let { kind = 'type-or-paste' }: { kind?: SkillSourceKind } = $props();

	const copy: Record<
		SkillSourceKind,
		{ title: string; description: string; action: string }
	> = {
		'type-or-paste': {
			title: 'Type or paste',
			description:
				'Confirm with Enter or a comma. Pasting also works — separated by comma, semicolon, tab or new line. Minimum 3 characters.',
			action: ''
		},
		'upload-file': {
			title: 'Upload a file',
			description:
				'Comma-separated values or text file. One skill per line. An optional second column is used as the description.',
			action: 'Choose a file'
		},
		'import-from-mapping': {
			title: 'Import from skill mapping',
			description:
				"This company only. Expected proficiency comes across as context, never as the scoring format.",
			action: 'Browse skill maps'
		}
	};

	const item = $derived(copy[kind]);
</script>

<div class="max-w-sm">
	<SkillSourceCard kind={kind} title={item.title} description={item.description}>
		{#if kind === 'type-or-paste'}
			<Input placeholder="Coaching conversations" />
		{:else}
			<div>
				<Button variant="secondary" size="sm">{item.action}</Button>
			</div>
		{/if}
	</SkillSourceCard>
</div>
