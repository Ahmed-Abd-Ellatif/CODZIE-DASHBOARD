import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb } from '../../../../../shared/components/breadcrumb/breadcrumb';
import { PaymentDialog } from '../../../../../shared/components/payment-dialog/payment-dialog';
import { Table as SharedTable } from '../../../../../shared/components/table/table';
import { TableColumn } from '../../../../../shared/components/table/models/table.interface';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

interface OwnerProfile {
  id: number;
  name: string;
  phone: string;
  email: string;
  url: string;
  ownerType: 'teacher' | 'center';
  languages: Array<'OWNERS.LANG_ARABIC' | 'OWNERS.LANG_ENGLISH'>;
  cost: number;
  image: string;
  joinDate: Date;
  status: 'active' | 'blocked';
}

interface PaymentHistory {
  amount: number;
  date: Date;
  recipient: string;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, PaymentDialog, SharedTable, TranslatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  paymentDialogVisible = signal(false);
  isBlocked = signal(false);
  copiedWebsite = signal(false);

  owner: OwnerProfile = {
    id: Number(this.route.snapshot.paramMap.get('id')) || 1,
    name: 'أحمد محمد',
    phone: '+20 101 234 5678',
    email: 'ahmed@example.com',
    url: 'https://example.com/owner/ahmed',
    ownerType: 'teacher',
    languages: ['OWNERS.LANG_ARABIC', 'OWNERS.LANG_ENGLISH'],
    cost: 500,
    image:
      'https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face.jpg',
    joinDate: new Date('2025-08-15'),
    status: 'active',
  };

  paymentHistory: PaymentHistory[] = [
    { amount: 250, date: new Date('2026-01-11'), recipient: 'محمد طارق' },
    { amount: 150, date: new Date('2026-02-12'), recipient: 'نورا علي' },
    { amount: 100, date: new Date('2026-03-15'), recipient: 'أحمد السيد' },
  ];

  paymentColumns: TableColumn[] = [
    {
      key: 'amount',
      label: 'OWNERS.PAYMENT_AMOUNT',
      type: 'currency',
      currencyCode: 'EGP',
      sortable: true,
      align: 'center',
    },
    {
      key: 'date',
      label: 'OWNERS.PAYMENT_DATE',
      type: 'date',
      sortable: true,
      align: 'center',
    },
    {
      key: 'recipient',
      label: 'OWNERS.RECIPIENT',
      sortable: true,
      align: 'center',
    },
  ];

  get ownerTypeLabelKey(): 'OWNERS.TEACHER' | 'OWNERS.CENTER' {
    return this.owner.ownerType === 'teacher' ? 'OWNERS.TEACHER' : 'OWNERS.CENTER';
  }

  getMembershipDuration(): { years: number; months: number } {
    const today = new Date();
    const joinDate = this.owner.joinDate;
    let years = today.getFullYear() - joinDate.getFullYear();
    let months = today.getMonth() - joinDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months };
  }

  openPaymentDialog(): void {
    this.paymentDialogVisible.set(true);
  }

  closePaymentDialog(): void {
    this.paymentDialogVisible.set(false);
  }

  editOwner(): void {
    this.router.navigate(['/owners/edit', this.owner.id]);
  }

  async copyWebsiteUrl(): Promise<void> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(this.owner.url);
      } else {
        const tempInput = document.createElement('textarea');
        tempInput.value = this.owner.url;
        tempInput.setAttribute('readonly', '');
        tempInput.style.position = 'fixed';
        tempInput.style.opacity = '0';
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      this.copiedWebsite.set(true);
      setTimeout(() => this.copiedWebsite.set(false), 1800);
    } catch {
      this.copiedWebsite.set(false);
    }
  }

  toggleBlockStatus(): void {
    const nextBlockedState = !this.isBlocked();
    const messageKey = nextBlockedState ? 'OWNERS.BLOCK_CONFIRM' : 'OWNERS.UNBLOCK_CONFIRM';
    const confirmed = confirm(this.translate.instant(messageKey, { name: this.owner.name }));

    if (!confirmed) {
      return;
    }

    this.isBlocked.set(nextBlockedState);
    this.owner.status = nextBlockedState ? 'blocked' : 'active';
  }

  deleteOwner(): void {
    const confirmed = confirm(this.translate.instant('OWNERS.DELETE_CONFIRM', { name: this.owner.name }));
    if (!confirmed) {
      return;
    }

    this.router.navigate(['/owners/list']);
  }

}
