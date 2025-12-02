import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordingsPageComponent } from './components/recordings-page/recordings-page.component';

const routes: Routes = [
    {
        path: '',
        component: RecordingsPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecordingsRoutingModule { }
