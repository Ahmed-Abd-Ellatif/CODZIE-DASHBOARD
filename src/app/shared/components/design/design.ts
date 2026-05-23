import { Component, inject } from '@angular/core';
import { Alerts } from '../alerts/alerts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { Translation } from '../../../core/services/translation';
import { TranslatePipe } from '@ngx-translate/core';
import { SweetAlerts } from '../sweet-alerts/sweet-alerts';
import { Toast } from '../toast/toast';
import { ToastService } from '../toast/services/toast';
import { Table } from '../table/table';
import { HeaderButton, TableAction, TableColumn } from '../table/models/table.interface';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-design',
  imports: [
    CommonModule,
    Alerts,
    Breadcrumb,
    TranslatePipe,
    SweetAlerts,
    Toast,
    Table,
    FormsModule,
    NgSelectModule,
  ],
  templateUrl: './design.html',
  styleUrl: './design.css',
})
export class Design {
  translation = inject(Translation);

  // ng-select demo values
  designCategory: string | null = null;
  designCategoryOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];
  designStatus: string | null = null;
  designStatusOptions = [{ value: '1', label: 'Option 1' }];
  designDisabled: string = '1';
  designDisabledOptions = [{ value: '1', label: 'Cannot change this' }];

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ALERTS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  title: string = 'Success';
  message: string = 'Your operation was successful!';
  type: 'success' | 'warning' | 'error' | 'info' = 'success';
  ShowSuccess() {
    this.type = 'success';
    this.title = 'Success';
    this.message = 'Your operation was successful!';
  }
  ShowWarning() {
    this.type = 'warning';
    this.title = 'Warning';
    this.message = 'Be careful! This action might have unintended consequences.';
  }
  ShowError() {
    this.type = 'error';
    this.title = 'Error';
    this.message = 'An error occurred while processing your request.';
  }
  ShowInfo() {
    this.type = 'info';
    this.title = 'Information';
    this.message = 'This is some important information for you to know.';
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // SWEET ALERTS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alertType: 'success' | 'error' | 'warning' | 'confirm' | 'info' | null = null;
  alertMessage: string = '';
  showSweetAlert: boolean = false;

  showAlert(type: 'success' | 'error' | 'warning' | 'confirm' | 'info', message?: string) {
    let alertMessage = message || '';
    switch (type) {
      case 'success':
        alertMessage = 'Your operation was successful!';
        break;
      case 'error':
        alertMessage = 'An error occurred while processing your request.';
        break;
      case 'warning':
        alertMessage =
          'Be careful! This action might have unintended consequences. Be careful! This action might have unintended consequences.';
        break;
      case 'info':
        alertMessage = 'This is some important information for you to know.';
        break;
      case 'confirm':
        alertMessage = 'Are you sure you want to proceed with this action?';
        break;
    }
    this.alertType = type;
    this.alertMessage = alertMessage;
    this.showSweetAlert = true;
  }

  showSweetAlertFn(value: boolean) {
    if (value) {
      // Handle confirm action here
      this.showSweetAlert = false;
      console.log('User confirmed the action.');
    } else {
      // Handle cancel action here
      console.log('User cancelled the action.');
      this.showSweetAlert = false;
    }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // TOASTS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  toastService = inject(ToastService);

  successFn() {
    this.toastService.show('Success', 'Profile updated!', 'success');
  }
  errorFn() {
    this.toastService.show('Error', 'Something went wrong', 'error');
  }
  infoFn() {
    this.toastService.show(
      'Info',
      'This is an informational message This is an informational message',
      'info',
    );
  }
  warningFn() {
    this.toastService.show('Warning', 'This is a warning message', 'warning');
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // TABLE
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // sample Data
  SAMPLE_DATA = [
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      joinDate: new Date('2024-01-15'),
      balance: 150.5,
      status: 'active',
      course: 'Angular Pro',
    },
    {
      id: 2,
      name: 'سارة أحمد',
      email: 'sara@example.com',
      joinDate: new Date('2024-03-10'),
      balance: -20.0,
      status: 'pending',
      course: 'Node.js Backend',
    },
    {
      id: 3,
      name: 'محمود علي',
      email: 'mahmod@example.com',
      joinDate: new Date('2023-11-20'),
      balance: 0.0,
      status: 'expired',
      course: 'UI/UX Design',
    },
    {
      id: 4,
      name: 'ليلى خالد',
      email: 'laila@example.com',
      joinDate: new Date('2024-05-01'),
      balance: 300.0,
      status: 'active',
      course: 'TypeScript Fundamentals',
    },
  ];
  // Draw Columns
  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '60px', align: 'center' },
    { key: 'name', label: 'HOME.NAME', sortable: true, align: 'center' },
    { key: 'email', label: 'HOME.EMAIL', sortable: true, align: 'center' },
    { key: 'course', label: 'الكورس' },
    { key: 'joinDate', label: 'تاريخ الانضمام', type: 'date', sortable: true, align: 'center' },
    { key: 'balance', label: 'الرصيد', type: 'currency', sortable: true, align: 'center' },
    {
      key: 'status',
      label: 'الحالة',
      type: 'badge',
      align: 'center',
      badgeConfig: (val: string, row: any) => {
        switch (val) {
          case 'active':
            return {
              colorClass: 'tbl-badge--success',
              label: 'HOME.ACTIVE',
              onClick: (r) => {
                this.showSweetAlert = true;
                this.alertType = 'info';
                this.alertMessage = 'تم النقر على الحالة النشطة للطالب: ' + row.name;
                return console.log('Badge clicked:', r);
              },
            };
          case 'pending':
            return { colorClass: 'tbl-badge--warning', label: 'قيد الانتظار' };
          case 'expired':
            return { colorClass: 'tbl-badge--danger', label: 'منتهي' };
          default:
            return { colorClass: 'tbl-badge--neutral', label: val };
        }
      },
    },
  ];

  //  Actions Dropdown
  tableActions: TableAction[] = [
    {
      label: 'تعديل البيانات',
      icon: 'icons/edit.svg',
      callback: (row) => console.log('Edit:', row),
    },
    {
      label: 'حذف الطالب',
      icon: 'icons/delete.svg',
      callback: (row) => confirm('هل أنت متأكد من حذف ' + row.name + '؟'),
      danger: true,
    },
    {
      label: 'عرض التفاصيل',
      icon: 'icons/view.svg',
      callback: (row) => console.log('View:', row),
      show: (row) => row.status === 'active',
      disabled: (row) => row.status === 'active',
    },
  ];
  // Table header buttons
  topButtons: HeaderButton[] = [
    {
      label: 'إضافة طالب',
      icon: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
      colorClass: 'tbl-primary',
      action: () => alert('فتح نافذة الإضافة'),
    },
    {
      label: 'تصدير Excel',
      icon: 'M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z',
      colorClass: 'tbl-success',
      action: () => console.log('Exporting...'),
    },
    {
      label: 'تصدير Word',
      icon: 'M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z',
      colorClass: 'tbl-success',
      action: () => console.log('Exporting...'),
    },
  ];
}
