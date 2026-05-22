import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Translation } from '../../../core/services/translation';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, TranslatePipe, RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  currentYear = new Date().getFullYear();
  //  ~~~~~~~~~~~~~~~~~~~~~~~~~
  // * CONSTRUCTOR
  //  ~~~~~~~~~~~~~~~~~~~~~~~~~
  private translationService = inject(Translation);
  fb = inject(FormBuilder);
  constructor() {
    if (this.isDark()) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * PROPERTIES
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  currentLang = this.translationService.currentLang;
  showPassword: boolean = false;
  isDark = signal(localStorage.getItem('darkMode') === 'enabled');
  // ~~~~~~~~~~~~~~~~~~~~~~~
  // * FORM
  // ~~~~~~~~~~~~~~~~~~~~~~~
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  get LoginFormControls() {
    return this.loginForm.controls;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // * ACTIONS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleLang() {
    this.translationService.toggleLang();
  }

  toggleTheme() {
    const dark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', dark ? 'enabled' : 'disabled');
    this.isDark.set(dark);
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }
}
