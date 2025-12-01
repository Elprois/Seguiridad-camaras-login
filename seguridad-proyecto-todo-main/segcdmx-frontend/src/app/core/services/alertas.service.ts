import { Injectable } from '@angular/core';
import { Subject, Observable, merge, timer } from 'rxjs';
import { map, scan, shareReplay, startWith } from 'rxjs/operators';

export interface Alerta {
    id: number;
    mensaje: string;
    tipo: 'info' | 'warning' | 'danger';
    hora: Date;
    camaraId?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AlertasService {
    private manualAlertSubject = new Subject<Alerta>();

    // Stream of alerts (both manual and simulated)
    alertas$: Observable<Alerta[]>;

    // Stream of latest alert for reactivity
    latestAlert$: Observable<Alerta>;

    constructor() {
        const simulatedAlerts$ = timer(0, 4000).pipe(
            map(() => this.generarAlertaAleatoria())
        );

        const allAlerts$ = merge(this.manualAlertSubject, simulatedAlerts$);

        this.latestAlert$ = allAlerts$.pipe(shareReplay(1));

        this.alertas$ = allAlerts$.pipe(
            scan((acc: Alerta[], curr: Alerta) => {
                const newAcc = [curr, ...acc];
                return newAcc.slice(0, 20); // Keep last 20
            }, []),
            startWith([])
        );
    }

    private counter = 0;

    private generarAlertaAleatoria(): Alerta {
        this.counter++;
        const eventos = [
            { msg: 'Movimiento detectado en Cámara 2', tipo: 'danger', cam: 'C-02' },
            { msg: 'Puerta trasera abierta', tipo: 'warning', cam: 'C-05' },
            { msg: 'Verificación de sistema completada', tipo: 'info' },
            { msg: 'Objeto abandonado en Zona B', tipo: 'danger', cam: 'C-03' },
            { msg: 'Usuario Admin inició sesión', tipo: 'info' },
            { msg: 'Pérdida de señal momentánea en Cámara 4', tipo: 'warning', cam: 'C-04' }
        ];

        const evento = eventos[Math.floor(Math.random() * eventos.length)];

        return {
            id: this.counter,
            mensaje: evento.msg,
            tipo: evento.tipo as any,
            hora: new Date(),
            camaraId: evento.cam
        };
    }
}
