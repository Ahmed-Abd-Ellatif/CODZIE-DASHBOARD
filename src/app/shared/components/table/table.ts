import { Component, computed, HostListener, input, signal } from '@angular/core';
import {
  BadgeConfig,
  HeaderButton,
  TableAction,
  TableColumn,
  TableConfig,
} from './models/table.interface';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  // ── Inputs ──────────────────────────────────────────
  tableName = input<string>('');
  data = input.required<any[]>();
  columns = input.required<TableColumn[]>();
  actions = input<TableAction[]>([]);
  headerButtons = input<HeaderButton[]>([]);
  config = input<TableConfig>({});

  // ── Reactive state ───────────────────────────────────
  sortKey = signal<string | null>(null);
  sortDir = signal<'asc' | 'desc'>('asc');
  currentPage = signal(1);
  pageSize = signal(10);
  activeRowIndex = signal<number | null>(null);
  dropdownPos = signal<{ top: number; left: number } | null>(null);

  // ── Computed ─────────────────────────────────────────
  resolvedConfig = computed<Required<TableConfig>>(() => ({
    pageSizeOptions: [5, 10, 25, 50],
    defaultPageSize: 10,
    emptyMessage: 'No data available',
    ...this.config(),
  }));

  visibleHeaderButtons = computed(() => this.headerButtons().filter((b) => b.show !== false));

  sortedData = computed(() => {
    const key = this.sortKey();
    const dir = this.sortDir();
    const arr = [...this.data()];
    if (!key) return arr;

    return arr.sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av == null) return 1;
      if (bv == null) return -1;

      let cmp = 0;
      if (av instanceof Date || (typeof av === 'string' && !isNaN(Date.parse(av)))) {
        cmp = new Date(av).getTime() - new Date(bv).getTime();
      } else {
        cmp = av < bv ? -1 : av > bv ? 1 : 0;
      }
      return dir === 'asc' ? cmp : -cmp;
    });
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.sortedData().length / this.pageSize())));

  pagedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.sortedData().slice(start, start + this.pageSize());
  });

  pageNumbers = computed<(number | '...')[]>(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: (number | '...')[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push('...');
      for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
        pages.push(i);
      }
      if (current < total - 2) pages.push('...');
      pages.push(total);
    }
    return pages;
  });

  showingStart = computed(() =>
    this.sortedData().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize() + 1,
  );

  showingEnd = computed(() =>
    Math.min(this.currentPage() * this.pageSize(), this.sortedData().length),
  );

  // ── Sort ─────────────────────────────────────────────
  toggleSort(key: string) {
    if (this.sortKey() === key) {
      this.sortDir.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortKey.set(key);
      this.sortDir.set('asc');
    }
    this.currentPage.set(1);
  }

  // ── Pagination ───────────────────────────────────────
  goToPage(page: number | '...') {
    if (typeof page === 'number') {
      this.currentPage.set(Math.max(1, Math.min(page, this.totalPages())));
    }
  }

  setPageSize(event: Event) {
    this.pageSize.set(+(event.target as HTMLSelectElement).value);
    this.currentPage.set(1);
  }

  // ── Actions dropdown ─────────────────────────────────
  /** Bound reference so we can remove the exact same listener later */
  private readonly _scrollClose = () => this.closeDropdown();

  toggleDropdown(index: number, event: MouseEvent) {
    event.stopPropagation();
    if (this.activeRowIndex() === index) {
      this.closeDropdown();
    } else {
      const btn = event.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();

      const menuWidth = 200;
      const gap = 6;

      // Position beside the button: prefer left side, fallback to right
      const spaceOnLeft = rect.left - gap;
      const left =
        spaceOnLeft >= menuWidth
          ? rect.left - menuWidth - gap
          : rect.right + gap;

      // Align top with button; clamp so menu doesn't overflow viewport bottom
      const estimatedMenuHeight = 240;
      const top = Math.min(rect.top, window.innerHeight - estimatedMenuHeight - 8);

      this.activeRowIndex.set(index);
      this.dropdownPos.set({ top, left });
      // capture:true → catches scroll from ANY container (overflow divs, not just window)
      document.addEventListener('scroll', this._scrollClose, true);
    }
  }

  closeDropdown() {
    this.activeRowIndex.set(null);
    this.dropdownPos.set(null);
    document.removeEventListener('scroll', this._scrollClose, true);
  }

  isActionDisabled(action: TableAction, row: any): boolean {
    if (action.disabled === undefined) return false;
    if (typeof action.disabled === 'function') return action.disabled(row);
    return action.disabled;
  }

  /** Returns true if the icon string is a URL/path (image), false if it's raw SVG path data */
  isIconUrl(icon: string): boolean {
    return (
      icon.startsWith('/') ||
      icon.startsWith('./') ||
      icon.startsWith('../') ||
      icon.startsWith('http') ||
      icon.startsWith('assets') ||
      /\.(svg|png|jpg|jpeg|webp|gif)(\?|$)/i.test(icon)
    );
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.closeDropdown();
  }

  visibleActions(row: any): TableAction[] {
    return this.actions().filter((a) => {
      if (typeof a.show === 'function') return a.show(row);
      if (typeof a.show === 'boolean') return a.show;
      return true;
    });
  }

  // ── Badge ─────────────────────────────────────────────
  getBadgeConfig(col: TableColumn, row: any): BadgeConfig {
    return col.badgeConfig!(row[col.key], row);
  }

  // ── Formatters ────────────────────────────────────────
  formatDate(value: any): string {
    if (value == null || value === '') return '—';
    try {
      const d = value instanceof Date ? value : new Date(value);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(d);
    } catch {
      return String(value);
    }
  }

  formatCurrency(value: any, currencyCode = 'USD'): string {
    if (value == null) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(Number(value));
  }

  formatNumber(value: any): string {
    if (value == null) return '—';
    return new Intl.NumberFormat('en-US').format(Number(value));
  }
}
