import { Injectable, signal, effect, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class Translation {
 private translate = inject(TranslateService);
  
  // حفظ اللغة الحالية في Signal
  currentLang = signal(localStorage.getItem('lang') || 'en');

  constructor() {
    // "تأثير" يعمل تلقائياً كلما تغيرت قيمة الـ Signal
    effect(() => {
      const lang = this.currentLang();
      this.translate.use(lang); // تغيير لغة النصوص
      
      // تغيير اتجاه الصفحة ولغتها في الـ DOM
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      
      localStorage.setItem('lang', lang); // حفظ الاختيار
    });
  }

  toggleLang() {
    this.currentLang.update(l => l === 'en' ? 'ar' : 'en');
  }
}