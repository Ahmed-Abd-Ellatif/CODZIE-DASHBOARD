import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { Footer } from '../../../shared/components/footer/footer';
import { LayoutService } from '../../../core/services/layout';

@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, Navbar, Sidebar, Footer],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  layout = inject(LayoutService);
}
