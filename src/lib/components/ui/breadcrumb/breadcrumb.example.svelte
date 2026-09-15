<script lang="ts">
	import Breadcrumb from './breadcrumb.svelte';
	import BreadcrumbList from './breadcrumb-list.svelte';
	import BreadcrumbItem from './breadcrumb-item.svelte';
	import BreadcrumbLink from './breadcrumb-link.svelte';
	import BreadcrumbSeparator from './breadcrumb-separator.svelte';
	import BreadcrumbPage from './breadcrumb-page.svelte';
</script>

<Breadcrumb>
	<BreadcrumbList>
		<BreadcrumbItem>
			<BreadcrumbLink href="#talent">Talent</BreadcrumbLink>
		</BreadcrumbItem>
		<BreadcrumbSeparator />
		<BreadcrumbItem>
			<BreadcrumbLink href="#mappings">Mappings</BreadcrumbLink>
		</BreadcrumbItem>
		<BreadcrumbSeparator />
		<BreadcrumbItem>
			<BreadcrumbPage>HRBP</BreadcrumbPage>
		</BreadcrumbItem>
	</BreadcrumbList>
</Breadcrumb>
