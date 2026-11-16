<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, within } from 'storybook/test';
	import FilterPillsExample from './filter-pills.example.svelte';

	const { Story } = defineMeta({
		title: 'custom/Atomic/FilterPills',
		component: FilterPillsExample,
		tags: ['autodocs'],
		argTypes: { hasDot: { control: 'boolean' } },
		args: { value: 'all', hasDot: true }
	});

	/**
	 * A radio group by keyboard (W3C APG; designer handover v1.2): one tab stop on the checked
	 * pill; the arrows move and check, wrapping at both ends.
	 */
	async function checkKeyboard({ canvasElement }: { canvasElement: HTMLElement }) {
		const canvas = within(canvasElement);
		const radios = canvas.getAllByRole('radio');

		await userEvent.tab();
		await expect(radios[0]).toHaveFocus();

		await userEvent.keyboard('{ArrowRight}');
		await expect(radios[1]).toHaveFocus();
		await expect(radios[1]).toHaveAttribute('aria-checked', 'true');

		await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
		await expect(radios[radios.length - 1]).toHaveAttribute('aria-checked', 'true');

		await userEvent.tab();
		await expect(canvasElement).not.toContainElement(document.activeElement as HTMLElement);
	}
</script>

<!-- hasDot: a dot before each label, in the option's tone (the Badge text colours). -->
<Story name="Default" play={checkKeyboard} />
<Story name="Suggestions selected" args={{ value: 'suggested' }} />
<!-- One pill per variant: default, active (selected), disabled. -->
<Story
	name="Variants"
	args={{
		label: 'Status',
		value: 'active',
		options: [
			{ value: 'default', label: 'Default', tone: 'neutral' },
			{ value: 'active', label: 'Active', tone: 'info' },
			{ value: 'disabled', label: 'Disabled', tone: 'positive', isDisabled: true }
		]
	}}
/>
<!-- The dot colours a designer can pick: the text colour of the Badge variant of the same name. -->
<Story
	name="Dot colours"
	args={{
		label: 'Tone',
		value: 'neutral',
		options: [
			{ value: 'neutral', label: 'Neutral', tone: 'neutral' },
			{ value: 'info', label: 'Info', tone: 'info' },
			{ value: 'destructive', label: 'Destructive', tone: 'destructive' },
			{ value: 'positive', label: 'Positive', tone: 'positive' },
			{ value: 'brand', label: 'Brand', tone: 'brand' },
			{ value: 'indigo', label: 'Indigo', tone: 'indigo' }
		]
	}}
/>
<Story
	name="Plain choices"
	args={{
		hasDot: false,
		label: 'Scenario horizon',
		value: '3y',
		options: [
			{ value: '1y', label: '1 year' },
			{ value: '3y', label: '3 years' },
			{ value: '5y', label: '5 years' },
			{ value: 'custom', label: 'Custom' }
		]
	}}
/>
<Story
	name="With hints"
	args={{
		hasDot: false,
		label: 'Company size',
		value: '250_1000',
		options: [
			{ value: 'under_50', label: '< 50', hint: 'startup / very small' },
			{ value: '50_250', label: '50–250', hint: 'small' },
			{ value: '250_1000', label: '250–1,000', hint: 'mid-market' },
			{ value: '1000_5000', label: '1,000–5,000', hint: 'large' },
			{ value: '5000_plus', label: '5,000+', hint: 'enterprise' }
		]
	}}
/>
