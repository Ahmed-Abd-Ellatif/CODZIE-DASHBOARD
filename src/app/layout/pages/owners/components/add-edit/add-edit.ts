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
  ownerId: string | null = null;
  paymentSchedule: 'monthly' | 'yearly' | 'noPayment' = 'monthly';
  selectedSystem: string | null = null;
  systemOptions = [
    { value: '1', label: 'OWNERS.TEACHER' },
    { value: '2', label: 'OWNERS.CENTER' },
  ];

  selectedPaymentSchedule(schedule: 'monthly' | 'yearly' | 'noPayment') {
    this.paymentSchedule = schedule;
  }

  constructor(private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.ownerId = params.get('id');
      this.isEditMode = params.has('id');
    });
  }
}
