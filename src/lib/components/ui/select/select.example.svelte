<script lang="ts">
	import Select from './select.svelte';
	import SelectTrigger from './select-trigger.svelte';
	import SelectContent from './select-content.svelte';
	import SelectGroup from './select-group.svelte';
	import SelectLabel from './select-label.svelte';
	import SelectItem from './select-item.svelte';

	let { value = $bindable('italy') }: { value?: string } = $props();
</script>

<Select type="single" bind:value>
	<SelectTrigger class="w-[220px]">
		{value === 'italy' ? 'Italy' : value === 'germany' ? 'Germany' : 'France'}
	</SelectTrigger>
	<SelectContent>
		<SelectGroup>
			<SelectLabel>Country</SelectLabel>
			<SelectItem value="italy" label="Italy" />
			<SelectItem value="germany" label="Germany" />
			<SelectItem value="france" label="France" />
		</SelectGroup>
	</SelectContent>
</Select>
