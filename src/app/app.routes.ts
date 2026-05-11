import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/pages/main-page/main-page').then((m) => m.MainPage),
    children: [
      {
        path: '',
        loadComponent: () => import('./layout/pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'design-system',
        loadComponent: () => import('./shared/components/design/design').then((m) => m.Design),
      },
    ],
  },

  //   LOGIN PAGE
  {
    path: 'login',
    loadComponent: () => import('./layout/auth/login/login').then((m) => m.Login),
  },
];
