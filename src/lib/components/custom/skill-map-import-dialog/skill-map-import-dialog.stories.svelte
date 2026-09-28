<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SkillMapImportDialogExample from './skill-map-import-dialog.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/Assessment/SkillMapImportDialog',
		component: SkillMapImportDialogExample,
		tags: ['autodocs'],
		args: {
			variant: 'with-skills'
		},
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['with-skills', 'empty-map', 'nothing-selected']
			}
		}
	});
</script>

<Story name="With skills" />
<Story name="Empty map" args={{ variant: 'empty-map' }} />
<Story name="Nothing selected" args={{ variant: 'nothing-selected' }} />
