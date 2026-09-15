<script lang="ts">
	import ProfileCard from './profile-card.svelte';
	import type { KeyValueRow } from '../types';

	let {
		initials,
		name,
		email,
		rows
	}: {
		initials: string;
		name: string;
		email: string;
		rows: KeyValueRow[];
	} = $props();
</script>

<div class="max-w-[300px]">
	<ProfileCard {initials} {name} {email} {rows} />
</div>
