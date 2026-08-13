import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Usuarios } from './usuarios/usuarios';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { Pacientes } from './pacientes/pacientes';
import { Doctores } from './doctores/doctores';
import { Especialidades } from './especialidades/especialidades';
import { Citas } from './citas/citas';
import { Historiales } from './historiales/historiales';
import { Recetas } from './recetas/recetas';

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

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
  path: 'usuarios',
  component: Usuarios,
  canActivate: [authGuard, adminGuard]
  },

  {
    path: 'pacientes',
    component: Pacientes,
    canActivate: [authGuard]
  },

  {
    path: 'doctores',
    component: Doctores,
    canActivate: [authGuard]
  },

  {
    path: 'especialidades',
    component: Especialidades,
    canActivate: [authGuard]
  },

  {
    path: 'citas',
    component: Citas,
    canActivate: [authGuard]
  },

  {
    path: 'historiales',
    component: Historiales,
    canActivate: [authGuard]
  },

  {
    path: 'recetas',
    component: Recetas,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
];