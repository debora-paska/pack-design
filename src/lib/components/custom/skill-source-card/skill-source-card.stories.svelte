<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SkillSourceCardExample from './skill-source-card.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/SkillSourceCard',
		component: SkillSourceCardExample,
		tags: ['autodocs'],
		args: {
			kind: 'type-or-paste'
		},
		argTypes: {
			kind: {
				control: { type: 'select' },
				options: ['type-or-paste', 'upload-file', 'import-from-mapping']
			}
		}
	});
</script>

<Story name="Type or paste" />
<Story name="Upload a file" args={{ kind: 'upload-file' }} />
<Story name="Import from skill mapping" args={{ kind: 'import-from-mapping' }} />
