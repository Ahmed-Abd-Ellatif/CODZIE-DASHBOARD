import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

export interface BarChartData {
  label: string;
  actual: number;
  expected: number;
}

export interface BarTooltip {
  x: number;
  y: number;
  label: string;
  value: number;
  type: 'Actual' | 'Expected';
  color: string;
}

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChart implements OnInit, OnChanges {
  @Input() data: BarChartData[] = [];
  @Input() title = 'Revenue Stream';

  svgWidth = 600;
  svgHeight = 260;
  paddingLeft = 48;
  paddingRight = 20;
  paddingTop = 20;
  paddingBottom = 48;

  tooltip = signal<BarTooltip | null>(null);

  get chartWidth() {
    return this.svgWidth - this.paddingLeft - this.paddingRight;
  }
  get chartHeight() {
    return this.svgHeight - this.paddingTop - this.paddingBottom;
  }

  get maxValue() {
    return Math.max(...this.data.flatMap((d) => [d.actual, d.expected]), 1);
  }

  get yTicks(): number[] {
    const count = 5;
    const step = Math.ceil(this.maxValue / count / 100) * 100 || 1;
    return Array.from({ length: count + 1 }, (_, i) => i * step).reverse();
  }

  get groupWidth() {
    return this.chartWidth / this.data.length;
  }

  barX(groupIdx: number, barIdx: number): number {
    const gw = this.groupWidth;
    const barWidth = gw * 0.28;
    const gap = gw * 0.06;
    const totalBars = barWidth * 2 + gap;
    const startX = this.paddingLeft + groupIdx * gw + (gw - totalBars) / 2;
    return startX + barIdx * (barWidth + gap);
  }

  barWidth(): number {
    return this.groupWidth * 0.28;
  }

  barY(value: number): number {
    const yMax = this.yTicks[0];
    return this.paddingTop + this.chartHeight - (value / yMax) * this.chartHeight;
  }

  barHeight(value: number): number {
    const yMax = this.yTicks[0];
    return (value / yMax) * this.chartHeight;
  }

  labelX(groupIdx: number): number {
    return this.paddingLeft + groupIdx * this.groupWidth + this.groupWidth / 2;
  }

  yTickY(tick: number): number {
    const yMax = this.yTicks[0];
    return this.paddingTop + this.chartHeight - (tick / yMax) * this.chartHeight;
  }

  showTooltip(groupIdx: number, barIdx: number, item: BarChartData) {
    const x = this.barX(groupIdx, barIdx) + this.barWidth() / 2;
    const value = barIdx === 0 ? item.actual : item.expected;
    const y = this.barY(value) - 8;
    this.tooltip.set({
      x,
      y,
      label: item.label,
      value,
      type: barIdx === 0 ? 'Actual' : 'Expected',
      color: barIdx === 0 ? '#6366f1' : '#14b8a6',
    });
  }

  hideTooltip() {
    this.tooltip.set(null);
  }

  tooltipX(x: number) {
    const w = 90;
    return Math.min(Math.max(x - w / 2, this.paddingLeft), this.svgWidth - this.paddingRight - w);
  }

  ngOnInit() {}
  ngOnChanges() {}
}
