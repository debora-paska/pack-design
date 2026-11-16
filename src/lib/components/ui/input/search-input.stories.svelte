<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SearchInput from './search-input.svelte';

	const { Story } = defineMeta({
		title: 'SearchInput',
		component: SearchInput,
		tags: ['autodocs'],
		argTypes: { ref: { control: false } },
		args: { 'aria-label': 'Search people', placeholder: 'Search by email, name, surname...' }
	});
</script>

{#snippet frame(args: Record<string, unknown>)}
	<div class="w-80 p-4"><SearchInput {...args} /></div>
{/snippet}

<Story name="Default" template={frame} />
<Story name="Filled" args={{ value: 'Maria' }} template={frame} />
<Story name="Disabled" args={{ disabled: true }} template={frame} />
