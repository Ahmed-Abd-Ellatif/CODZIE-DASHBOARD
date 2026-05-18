import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { TranslatePipe } from '@ngx-translate/core';
import { HeaderButton, TableAction, TableColumn } from '../../../shared/components/table/models/table.interface';
import { Table } from '../../../shared/components/table/table';

@Component({
  selector: 'app-owners',
  imports: [CommonModule,Breadcrumb,TranslatePipe,Table],
  templateUrl: './owners.html',
  styleUrl: './owners.css',
})
export class Owners {





  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // SWEET ALERTS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alertType: 'success' | 'error' | 'warning' | 'confirm' | 'info' | null = null;
  alertMessage: string = '';
  showSweetAlert: boolean = false;
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
      { key: 'name', label: 'OWNERS.TITLE', sortable: true, align: 'center' },
      { key: 'email', label: 'OWNERS.EMAIL', sortable: true, align: 'center' },
      { key: 'course', label: 'OWNERS.COURSE' },
      { key: 'joinDate', label: 'OWNERS.JOIN_DATE', type: 'date', sortable: true, align: 'center' },
      { key: 'balance', label: 'OWNERS.BALANCE', type: 'currency', sortable: true, align: 'center' },
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
        label: 'تعديل المالك',
        icon: 'icons/edit.svg',
        callback: (row) => console.log('Edit:', row),
      },
      {
        label: 'حذف المالك',
        icon: 'icons/delete.svg',
        callback: (row) => confirm('هل أنت متأكد من حذف ' + row.name + '؟'),
        danger: true,
      },
      {
        label: 'عرض ملف المالك',
        icon: 'icons/view.svg',
        callback: (row) => console.log('View:', row),
        show: (row) => row.status === 'active',
        disabled: (row) => row.status === 'active',
      },
    ];
    // Table header buttons
    topButtons: HeaderButton[] = [
      {
        label: 'إضافة مالك',
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
    ];
}
