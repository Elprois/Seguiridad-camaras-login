import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ToastVariant = 'success' | 'info' | 'warning' | 'danger';

export interface ToastMessage {
  id: number;
  message: string;
  variant: ToastVariant;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  private counter = 0;

  get toasts$(): Observable<ToastMessage[]> {
    return this.toastsSubject.asObservable();
  }

  push(message: string, variant: ToastVariant = 'info', duration = 4000): void {
    const toast: ToastMessage = { id: ++this.counter, message, variant };
    this.toastsSubject.next([...this.toastsSubject.value, toast]);

    setTimeout(() => this.dismiss(toast.id), duration);
  }

  dismiss(id: number): void {
    this.toastsSubject.next(this.toastsSubject.value.filter((toast) => toast.id !== id));
  }
}
