import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  pageTitle = 'Panel Principal';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        let child = this.route.firstChild;

        while (child?.firstChild) {
          child = child.firstChild;
        }

        const dataTitle = child?.snapshot.data?.['title'] as string | undefined;
        const routeTitle = child?.routeConfig?.title as string | undefined;

        this.pageTitle = dataTitle ?? routeTitle ?? 'Panel Principal';
      });
  }
}
