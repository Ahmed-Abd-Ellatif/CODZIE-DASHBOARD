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
  // ~~~~~~~~~~~~~~~~~~~~~~~~
  // * PROPERTIES
  // ~~~~~~~~~~~~~~~~~~~~~~~~
  layout = inject(LayoutService);
  private router = inject(Router);
  openSection = signal<string | null>(null);
  private readonly sectionRoutes: Record<string, string> = {
    owners: '/owners',
    users: '/users',
  };
  // ~~~~~~~~~~~~~~~~~~~~~~~~
  // * CONSTRUCTOR
  // ~~~~~~~~~~~~~~~~~~~~~~~~

  constructor() {
    this.syncOpenSection(this.router.url);
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((e) => {
        const url = (e as NavigationEnd).urlAfterRedirects;
        this.syncOpenSection(url);

        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
          this.layout.closeSidebar();
        }
      });
  }

  private syncOpenSection(url: string) {
    const matched = Object.entries(this.sectionRoutes).find(([, prefix]) => url.startsWith(prefix));
    this.openSection.set(matched ? matched[0] : null);
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~
  // * UI ACTIONS
  // ~~~~~~~~~~~~~~~~~~~~~~~~
  toggleSection(name: string) {
    const childPath = this.sectionRoutes[name];
    if (childPath && this.router.url.startsWith(childPath)) {
      return;
    }
    this.openSection.update((v) => (v === name ? null : name));
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~
  // * LOGOUT
  // ~~~~~~~~~~~~~~~~~~~~~~~~
  logout() {
    // TODO: implement logout
    this.router.navigate(['/login']);
  }
}
