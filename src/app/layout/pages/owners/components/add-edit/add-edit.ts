import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Breadcrumb } from '../../../../../shared/components/breadcrumb/breadcrumb';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  imports: [CommonModule, TranslatePipe, Breadcrumb, RouterLink],
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
