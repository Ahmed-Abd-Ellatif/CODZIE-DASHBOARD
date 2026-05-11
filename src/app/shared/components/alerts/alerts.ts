import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
export type AlertType = 'success' | 'warning' | 'error' | 'info' | null;

@Component({
  selector: 'app-alerts',
  imports: [CommonModule],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  type = input.required<AlertType>();
  title = input.required<string>();
  message = input.required<string>();
}
