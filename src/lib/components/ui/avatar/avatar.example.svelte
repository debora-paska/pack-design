<script lang="ts">
	import Avatar from './avatar.svelte';
	import AvatarFallback from './avatar-fallback.svelte';

	let { size = 'default', fallback = 'G' }: { size?: 'default' | 'sm' | 'lg'; fallback?: string } =
		$props();
</script>

<Avatar {size}>
	<AvatarFallback>{fallback}</AvatarFallback>
</Avatar>
