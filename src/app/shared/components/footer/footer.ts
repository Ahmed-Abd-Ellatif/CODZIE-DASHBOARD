import { Component, inject } from '@angular/core';
import { Translation } from '../../../core/services/translation';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
translation = inject(Translation);
currentYear = new Date().getFullYear();
}
