<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AvatarExample from './avatar.example.svelte';

	const { Story } = defineMeta({
		title: 'Avatar',
		component: AvatarExample,
		tags: ['autodocs']
	});
</script>

<Story name="Fallback" />

<Story name="Small" args={{ size: 'sm', fallback: 'S' }} />

<Story name="Large" args={{ size: 'lg', fallback: 'HR' }} />
