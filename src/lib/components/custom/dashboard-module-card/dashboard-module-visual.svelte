<script lang="ts">
	export type DashboardModuleVisual = 'radar' | 'bars' | 'steps';

	let { visual }: { visual: DashboardModuleVisual } = $props();
</script>

{#if visual === 'radar'}
	<svg
		width="320"
		height="320"
		viewBox="0 0 220 220"
		class="pointer-events-none absolute top-1/2 right-[-84px] -translate-y-1/2 opacity-30"
		aria-hidden="true"
	>
		<polygon
			points="110.0,30.0 181.0,71.0 181.0,153.0 110.0,194.0 39.0,153.0 39.0,71.0"
			fill="none"
			stroke="var(--border)"
			stroke-width="1.2"
		/>
		<polygon
			points="110.0,57.9 156.9,84.9 156.9,139.1 110.0,166.1 63.1,139.1 63.1,84.9"
			fill="none"
			stroke="var(--border)"
			stroke-width="1"
		/>
		<polygon
			points="110.0,84.9 133.4,98.5 133.4,125.5 110.0,139.1 86.6,125.5 86.6,98.5"
			fill="none"
			stroke="var(--border)"
			stroke-width="1"
		/>
		<line x1="110" y1="112" x2="110.0" y2="30.0" stroke="var(--border)" stroke-width="1.2" />
		<line x1="110" y1="112" x2="181.0" y2="71.0" stroke="var(--border)" stroke-width="1.2" />
		<line x1="110" y1="112" x2="181.0" y2="153.0" stroke="var(--border)" stroke-width="1.2" />
		<line x1="110" y1="112" x2="110.0" y2="194.0" stroke="var(--border)" stroke-width="1.2" />
		<line x1="110" y1="112" x2="39.0" y2="153.0" stroke="var(--border)" stroke-width="1.2" />
		<line x1="110" y1="112" x2="39.0" y2="71.0" stroke="var(--border)" stroke-width="1.2" />
		<polygon
			points="110.0,32.0 178.0,72.0 175.0,150.0 105.0,192.0 45.0,150.0 52.0,74.0"
			fill="none"
			stroke="var(--gray-8)"
			stroke-width="1.6"
			stroke-dasharray="4 4"
			stroke-linejoin="round"
		/>
		<circle cx="110.0" cy="32.0" r="3.5" fill="var(--gray-8)" />
		<circle cx="178.0" cy="72.0" r="3.5" fill="var(--gray-8)" />
		<circle cx="175.0" cy="150.0" r="3.5" fill="var(--gray-8)" />
		<circle cx="105.0" cy="192.0" r="3.5" fill="var(--gray-8)" />
		<circle cx="45.0" cy="150.0" r="3.5" fill="var(--gray-8)" />
		<circle cx="52.0" cy="74.0" r="3.5" fill="var(--gray-8)" />
		<polygon
			points="110.0,41.5 154.0,86.6 161.1,141.5 110.0,185.8 68.8,135.8 60.3,83.3"
			fill="var(--primary-500)"
			fill-opacity="0.3"
			stroke="var(--primary-500)"
			stroke-width="2.5"
			stroke-linejoin="round"
		/>
		<circle cx="110.0" cy="41.5" r="3.5" fill="var(--primary-500)" />
		<circle cx="154.0" cy="86.6" r="3.5" fill="var(--primary-500)" />
		<circle cx="161.1" cy="141.5" r="3.5" fill="var(--primary-500)" />
		<circle cx="110.0" cy="185.8" r="3.5" fill="var(--primary-500)" />
		<circle cx="68.8" cy="135.8" r="3.5" fill="var(--primary-500)" />
		<circle cx="60.3" cy="83.3" r="3.5" fill="var(--primary-500)" />
	</svg>
{:else if visual === 'bars'}
	<svg
		width="300"
		height="300"
		viewBox="0 0 220 220"
		class="pointer-events-none absolute top-1/2 right-[-40px] -translate-y-1/2 opacity-30"
		aria-hidden="true"
	>
		<path
			d="M42,42 L34,42 L34,94 L42,94"
			fill="none"
			stroke="var(--primary-500)"
			stroke-width="1.6"
		/>
		<line x1="55" y1="48" x2="150" y2="48" stroke="var(--primary-500)" stroke-width="2" />
		<circle cx="155" cy="48" r="3" fill="var(--primary-500)" />
		<line x1="55" y1="62" x2="140" y2="62" stroke="var(--primary-500)" stroke-width="2" />
		<circle cx="145" cy="62" r="3" fill="var(--primary-500)" />
		<line x1="55" y1="76" x2="130" y2="76" stroke="var(--primary-500)" stroke-width="2" />
		<circle cx="135" cy="76" r="3" fill="var(--primary-500)" />
		<line x1="55" y1="90" x2="145" y2="90" stroke="var(--primary-500)" stroke-width="2" />
		<circle cx="150" cy="90" r="3" fill="var(--primary-500)" />
		<path
			d="M42,105 L34,105 L34,142 L42,142"
			fill="none"
			stroke="var(--gray-8)"
			stroke-width="1.6"
		/>
		<line x1="55" y1="112" x2="135" y2="112" stroke="var(--border)" stroke-width="1.5" />
		<circle cx="140" cy="112" r="3" fill="var(--card)" stroke="var(--gray-8)" stroke-width="1.2" />
		<line x1="55" y1="126" x2="120" y2="126" stroke="var(--border)" stroke-width="1.5" />
		<circle cx="125" cy="126" r="3" fill="var(--card)" stroke="var(--gray-8)" stroke-width="1.2" />
		<line x1="55" y1="140" x2="145" y2="140" stroke="var(--border)" stroke-width="1.5" />
		<circle cx="150" cy="140" r="3" fill="var(--card)" stroke="var(--gray-8)" stroke-width="1.2" />
		<path
			d="M42,153 L34,153 L34,178 L42,178"
			fill="none"
			stroke="var(--gray-8)"
			stroke-width="1.6"
		/>
		<line x1="55" y1="160" x2="125" y2="160" stroke="var(--border)" stroke-width="1.5" />
		<circle cx="130" cy="160" r="3" fill="var(--card)" stroke="var(--gray-8)" stroke-width="1.2" />
		<line x1="55" y1="174" x2="140" y2="174" stroke="var(--border)" stroke-width="1.5" />
		<circle cx="145" cy="174" r="3" fill="var(--card)" stroke="var(--gray-8)" stroke-width="1.2" />
	</svg>
{:else}
	<svg
		width="300"
		height="300"
		viewBox="0 0 220 220"
		class="pointer-events-none absolute top-1/2 right-[-64px] -translate-y-1/2 opacity-30"
		aria-hidden="true"
	>
		<path
			d="M55,165 A22,22 0 1 1 74,146"
			fill="none"
			stroke="var(--border)"
			stroke-width="1.5"
			stroke-dasharray="2 3"
		/>
		<polyline
			points="55,165 55,145 85,145 85,120 115,120 115,95 145,95 145,70 170,70"
			fill="none"
			stroke="var(--primary-500)"
			stroke-width="2"
			stroke-linejoin="round"
		/>
		<circle cx="55" cy="165" r="5" fill="var(--primary-500)" />
		<circle cx="85" cy="145" r="5" fill="var(--primary-500)" />
		<circle cx="115" cy="120" r="5" fill="var(--primary-500)" />
		<circle cx="145" cy="95" r="5" fill="var(--primary-500)" />
		<circle
			cx="170"
			cy="70"
			r="6"
			fill="var(--primary-50)"
			stroke="var(--primary-500)"
			stroke-width="2"
		/>
	</svg>
{/if}
