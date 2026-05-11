export interface BadgeConfig {
  /** CSS class(es) controlling badge color — use tbl-badge--success / warning / danger / neutral / info or any custom class */
  colorClass: string;
  label: string;
  /** Optional click handler — receives the full row */
  onClick?: (row: any) => void;
}

export interface TableColumn {
  key: string;
  label: string;
  /** Enable sort arrows on this column */
  sortable?: boolean;
  type?: 'text' | 'date' | 'currency' | 'badge' | 'number';
  /** Locale-aware date format (currently used as a hint; Intl.DateTimeFormat is used internally) */
  dateFormat?: string;
  /** ISO 4217 currency code, default 'USD' */
  currencyCode?: string;
  /** Required when type === 'badge' */
  badgeConfig?: (value: any, row?: any) => BadgeConfig;
  /** Fixed column width e.g. '120px' */
  width?: string;
  /** Text alignment for this column */
  align?: 'start' | 'center' | 'end';
}

export interface TableAction {
  label: string;
  /**
   * Icon for this action. Two formats accepted:
   * - Image path:  "assets/icons/edit.svg"  (any URL/path containing '/' or ending in an image extension)
   * - SVG path data: "M3 17.25V21h3.75..."  (raw <path d="..."> data, viewBox 0 0 24 24)
   */
  icon?: string;
  callback: (row: any) => void;
  /** Static boolean OR per-row predicate to show/hide this action */
  show?: boolean | ((row: any) => boolean);
  /** Renders action in red (danger style) */
  danger?: boolean;
  /** Disables the action — static boolean OR per-row predicate */
  disabled?: boolean | ((row: any) => boolean);
}

export interface HeaderButton {
  label: string;
  /**
   * Icon for this button. Two formats accepted:
   * - Image path:  "assets/icons/add.svg"
   * - SVG path data: "M19 13h-6v6h-2v-6H5..."
   */
  icon?: string;
  /** Extra CSS class appended to .table-topbar-btn — use tbl-primary / tbl-success / tbl-danger / tbl-neutral */
  colorClass: string;
  action: () => void;
  /** Set false to hide the button */
  show?: boolean;
}

export interface TableConfig {
  /** Page size options shown in the selector */
  pageSizeOptions?: number[];
  /** Default page size */
  defaultPageSize?: number;
  /** Message shown when data is empty */
  emptyMessage?: string;
}
