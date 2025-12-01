import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-dot',
  standalone: true,
  imports: [NgClass],
  templateUrl: './status-dot.component.html',
  styleUrl: './status-dot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusDotComponent {
  @Input() label = '';
  @Input() color: 'success' | 'warning' | 'danger' | 'info' | 'muted' = 'info';
}
