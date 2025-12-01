import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 5;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
  }

  get rangeLabel(): string {
    if (this.totalItems === 0) {
      return 'Sin resultados registrados';
    }
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.totalItems, this.currentPage * this.itemsPerPage);
    return `Mostrando ${start} a ${end} de ${this.totalItems} resultados`;
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.pageChange.emit(page);
  }
}
