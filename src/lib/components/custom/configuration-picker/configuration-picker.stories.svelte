<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ConfigurationPicker from './configuration-picker.svelte';

	const items = [
		{
			value: 'c1',
			name: 'Orbit Health leadership set',
			meta: '2 categories · 8 modules',
			company: 'Orbit Health'
		},
		{
			value: 'c2',
			name: 'Frontline service behaviours',
			meta: '1 category · 5 modules',
			company: 'Orbit Health'
		}
	];

	const { Story } = defineMeta({
		title: 'custom/Assessment/ConfigurationPicker',
		component: ConfigurationPicker,
		tags: ['autodocs'],
		args: {
			isEnabled: false,
			query: '',
			scope: 'company',
			selectedValue: '',
			items
		}
	});
</script>

<Story name="Switch off" />
<Story name="Switch on" args={{ isEnabled: true }} />
<Story
	name="Selected"
	args={{ isEnabled: true, selectedValue: 'c1', scope: 'all' }}
/>
