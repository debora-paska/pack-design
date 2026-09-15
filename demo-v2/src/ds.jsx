// Bridge to the bundled shadcn design-system components on window.KigenDesignSystem_093b66.
const Ds = window.KigenDesignSystem_093b66 || {};

function DsButton({ variant = 'primary', size = 'default', ...rest }) {
  return <Ds.Button variant={variant} size={size} {...rest} />;
}

function DsCard(props) {
  return <Ds.Card {...props} />;
}

function DsBadge({ variant = 'outline', ...rest }) {
  return <Ds.Badge variant={variant} {...rest} />;
}

function DsInput({ onInput, onChange, ...rest }) {
  return (
    <Ds.Input
      onChange={(event) => {
        onChange?.(event);
        onInput?.(event);
      }}
      {...rest}
    />
  );
}

function DsAvatar({ initials, fallback, size = 36, ...rest }) {
  return <Ds.Avatar fallback={fallback || initials} size={Number(size) || 36} {...rest} />;
}

function DsProgress({ value = 0, style }) {
  const n = typeof value === 'string' ? parseFloat(value) : Number(value);
  return <Ds.Progress value={Number.isFinite(n) ? n : 0} style={style} />;
}

function DsSeparator(props) {
  return <Ds.Separator {...props} />;
}

function DsCheckbox(props) {
  return <Ds.Checkbox {...props} />;
}

function DsSwitch(props) {
  return <Ds.Switch {...props} />;
}

function DsSelect(props) {
  return <Ds.Select {...props} />;
}

function DsDialog(props) {
  return <Ds.Dialog {...props} />;
}

function DsDropdownMenu(props) {
  return <Ds.DropdownMenu {...props} />;
}

function DsTooltip(props) {
  return <Ds.Tooltip {...props} />;
}

function DsPagination(props) {
  return <Ds.Pagination {...props} />;
}

function DsBreadcrumb({ items, crumbs }) {
  const list = items || (crumbs || []).map((label) => ({ label }));
  return <Ds.Breadcrumb items={list} />;
}

function DsKbd({ children, keys }) {
  return <Ds.Kbd keys={keys || children} />;
}

function DsLucideIcon(props) {
  return <Ds.LucideIcon {...props} />;
}

Object.assign(window, {
  Ds, DsButton, DsCard, DsBadge, DsInput, DsAvatar, DsProgress, DsSeparator,
  DsCheckbox, DsSwitch, DsSelect, DsDialog, DsDropdownMenu, DsTooltip,
  DsPagination, DsBreadcrumb, DsKbd, DsLucideIcon,
  CardHeader: Ds.CardHeader, CardContent: Ds.CardContent, CardFooter: Ds.CardFooter,
  Toggle: Ds.Toggle, ToggleGroup: Ds.ToggleGroup, Table: Ds.Table,
});
