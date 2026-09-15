<script lang="ts">
	import Pagination from './pagination.svelte';
	import PaginationContent from './pagination-content.svelte';
	import PaginationItem from './pagination-item.svelte';
	import PaginationLink from './pagination-link.svelte';
	import PaginationPrevious from './pagination-previous.svelte';
	import PaginationNext from './pagination-next.svelte';
	import PaginationEllipsis from './pagination-ellipsis.svelte';

	let { page = $bindable(1) }: { page?: number } = $props();
</script>

<Pagination count={40} perPage={10} bind:page>
	{#snippet children({ pages, currentPage })}
		<PaginationContent>
			<PaginationItem>
				<PaginationPrevious />
			</PaginationItem>
			{#each pages as pageItem (pageItem.key)}
				{#if pageItem.type === 'ellipsis'}
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				{:else}
					<PaginationItem>
						<PaginationLink page={pageItem} isActive={currentPage === pageItem.value} />
					</PaginationItem>
				{/if}
			{/each}
			<PaginationItem>
				<PaginationNext />
			</PaginationItem>
		</PaginationContent>
	{/snippet}
</Pagination>
