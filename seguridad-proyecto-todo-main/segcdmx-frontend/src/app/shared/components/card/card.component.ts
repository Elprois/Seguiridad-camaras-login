import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() heading?: string;
  @Input() subtitle?: string;
  @Input() padding: 'md' | 'lg' = 'lg';

  get paddingClass() {
    return this.padding === 'lg' ? 'card--lg' : 'card--md';
  }
}
