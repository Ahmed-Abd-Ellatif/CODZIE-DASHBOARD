import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
  inject,
  effect,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Arabic } from 'flatpickr/dist/l10n/ar';
import { Instance } from 'flatpickr/dist/types/instance';
import { Translation } from '../../../core/services/translation';

@Directive({
  selector: '[appDatepicker]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerDirective),
      multi: true,
    },
  ],
})
export class DatepickerDirective implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() minDate?: string | Date;
  @Input() maxDate?: string | Date;
  @Input() defaultDate?: string | Date;
  @Input() mode: 'single' | 'range' | 'multiple' = 'single';
  @Output() dateChange = new EventEmitter<string>();
  @Output() rangeChange = new EventEmitter<{ from: string; to: string }>();

  private el = inject(ElementRef);
  private translationService = inject(Translation);
  private picker!: Instance;
  private scrollListener = () => this.picker?.isOpen && this.picker.close();

  // ControlValueAccessor callbacks
  private onChange: (val: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      const lang = this.translationService.currentLang();
      if (this.picker) {
        this.picker.set('locale', lang === 'ar' ? Arabic : 'en');
      }
    });
  }

  // ── ControlValueAccessor ──────────────────────
  writeValue(val: any): void {
    if (!this.picker) return;
    if (val) {
      this.picker.setDate(val);
    } else {
      this.picker.clear();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    (this.el.nativeElement as HTMLInputElement).disabled = isDisabled;
  }
  // ─────────────────────────────────────────────

  ngOnInit(): void {
    const lang = this.translationService.currentLang();

    this.picker = flatpickr(this.el.nativeElement, {
      locale: lang === 'ar' ? Arabic : 'en',
      dateFormat: 'Y-m-d',
      mode: this.mode,
      minDate: this.minDate,
      maxDate: this.maxDate,
      defaultDate: this.defaultDate,
      allowInput: true,
      disableMobile: true,
      onOpen: () => this.repositionCalendar(),
      onClose: () => this.onTouched(),
      onChange: (selectedDates, dateStr) => {
        this.dateChange.emit(dateStr);

        if (this.mode === 'range') {
          if (selectedDates.length === 2) {
            const fmt = (d: Date) => d.toISOString().split('T')[0];
            const range = { from: fmt(selectedDates[0]), to: fmt(selectedDates[1]) };
            this.rangeChange.emit(range);
            this.onChange(range);
          } else {
            this.onChange(null);
          }
        } else {
          this.onChange(dateStr || null);
        }
      },
    }) as Instance;

    window.addEventListener('scroll', this.scrollListener, true);
  }

  private repositionCalendar(): void {
    const rect = (this.el.nativeElement as HTMLElement).getBoundingClientRect();
    const cal = this.picker.calendarContainer;
    cal.style.position = 'fixed';
    cal.style.top = `${rect.bottom + 4}px`;
    if (document.documentElement.dir === 'rtl') {
      cal.style.right = `${window.innerWidth - rect.right}px`;
      cal.style.left = 'auto';
    } else {
      cal.style.left = `${rect.left}px`;
      cal.style.right = 'auto';
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollListener, true);
    if (this.picker) {
      this.picker.destroy();
    }
  }
}
