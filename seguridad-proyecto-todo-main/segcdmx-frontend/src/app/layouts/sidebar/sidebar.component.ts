import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly primaryNav = [
    { label: 'Dashboard', icon: '📊', route: '/dashboard' },
    { label: 'Cámaras / Centro', icon: '🎥', route: '/camaras' },
    { label: 'Incidentes', icon: '🚨', route: '/incidentes' },
    { label: 'Personal', icon: '👮‍♂️', route: '/personal' },
    { label: 'Turnos', icon: '🗓️', route: '/turnos' },
    { label: 'Reportes', icon: '📑', route: '/reportes' },
    { label: 'Configuración', icon: '⚙️', route: '/configuracion' },
  ];

  readonly secondaryNav = [
    { label: 'Ayuda', icon: '❓', route: '/configuracion' },
    { label: 'Cerrar Sesión', icon: '⏻', route: '/login', logout: true },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  trackByLabel(_: number, item: { label: string }) {
    return item.label;
  }

  onNavigate(item: { route: string; logout?: boolean }) {
    if (item.logout) {
      this.authService.logout();
      return;
    }
    this.router.navigateByUrl(item.route);
  }
}
