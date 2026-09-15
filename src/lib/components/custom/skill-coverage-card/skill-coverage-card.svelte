<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '../../ui/card/index.js';
	import { Button } from '../../ui/button/index.js';
	import SkillMeter from '../skill-meter/skill-meter.svelte';

	let {
		title = 'Skill coverage',
		description = 'Share of the role map with a current score.',
		label = 'Required skills with at least one rated person',
		value = 72
	}: {
		title?: string;
		description?: string;
		label?: string;
		value?: number;
	} = $props();
</script>

<Card class="w-[360px]">
	<CardHeader>
		<CardTitle>{title}</CardTitle>
		<CardDescription>{description}</CardDescription>
	</CardHeader>
	<CardContent>
		<SkillMeter {label} {value} />
	</CardContent>
	<CardFooter class="gap-2">
		<Button>Open report</Button>
		<Button variant="outline">Export</Button>
	</CardFooter>
</Card>
