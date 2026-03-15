import { Routes } from '@angular/router';

import { LoginComponent } from './vista/login/login';
import { DashboardAdminComponent } from './vista/dashboard-admin/dashboard-admin';
import { DashboardTecnicoComponent } from './vista/dashboard-tecnico/dashboard-tecnico';
import { DashboardUserComponent } from './vista/dashboard-user/dashboard-user';

export const routes: Routes = [

  { path: '', component: LoginComponent },

  { path: 'admin', component: DashboardAdminComponent },

  { path: 'tecnico', component: DashboardTecnicoComponent },

  { path: 'usuario', component: DashboardUserComponent }

];

