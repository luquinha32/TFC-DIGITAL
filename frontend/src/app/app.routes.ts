import { Routes } from '@angular/router';

import { LoginComponent } from './features/login/login/login';
import { DashboardComponent } from './features/dashboard/dashboard';
import { ProfessorComponent } from './features/professor/professor';
import { AlunoComponent } from './features/aluno/aluno';
import { VisitanteComponent } from './features/visitante/visitante';

export const routes: Routes = [
  {
    path: '',
    component: VisitanteComponent
  },
  {
    path: 'visitante',
    component: VisitanteComponent
  },
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
    path: '**',
    redirectTo: ''
  }
];