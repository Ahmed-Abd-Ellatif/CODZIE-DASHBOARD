import { Component, Input, OnChanges, SimpleChanges, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatepickerDirective } from '../../directives/datepicker/datepicker.directive';

// ─────────────────────────────────────────────
// Field type definitions
// ─────────────────────────────────────────────
export type FilterFieldType = 'text' | 'date' | 'select';

export interface FilterField {
  /** Unique key — used as the FormControl name and emitted in the value object */
  key: string;
  /** Type of the filter input */
  type: FilterFieldType;
  /** Placeholder text (plain string or i18n key) */
  placeholder?: string;
  /** Bootstrap column class applied to the wrapping div. Default: 'col-12 col-md-3' */
  colClass?: string;

  // ── select options ──────────────────────────
  /** Array of option objects (required when type === 'select') */
  items?: any[];
  /** Property to use as the form value. Default: 'value' */
  bindValue?: string;
  /** Property to display as the label. Default: 'label' */
  bindLabel?: string;
  /** Allow selecting multiple options. Default: false */
  multiple?: boolean;
  /** Show search box inside the dropdown. Default: false */
  searchable?: boolean;

  // ── date options ────────────────────────────
  /** Flatpickr mode. Default: 'range' */
  dateMode?: 'single' | 'range' | 'multiple';
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ReactiveFormsModule, NgSelectModule, DatepickerDirective],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter implements OnChanges {
  private _fb = inject(FormBuilder);

  /** List of fields to render */
  @Input() fields: FilterField[] = [];

  /** Optional default/initial values keyed by field.key */
  @Input() defaultValues?: Record<string, any>;

  /** Emits the form value object when the user clicks Filter */
  filterSubmit = output<Record<string, any>>();

  /** Emits when the user clicks Reset */
  filterReset = output<void>();

  form: FormGroup = this._fb.group({});

  // ──────────────────────────────────────────
  // Lifecycle
  // ──────────────────────────────────────────
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fields'] || changes['defaultValues']) {
      this.buildForm();
    }
  }

  // ──────────────────────────────────────────
  // Handlers
  // ──────────────────────────────────────────
  onSubmit(): void {
    this.filterSubmit.emit(this.form.value);
  }

  onReset(): void {
    this.form.reset();
    this.filterReset.emit();
  }

  // ──────────────────────────────────────────
  // Helpers
  // ──────────────────────────────────────────
  private buildForm(): void {
    const controls: Record<string, any> = {};
    for (const field of this.fields) {
      controls[field.key] = [this.defaultValues?.[field.key] ?? ''];
    }
    this.form = this._fb.group(controls);
  }
}
