import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Breadcrumb } from '../../../../../shared/components/breadcrumb/breadcrumb';
import { Filter, FilterField } from '../../../../../shared/components/filter/filter';
import { Table } from '../../../../../shared/components/table/table';
import {
  HeaderButton,
  TableAction,
  TableColumn,
} from '../../../../../shared/components/table/models/table.interface';

@Component({
  selector: 'app-archive',
  imports: [CommonModule, TranslatePipe, Breadcrumb, Filter, Table],
  templateUrl: './archive.html',
  styleUrl: './archive.css',
})
export class Archive {
  selectOwner: any = null;
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
                // this.openPaymentDialog();
              },
            };

          case 'Not Pay':
            return {
              colorClass: 'tbl-badge--warning',
              label: 'OWNERS.NOT_PAY',
              onClick: (r) => {
                this.selectOwner = r;
                // this.openPaymentDialog();
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
                // this.openPaymentDialog();
              },
            };

          case 'blocked':
            return {
              colorClass: 'tbl-badge--danger',
              label: 'OWNERS.BLOCKED',
              onClick: (r) => {
                this.selectOwner = r;
                // this.openPaymentDialog();
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
      label: 'OWNERS.VIEW_OWNER',
      icon: 'eye',
      callback: (row) => {},
      // show: (row) => row.status === 'active',
      // disabled: (row) => row.status === 'active',
    },
    {
      label: 'OWNERS.RETURN_OWNER',
      icon: 'arrow-rotate-left',
      callback: (row) => {},
      success: true,
      // show: (row) => row.status === 'active',
      // disabled: (row) => row.status === 'active',
    },

    {
      label: 'OWNERS.PERMANENTLY_DELETE_OWNER',
      icon: 'trash-can',
      callback: (row) => confirm('هل أنت متأكد من حذف ' + row.name + ' نهائيًا؟'),
      danger: true,
    },
  ];

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // FILTER
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  payList = [
    { value: 'Pay', label: 'OWNERS.PAY' },
    { value: 'Not Pay', label: 'OWNERS.NOT_PAY' },
  ];
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
      items: this.payList,
      bindValue: 'value',
      bindLabel: 'label',
      // multiple: true,
    },
  ];

  onFilterSubmit(values: Record<string, any>): void {
    console.log('Filter values:', values);
  }

  onFilterReset(): void {
    console.log('Filter reset');
  }
}
