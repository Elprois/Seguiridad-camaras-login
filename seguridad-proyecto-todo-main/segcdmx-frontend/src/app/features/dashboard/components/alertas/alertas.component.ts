import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertasService, Alerta } from '../../../../core/services/alertas.service';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './alertas.component.html',
  styleUrl: './alertas.component.scss'
})
export class AlertasComponent implements OnInit {
  alertas$: Observable<Alerta[]>;

  constructor(private alertasService: AlertasService) {
    this.alertas$ = this.alertasService.alertas$;
  }

  ngOnInit(): void { }
}
