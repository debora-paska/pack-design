<script lang="ts">
	import AriaNotice from './aria-notice.svelte';

	let { skillCount = 12 }: { skillCount?: number } = $props();
</script>

<AriaNotice>
	By enabling this option, Aria will conduct a brief voice interview as part of the assessment. The
	assessee completes both the form-based assessment <em>and</em> the Aria interview. Pre-loaded with
	the {skillCount} skills from the mapping.
</AriaNotice>
