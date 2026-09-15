<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Button from './button.svelte';
	import { Minus, Plus, Save, Trash } from '@lucide/svelte';
	import { createRawSnippet } from 'svelte';

	const icons = {
		Plus,
		Minus,
		Trash,
		Save
	};
	const { Story } = defineMeta({
		title: 'Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			icon: {
				control: 'select',
				options: Object.keys(icons),
				mapping: icons
			},
			iconName: {
				control: 'select',
				options: ['arrow-right', 'arrow-left', 'user']
			},
			ref: { control: false }
		},
		args: {
			onclick: fn(),
			children: createRawSnippet(() => ({
				render: () => {
					return 'Click me';
				}
			}))
		}
	});
</script>

<Story name="Default" args={{}} />

<Story name="Outline" args={{ variant: 'outline' }} />

<Story
	name="Outline arrow right"
	args={{ variant: 'outline', iconName: 'arrow-right', iconAtEnd: true }}
/>

<Story name="Outline arrow left" args={{ variant: 'outline', iconName: 'arrow-left' }} />

<Story name="Outline user" args={{ variant: 'outline', iconName: 'user' }} />

<Story name="With icon" args={{ icon: Save }} />

<Story
	name="With async action"
	args={{
		icon: Save,
		onclick: () => new Promise((resolve) => setTimeout(resolve, 1000))
	}}
/>
