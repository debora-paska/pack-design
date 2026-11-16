/**
 * Arrow keys inside a tab list or a radio group (WCAG 2.1.1; W3C ARIA Authoring Practices, Tabs
 * and Radio group; designer handover v1.2, keyboard-tabs-radio). Put it on the element with
 * `role="tablist"` or `role="radiogroup"`: `onkeydown={handleRovingKeydown}`.
 *
 * - The arrows move to the next or previous enabled item, wrapping at both ends, and select it
 *   (it is clicked): tabs activate on focus, as Pack's panels show at once; a radio is checked.
 * - A tab list follows its `aria-orientation` (left/right, or up/down when vertical) and takes
 *   Home / End; a radio group takes every arrow, and no Home / End.
 *
 * The items keep their own roving `tabindex`: `0` on the selected one, `-1` on the others.
 */
export function handleRovingKeydown(event: KeyboardEvent): void {
	const container = event.currentTarget;
	if (!(container instanceof HTMLElement)) return;

	const role = container.getAttribute('role');
	const isTablist = role === 'tablist';
	const itemRole = isTablist ? 'tab' : 'radio';
	const items = [...container.querySelectorAll<HTMLElement>(`[role="${itemRole}"]`)].filter(
		(item) =>
			item.closest('[role="tablist"], [role="radiogroup"]') === container &&
			!item.hasAttribute('disabled') &&
			item.getAttribute('aria-disabled') !== 'true'
	);
	const current = items.findIndex((item) => item === document.activeElement);
	if (current === -1) return;

	const target = targetIndex(event.key, current, items.length, {
		isTablist,
		isVertical: container.getAttribute('aria-orientation') === 'vertical'
	});
	if (target === undefined) return;

	event.preventDefault();
	const next = items[target];
	next?.focus();
	next?.click();
}

function targetIndex(
	key: string,
	current: number,
	count: number,
	{ isTablist, isVertical }: { isTablist: boolean; isVertical: boolean }
): number | undefined {
	const nextKeys = !isTablist
		? ['ArrowRight', 'ArrowDown']
		: isVertical
			? ['ArrowDown']
			: ['ArrowRight'];
	const previousKeys = !isTablist
		? ['ArrowLeft', 'ArrowUp']
		: isVertical
			? ['ArrowUp']
			: ['ArrowLeft'];

	if (nextKeys.includes(key)) return (current + 1) % count;
	if (previousKeys.includes(key)) return (current - 1 + count) % count;
	if (isTablist && key === 'Home') return 0;
	if (isTablist && key === 'End') return count - 1;
	return undefined;
}
