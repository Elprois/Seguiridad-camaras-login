import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { CamarasComponent } from './features/camaras/camaras/camaras.component';
import { ConfiguracionComponent } from './features/configuracion/configuracion/configuracion.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { IncidenteDetalleComponent } from './features/incidentes/incidente-detalle/incidente-detalle.component';
import { IncidentesComponent } from './features/incidentes/incidentes/incidentes.component';
import { LoginComponent } from './features/auth/login/login.component';
import { PersonalComponent } from './features/personal/personal/personal.component';
import { PersonalNuevoComponent } from './features/personal/personal-nuevo/personal-nuevo.component';
import { ReportesComponent } from './features/reportes/reportes/reportes.component';
import { TurnosComponent } from './features/turnos/turnos/turnos.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        title: 'SEGCDMX | Login',
        data: { title: 'SEGCDMX | Login' }
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, title: 'Panel Principal', data: { title: 'Panel Principal' } },
      { path: 'camaras', component: CamarasComponent, title: 'Centro de Videovigilancia', data: { title: 'Centro de Videovigilancia' } },
      { path: 'incidentes', component: IncidentesComponent, title: 'Registro de Incidentes', data: { title: 'Registro de Incidentes' } },
      { path: 'incidentes/:id', component: IncidenteDetalleComponent, title: 'Detalle de Incidente', data: { title: 'Detalle de Incidente' } },
      { path: 'personal', component: PersonalComponent, title: 'Gestión de Personal', data: { title: 'Gestión de Personal' } },
      { path: 'personal/nuevo', component: PersonalNuevoComponent, title: 'Agregar Nuevo Guardia', data: { title: 'Agregar Nuevo Guardia' } },
      { path: 'turnos', component: TurnosComponent, title: 'Asignación de Turnos y Equipo', data: { title: 'Asignación de Turnos y Equipo' } },
      { path: 'reportes', component: ReportesComponent, title: 'Portal de Reportes', data: { title: 'Portal de Reportes' } },
      { path: 'configuracion', component: ConfiguracionComponent, title: 'Configuración', data: { title: 'Configuración' } },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
