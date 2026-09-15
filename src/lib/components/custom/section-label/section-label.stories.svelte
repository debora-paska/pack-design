<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SectionLabel from './section-label.svelte';

	const { Story } = defineMeta({
		title: 'custom/Atomic/SectionLabel',
		component: SectionLabel,
		tags: ['autodocs'],
		args: {
			label: 'Coverage'
		}
	});
</script>

<Story name="Default" />
