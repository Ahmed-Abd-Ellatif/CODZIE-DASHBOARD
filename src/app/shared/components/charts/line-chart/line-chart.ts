import { Component, Input, OnChanges, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

export interface LinePoint {
  label: string;
  value: number;
}

export interface LineTooltip {
  x: number;
  y: number;
  label: string;
  value: number;
}

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChart implements OnChanges {
  @Input() data: LinePoint[] = [];
  @Input() title = 'New Users';
  @Input() color = '#6366f1';

  readonly svgWidth = 600;
  readonly svgHeight = 220;
  readonly paddingLeft = 44;
  readonly paddingRight = 20;
  readonly paddingTop = 16;
  readonly paddingBottom = 40;

  tooltip = signal<LineTooltip | null>(null);

  get chartW() {
    return this.svgWidth - this.paddingLeft - this.paddingRight;
  }
  get chartH() {
    return this.svgHeight - this.paddingTop - this.paddingBottom;
  }

  get maxVal() {
    return Math.max(...this.data.map((d) => d.value), 1);
  }

  get yTicks(): number[] {
    const count = 4;
    const step = Math.ceil(this.maxVal / count / 10) * 10 || 1;
    return Array.from({ length: count + 1 }, (_, i) => i * step).reverse();
  }

  pointX(i: number) {
    return this.paddingLeft + (i / (this.data.length - 1)) * this.chartW;
  }
  pointY(value: number) {
    const yMax = this.yTicks[0];
    return this.paddingTop + this.chartH - (value / yMax) * this.chartH;
  }

  get polyline(): string {
    return this.data.map((d, i) => `${this.pointX(i)},${this.pointY(d.value)}`).join(' ');
  }

  get areaPath(): string {
    if (!this.data.length) return '';
    const baseline = this.paddingTop + this.chartH;
    const pts = this.data.map((d, i) => `${this.pointX(i)},${this.pointY(d.value)}`).join(' L ');
    return `M ${this.pointX(0)},${baseline} L ${pts} L ${this.pointX(this.data.length - 1)},${baseline} Z`;
  }

  yTickY(tick: number) {
    const yMax = this.yTicks[0];
    return this.paddingTop + this.chartH - (tick / yMax) * this.chartH;
  }

  showTooltip(i: number, item: LinePoint) {
    this.tooltip.set({
      x: this.pointX(i),
      y: this.pointY(item.value),
      label: item.label,
      value: item.value,
    });
  }

  hideTooltip() {
    this.tooltip.set(null);
  }

  tooltipX(x: number) {
    const w = 80;
    return Math.min(Math.max(x - w / 2, this.paddingLeft), this.svgWidth - this.paddingRight - w);
  }

  gradientId = 'lineGrad' + Math.random().toString(36).slice(2, 7);

  ngOnChanges() {}
}
