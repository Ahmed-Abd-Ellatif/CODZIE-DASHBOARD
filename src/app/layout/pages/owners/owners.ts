import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { TranslatePipe } from '@ngx-translate/core';
import {
  HeaderButton,
  TableAction,
  TableColumn,
} from '../../../shared/components/table/models/table.interface';
import { Table } from '../../../shared/components/table/table';
import { Router } from '@angular/router';
import { PaymentDialog } from '../../../shared/components/payment-dialog/payment-dialog';

@Component({
  selector: 'app-owners',
  imports: [CommonModule, Breadcrumb, TranslatePipe, Table, PaymentDialog],
  templateUrl: './owners.html',
  styleUrl: './owners.css',
})
export class Owners {
  _router = inject(Router);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // SWEET ALERTS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alertType: 'success' | 'error' | 'warning' | 'confirm' | 'info' | null = null;
  alertMessage: string = '';
  showSweetAlert: boolean = false;
  selectOwner: any = null;
  paymentDialogVisible = signal(false);
  openPaymentDialog() {
    this.paymentDialogVisible.set(true);
  }
  closePaymentDialog() {
    this.paymentDialogVisible.set(false);
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
      cost: 500,
      status: 'active',
      url: 'https://example.com/owners/1',
    },
    {
      id: 2,
      name: 'خالد أحمد',
      email: 'sara@example.com',
      joinDate: new Date('2024-03-10'),
      cost: 800,
      status: 'pending',
      url: 'https://example.com/owners/2',
    },
    {
      id: 3,
      name: 'محمود علي',
      email: 'mahmod@example.com',
      joinDate: new Date('2023-11-20'),
      cost: 500,
      status: 'expired',
      url: 'https://example.com/owners/3',
    },
    {
      id: 4,
      name: 'ليلى خالد',
      email: 'laila@example.com',
      joinDate: new Date('2024-05-01'),
      cost: 800,
      status: 'active',
      url: 'https://example.com/owners/4',
    },
  ];
  // Draw Columns
  columns: TableColumn[] = [
    { key: 'id', label: 'OWNERS.CODE', sortable: true, width: '60px', align: 'center' },
    { key: 'name', label: 'OWNERS.TITLE', sortable: true, align: 'center' },
    { key: 'email', label: 'OWNERS.EMAIL', sortable: true, align: 'center' },
    { key: 'url', label: 'OWNERS.URL' },
    { key: 'cost', label: 'OWNERS.COST', type: 'currency', sortable: true, align: 'center' },
    {
      key: 'status',
      label: 'OWNERS.STATUS',
      type: 'badge',
      align: 'center',
      badgeConfig: (val: string, row: any) => {
        switch (val) {
          case 'active':
            return {
              colorClass: 'tbl-badge--success',
              label: 'HOME.ACTIVE',
              onClick: (r) => {
                this.selectOwner = r;
                this.openPaymentDialog();
              },
            };
          case 'pending':
            return {
              colorClass: 'tbl-badge--warning',
              label: 'قيد الانتظار',
              onClick: (r) => {
                this.selectOwner = r;
                this.openPaymentDialog();
              },
            };
          case 'expired':
            return {
              colorClass: 'tbl-badge--danger',
              label: 'منتهي',
              onClick: (r) => {
                this.selectOwner = r;
                this.openPaymentDialog();
              },
            };
          default:
            return { colorClass: 'tbl-badge--neutral', label: val };
        }
      },
    },
    { key: 'joinDate', label: 'OWNERS.JOIN_DATE', type: 'date', sortable: true, align: 'center' },
  ];

  //  Actions Dropdown
  tableActions: TableAction[] = [
    {
      label: 'OWNERS.EDIT_OWNER',
      icon: 'edit',
      callback: (row) => this._router.navigate(['/owners/edit', row.id]),
    },

    {
      label: 'OWNERS.VIEW_OWNER',
      icon: 'eye',
      callback: (row) => this._router.navigate(['/owners/profile', row.id]),
      // show: (row) => row.status === 'active',
      // disabled: (row) => row.status === 'active',
    },
    {
      label: 'OWNERS.RESET_PASSWORD',
      icon: 'key',
      callback: (row) => confirm('هل أنت متأكد من إعادة تعيين كلمة المرور ل ' + row.name + '؟'),
    },

    {
      label: 'OWNERS.DELETE_OWNER',
      icon: 'trash-can',
      callback: (row) => confirm('هل أنت متأكد من حذف ' + row.name + '؟'),
      danger: true,
    },
  ];
  // Table header buttons
  topButtons: HeaderButton[] = [
    {
      label: 'OWNERS.ADD_OWNER',
      icon: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
      colorClass: 'tbl-primary',
      action: () => this._router.navigate(['/owners/add']),
    },
  ];
}
