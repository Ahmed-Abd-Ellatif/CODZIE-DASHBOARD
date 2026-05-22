import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output, ViewEncapsulation } from '@angular/core';

export interface TicketNote {
  author: string;
  date: Date;
  text: string;
}

export interface TicketData {
  id: string;
  name: string;
  subject: string;
  status: string;
  priority: string;
  createdDate: Date;
  description: string;
  attachments?: string[];
  notes?: TicketNote[];
}

@Component({
  selector: 'app-ticket-details-dialog',
  imports: [CommonModule],
  templateUrl: './ticket-details-dialog.html',
  styleUrl: './ticket-details-dialog.css',
  encapsulation: ViewEncapsulation.None,
})
export class TicketDetailsDialog {
  ticket = input.required<TicketData>();

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('tkt-dialog-backdrop')) {
      this.onClose();
    }
  }

  statusClass(status: string): string {
    switch (status) {
      case 'open':
        return 'tbl-badge--danger';
      case 'pending':
        return 'tbl-badge--warning';
      case 'closed':
        return 'tbl-badge--success';
      default:
        return 'tbl-badge--neutral';
    }
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'open':
        return 'مفتوح';
      case 'pending':
        return 'قيد المعالجة';
      case 'closed':
        return 'مغلق';
      default:
        return status;
    }
  }

  priorityClass(priority: string): string {
    switch (priority) {
      case 'high':
        return 'tbl-badge--danger';
      case 'medium':
        return 'tbl-badge--warning';
      case 'low':
        return 'tbl-badge--success';
      default:
        return 'tbl-badge--neutral';
    }
  }

  priorityLabel(priority: string): string {
    switch (priority) {
      case 'high':
        return 'عالية';
      case 'medium':
        return 'متوسطة';
      case 'low':
        return 'منخفضة';
      default:
        return priority;
    }
  }
}
