import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login/login';
import { DashboardComponent } from './features/dashboard/dashboard';
import {ProfessorComponent}from './features/professor/professor';
import { AlunoComponent } from './features/aluno/aluno';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'professor',
    component: ProfessorComponent
  },
  {
    path: 'aluno',
    component: AlunoComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
