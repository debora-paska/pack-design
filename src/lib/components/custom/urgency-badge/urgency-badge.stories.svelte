<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import UrgencyBadge from './urgency-badge.svelte';

	const { Story } = defineMeta({
		title: 'custom/Atomic/UrgencyBadge',
		component: UrgencyBadge,
		tags: ['autodocs'],
		args: {
			level: 'high'
		}
	});
</script>

<Story name="High" args={{ level: 'high' }} />
<Story name="Medium" args={{ level: 'med' }} />
<Story name="Low" args={{ level: 'low' }} />
