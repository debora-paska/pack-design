<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PageTopbarExample from './page-topbar.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/Dashboard/PageTopbar',
		component: PageTopbarExample,
		tags: ['autodocs'],
		args: {
			variant: 'dashboard'
		},
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['dashboard', 'first-layer', 'nested']
			}
		}
	});
</script>

<Story name="Dashboard greeting" args={{ variant: 'dashboard' }} />
<Story name="First layer" args={{ variant: 'first-layer' }} />
<Story name="Nested with breadcrumb" args={{ variant: 'nested' }} />
