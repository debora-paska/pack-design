<script lang="ts">
	export type DashboardFeatureVisual = 'pack-ai' | 'succession' | 'impackt';

	let { visual }: { visual: DashboardFeatureVisual } = $props();
</script>

{#if visual === 'pack-ai'}
	<svg width="108" height="108" viewBox="0 0 220 220" aria-hidden="true">
		<circle
			cx="110"
			cy="118"
			r="100.4"
			fill="none"
			stroke="var(--border)"
			stroke-width="1"
			stroke-dasharray="1 5"
		/>
		<circle
			cx="110"
			cy="118"
			r="80.4"
			fill="none"
			stroke="var(--gray-8)"
			stroke-width="1"
			stroke-dasharray="2 5"
		/>
		<circle
			cx="110"
			cy="118"
			r="60.4"
			fill="none"
			stroke="var(--primary-300)"
			stroke-width="1.3"
			stroke-dasharray="3 5"
			stroke-linecap="round"
		/>
		<line x1="110" y1="91" x2="110" y2="70" stroke="var(--primary-500)" stroke-width="1.8" />
		<circle cx="110" cy="67" r="4" fill="var(--primary-500)" />
		<rect x="80" y="91" width="60" height="54" rx="14" fill="var(--primary-500)" />
		<circle cx="95" cy="110" r="3" fill="#fff" />
		<circle cx="125" cy="110" r="3" fill="#fff" />
		<path
			d="M100,120 Q110,132 120,120"
			fill="none"
			stroke="#fff"
			stroke-width="2.5"
			stroke-linecap="round"
		/>
	</svg>
{:else if visual === 'succession'}
	<svg width="108" height="108" viewBox="0 0 220 220" aria-hidden="true">
		<line x1="110" y1="52" x2="70" y2="96" stroke="var(--gray-8)" stroke-width="2" />
		<line x1="110" y1="52" x2="150" y2="96" stroke="var(--gray-8)" stroke-width="2" />
		<line x1="70" y1="120" x2="70" y2="150" stroke="var(--gray-8)" stroke-width="2" />
		<line
			x1="150"
			y1="120"
			x2="150"
			y2="150"
			stroke="var(--primary-500)"
			stroke-width="2"
			stroke-dasharray="4 4"
		/>
		<rect
			x="88"
			y="34"
			width="44"
			height="34"
			rx="8"
			fill="var(--border)"
			stroke="var(--gray-8)"
			stroke-width="2"
		/>
		<circle cx="110" cy="47" r="6" fill="#fff" />
		<path d="M100,58 a10,10 0 0 1 20,0 z" fill="#fff" />
		<rect
			x="48"
			y="96"
			width="44"
			height="34"
			rx="8"
			fill="var(--border)"
			stroke="var(--gray-8)"
			stroke-width="2"
		/>
		<circle cx="70" cy="109" r="6" fill="#fff" />
		<path d="M60,120 a10,10 0 0 1 20,0 z" fill="#fff" />
		<rect
			x="128"
			y="96"
			width="44"
			height="34"
			rx="8"
			fill="var(--border)"
			stroke="var(--gray-8)"
			stroke-width="2"
		/>
		<circle cx="150" cy="109" r="6" fill="#fff" />
		<path d="M140,120 a10,10 0 0 1 20,0 z" fill="#fff" />
		<rect
			x="128"
			y="152"
			width="44"
			height="34"
			rx="8"
			fill="var(--primary-100)"
			stroke="var(--primary-500)"
			stroke-width="2"
			stroke-dasharray="4 4"
		/>
		<path
			d="M150 160 v18 M141 169 h18"
			stroke="var(--primary-500)"
			stroke-width="2.6"
			stroke-linecap="round"
		/>
	</svg>
{:else}
	<svg width="108" height="108" viewBox="0 0 220 220" aria-hidden="true">
		<defs>
			<marker
				id="dashboard-feature-impackt-arrow"
				markerWidth="7"
				markerHeight="7"
				refX="5"
				refY="2.5"
				orient="auto"
			>
				<path d="M0,0 L5,2.5 L0,5" fill="none" stroke="var(--gray-8)" stroke-width="1.2" />
			</marker>
		</defs>
		<line
			x1="110"
			y1="45"
			x2="110"
			y2="82"
			stroke="var(--gray-8)"
			stroke-width="1"
			marker-end="url(#dashboard-feature-impackt-arrow)"
		/>
		<line
			x1="168"
			y1="80"
			x2="132"
			y2="98"
			stroke="var(--gray-8)"
			stroke-width="1"
			marker-end="url(#dashboard-feature-impackt-arrow)"
		/>
		<line
			x1="168"
			y1="150"
			x2="132"
			y2="128"
			stroke="var(--gray-8)"
			stroke-width="1"
			marker-end="url(#dashboard-feature-impackt-arrow)"
		/>
		<line
			x1="110"
			y1="180"
			x2="110"
			y2="140"
			stroke="var(--gray-8)"
			stroke-width="1"
			marker-end="url(#dashboard-feature-impackt-arrow)"
		/>
		<line
			x1="52"
			y1="150"
			x2="90"
			y2="128"
			stroke="var(--gray-8)"
			stroke-width="1"
			marker-end="url(#dashboard-feature-impackt-arrow)"
		/>
		<line
			x1="52"
			y1="80"
			x2="90"
			y2="98"
			stroke="var(--gray-8)"
			stroke-width="1"
			marker-end="url(#dashboard-feature-impackt-arrow)"
		/>
		<circle cx="110" cy="45" r="5" fill="#fff" stroke="var(--gray-8)" stroke-width="1.5" />
		<circle cx="168" cy="80" r="5" fill="#fff" stroke="var(--gray-8)" stroke-width="1.5" />
		<circle cx="168" cy="150" r="5" fill="#fff" stroke="var(--gray-8)" stroke-width="1.5" />
		<circle cx="110" cy="180" r="5" fill="#fff" stroke="var(--gray-8)" stroke-width="1.5" />
		<circle cx="52" cy="150" r="5" fill="#fff" stroke="var(--gray-8)" stroke-width="1.5" />
		<circle cx="52" cy="80" r="5" fill="#fff" stroke="var(--gray-8)" stroke-width="1.5" />
		<g transform="translate(110,111)">
			<circle r="16" fill="var(--primary-100)" stroke="var(--primary-500)" stroke-width="2" />
			<rect x="-2" y="-7" width="4" height="14" fill="var(--primary-500)" />
			<rect x="7" y="-11" width="4" height="22" fill="var(--primary-500)" />
			<rect x="16" y="-4" width="4" height="8" fill="var(--primary-500)" />
			<rect x="-11" y="-4" width="4" height="8" fill="var(--primary-500)" />
		</g>
	</svg>
{/if}
