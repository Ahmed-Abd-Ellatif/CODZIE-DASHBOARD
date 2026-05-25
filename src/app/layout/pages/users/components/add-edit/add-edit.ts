import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Breadcrumb } from '../../../../../shared/components/breadcrumb/breadcrumb';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-edit',
  imports: [CommonModule, TranslatePipe, Breadcrumb, RouterLink, FormsModule, NgSelectModule],
  templateUrl: './add-edit.html',
  styleUrl: './add-edit.css',
})
export class AddEdit {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // PROPERTIES
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  isEditMode: boolean = false;
  userId: string | null = null;

  selectedRole: number | null = null;
  selectedStatus: number | null = null;

  roleOptions = [
    { value: 1, label: 'ROLES.ADMIN' },
    { value: 2, label: 'ROLES.DEVELOPER' },
    { value: 3, label: 'ROLES.CUSTOMER_SUPPORT' },
    { value: 4, label: 'ROLES.SUPERVISOR' },
  ];

  statusOptions = [
    { value: 1, label: 'USERS.AVAILABLE' },
    { value: 2, label: 'USERS.ABSENT' },
    { value: 3, label: 'USERS.ON_LEAVE' },
    { value: 4, label: 'USERS.RESIGNED' },
  ];

  constructor(private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.isEditMode = params.has('id');
    });
  }
}
