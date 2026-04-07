import { Routes } from '@angular/router';
import { LoginComponent } from './vista/login/login';
import { DashboardAdminComponent } from './vista/dashboard-admin/dashboard-admin';
import { DashboardTecnicoComponent } from './vista/dashboard-tecnico/dashboard-tecnico';
import { DashboardUserComponent } from './vista/dashboard-user/dashboard-user';
import { ViewInicio} from './vista/dashboard-user/view-inicio'
import { ViewForm} from './vista/dashboard-user/view-form'
import { ViewPredio } from './vista/dashboard-user/view-predio';
import { ViewProduccion } from './vista/dashboard-user/view-produccion';
import { PageRequest } from './vista/page-request/page-request';
import { ViewFormProduccion } from './vista/dashboard-user/view-form-produccion';
import { ViewInspecciones } from './vista/dashboard-user/view-inspecciones';

export const routes: Routes = [

  { path: '', component: LoginComponent ,
    children:[
      {path: 'request', component: PageRequest}
    ]
  },

  { path: 'admin', component: DashboardAdminComponent },

  { path: 'tecnico', component: DashboardTecnicoComponent },

  { path: 'usuario', component: DashboardUserComponent,
    children:[
      { path: 'inicio', component: ViewInicio },
      { path: 'predio', component: ViewPredio },
      { path: 'formulario', component: ViewForm },
      { path: 'produccion', component: ViewProduccion },
      { path:  'formulario-produccion', component: ViewFormProduccion} ,
      { path: 'visita', component: ViewInspecciones },   
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
   }

];

