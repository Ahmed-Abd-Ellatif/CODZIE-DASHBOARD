import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../../core/services/layout';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar',
  imports: [TranslatePipe, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  layout = inject(LayoutService);
  private router = inject(Router);

  openSection = signal<string | null>('dashboard');

  constructor() {
    // Close sidebar on mobile after every navigation
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
          this.layout.closeSidebar();
        }
      });
  }

  toggleSection(name: string) {
    this.openSection.update((v) => (v === name ? null : name));
  }

  logout() {
    // TODO: implement logout
  }
}
