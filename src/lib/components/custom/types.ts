export type SkillStatus = 'growing' | 'stable' | 'embedded' | 'new' | 'declining';

export type SkillOwner = 'human' | 'hybrid' | 'ai' | 'robot';

export type SkillUrgency = 'high' | 'med' | 'low';

export type SkillRadarAxis = {
	key: string;
	label: string;
	sub?: string;
};

export type SkillRadarSeries = {
	name: string;
	color: string;
	values: Record<string, number>;
	fillOpacity?: number;
	strokeWidth?: number;
	dashed?: boolean;
};

export type SkillListRow = {
	id: string;
	name: string;
	description?: string;
	status: SkillStatus;
	owner: SkillOwner;
	urgency: SkillUrgency;
	trajectory: number;
};

export type InteractionPreview = 'default' | 'hover' | 'active' | 'disabled';

export type OverviewStatVariant = 'coverage' | 'families' | 'skills' | 'reports';

export type CoverageBarColor =
	| 'primary'
	| 'primary-soft'
	| 'success'
	| 'warning'
	| 'error'
	| 'info'
	| 'muted';

export type CoverageBar = {
	label: string;
	count: string;
	widthPercent: number;
	color?: CoverageBarColor;
};

export type UniversalChipColor =
	| 'gray'
	| 'primary'
	| 'orange'
	| 'success'
	| 'warning'
	| 'error'
	| 'info';

export type MappingCardType = 'family' | 'single' | 'tasks';

export type MappingCardStatus = 'done' | 'queued' | 'failed';

export type InternalTabItem = {
	id: string;
	label: string;
	isDisabled?: boolean;
	hint?: string;
};

export type UniversalTabItem = {
	id: string;
	label: string;
	count?: string;
	isDisabled?: boolean;
};

export type SidebarNavVariant = 'leaf' | 'group' | 'nested';

export type SidebarModuleIcon =
	| 'dashboard'
	| 'skill-mapping'
	| 'assessment'
	| 'learning-and-development'
	| 'general';

export type SidebarLanguage = 'en' | 'it';

export type KeyValueRow = {
	key: string;
	value: string;
};

export type SkillConfidence = 'high' | 'medium';

export type WizardStepState = 'idle' | 'active' | 'done';

export type ChipGroupOption = {
	value: string;
	label: string;
};

export type AssessmentTypeChoice = {
	value: string;
	title: string;
	description: string;
};

export type ImportedSkillItem = {
	name: string;
	status: SkillStatus;
};
