import type { Preview } from '@storybook/svelte-vite';

import '../src/styles/theme.css';

const preview: Preview = {
	parameters: {
		backgrounds: {
			default: 'canvas',
			values: [
				{ name: 'canvas', value: '#F9F9F9' },
				{ name: 'white', value: '#FFFFFF' }
			]
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		options: {
			storySort: {
				order: [
					'*',
					'custom',
					[
						'*',
						'Atomic',
						[
							'Chip',
							'ChipGroup',
							'InternalTab',
							'InternalTabs',
							'UniversalChip',
							'UniversalTab',
							'UniversalTabs'
						],
						'Assessment',
						['WizardStep', 'AssessmentTypeOption', 'ImportedSkillsPanel', 'AriaNotice']
					]
				]
			}
		}
	}
};

export default preview;
