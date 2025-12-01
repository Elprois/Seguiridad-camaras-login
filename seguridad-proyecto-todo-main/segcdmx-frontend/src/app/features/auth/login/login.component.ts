import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PrimaryButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Por favor completa tus credenciales.';
      return;
    }

    const { username, password } = this.loginForm.getRawValue();

    this.authService.login(username, password).subscribe({
      next: (success) => {
        if (success) {
          this.errorMessage = '';
          this.router.navigateByUrl('/dashboard');
        } else {
          this.errorMessage = 'Credenciales inválidas. Intenta nuevamente.';
        }
      },
      error: () => {
        this.errorMessage = 'Error de conexión. Intenta más tarde.';
      }
    });
  }
}
