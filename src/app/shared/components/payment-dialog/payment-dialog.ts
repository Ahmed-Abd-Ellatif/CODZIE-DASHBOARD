import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
interface OwnerData {
  id: number;
  name: string;
  email: string;
  joinDate: Date;
  cost: number;
  status: string;
  url: string;
}
@Component({
  selector: 'app-payment-dialog',
  imports: [CommonModule, TranslatePipe, ReactiveFormsModule],
  templateUrl: './payment-dialog.html',
  styleUrl: './payment-dialog.css',
})
export class PaymentDialog implements OnInit {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * VARIABLES
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ownerData = input.required<OwnerData>();
  RecipientName: string = 'Ahmed Abdellatif';
  currentDate: Date = new Date();
  @Output() close = new EventEmitter<void>();
  onClose() {
    this.close.emit();
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * FORM
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  paymentForm = inject(FormBuilder).group({
    ownerName: [''],
    cost: [0],
    remaining: [0],
    RecipientName: [this.RecipientName],
    month: [0],
    year: [0],
  });
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * ngOnInit
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ngOnInit() {
    this.paymentForm.patchValue({
      ownerName: this.ownerData().name,
      cost: this.ownerData().cost,
      remaining: this.paymentForm.value.remaining,
      RecipientName: this.RecipientName,
      month: this.currentDate.getMonth() + 1,
      year: this.currentDate.getFullYear(),
    });
    this.costChanged();
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * COST CHANGED
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  costChanged() {
    const totalCost = this.ownerData().cost;
    this.paymentForm.get('cost')?.valueChanges.subscribe((paid) => {
      const remaining = totalCost - (paid || 0);
      this.paymentForm.patchValue({ remaining }, { emitEvent: false });
    });
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * onSubmit
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  onSubmit() {
    if (this.paymentForm.valid) {
      const formData = this.paymentForm.value;
      console.log('Form Data:', formData);
      // Handle form submission logic here
    }
  }
}
