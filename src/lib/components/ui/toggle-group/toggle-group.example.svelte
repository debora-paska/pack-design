<script lang="ts">
	import ToggleGroup from './toggle-group.svelte';
	import ToggleGroupItem from './toggle-group-item.svelte';

	let {
		size = 'default',
		variant = 'outline',
		value = $bindable('now')
	}: {
		size?: 'default' | 'sm' | 'lg';
		variant?: 'default' | 'outline';
		value?: string;
	} = $props();
</script>

<ToggleGroup type="single" bind:value {size} {variant}>
	<ToggleGroupItem value="now">Now</ToggleGroupItem>
	<ToggleGroupItem value="horizon">Horizon</ToggleGroupItem>
	<ToggleGroupItem value="delta">Delta</ToggleGroupItem>
</ToggleGroup>
