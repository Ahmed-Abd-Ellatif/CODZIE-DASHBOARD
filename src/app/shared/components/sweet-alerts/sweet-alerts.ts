import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-sweet-alerts',
  imports: [CommonModule],
  templateUrl: './sweet-alerts.html',
  styleUrls: ['./sweet-alerts.css'],
})
export class SweetAlerts {
  alertType = input.required<'success' | 'error' | 'warning' | 'confirm' | 'info' | null>();
  alertMessage = input.required<string>();
  @Output() alertEvent = new EventEmitter<boolean>();

  onAlertEvent(value: boolean) {
    this.alertEvent.emit(value);
  }
}
