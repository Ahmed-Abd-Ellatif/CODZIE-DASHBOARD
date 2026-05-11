import { Component, Input, OnChanges, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

export interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

export interface DonutTooltip {
  label: string;
  value: number;
  pct: number;
  color: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonutChart implements OnChanges {
  @Input() data: DonutSlice[] = [];
  @Input() title = 'User Roles';

  readonly cx = 130;
  readonly cy = 130;
  readonly r = 100;
  readonly innerR = 60;
  readonly size = 260;

  slices: Array<
    DonutSlice & { dasharray: string; dashoffset: number; rotation: number; midAngle: number }
  > = [];
  tooltip = signal<DonutTooltip | null>(null);

  get total() {
    return this.data.reduce((s, d) => s + d.value, 0);
  }

  ngOnChanges() {
    this.buildSlices();
  }

  private buildSlices() {
    const circumference = 2 * Math.PI * this.r;
    let rotation = -90;
    this.slices = this.data.map((d) => {
      const pct = this.total ? d.value / this.total : 0;
      const dash = pct * circumference;
      const midAngle = rotation + (pct * 360) / 2;
      const slice = {
        ...d,
        dasharray: `${dash} ${circumference - dash}`,
        dashoffset: 0,
        rotation,
        midAngle,
      };
      rotation += pct * 360;
      return slice;
    });
  }

  percent(value: number) {
    return this.total ? Math.round((value / this.total) * 100) : 0;
  }

  showSliceTooltip(slice: (typeof this.slices)[0]) {
    const rad = (slice.midAngle * Math.PI) / 180;
    const dist = (this.r + this.innerR) / 2;
    const x = this.cx + dist * Math.cos(rad);
    const y = this.cy + dist * Math.sin(rad);
    this.tooltip.set({
      label: slice.label,
      value: slice.value,
      pct: this.percent(slice.value),
      color: slice.color,
      x,
      y,
    });
  }

  hideTooltip() {
    this.tooltip.set(null);
  }

  tooltipX(x: number) {
    const w = 100;
    return Math.min(Math.max(x - w / 2, 2), this.size - w - 2);
  }
  tooltipY(y: number) {
    return Math.max(y - 38, 2);
  }
}
