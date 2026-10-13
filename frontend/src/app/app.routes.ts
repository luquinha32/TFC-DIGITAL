import { Routes } from '@angular/router';
import { Login } from './features/login/login/login';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  { path:'dashaboar',
    component: Dashboard
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
