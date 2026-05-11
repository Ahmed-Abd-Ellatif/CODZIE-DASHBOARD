import { Component, inject, signal, HostListener } from '@angular/core';
import { Translation } from '../../../core/services/translation';
import { LayoutService } from '../../../core/services/layout';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  translation = inject(Translation);
  layout = inject(LayoutService);

  isDark = signal(localStorage.getItem('darkMode') === 'enabled');
  isDropdownOpen = signal(false);

  constructor() {
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    this.isDark.set(isDark);
  }

  toggleDropdown() {
    this.isDropdownOpen.update((v) => !v);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      this.isDropdownOpen.set(false);
    }
  }
}
