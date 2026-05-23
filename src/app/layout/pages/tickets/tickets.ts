import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { TranslatePipe } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Table } from '../../../shared/components/table/table';
import {
  HeaderButton,
  TableAction,
  TableColumn,
} from '../../../shared/components/table/models/table.interface';
import { TicketData, AttachmentItem } from './components/ticket-details/ticket-details';
import { Filter, FilterField } from '../../../shared/components/filter/filter';

@Component({
  selector: 'app-tickets',
  imports: [CommonModule, Breadcrumb, TranslatePipe, Table, Filter],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets {
  _fb = inject(FormBuilder);
  private readonly router = inject(Router);

  openTicketDetails(row: TicketData) {
    this.router.navigate(['/tickets', row.id]);
  }
  filterForm = this._fb.group({
    ticketNumber: [''],
    name: [''],
    date: [''],
    priority: [''],
    status: [''],
  });

  statusList = [
    { id: 'new', value: 'New' },
    { id: 'in-progress', value: 'In Progress' },
    { id: 'complete', value: 'Complete' },
  ];
  priorityList = [
    { id: 1, value: 'High' },
    { id: 2, value: 'Medium' },
    { id: 3, value: 'Low' },
  ];

  applyFilters() {
    // Implement filter logic here
  }
  resetFilters() {
    this.filterForm.reset();
    // Implement reset logic here
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // TABLE
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // sample Data
  SAMPLE_DATA = [
    {
      id: 'TCKT-001',
      name: 'أحمد محمد',
      subject: 'مشكلة في تسجيل الدخول',
      status: 'new',
      priority: 'high',
      createdDate: new Date('2024-02-20'),
      description:
        'عند محاولة تسجيل الدخول، تظهر رسالة خطأ تفيد بأن بيانات الاعتماد غير صحيحة، رغم أنها صحيحة.',
      attachments: [
        { name: 'screenshot-login.jpg', url: 'https://picsum.photos/seed/tkt001a/800/600' },
        { name: 'error-report.pdf', url: 'https://www.africau.edu/images/default/sample.pdf' },
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
      status: 'complete',
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
      status: 'in-progress',
      priority: 'medium',
      createdDate: new Date('2024-02-20'),
      description:
        'عند محاولة تسجيل الدخول، تظهر رسالة خطأ تفيد بأن بيانات الاعتماد غير صحيحة، رغم أنها صحيحة.',
      attachments: [
        { name: 'report.pdf', url: 'https://www.africau.edu/images/default/sample.pdf' },
      ],
      notes: [],
    },
  ];
  // Draw Columns
  columns: TableColumn[] = [
    { key: 'id', label: 'Ticket Num', sortable: true, width: '60px', align: 'center' },
    { key: 'name', label: 'Name', sortable: true, align: 'center' },
    { key: 'subject', label: 'Subject', sortable: true, align: 'center' },

    {
      key: 'status',
      label: 'Status',
      sortable: true,
      type: 'badge',
      align: 'center',
      badgeConfig: (val: string, row: any) => {
        switch (val) {
          case 'new':
            return {
              colorClass: 'tbl-badge--danger',
              label: 'TICKETS.STATUS_NEW',
              // onClick: (r) => {
              //   this.selectOwner = r;
              //   this.openPaymentDialog();
              // },
            };

          case 'in-progress':
            return {
              colorClass: 'tbl-badge--warning',
              label: 'TICKETS.STATUS_IN_PROGRESS',
              // onClick: (r) => {
              //   this.selectOwner = r;
              //   this.openPaymentDialog();
              // },
            };
          case 'complete':
            return {
              colorClass: 'tbl-badge--success',
              label: 'TICKETS.STATUS_COMPLETE',
              // onClick: (r) => {
              //   this.selectOwner = r;
              //   this.openPaymentDialog();
              // },
            };
          default:
            return { colorClass: 'tbl-badge--neutral', label: val };
        }
      },
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      type: 'badge',
      align: 'center',
      badgeConfig: (val: string, row: any) => {
        switch (val) {
          case 'high':
            return {
              colorClass: 'tbl-badge--danger',
              label: 'HIGH',
              // onClick: (r) => {
              //   this.selectOwner = r;
              //   this.openPaymentDialog();
              // },
            };

          case 'medium':
            return {
              colorClass: 'tbl-badge--warning',
              label: 'MEDIUM',
              // onClick: (r) => {
              //   this.selectOwner = r;
              //   this.openPaymentDialog();
              // },
            };
          case 'low':
            return {
              colorClass: 'tbl-badge--success',
              label: 'LOW',
              // onClick: (r) => {
              //   this.selectOwner = r;
              //   this.openPaymentDialog();
              // },
            };
          default:
            return { colorClass: 'tbl-badge--neutral', label: val };
        }
      },
    },

    { key: 'createdDate', label: 'Created Date', type: 'date', sortable: true, align: 'center' },
  ];

  //  Actions Dropdown
  tableActions: TableAction[] = [
    // {
    //   label: 'OWNERS.EDIT_OWNER',
    //   icon: 'edit',
    //   callback: (row) => {},
    // },

    {
      label: 'عرض التفاصيل',
      icon: 'eye',
      callback: (row) => this.openTicketDetails(row),
    },
    {
      label: 'تعيين موظف',
      icon: 'user-plus',
      callback: (row) => {},
    },
    {
      label: 'تغير الحالة',
      icon: 'arrows-rotate',
      callback: (row) => {},
    },
    {
      label: 'تغير الأولوية',
      icon: 'flag',
      callback: (row) => this.openTicketDetails(row),
    },
    {
      label: 'إضافة ملاحظة',
      icon: 'note-sticky',
      callback: (row) => this.openTicketDetails(row),
    },

    {
      label: 'إغلاق التذكرة',
      icon: 'check',
      callback: (row) => confirm('هل أنت متأكد من حذف ' + row.name + '؟'),
      success: true,
    },
    {
      label: ' إعادة فتح التذكرة',
      icon: 'redo',
      callback: (row) => confirm('هل أنت متأكد من إعادة فتح ' + row.name + '؟'),
      danger: true,
    },
    {
      label: 'حذف التذكرة',
      icon: 'trash-can',
      callback: (row) => confirm('هل أنت متأكد من حذف ' + row.name + '؟'),
      danger: true,
    },
  ];
  // Table header buttons
  topButtons: HeaderButton[] = [
    {
      label: 'TICKETS.ADD_TICKET',
      icon: 'plus',
      colorClass: 'btn-primary',
      action: () => {},
    },
  ];

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // TICKET STATS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  get ticketStats() {
    const total = this.SAMPLE_DATA.length;
    const open = this.SAMPLE_DATA.filter((t) => t.status === 'new').length;
    const pending = this.SAMPLE_DATA.filter((t) => t.status === 'in-progress').length;
    const closed = this.SAMPLE_DATA.filter((t) => t.status === 'complete').length;
    const pct = (n: number) => (total ? Math.round((n / total) * 100) : 0);
    return {
      total,
      open,
      pending,
      closed,
      openPct: pct(open),
      pendingPct: pct(pending),
      closedPct: pct(closed),
    };
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // FILTER
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  filterFields: FilterField[] = [
    {
      key: 'search',
      type: 'text',
      placeholder: 'TICKETS.SEARCH_TICKET',
    },

    {
      key: 'status',
      type: 'select',
      placeholder: 'TICKETS.STATUS',
      items: this.statusList,
      bindValue: 'id',
      bindLabel: 'value',
      multiple: true,
    },
    {
      key: 'priority',
      type: 'select',
      placeholder: 'TICKETS.PROPERTY',
      items: this.priorityList,
      bindValue: 'id',
      bindLabel: 'value',
      multiple: true,
    },

    {
      key: 'date',
      type: 'date',
      placeholder: 'TICKETS.SELECT_DATE',
      dateMode: 'range',
    },
  ];

  onFilterSubmit(values: Record<string, any>): void {
    console.log('Filter values:', values);
  }

  onFilterReset(): void {
    console.log('Filter reset');
  }
}
