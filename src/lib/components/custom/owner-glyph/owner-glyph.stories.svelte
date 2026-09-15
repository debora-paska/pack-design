<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import OwnerGlyph from './owner-glyph.svelte';

	const { Story } = defineMeta({
		title: 'custom/Atomic/OwnerGlyph',
		component: OwnerGlyph,
		tags: ['autodocs'],
		args: {
			owner: 'human'
		}
	});
</script>

<Story name="Human" args={{ owner: 'human' }} />
<Story name="Hybrid" args={{ owner: 'hybrid' }} />
<Story name="AI Agent" args={{ owner: 'ai' }} />
<Story name="Robot" args={{ owner: 'robot' }} />
