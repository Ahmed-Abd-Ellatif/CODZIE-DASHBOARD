import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../../core/services/layout';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [TranslatePipe, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  layout = inject(LayoutService);

  openSection = signal<string | null>('dashboard');

  toggleSection(name: string) {
    this.openSection.update((v) => (v === name ? null : name));
  }

  logout() {
    // TODO: implement logout
  }
}
