import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordingsRoutingModule } from './recordings-routing.module';

// Los componentes son standalone, pero el módulo se usa para lazy loading y agrupamiento
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RecordingsRoutingModule
    ]
})
export class RecordingsModule { }
