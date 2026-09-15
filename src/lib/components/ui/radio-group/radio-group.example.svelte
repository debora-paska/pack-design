<script lang="ts">
	import { Label } from '../label/index.js';
	import { RadioGroup, RadioGroupItem } from './index.js';

	let {
		value = $bindable('comfortable'),
		disabled = false
	}: {
		value?: string;
		disabled?: boolean;
	} = $props();
</script>

<RadioGroup bind:value {disabled}>
	<div class="flex items-center gap-2">
		<RadioGroupItem value="default" id="radio-default" />
		<Label for="radio-default">Default</Label>
	</div>
	<div class="flex items-center gap-2">
		<RadioGroupItem value="comfortable" id="radio-comfortable" />
		<Label for="radio-comfortable">Comfortable</Label>
	</div>
	<div class="flex items-center gap-2">
		<RadioGroupItem value="compact" id="radio-compact" />
		<Label for="radio-compact">Compact</Label>
	</div>
</RadioGroup>
