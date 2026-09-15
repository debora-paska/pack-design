<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ProfileCardExample from './profile-card.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/Individual Report/ProfileCard',
		component: ProfileCardExample,
		tags: ['autodocs'],
		args: {
			initials: 'SB',
			name: 'Sara Bianchi',
			email: 'sara.bianchi@client.com',
			rows: [
				{ key: 'Role', value: 'HR Business Partner' },
				{ key: 'Manager', value: 'Marco Riva' },
				{ key: 'Tenure', value: '4 years 2 months' },
				{ key: 'Location', value: 'Milan, IT' },
				{ key: 'Raters', value: '1 self · 1 manager · 4 peers' },
				{ key: 'Aria interview', value: 'Completed · 11:52' }
			]
		}
	});
</script>

<Story name="Default" />
