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
        path: 'owners/list',
        loadComponent: () => import('./layout/pages/owners/owners').then((m) => m.Owners),
      },
      {
        path: 'owners/add',
        loadComponent: () =>
          import('./layout/pages/owners/components/add-edit/add-edit').then((m) => m.AddEdit),
      },
      {
        path: 'owners/edit/:id',
        loadComponent: () =>
          import('./layout/pages/owners/components/add-edit/add-edit').then((m) => m.AddEdit),
      },
      {
        path: 'owners/profile/:id',
        loadComponent: () =>
          import('./layout/pages/owners/components/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'tickets/list',
        loadComponent: () => import('./layout/pages/tickets/tickets').then((m) => m.Tickets),
      },
      {
        path: 'tickets/:id',
        loadComponent: () =>
          import('./layout/pages/tickets/components/ticket-details/ticket-details').then(
            (m) => m.TicketDetails,
          ),
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
