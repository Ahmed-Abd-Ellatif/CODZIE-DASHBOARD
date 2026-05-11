import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(title: string, message: string, type: any = 'success') {
    const id = Date.now();
    const newToast: Toast = { id, title, message, type };

    this.toasts.update((current) => [...current, newToast]);

    setTimeout(() => this.remove(id), 3000);
  }

  remove(id: number) {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }
}
