<script lang="ts">
	type Swatch = { name: string; token: string; value: string };

	const ramps: { title: string; swatches: Swatch[] }[] = [
		{
			title: 'Primary',
			swatches: [
				{ name: '50', token: 'primary-50', value: '#ffefe8' },
				{ name: '100', token: 'primary-100', value: '#ffcdb7' },
				{ name: '200', token: 'primary-200', value: '#ffb495' },
				{ name: '300', token: 'primary-300', value: '#ff9264' },
				{ name: '400', token: 'primary-400', value: '#ff7d46' },
				{ name: '500', token: 'primary-500', value: '#ff5d18' },
				{ name: '600', token: 'primary-600', value: '#e85516' },
				{ name: '700', token: 'primary-700', value: '#b54211' },
				{ name: '800', token: 'primary-800', value: '#8c330d' },
				{ name: '900', token: 'primary-900', value: '#6b270a' }
			]
		},
		{
			title: 'Gray',
			swatches: [
				{ name: '1', token: 'gray-1', value: '#fcfcfc' },
				{ name: '2', token: 'gray-2', value: '#f9f9f9' },
				{ name: '3', token: 'gray-3', value: '#f0f0f0' },
				{ name: '4', token: 'gray-4', value: '#e8e8e8' },
				{ name: '5', token: 'gray-5', value: '#e0e0e0' },
				{ name: '6', token: 'gray-6', value: '#d9d9d9' },
				{ name: '7', token: 'gray-7', value: '#cecece' },
				{ name: '8', token: 'gray-8', value: '#bbbbbb' },
				{ name: '9', token: 'gray-9', value: '#8d8d8d' },
				{ name: '10', token: 'gray-10', value: '#838383' },
				{ name: '11', token: 'gray-11', value: '#646464' },
				{ name: '12', token: 'gray-12', value: '#3b3b3b' }
			]
		},
		{
			title: 'Success',
			swatches: [
				{ name: '50', token: 'success-50', value: '#e6f8e9' },
				{ name: '75', token: 'success-75', value: '#96e4a6' },
				{ name: '100', token: 'success-100', value: '#6bd981' },
				{ name: '200', token: 'success-200', value: '#2bc84b' },
				{ name: '300', token: 'success-300', value: '#00bd26' },
				{ name: '400', token: 'success-400', value: '#00841b' },
				{ name: '500', token: 'success-500', value: '#007317' }
			]
		},
		{
			title: 'Warning',
			swatches: [
				{ name: '50', token: 'warning-50', value: '#fff5d9' },
				{ name: '75', token: 'warning-75', value: '#f6e09a' },
				{ name: '100', token: 'warning-100', value: '#f3d370' },
				{ name: '200', token: 'warning-200', value: '#eec032' },
				{ name: '300', token: 'warning-300', value: '#eab308' },
				{ name: '400', token: 'warning-400', value: '#a47d06' },
				{ name: '500', token: 'warning-500', value: '#8f6d05' }
			]
		},
		{
			title: 'Error',
			swatches: [
				{ name: '50', token: 'error-50', value: '#ffe7e7' },
				{ name: '75', token: 'error-75', value: '#ffa7a7' },
				{ name: '100', token: 'error-100', value: '#ff8383' },
				{ name: '200', token: 'error-200', value: '#ff4d4d' },
				{ name: '300', token: 'error-300', value: '#ff2929' },
				{ name: '400', token: 'error-400', value: '#b31d1d' },
				{ name: '500', token: 'error-500', value: '#9c1919' }
			]
		},
		{
			title: 'Info',
			swatches: [
				{ name: '50', token: 'info-50', value: '#e7f0fe' },
				{ name: '75', token: 'info-75', value: '#9dc1fa' },
				{ name: '100', token: 'info-100', value: '#74a7f9' },
				{ name: '200', token: 'info-200', value: '#3982f6' },
				{ name: '300', token: 'info-300', value: '#1068f4' },
				{ name: '400', token: 'info-400', value: '#0b49ab' },
				{ name: '500', token: 'info-500', value: '#0a3f95' }
			]
		}
	];
</script>

<div class="bg-background min-h-screen px-8 py-10">
	<div class="mb-8">
		<h1 class="text-2xl font-semibold tracking-tight text-foreground">Colors</h1>
		<p class="mt-1.5 text-sm text-muted-foreground">
			Pack design tokens from the shared UI theme.
		</p>
	</div>

	<div class="flex flex-col gap-10">
		{#each ramps as ramp (ramp.title)}
			<section>
				<h2 class="mb-3 text-sm font-semibold tracking-wide text-foreground uppercase">
					{ramp.title}
				</h2>
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10">
					{#each ramp.swatches as swatch (swatch.token)}
						<div class="flex flex-col gap-2">
							<div
								class="border-border h-16 w-full rounded-md border shadow-xs"
								style="background-color: {swatch.value}"
							></div>
							<div class="min-w-0">
								<div class="text-[12.5px] font-medium text-foreground">{swatch.name}</div>
								<div class="truncate text-[11px] text-muted-foreground">{swatch.token}</div>
								<div class="font-mono text-[11px] text-muted-foreground uppercase">
									{swatch.value}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>
