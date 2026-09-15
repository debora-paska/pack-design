<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import SkillList from './skill-list.svelte';
	import type { SkillListRow } from '../types';

	const rows: SkillListRow[] = [
		{
			id: 'stakeholder-management',
			name: 'Stakeholder management',
			description: 'Hold alignment across business partners and leadership.',
			status: 'growing',
			owner: 'human',
			urgency: 'high',
			trajectory: 0.18
		},
		{
			id: 'workforce-planning',
			name: 'Workforce planning',
			description: 'Match headcount plans to role demand over the horizon.',
			status: 'stable',
			owner: 'hybrid',
			urgency: 'med',
			trajectory: 0.06
		},
		{
			id: 'policy-drafting',
			name: 'Policy drafting',
			description: 'Produce first-pass policy language from source materials.',
			status: 'new',
			owner: 'ai',
			urgency: 'low',
			trajectory: -0.09
		}
	];

	const { Story } = defineMeta({
		title: 'custom/Organisms/SkillList',
		component: SkillList,
		tags: ['autodocs'],
		args: {
			rows,
			onOpen: fn()
		}
	});
</script>

<Story name="Default" />
