<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CardExample from './card.example.svelte';

	const { Story } = defineMeta({
		title: 'Card',
		component: CardExample,
		tags: ['autodocs']
	});
</script>

<Story name="Default" />

<Story
	name="Small"
	args={{
		size: 'sm',
		title: 'New run',
		description: '',
		body: 'Start a mapping for Customer Operations Specialist.',
		showFooter: false
	}}
/>
