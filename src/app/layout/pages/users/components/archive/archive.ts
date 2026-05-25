import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Breadcrumb } from '../../../../../shared/components/breadcrumb/breadcrumb';
import { TranslatePipe } from '@ngx-translate/core';
import { Table } from '../../../../../shared/components/table/table';
import { Filter, FilterField } from '../../../../../shared/components/filter/filter';
import { Router } from '@angular/router';
import {
  HeaderButton,
  TableAction,
  TableColumn,
} from '../../../../../shared/components/table/models/table.interface';

@Component({
  selector: 'app-archive',
  imports: [CommonModule, Breadcrumb, TranslatePipe, Table, Filter],
  templateUrl: './archive.html',
  styleUrl: './archive.css',
})
export class Archive {
  _router = inject(Router);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // SWEET ALERTS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alertType: 'success' | 'error' | 'warning' | 'confirm' | 'info' | null = null;
  alertMessage: string = '';
  showSweetAlert: boolean = false;
  selectUser: any = null;
  roleList = [
    { value: 1, label: 'ROLES.ADMIN' },
    { value: 2, label: 'ROLES.DEVELOPER' },
    { value: 3, label: 'ROLES.CUSTOMER_SUPPORT' },
    { value: 4, label: 'ROLES.SUPERVISOR' },
  ];
  statusList = [
    { value: 1, label: 'USERS.AVAILABLE' },
    { value: 2, label: 'USERS.ABSENT' },
    { value: 3, label: 'USERS.ON_LEAVE' },
    { value: 4, label: 'USERS.RESIGNED' },
  ];
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // TABLE
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // sample Data
  SAMPLE_DATA = [
    {
      id: 1,
      name: 'أحمد محمود',
      email: 'ahmed@example.com',
      phone: '+1234567890',
      role: 'Admin',
      joinDate: '2023-01-15',
      status: 'Available',
    },
    {
      id: 1,
      name: 'أحمد محمود',
      email: 'ahmed@example.com',
      phone: '+1234567890',
      role: 'Developer',
      joinDate: '2023-01-15',
      status: 'Absent',
    },
    {
      id: 1,
      name: 'أحمد محمود',
      email: 'ahmed@example.com',
      phone: '+1234567890',
      role: 'Customer Support',
      joinDate: '2023-01-15',
      status: 'On Leave',
    },
    {
      id: 1,
      name: 'أحمد محمود',
      email: 'ahmed@example.com',
      phone: '+1234567890',
      role: 'Supervisor',
      joinDate: '2023-01-15',
      status: 'Resigned',
    },
  ];
  // Draw Columns
  columns: TableColumn[] = [
    { key: 'name', label: 'USERS.NAME', sortable: true, align: 'center' },
    { key: 'email', label: 'USERS.EMAIL', sortable: true, align: 'center' },
    { key: 'phone', label: 'USERS.PHONE', sortable: true, align: 'center' },
    { key: 'role', label: 'USERS.ROLE', sortable: true, align: 'center' },
    {
      key: 'status',
      label: 'USERS.STATUS',
      type: 'badge',
      align: 'center',
      badgeConfig: (val: string, row: any) => {
        switch (val) {
          case 'Available':
            return {
              colorClass: 'tbl-badge--success',
              label: 'USERS.AVAILABLE',
              // onClick: (r) => {
              //   this.selectUser = r;
              // },
            };
          case 'Absent':
            return {
              colorClass: 'tbl-badge--warning',
              label: 'USERS.ABSENT',
              // onClick: (r) => {
              //   this.selectUser = r;
              // },
            };
          case 'On Leave':
            return {
              colorClass: 'tbl-badge--info',
              label: 'USERS.ON_LEAVE',
              // onClick: (r) => {
              //   this.selectUser = r;
              // },
            };

          case 'Resigned':
            return {
              colorClass: 'tbl-badge--danger',
              label: 'USERS.RESIGNED',
              // onClick: (r) => {
              //   this.selectUser = r;
              // },
            };
          default:
            return { colorClass: 'tbl-badge--neutral', label: val };
        }
      },
    },
    { key: 'joinDate', label: 'USERS.JOIN_DATE', type: 'date', sortable: true, align: 'center' },
  ];

  //  Actions Dropdown
  tableActions: TableAction[] = [
    {
      label: 'USERS.RETURN_USER',
      icon: 'arrow-rotate-left',
      callback: (row) => {},
      success: true,
    },

    {
      label: 'USERS.DELETE_USER',
      icon: 'trash-can',
      callback: (row) => confirm('هل أنت متأكد من حذف ' + row.name + '؟'),
      danger: true,
    },
  ];

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // FILTER
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  filterFields: FilterField[] = [
    {
      key: 'Search',
      type: 'text',
      placeholder: 'USERS.SEARCH_OF_USERS',
    },

    {
      key: 'typeRole',
      type: 'select',
      placeholder: 'USERS.ROLE',
      items: this.roleList,
      bindValue: 'value',
      bindLabel: 'label',
      multiple: true,
    },
    {
      key: 'typeStatus',
      type: 'select',
      placeholder: 'USERS.STATUS',
      items: this.statusList,
      bindValue: 'value',
      bindLabel: 'label',
      multiple: true,
    },
    {
      key: 'date',
      type: 'date',
      placeholder: 'USERS.DATE_FILTER',
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
