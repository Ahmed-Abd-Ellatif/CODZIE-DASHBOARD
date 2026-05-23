import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Breadcrumb } from '../../../../../shared/components/breadcrumb/breadcrumb';

export interface AttachmentItem {
  name: string;
  url: string;
}

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
  attachments?: AttachmentItem[];
  notes?: TicketNote[];
}

// Sample data — replace with a real service call
const SAMPLE_DATA: TicketData[] = [
  {
    id: 'TCKT-001',
    name: 'أحمد محمد',
    subject: 'مشكلة في تسجيل الدخول',
    status: 'open',
    priority: 'high',
    createdDate: new Date('2024-02-20'),
    description:
      'عند محاولة تسجيل الدخول، تظهر رسالة خطأ تفيد بأن بيانات الاعتماد غير صحيحة، رغم أنها صحيحة.',
    attachments: [
      {
        name: 'screenshot-login.jpg',
        url: 'https://picsum.photos/seed/tkt001a/800/600',
      },
      {
        name: 'dashboard-error.jpg',
        url: 'https://picsum.photos/seed/tkt001b/800/600',
      },
      {
        name: 'error-report.pdf',
        url: 'https://www.africau.edu/images/default/sample.pdf',
      },
    ],
    notes: [
      {
        author: 'سارة خالد',
        date: new Date('2024-02-21'),
        text: 'تم مراجعة البيانات وتأكيد وجود المشكلة.',
      },
      {
        author: 'محمد علي',
        date: new Date('2024-02-22'),
        text: 'جاري التحقيق مع فريق الدعم التقني.',
      },
    ],
  },
  {
    id: 'TCKT-002',
    name: 'خالد أحمد',
    subject: 'مشكلة في تسجيل الدخول',
    status: 'closed',
    priority: 'low',
    createdDate: new Date('2024-02-20'),
    description:
      'عند محاولة تسجيل الدخول، تظهر رسالة خطأ تفيد بأن بيانات الاعتماد غير صحيحة، رغم أنها صحيحة.',
    attachments: [],
    notes: [
      {
        author: 'فريق الدعم',
        date: new Date('2024-02-21'),
        text: 'تم حل المشكلة وإغلاق التذكرة.',
      },
    ],
  },
  {
    id: 'TCKT-003',
    name: 'خالد أحمد',
    subject: 'مشكلة في  تسجيل الدخول',
    status: 'pending',
    priority: 'medium',
    createdDate: new Date('2024-02-20'),
    description:
      'عند محاولة تسجيل الدخول، تظهر رسالة خطأ تفيد بأن بيانات الاعتماد غير صحيحة، رغم أنها صحيحة.',
    attachments: [
      {
        name: 'report-preview.jpg',
        url: 'https://picsum.photos/seed/tkt003a/800/600',
      },
      {
        name: 'report.pdf',
        url: 'https://www.africau.edu/images/default/sample.pdf',
      },
    ],
    notes: [],
  },
];

@Component({
  selector: 'app-ticket-details',
  imports: [CommonModule, Breadcrumb, FormsModule, NgSelectModule],
  templateUrl: './ticket-details.html',
  styleUrl: './ticket-details.css',
})
export class TicketDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ticket: TicketData | null =
    SAMPLE_DATA.find((t) => t.id === this.route.snapshot.paramMap.get('id')) ?? null;

  // ── Dropdown state ──────────────────────────────
  selectedStatus: string = this.ticket?.status ?? 'open';
  selectedPriority: string = this.ticket?.priority ?? 'high';
  selectedEmployee: string | null = null;

  statusOptions = [
    { value: 'open', label: 'مفتوح', colorClass: 'tbl-badge--danger' },
    { value: 'pending', label: 'قيد المعالجة', colorClass: 'tbl-badge--warning' },
    { value: 'closed', label: 'مغلق', colorClass: 'tbl-badge--success' },
  ];

  priorityOptions = [
    { value: 'high', label: 'عالية', colorClass: 'tbl-badge--danger' },
    { value: 'medium', label: 'متوسطة', colorClass: 'tbl-badge--warning' },
    { value: 'low', label: 'منخفضة', colorClass: 'tbl-badge--success' },
  ];

  employeeOptions = [
    { value: 'emp1', label: 'أحمد الدعم', initials: 'أد' },
    { value: 'emp2', label: 'سارة خالد', initials: 'سخ' },
    { value: 'emp3', label: 'محمد علي', initials: 'مع' },
    { value: 'emp4', label: 'فريق الدعم', initials: 'فد' },
  ];

  lightboxImage: AttachmentItem | null = null;

  goBack() {
    this.router.navigate(['/tickets/list']);
  }

  get imageAttachments(): AttachmentItem[] {
    return this.ticket?.attachments?.filter((a) => this.isImage(a)) ?? [];
  }

  get fileAttachments(): AttachmentItem[] {
    return this.ticket?.attachments?.filter((a) => !this.isImage(a)) ?? [];
  }

  openLightbox(item: AttachmentItem) {
    this.lightboxImage = item;
  }

  closeLightbox() {
    this.lightboxImage = null;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeLightbox();
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

  isImage(item: AttachmentItem): boolean {
    return /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(item.name);
  }
}
