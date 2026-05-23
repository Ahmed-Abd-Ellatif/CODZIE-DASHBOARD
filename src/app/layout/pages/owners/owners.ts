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
import { Filter, FilterField } from '../../../shared/components/filter/filter';

@Component({
  selector: 'app-owners',
  imports: [CommonModule, Breadcrumb, TranslatePipe, Table, PaymentDialog, Filter],
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
      pay: 'Pay',
    },
    {
      id: 2,
      name: 'خالد أحمد',
      email: 'sara@example.com',
      joinDate: new Date('2024-03-10'),
      cost: 800,
      status: 'active',
      url: 'https://example.com/owners/2',
      pay: 'Not Pay',
    },
    {
      id: 3,
      name: 'محمود علي',
      email: 'mahmod@example.com',
      joinDate: new Date('2023-11-20'),
      cost: 500,
      status: 'active',
      url: 'https://example.com/owners/3',
      pay: 'Pay',
    },
    {
      id: 4,
      name: 'ليلى خالد',
      email: 'laila@example.com',
      joinDate: new Date('2024-05-01'),
      cost: 800,
      status: 'blocked',
      url: 'https://example.com/owners/4',
      pay: 'Not Pay',
    },
  ];
  // Draw Columns
  columns: TableColumn[] = [
    { key: 'id', label: 'OWNERS.CODE', sortable: true, width: '60px', align: 'center' },
    { key: 'name', label: 'OWNERS.TITLE', sortable: true, align: 'center' },
    { key: 'email', label: 'OWNERS.EMAIL', sortable: true, align: 'center' },
    { key: 'url', label: 'OWNERS.URL' },
    {
      key: 'pay',
      label: 'OWNERS.PAY',
      sortable: true,
      type: 'badge',
      align: 'center',
      badgeConfig: (val: string, row: any) => {
        switch (val) {
          case 'Pay':
            return {
              colorClass: 'tbl-badge--info',
              label: 'OWNERS.PAY',
              onClick: (r) => {
                this.selectOwner = r;
                this.openPaymentDialog();
              },
            };

          case 'Not Pay':
            return {
              colorClass: 'tbl-badge--warning',
              label: 'OWNERS.NOT_PAY',
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
              label: 'OWNERS.ACTIVE',
              onClick: (r) => {
                this.selectOwner = r;
                this.openPaymentDialog();
              },
            };

          case 'blocked':
            return {
              colorClass: 'tbl-badge--danger',
              label: 'OWNERS.BLOCKED',
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
      label: 'OWNERS.BLOCK_OWNER',
      icon: 'ban',
      callback: (row) => confirm('هل أنت متأكد من إعادة تعيين كلمة المرور ل ' + row.name + '؟'),
      show: (row) => row.status === 'active',
      danger: true,
    },
    {
      label: 'OWNERS.UNBLOCK_OWNER',
      icon: 'lock-open',
      callback: (row) => confirm('هل أنت متأكد من إعادة تعيين كلمة المرور ل ' + row.name + '؟'),
      show: (row) => row.status === 'blocked',
      success: true,
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
      icon: 'plus',
      colorClass: 'btn-primary',
      action: () => this._router.navigate(['/owners/add']),
    },
  ];

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // FILTER
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  filterFields: FilterField[] = [
    {
      key: 'Search',
      type: 'text',
      placeholder: 'OWNERS.SEARCH_OF_OWNERS',
    },

    {
      key: 'date',
      type: 'date',
      placeholder: 'OWNERS.JOIN_DATE_PLACEHOLDER',
      dateMode: 'range',
    },
    {
      key: 'typePay',
      type: 'select',
      placeholder: 'OWNERS.PAY_OPTIONS_PLACEHOLDER',
      items: [
        { value: '1', label: 'Pay' },
        { value: '2', label: 'Not Pay' },
      ],
      bindValue: 'value',
      bindLabel: 'label',
      multiple: true,
    },
  ];

  onFilterSubmit(values: Record<string, any>): void {
    console.log('Filter values:', values);
  }

  onFilterReset(): void {
    console.log('Filter reset');
  }
}
