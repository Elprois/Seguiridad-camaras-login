import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  standalone: true,
  imports: [],
  templateUrl: './secondary-button.component.html',
  styleUrl: './secondary-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondaryButtonComponent {
  @Input() label = 'Cancelar';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth = false;
}
