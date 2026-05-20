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

  openSection = signal<string | null>(null);

  constructor() {
    // Initialize dropdown state based on current URL (e.g. on page refresh)
    const initialUrl = this.router.url;
    if (initialUrl.startsWith('/owners')) {
      this.openSection.set('owners');
    }

    // React to every navigation: auto-open/close dropdowns based on active route
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((e) => {
        const url = (e as NavigationEnd).urlAfterRedirects;

        if (url.startsWith('/owners')) {
          this.openSection.set('owners');
        } else {
          this.openSection.set(null);
        }

        // Close sidebar on mobile after every navigation
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
          this.layout.closeSidebar();
        }
      });
  }

  toggleSection(name: string) {
    const activeRoutes: Record<string, string> = {
      projects: '/owners',
    };
    // Don't allow closing if a child route is currently active
    const childPath = activeRoutes[name];
    if (childPath && this.router.url.startsWith(childPath)) {
      return;
    }
    this.openSection.update((v) => (v === name ? null : name));
  }

  logout() {
    // TODO: implement logout
  }
}
