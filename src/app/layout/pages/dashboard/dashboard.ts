import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { CommonModule } from '@angular/common';
import { BarChart } from '../../../shared/components/charts/bar-chart/bar-chart';
import { DonutChart } from '../../../shared/components/charts/donut-chart/donut-chart';
import { LineChart } from '../../../shared/components/charts/line-chart/line-chart';

@Component({
  selector: 'app-dashboard',
  imports: [TranslatePipe, Breadcrumb, CommonModule, BarChart, DonutChart, LineChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  donutChartData = [
    { label: 'Teachers', value: 340, color: '#6366f1' },
    { label: 'Centers', value: 160, color: '#14b8a6' },
  ];

  barChartData = [
    { label: 'Jan', actual: 1000, expected: 4000 },
    { label: 'Feb', actual: 3800, expected: 4500 },
    { label: 'Mar', actual: 5100, expected: 5000 },
    { label: 'Apr', actual: 4700, expected: 5200 },
    { label: 'May', actual: 6200, expected: 5500 },
    { label: 'Jun', actual: 5800, expected: 6000 },
  ];

  lineChartData = [
    { label: 'Jan', value: 40 },
    { label: 'Feb', value: 65 },
    { label: 'Mar', value: 52 },
    { label: 'Apr', value: 90 },
    { label: 'May', value: 78 },
    { label: 'Jun', value: 110 },
    //   { label: 'Jul', value: 95 },
    //   { label: 'Aug', value: 130 },
    //   { label: 'Sep', value: 115 },
    //   { label: 'Oct', value: 145 },
    //   { label: 'Nov', value: 160 },
    //   { label: 'Dec', value: 175 },
  ];
}
