import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PersonalService } from '../../../core/services/personal.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../../shared/components/secondary-button/secondary-button.component';
import { ToastService } from '../../../shared/services/toast.service';
import { RolService } from '../../../core/services/rol.service';
import { Rol } from '../../../core/models/rol.model';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-personal-nuevo',
  standalone: true,
  imports: [
    CardComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    ModalComponent,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    AsyncPipe,
  ],
  templateUrl: './personal-nuevo.component.html',
  styleUrl: './personal-nuevo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalNuevoComponent {
  roles$ = this.rolService.getAll();
  loading = false;

  readonly guardiaForm = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    id_rol: [0, Validators.required],
    estado: ['Activo', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private personalService: PersonalService,
    private router: Router,
    private toastService: ToastService,
    private rolService: RolService,
  ) {}

  registrar(): void {
    if (this.guardiaForm.invalid || this.loading) {
      this.guardiaForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.guardiaForm.disable();

    const { username, password, nombre, apellido, id_rol, estado } = this.guardiaForm.getRawValue();
    
    this.personalService.create(username, password, nombre, apellido, +id_rol, estado).subscribe({
      next: () => {
        this.toastService.push('Usuario creado exitosamente.', 'success');
        this.router.navigateByUrl('/personal');
      },
      error: (error) => {
        console.error('Error creating user:', error);
        this.toastService.push('Error al crear el usuario. Por favor, intente de nuevo.', 'danger');
        this.loading = false;
        this.guardiaForm.enable();
      }
    });
  }
}
