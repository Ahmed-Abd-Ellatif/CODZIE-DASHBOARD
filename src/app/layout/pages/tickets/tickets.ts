import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { TranslatePipe } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatepickerDirective } from '../../../shared/directives/datepicker/datepicker.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { Table } from '../../../shared/components/table/table';
import {
  HeaderButton,
  TableAction,
  TableColumn,
} from '../../../shared/components/table/models/table.interface';
import {
  TicketDetailsDialog,
  TicketData,
} from './components/ticket-details-dialog/ticket-details-dialog';

@Component({
  selector: 'app-tickets',
  imports: [
    CommonModule,
    Breadcrumb,
    TranslatePipe,
    DatepickerDirective,
    ReactiveFormsModule,
    NgSelectModule,
    Table,
    TicketDetailsDialog,
  ],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets {
  _fb = inject(FormBuilder);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // TICKET DETAILS DIALOG
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  selectedTicket: TicketData | null = null;

  openTicketDetails(row: TicketData) {
    this.selectedTicket = row;
  }

  closeTicketDetails() {
    this.selectedTicket = null;
  }
  filterForm = this._fb.group({
    ticketNumber: [''],
    name: [''],
    date: [''],
    priority: [''],
    status: [''],
  });

  statusList = [
    { id: 1, value: 'Open' },
    { id: 2, value: 'Pending' },
    { id: 3, value: 'Closed' },
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
      status: 'open',
      priority: 'high',
      createdDate: new Date('2024-02-20'),
      description:
        'عند محاولة تسجيل الدخول، تظهر رسالة خطأ تفيد بأن بيانات الاعتماد غير صحيحة، رغم أنها صحيحة.',
      attachments: ['screenshot-error.png', 'log-file.txt'],
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
      attachments: ['report.pdf'],
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
          case 'open':
            return {
              colorClass: 'tbl-badge--danger',
              label: 'OPEN',
              // onClick: (r) => {
              //   this.selectOwner = r;
              //   this.openPaymentDialog();
              // },
            };

          case 'pending':
            return {
              colorClass: 'tbl-badge--warning',
              label: 'PENDING',
              // onClick: (r) => {
              //   this.selectOwner = r;
              //   this.openPaymentDialog();
              // },
            };
          case 'closed':
            return {
              colorClass: 'tbl-badge--success',
              label: 'CLOSED',
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
      colorClass: 'tbl-primary',
      action: () => {},
    },
  ];

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // TICKET STATS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  get ticketStats() {
    const total = this.SAMPLE_DATA.length;
    const open = this.SAMPLE_DATA.filter((t) => t.status === 'open').length;
    const pending = this.SAMPLE_DATA.filter((t) => t.status === 'pending').length;
    const closed = this.SAMPLE_DATA.filter((t) => t.status === 'closed').length;
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
}
