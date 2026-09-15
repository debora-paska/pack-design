<script lang="ts">
	import Tabs from './tabs.svelte';
	import TabsList from './tabs-list.svelte';
	import TabsTrigger from './tabs-trigger.svelte';
	import TabsContent from './tabs-content.svelte';

	let {
		variant = 'default',
		value = $bindable('overview')
	}: { variant?: 'default' | 'line'; value?: string } = $props();
</script>

<Tabs bind:value>
	<TabsList {variant}>
		<TabsTrigger value="overview">Overview</TabsTrigger>
		<TabsTrigger value="skills">Skills</TabsTrigger>
		<TabsTrigger value="people">People</TabsTrigger>
	</TabsList>
	<TabsContent value="overview">Role outlook and coverage.</TabsContent>
	<TabsContent value="skills">Skill list and gaps.</TabsContent>
	<TabsContent value="people">People in this mapping.</TabsContent>
</Tabs>
